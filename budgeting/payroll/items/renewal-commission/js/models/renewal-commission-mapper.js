//  hourly mapper Model

(function (angular) {
    "use strict";

    function factory(renewalCommnConstant) {
        var model = {},
            columns = renewalCommnConstant.getColumns(),
            rowConfig = renewalCommnConstant.getRowConfigs();
            
        /**
         * Create's payload data by modify the response data, that can post back to server
         * @param  {Array} payload Data
         * @param  {Array} grid Data
         * @return {Array} modified Array
         */
        model.toJsonFromGrid = function (payrollID, dataRows, gridColumns, grid) {
             var listPayrollMonthlyRenewal = [],
                leaseRenewalsRow = grid.getRowsBy({
                    rowID: rowConfig.leaseRenewals.rowID,
                    groupID: rowConfig.leaseRenewals.groupID,
                    level: rowConfig.leaseRenewals.level
                }).first(),
                commissionAmountRow = grid.getRowsBy({
                    rowID: rowConfig.commissionAmount.rowID,
                    groupID: rowConfig.commissionAmount.groupID,
                    level: rowConfig.commissionAmount.level
                }).first(),
                percentOfRenewalsRow = grid.getRowsBy({
                    rowID: rowConfig.percentOfRenewals.rowID,
                    groupID: rowConfig.percentOfRenewals.groupID,
                    level: rowConfig.percentOfRenewals.level
                }).first(),
                leaseRenewalTotalRow = grid.getRowsBy({
                    rowID: rowConfig.leaseRenewalTotal.rowID,
                    groupID: rowConfig.leaseRenewalTotal.groupID,
                    level: rowConfig.leaseRenewalTotal.level
                }).first(),
                leaseRenewalsMTMRow = grid.getRowsBy({
                    rowID: rowConfig.leaseRenewalsMTM.rowID,
                    groupID: rowConfig.leaseRenewalsMTM.groupID,
                    level: rowConfig.leaseRenewalsMTM.level
                }).first(),
                mtmCommissionAmountRow = grid.getRowsBy({
                    rowID: rowConfig.mtmCommissionAmount.rowID,
                    groupID: rowConfig.mtmCommissionAmount.groupID,
                    level: rowConfig.mtmCommissionAmount.level
                }).first(),
                mtmPercentOfRenewalsRow = grid.getRowsBy({
                    rowID: rowConfig.mtmPercentOfRenewals.rowID,
                    groupID: rowConfig.mtmPercentOfRenewals.groupID,
                    level: rowConfig.mtmPercentOfRenewals.level
                }).first(),
                mtmRenewalTotalRow = grid.getRowsBy({
                    rowID: rowConfig.mtmRenewalTotal.rowID,
                    groupID: rowConfig.mtmRenewalTotal.groupID,
                    level: rowConfig.mtmRenewalTotal.level
                }).first(),
                additionalAmountRow = grid.getRowsBy({
                    rowID: rowConfig.additionalAmount.rowID,
                    groupID: rowConfig.additionalAmount.groupID,
                    level: rowConfig.additionalAmount.level
                }).first(),
                renewalCommissionTotalRow = grid.getRowsBy({
                    rowID: rowConfig.renewalCommissionTotal.rowID,
                    groupID: rowConfig.renewalCommissionTotal.groupID,
                    level: rowConfig.renewalCommissionTotal.level
                }).first();

            gridColumns.forEach(function (column) {
                if (column.isDataColumn) {
                    listPayrollMonthlyRenewal.push({
                        "payrollID": payrollID,
                        "startDate": column.dateStr,
                        "leaseRenewals": leaseRenewalsRow.getData()[column.key],
                        "commissionAmount": commissionAmountRow.getData()[column.key],
                        "percentOfRenewals": percentOfRenewalsRow.getData()[column.key],
                        "leaseRenewalTotal": leaseRenewalTotalRow.getData()[column.key],
                        "leaseRenewalsMTM": leaseRenewalsMTMRow.getData()[column.key],
                        "mtmCommissionAmount": mtmCommissionAmountRow.getData()[column.key],
                        "mtmPercentOfRenewals": mtmPercentOfRenewalsRow.getData()[column.key],
                        "mtmRenewalTotal": mtmRenewalTotalRow.getData()[column.key],
                        "additionalAmount": additionalAmountRow.getData()[column.key],
                        "renewalCommissionTotal": renewalCommissionTotalRow.getData()[column.key]
                    });
                }
            });

            dataRows.forEach(function (item, index) {
                for (var key in item) {
                    if (listPayrollMonthlyRenewal[index].hasOwnProperty(key)) {
                        item[key] = listPayrollMonthlyRenewal[index][key];
                    }
                }
            });
            return listPayrollMonthlyRenewal;
        };

        /**
         * Create's Complex grid rows for the response data & apply row Config
         * @param  {object} default row that will extended
         * @param  {array} response data from service
         * @return {object} this
         */
        model.buildGridData = function (defaultRow, data) {
            var dataRows = [];
            var mappers = [
                    'leaseRenewals',
                    'percentOfRenewals',
                    'commissionAmount',
                    'leaseRenewalTotal',
                    'leaseRenewalsMTM',
                    'mtmPercentOfRenewals',
                    'mtmCommissionAmount',                    
                    'mtmRenewalTotal',
                    'additionalAmount',
                    'renewalCommissionTotal'
                ];

            mappers.forEach(function (key) {
                var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                data.forEach(function (item) {
                    dataRow[columns.period.key + item.periodNo] = item[key] || 0;
                });
                dataRows.push(dataRow);
            });

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
                var mappers = [
                    'monthlyRenewalCommn'
                ];
                mappers.forEach(function (key) {
                    dataRows.forEach(function (dataRow) {
                        if (dataRow.periodNo === column.period) {
                            dataRow[key] = 0;
                        }
                    });
                });
            }
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("renewalCommnMapperModel", ['renewalCommnConstantModel', factory]);
})(angular);
