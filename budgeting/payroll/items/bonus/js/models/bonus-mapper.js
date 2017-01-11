//  salary Model

(function (angular) {
    "use strict";

    function factory(bonusConstant) {
        var model = {},
            rowConfig = bonusConstant.getRowConfigs();

        /**
         * Return payload data for service
         * @param  {Array} grid rows 
         * @return {Array} 
         */
        model.toJsonFromGrid = function (rows, columns) {
            var payload = [];
            rows.forEach(function (row) {
                var dataRow = row.getData();
                if (dataRow.groupID === rowConfig.bonus.groupID) {
                    var bonusItem = {
                        "payrollBonusID": dataRow.payrollBonusID || 0,
                        "payrollID": dataRow.payrollID || 0,
                        "payrollItemID": dataRow.payrollItemID || 0,
                        "bonusName": dataRow.bonusName
                    };
                    var payrollMonthlyBonus = [];
                    columns.forEach(function (column) {
                        if (column.isDataColumn) {
                            payrollMonthlyBonus.push({
                                "startDate": column.dateStr,
                                "dataValue": dataRow[column.key]
                            });
                        }
                    });

                    payload.push({
                        payrollBonus: bonusItem,
                        payrollMonthlyBonus: payrollMonthlyBonus
                    });
                }
            });

            return payload;
        };

        model.buildGridData = function (defaultRow, data, payrollItemName) {
            var dataRows = [];
            data.forEach(function (item, index) {
                var dataRow = angular.extend({}, defaultRow, rowConfig.bonus, item);
                dataRow.rowID = index + 1;
                dataRows.push(dataRow);
            });
            var dataRow = angular.extend({}, defaultRow, rowConfig.total);
            dataRow.bonusName = dataRow.bonusName.tokenReplace({
                name: payrollItemName
            });
            dataRows.push(dataRow);

            return dataRows;
        };

        return model;

    }

    angular
        .module("budgeting")
        .factory('bonusMapperModel', [
'bonusConstantModel',
factory]);
})(angular);
