//  GL Accounts Grid Model

(function (angular) {
    "use strict";

    function factory(gridModel, headers, columnDefns, filters) {
        var model = gridModel();
        logc("Grid model satrt");

        model.className = 'rp-grid-body-1';

        model
            .setHeaders(headers)
            .setColumnDefns(columnDefns)
            .setFilters(filters);

        return model;
    }

    angular
        .module("budgeting")
        .factory('masterChartListGrid', [
            'rpGridModel',
            'masterChartListHeader',
             'masterChartColumns',
            'masterChartFilter',
            factory
        ]);
})(angular);
