//  salary Model

(function (angular) {
    "use strict";

    function factory(taxesInsuranceContent) {
        var model = {},
            rowConfig = taxesInsuranceContent.getRowConfigs();

        /**
         * Return payload data for service
         * @param  {Array} grid rows 
         * @return {Array} 
         */
        model.toJsonFromGrid = function (payrollID, rows, columns) {
            var payload = [];
            rows.forEach(function (dataRow) {
                if (dataRow.groupID === rowConfig.taxExempted.groupID) {
                    var payrollTaxes = {
                        "payrollTaxID": dataRow.payrollTaxID,
                        "payrollID": dataRow.payrollID,
                        "taxType": dataRow.payrollType,
                        "dataType": dataRow.dataType,
                        "taxExempt": dataRow.taxExempt
                    };
                    var payrollMonthlyTaxes = [];
                    columns.forEach(function (column) {
                        if (column.isDataColumn) {
                            payrollMonthlyTaxes.push({
                                "startDate": column.dateStr,
                                "dataValue": dataRow.taxExempt ? 0 : dataRow[column.key]
                            });
                        }
                    });

                    payload.push({
                        payrollTaxes: payrollTaxes,
                        payrollMonthlyTaxes: payrollMonthlyTaxes
                    });
                }
            });

            return payload;
        };

        model.buildGridData = function (defaultRow, data) {
            var dataRows = [];
            data.forEach(function (item, index) {
                var dataRow = angular.extend({}, defaultRow, rowConfig.taxExempted, item);
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
                //dataRows.forEach(function (dataRow) {
                //    dataRow[column.key] = 0;
                //});
            }
        };

        return model;

    }

    angular
        .module("budgeting")
        .factory('taxInsuranceMapperModel', [
                'taxInsuranceConstantModel',
        factory]);
})(angular);
