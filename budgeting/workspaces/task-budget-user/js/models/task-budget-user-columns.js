// Task Model list
(function (angular) {
    "use strict";

    function factory() {
        var assignedBitHtml =
            "<input type='checkbox'" +
            "ng-model='column.model.isSelected' " +
            "id='{{column.model.userID}}' " +
            "track-unsaved-changes='taskBudgetUser' " +
            "ng-true-value='true' ng-false-value='false'>" +
            "</input>";

        var cols = [{
            rowSelect: true,
            key: 'isSelected',
            html: assignedBitHtml
        }, {
            key: 'name'
        }, {
            key: 'role'
        }, {
            key: 'emailAddress'
        }, {
            key: 'phone'
        }];

        return cols;
    }

    angular
        .module("budgeting")
        .factory('taskBudgetUserColumns', [factory]);

})();
