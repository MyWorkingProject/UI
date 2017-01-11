(function(angular) {
    'use strict';

    function factory(budgetDetails, $filter, worksheetData, constantModel, calculations) {
        var model = {},
            modelDetails, occupancyLeaseSettings;

        model.handleOccupancySettings = function(dataRow, form, grid, refDataRow) {
            model.getBudgetDetails();
            model.doUpdateHelpText(refDataRow);
            model.handleLabelChanges(dataRow);
            model.handleLabelChangeForNonrenewal(dataRow);
            model.handleOccupancyRadioButtons(form);
            model.setOccupancyGoalPercentage(dataRow);
            //  model.handleOccupancyBy(dataRow, form);
            model.handleMoveOutsFromNonRenewal(dataRow, form);
            // model.handleNonRevenueUnits();--Hide for  "senior living"
            //bindTurnoverMinus()
            //doLoadHistoricalRefType()
            return dataRow;
        };
        model.doUpdateHelpText = function(refDataRow) {
            var msg = "",
                openPeriodNo = 0;
            var opModelType = model.getOccupancyWorksheetSettings().occupancyOpenPeriodRefDataType;
            var opModelYear = model.getOccupancyWorksheetSettings().occupancyOpenPeriodRefDataYear;

            if (opModelType !== "") {
                msg = opModelYear + " " + opModelType;
            } else {
                msg = "Selected reference";
            }
            msg = msg + " data will be loaded into the open periods";

            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var columnNames = [];
            var startDt = new Date();
            startDt.setFullYear(modelDetails.budgetYear - 1, model.getOccupancyWorksheetSettings().startMonth - 1, 1);
            var endDt = new Date();
            endDt.setFullYear(modelDetails.budgetYear - 1, model.getOccupancyWorksheetSettings().startMonth - 1, 1);

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
            } else {
                if (currentDate < startDt) {
                    //All Open Periods
                    msg = msg + " starting " + monthNames[startDt.getMonth()] + " - " + modelDetails.budgetYear;
                    openPeriodNo = 1;
                } else if (currentDate > endDt) {
                    //All Closed Periods
                    openPeriodNo = -1;
                }
            }

            var refHeader = model.getOVObject(refDataRow, constantModel.rowConfig.referenceData.itemDescription);
            refHeader.yearType = (modelDetails.budgetYear - 1) + " Actual";
            refHeader.helpDesc = msg;
        };
        model.handleLabelChanges = function(data) {
            var unitsLabel = model.getUnitsCustomLabel();
            var employeeLabel = model.getEmployeeCustomeLabel();
            if (unitsLabel) {
                model.handleChangesForLabel(data, unitsLabel, "Units");
            }
            if (employeeLabel) {
                model.handleChangesForLabel(data, employeeLabel, "Employee");
            }
        };

        model.handleLabelChangeForNonrenewal = function(data) {
            //top.GetPSCurrent("LeaseRenewalOpened") ||
            if (model.getOccupancySettings().LeaseRenewalMethod == "None") {
                model.getObjectByKey(data, constantModel.rowConfig.moveoutsNonRenewal.itemDescription).rowType = "Move-outs from non-renewal";
            }
        };

        model.handleChangesForLabel = function(data, customLabel, replaceLabel) {
            angular.forEach(data, function(item) {
                item.itemDescription.replace(replaceLabel, customLabel);
            });
        };

        model.getEmployeeCustomeLabel = function() {
            var employeeLabel = modelDetails.employeeCustomLabel;
            return angular.isUndefined(employeeLabel) || employeeLabel === null ? "" : employeeLabel;
        };

        model.getUnitsCustomLabel = function() {
            var unitsLabel = modelDetails.unitCustomLabel;
            return angular.isUndefined(unitsLabel) || unitsLabel === null ? "" : unitsLabel;
        };

        model.getBudgetDetails = function() {
            modelDetails = budgetDetails.getModelDetails();
        };

        model.getEditOccupancyGoal = function() {
            return model.getOccupancySettings().editOccupancyGoal !== undefined ? model.getOccupancySettings().editOccupancyGoal : true;
        };

        model.handleOccupancyRadioButtons = function(form) {
            if (model.getEditOccupancyGoal()) {
                form.disableGoal = form.disableMoveIn = false;
                //  form.disableMoveIn = false;
                form.occupancyType = model.getOccupancySettings().occupancyInputType === "InputOccupancy" ? "goal" : "moveIns";
                // txtOCGAnnaulPercent.disabled = false;TODO
            } else {
                form.disableGoal = form.disableMoveIn = true;
                form.occupancyType = "moveIns";
                //txtOCGAnnaulPercent.disabled = true; TODO
            }
            form.commentCount = model.getOccupancySettings().commentCount;
            form.budgetYear = model.getOccupancySettings().budgetYear;
        };

        /**
         ** Handling occupancy goal value by setting up conditions
         ** REF: old code TODO --BindOccupancyGoalPercentage()
         */
        model.setOccupancyGoalPercentage = function(data) {
            var occupancyGoalTotal = 0;
            var noOfPeriods = modelDetails.noOfPeriods;
            for (var i = 1; i <= noOfPeriods; i++) {
                var periodOccupancyGoal = model.getValue(data, constantModel.rowConfig.occupancyGoal.itemDescription, i);
                occupancyGoalTotal += parseFloat(periodOccupancyGoal);
            }
            model.getOVObject(data, constantModel.rowConfig.occupancyGoal.itemDescription).goalPercentage = calculations.RoundNumber(occupancyGoalTotal / noOfPeriods, 2);
        };


        model.getValue = function(data, name, index) {
            var obj = model.getOVObject(data, name);
            return obj["period" + index];
        };

        model.getOVObject = function(data, name) {
            return $filter('filter')(data, { itemDescription: name }, true)[0];
        };



        model.updateConfigByCondition = function(grid, occupancyType) {
            grid.gridConfig.updateMoveInColumns(occupancyType === "moveIns");
            grid.gridConfig.updateoccupancyGoalColumns(occupancyType !== "moveIns");
        };

        model.handleMoveOutsFromNonRenewal = function(data, form) {
            var moveoutsNonRenewal;
            moveoutsNonRenewal = model.getObjectByKey(data, constantModel.rowConfig.moveoutsNonRenewal.itemDescription);
            if (model.getOccupancySettings().LeaseRenewalMethod === "None") {
                moveoutsNonRenewal.rowType = constantModel.rowTypeConfig.editable;
            } else {

                moveoutsNonRenewal.rowType = constantModel.rowTypeConfig.readonly;
            }
        };

        model.getObjectByKey = function(data, key) {
            return $filter('filter')(data, { itemDescription: key }, true)[0];
        };

        model.getOccupancySettings = function() {
            return worksheetData.getOccupancyWorksheetSettings();
        };
        model.getBudgetDetails = function() {
            modelDetails = worksheetData.getBudgetModelSettings();
        };

        model.getOccupancyWorksheetSettings = function() {
            return worksheetData.getOccupancyWorksheetSettings();
        };


        return model;

    }

    angular
        .module('budgeting')
        .factory('worksheetSettings', ['budgetDetails',
            '$filter',
            'worksheetData',
            'worksheetConstantModel',
            'worksheetCalculations', factory
        ]);
})(angular);