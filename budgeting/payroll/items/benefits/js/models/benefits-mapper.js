//  salary Model

(function (angular) {
    "use strict";

    function factory(benefitsConstant) {
        var model = {},
            rowConfig = benefitsConstant.getRowConfigs();

        /**
         * Return payload data for service
         * @param  {Array} grid rows 
         * @return {Array} 
         */
        model.toJsonFromGrid = function (rows, columns) {
            var payload = [];
            rows.forEach(function (row) {
                var dataRow = row.getData();
                if (dataRow.groupID === rowConfig.benefits.groupID) {
                    var payrollBenefitData = {
                        "benefitDataID": dataRow.benefitDataID || 0,
                        "payrollID": dataRow.payrollID || 0,
                        "benefitName": dataRow.benefitName,
                        "taxable": true
                    };
                    var payrollMonthlyBenefit = [];
                    columns.forEach(function (column) {
                        if (column.isDataColumn) {
                            payrollMonthlyBenefit.push({
                                "startDate": column.dateStr,
                                "dataValue": dataRow[column.key]
                            });
                        }
                    });

                    payload.push({
                        payrollBenefitData: payrollBenefitData,
                        payrollMonthlyBenefit: payrollMonthlyBenefit
                    });
                }
            });

            return payload;
        };

        model.buildGridData = function (defaultRow, data) {
            var dataRows = [];
            data.forEach(function (item, index) {
                var dataRow = angular.extend({}, defaultRow, rowConfig.benefits, item);
                dataRow.rowID = index + 1;
                dataRows.push(dataRow);
            });
            dataRows.push(angular.extend({}, defaultRow, rowConfig.total));
            return dataRows;
        };

        /**
         * Sets response data to zero if column is not editable(i.e if the user has join in between model)
         * @param  {rows}
         * @param  {columnModel}
         * @param  {number}
         * @return {object} this
         */
        model.resetData = function (dataRows, column, index) {
            if (column.isDataColumn && !column.isEditable) {
                dataRows.forEach(function (dataRow) {
                    dataRow[column.key] = 0;
                });
            }
        };

        return model;

    }

    angular
        .module("budgeting")
        .factory('benefitsMapperModel', [
                'benefitsConstantModel',
        factory]);
})(angular);
