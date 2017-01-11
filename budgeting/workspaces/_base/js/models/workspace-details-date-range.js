//  Workspace Details Date Range Model

(function (angular) {
    "use strict";

    function factory($rootScope, location, eventStream, dateRange) {
        var model = {};

        model._data = dateRange.get();

        model.state = {
            hidden: false
        };

        model.firstPass = true;

        model.options = {
            maxLength: 10,
            anchorRight: true,
            displayFormat: 'MM/DD/YYYY'
        };

        model.urls = [
            "/workspaces/renewals",
            "/workspaces/availability",
            "/workspaces/in-progress-waitlist",
            "/workspaces/delinquent-and-prepaid"
        ];

        model.update = eventStream();

        model.init = function () {
            model.updateState();
            $rootScope.$on('$locationChangeStart', model.updateState);
            return model;
        };

        model.show = function () {
            model.state.hidden = false;
        };

        model.hide = function () {
            model.state.hidden = true;
        };

        model.data = function () {
            return model._data;
        };

        model.save = function () {
            if (!model.firstPass) {
                dateRange.save(model._data);
            }
            model.firstPass = false;
        };

        model.updateState = function () {
            var url = location.url();
            model.state.hidden = model.urls.contains(url);
        };

        model.publish = function () {
            model.save();
            model.update.publish();
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('workspaceDetailsDateRange', [
            '$rootScope',
            'location',
            'eventStream',
            'workspacesDateRange',
            factory
        ]);
})(angular);
