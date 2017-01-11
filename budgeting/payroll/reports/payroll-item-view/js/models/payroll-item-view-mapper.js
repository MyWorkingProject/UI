//  payrollItemView mapper Model

(function (angular) {
    "use strict";

    function factory() {
        var model = {};

        /**
         * Create's Complex grid rows for the response data & apply row Config
         * @param  {object} default row that will extended
         * @param  {array} response data from service
         * @return {object} this
         */
        model.buildGridData = function (defaultRow, data) {
            var dataRows = [];
            data.forEach(function (item) {
                var dataRow = angular.extend({}, defaultRow, item);
                dataRow.rowType = "";
                dataRow.itemDescription = item.payrollItemName;
                dataRow.rowClass = item.payrollItemName === "Total" ? "total" : "";
                 dataRows.push(dataRow);
            });

            return dataRows;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("payrollItemViewMapperModel", [factory]);
})(angular);
