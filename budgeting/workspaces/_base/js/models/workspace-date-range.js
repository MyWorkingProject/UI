//  Workspace Date Range Model

(function (angular) {
    "use strict";

    function factory($rootScope, $location, session, moment, dateRangeModel) {
        var svc = {},
            url, urls, model, format, getRange, today, endOfMonth;

        svc.init = function () {
            today = moment();
            format = 'MM/DD/YYYY';
            model = dateRangeModel('tasksDateRange');
            endOfMonth = today.clone().add(1, 'month').date(1).add(-1, 'day');

            if (model.isEmpty()) {
                model.setRange({
                    startDate: today.format(format),
                    endDate: endOfMonth.format(format)
                });
            }

            $rootScope.$on('$locationChangeStart', svc.updateState);

            return svc;
        };

        svc.updateState = function () {
            url = $location.url();

            urls = [
                "/workspaces/renewals",
                "/workspaces/delinquent-and-prepaid",
                "/workspaces/in-progress-waitlist",
                "/workspaces/availability"
            ];

            model.state.hidden = urls.contains(url);

            return model;
        };

        return svc.init().updateState();
    }

    angular
        .module("budgeting")
        .factory('workspaceDateRange', [
            '$rootScope',
            '$location',
            'session',
            'moment',
            'rpDateRangeModel',
            factory
        ]);
})(angular);
