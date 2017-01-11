//  GL Accounts Grid Model

(function (angular) {
    "use strict";

    function factory(gridModel, headers, filters, columnDefns) {
        // var model = gridModel();
        // model.className = 'rp-grid-body-3';

        // model
        //     .setHeaders(headers)
        //     .setFilters(filters)
        //     .setColumnDefns(columnDefns);

        // return model;

        var updateGridModel = function (data) {
            var model = gridModel();
            model.className = 'rp-grid-body-1';

            model
                .setHeaders(headers.updateHeaders())
                .setFilters(filters.updateFilters(data))
                .setColumnDefns(columnDefns.updateCols());

            return model;
        };

        var reset = function () {
            headers.reset();
            columnDefns.reset();
        };

        return {
            updateGridModel: updateGridModel,
            reset: reset
        };

    }

    angular
        .module("budgeting")
        .factory('manageGlAccountGrid', [
            'rpGridModel',
            'manageGlAccountHeaders',
            'manageGlAccountFilters',
            'manageGlAccountColumns',
            factory
        ]);
})(angular);
