// GL Account Column Defns Model

(function (angular) {
    "use strict";

    function factory($stateParams) {

        var assignedBitHtml =
            "<div class='checkbox-wrap'>" +
            "<input type='checkbox'" +
            "gl-account-selected " +
            "ng-model='column.model.isSelected' " +
            "id='{{column.model.glAccountID}}' " +
            "track-unsaved-changes='gl-accounts' " +
            "ng-true-value='true' ng-false-value='false' />" +
            "</div>";

        var budgetUseHtml = "<span class='text'> " +
            "{{column.model.budgetUseOnly?'Yes':'No'}}" +
            "</span>";

        var restrictPayrollHtml = "<span class='text'> " +
            "{{column.model.restrictPayroll?'Restricted':'Not Restricted'}}" +
            "</span>";

        var defcols = [{
            rowSelect: true,
            key: 'isSelected',
            html: assignedBitHtml
        }, {
            key: 'glAccountNumber',
            type: 'actionLink'
        }, {
            key: 'glAccountDescription'
        }, {
            key: 'accountTypeCode'
        }, {
            key: 'accountCategoryName'
        }, {
            key: 'budgetUseOnly',
            html: budgetUseHtml
        }, {
            key: 'normalBalance'
        }, {
            key: 'restrictPayroll',
            html: restrictPayrollHtml
        }];

        var cols = [];

        angular.copy(defcols, cols);

        var updateCols = function () {
            var chartType = $stateParams.type; //0 - mastercharts, otherthan 0- Property Charts propertyid
            if (chartType === undefined) {
                chartType = "0";
            }
            if (chartType !== "0") {
                var statusCol = {
                    key: "status"
                };
                cols.push(statusCol);
            }
            return cols;
        };

        var reset = function () {
            angular.copy(defcols, cols);
        };

        return {
            updateCols: updateCols,
            reset: reset
        };

    }

    angular
        .module("budgeting")
        .factory('manageGlAccountColumns', ['$stateParams', factory]);
})(angular);
