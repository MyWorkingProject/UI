//  GL Accounts Grid Model

(function (angular) {
    "use strict";

    function factory(gridModel, headers, filters, columnDefns) {

        var model = gridModel();

        model.className = 'rp-grid-body-1';

        model
            .setHeaders(headers)
            .setFilters(filters)
            .setColumnDefns(columnDefns);
        return model;

    }

    angular
        .module("budgeting")
        .factory('taskBudgetUserGrid', [
            'rpGridModel',
            'taskBudgetUserHeaders',
            'taskBudgetUserFilters',
            'taskBudgetUserColumns',
            factory
        ]);
})(angular);
