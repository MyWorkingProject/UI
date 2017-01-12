(function(angular) {
    'use strict';

    function factory(budgetDetails, $filter, worksheetData, constantModel, calculations) {
        var model = {},
            modelDetails, occupancyLeaseSettings;

        model.handleOccupancySettings = function(dataRow, form) {
            model.getBudgetDetails();
            model.handleLabelChanges(dataRow);
            model.handleLabelChangeForNonrenewal(dataRow);
            model.handleOccupancyRadioButtons(form);
            model.setOccupancyGoalPercentage(dataRow);
            return dataRow;
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
                form.occupancyType = model.getOccupancySettings().occupancyInputType;
                // txtOCGAnnaulPercent.disabled = false;TODO
            } else {
                form.disableGoal = form.disableMoveIn = true;
                form.occupancyType = "InputMoveIns";
                //txtOCGAnnaulPercent.disabled = true; TODO
            }
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
            grid.gridConfig.updateMoveInColumns(occupancyType === "InputMoveIns");
            grid.gridConfig.updateoccupancyGoalColumns(occupancyType !== "InputMoveIns");
        };



        model.getObjectByKey = function(data, key) {
            return $filter('filter')(data, { itemDescription: key }, true)[0];
        };

        model.getOccupancySettings = function() {
            return worksheetData.getOccupancyWorksheetSettings();
        };



        return model;

    }

    angular
        .module('budgeting')
        .factory('sgworksheetSettings', ['budgetDetails',
            '$filter',
            'sgworksheetData',
            'sgworksheetConstantModel',
            'sgworksheetCalculations', factory
        ]);
})(angular);