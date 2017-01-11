
(function (angular) {
    'use strict';

    function factory($filter, wsData, constantModel, calculations) {
        var model = {}, modelDetails, occupancyLeaseSettings;

        model.handleOccupancySettings = function (dataRow, form, lrSettings, refDataRow) {
            model.getBudgetDetails();
            model.doUpdateHelpText(refDataRow);
            if (lrSettings.useLeaseReferenceData) {
                model.handleForReferenceDataUse(dataRow, refDataRow);
            }
            model.handleBudgetMoveInsRow(dataRow);
            return dataRow;
        };

        model.handleForReferenceDataUse = function (dataRow, refDataRow) {
            var avgLTRow = model.getOVObject(dataRow, constantModel.rowConfig.averageLeaseTerm.itemDescription),
                refAvgLTRow = model.getOVObject(refDataRow, constantModel.rowConfig.averageLeaseTerm.itemDescription),
                leaseRP = model.getOVObject(dataRow, constantModel.rowConfig.leaseRenewalsPercentage.itemDescription),
                refLeaseRP = model.getOVObject(refDataRow, constantModel.rowConfig.leaseRenewalsPercentage.itemDescription),
                leaseRMTMP = model.getOVObject(dataRow, constantModel.rowConfig.leaseRenewalsMTMPercentage.itemDescription),
                refLeaseRMTMP = model.getOVObject(refDataRow, constantModel.rowConfig.leaseRenewalsMTMPercentage.itemDescription);

            var noOfPeriods = modelDetails.noOfPeriods;
            for (var i = 1; i <= noOfPeriods; i++) {
                avgLTRow["period" + i] = refAvgLTRow["period" + i];
                leaseRP["period" + i] = refLeaseRP["period" + i];
                leaseRMTMP["period" + i] = refLeaseRMTMP["period" + i];
            }
        };

        model.doUpdateHelpText = function (refDataRow) {
            var msg = "", openPeriodNo = 0;
            var opModelType = wsData.renewalsData.leaseWorksheetSettings.leaseOpenPeriodRefDataType;
            var opModelYear = wsData.renewalsData.leaseWorksheetSettings.leaseOpenPeriodRefDataYear;

            if (opModelType !== "") {
                msg = opModelYear + " " + opModelType;
            }
            else {
                msg = "Selected reference";
            }
            msg = msg + " data will be loaded into the open periods";

            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var columnNames = [];
            var startDt = new Date();
            startDt.setFullYear(modelDetails.budgetYear - 1, wsData.renewalsData.leaseWorksheetSettings.startMonth - 1, 1);
            var endDt = new Date();
            endDt.setFullYear(modelDetails.budgetYear - 1, wsData.renewalsData.leaseWorksheetSettings.startMonth - 1, 1);

            var currentDate = new Date();
            var currentMonth = currentDate.getMonth();
            var currentYear = currentDate.getYear();
            currentDate.setFullYear(currentYear, currentMonth, 1);

            var periodNo = 0;
            var noOfPeriods = modelDetails.noOfPeriods;
            for (var period = 0; period < noOfPeriods; period++) {
                if (endDt.getYear() == currentYear && endDt.getMonth() == currentMonth) {
                    periodNo = period;
                }
                columnNames[period] = monthNames[endDt.getMonth()] + "-" + endDt.getYear();
                endDt.setMonth(endDt.getMonth() + 1);
            }

            //currentDate.setFullYear(currentYear - 1, currentMonth, 1);
            if (periodNo > 0) {
                msg = msg + " starting " + columnNames[periodNo];
                openPeriodNo = periodNo + 1;
            }
            else {
                if (currentDate < startDt) {
                    //All Open Periods
                    msg = msg + " starting " + monthNames[startDt.getMonth()] + " - " + modelDetails.budgetYear;
                    openPeriodNo = 1;
                }
                else if (currentDate > endDt) {
                    //All Closed Periods
                    openPeriodNo = -1;
                }
            }

            var refHeader = model.getOVObject(refDataRow, constantModel.rowConfig.referenceData.itemDescription);
            refHeader.yearType = (modelDetails.budgetYear - 1) + " Actual";
            refHeader.helpDesc = msg;
        };

        model.handleBudgetMoveInsRow = function (dataRow) {
            var btgtdME = model.getOVObject(dataRow, constantModel.rowConfig.budgetedMoveInsExpiring.itemDescription);
            if (modelDetails.occupancyModel === "None") {
                btgtdME.rowClass = "hide-bme";
            }
            else {
                btgtdME.rowClass = "";
            }
        };

        model.getBudgetDetails = function () {
            modelDetails = wsData.getBudgetModelSettings();
        };

        model.getValue = function (data, name, index) {
            var obj = model.getOVObject(data, name);
            return obj["period" + index];
        };

        model.getOVObject = function (data, name) {
            return $filter('filter')(data, { itemDescription: name }, true)[0];
        };

        model.updateConfigByCondition = function (grid, renewalsType) {
            grid.gridConfig.updatePercentageColumns(renewalsType === "percentage");
            grid.gridConfig.updateUnitColumns(renewalsType !== "percentage");
        };

        model.getObjectByKey = function (data, key) {
            return $filter('filter')(data, { itemDescription: key }, true)[0];
        };

        model.getOccupancySettings = function () {
            return wsData.getOccupancyWorksheetSettings();
        };

        return model;

    }

    angular
          .module('budgeting')
          .factory('leaseWorksheetSettings', ['$filter',
                                          'leaseWorksheetData',
                                          'leaseWorksheetConstantModel',
                                          'leaseWorksheetCalculations', factory]);
})(angular);

