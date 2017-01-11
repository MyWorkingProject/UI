// Task Model list
(function (angular) {
    "use strict";

    function factory() {
        var assignedBitHtml =
            "<input type='checkbox'" +
            "ng-model='column.model.isSelected' " +
            "id='{{column.model.budgetModelID}}' " +
            "track-unsaved-changes='taskBudgetModel' " +
            "ng-true-value='true' ng-false-value='false'>" +
            "</input>";

        var cols = [{
            rowSelect: true,
            key: 'isSelected',
            html: assignedBitHtml
        }, {
            key: 'budgetYear'
        }, {
            key: 'modelType'
        }, {
            key: 'assetType'
        }, {
            key: 'name'
        }];

        return cols;
    }

    angular
        .module("budgeting")
        .factory('taskBudgetModelColumns', [factory]);

})();
