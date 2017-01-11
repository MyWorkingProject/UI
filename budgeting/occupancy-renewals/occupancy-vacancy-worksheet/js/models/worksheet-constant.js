//  Hourly Grid Constants Model

(function(angular) {
    "use strict";

    function factory(
        bmGridConstant,
        osConstant
    ) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.onGoalPercentageChange = "onGoalPercentageChange";
        model.methodConfig.onOccupancyGoalChange = "onOccupancyGoalChange";
        model.methodConfig.onValueChange = "onValueChange";
        model.methodConfig.updateOccupiedUnits = "updateOccupiedUnits";
        model.methodConfig.helpTextForBeginingUnits = "helpTextForBeginingUnits";
        model.methodConfig.helpTextForRefData = "onRefDataClick";
        model.methodConfig.onBlur = "selectRow";



        model.templateConfig.occupancyGoalPercent = "occupancy-renewals/occupancy-vacancy-worksheet/templates/occupancy-goal-percentage.html";
        model.templateConfig.beginingUnits = "occupancy-renewals/occupancy-vacancy-worksheet/templates/occupancy-update-column.html";
        model.templateConfig.refDataHeader = "occupancy-renewals/base/templates/reference-data-headers.html";




        model.rowTypeConfig.occupancyGoal = "occupancyGoal";
        model.rowTypeConfig.moveIn = "moveIn";
        model.rowTypeConfig.beginingUnits = "beginingUnits";
        model.rowTypeConfig.referenceData = "referenceData";
        model.rowTypeConfig.refDataHeader = "refDataHeader";
        model.rowTypeConfig.groupHeader1 = 'groupHeader';





        model.rowConfig = {
            occupancyNumberOfUnits: {
                itemDescription: osConstant.occupancyNumberOfUnits,
                rowType: model.rowTypeConfig.readonly,
                groupID: 1,
                level: 1
            },
            budgetChangesInOccupancy: {
                itemDescription: osConstant.hdrBudgetChangesInOccupancy,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 2,
                level: 1
            },
            beginingOccupiedUnits: {
                itemDescription: osConstant.beginingOccupiedUnits,
                rowType: model.rowTypeConfig.beginingUnits,
                groupID: 3,
                level: 1,
                total: ''
            },
            occupancyGoal: {
                itemDescription: osConstant.occupancyGoal,
                rowType: model.rowTypeConfig.occupancyGoal,
                groupID: 4,
                level: 1,
                total: ''
            },
            moveins: {
                itemDescription: osConstant.moveins,
                rowType: model.rowTypeConfig.moveIn,
                groupID: 5,
                level: 1,
                total: ''
            },
            moveoutsNonRenewal: {
                itemDescription: osConstant.moveoutsNonRenewal,
                rowType: model.rowTypeConfig.readonly,
                groupID: 6,
                level: 1,
                total: ''
            },
            moveoutsSkipEviction: {
                itemDescription: osConstant.moveoutsSkipEviction,
                rowType: model.rowTypeConfig.editable,
                groupID: 7,
                level: 1,
                total: ''
            },
            totalMoveouts: {
                itemDescription: osConstant.totalMoveouts,
                rowType: model.rowTypeConfig.readonly,
                groupID: 8,
                level: 1,
                total: ''
            },
            netOccupancyChange: {
                itemDescription: osConstant.netOccupancyChange,
                rowType: model.rowTypeConfig.readonly,
                groupID: 7,
                level: 1,
                rowClass: "total"
            },
            endingOccupiedUnits: {
                itemDescription: osConstant.endingOccupiedUnits,
                rowType: model.rowTypeConfig.readonly,
                groupID: 8,
                level: 1,
                rowClass: "total"
            },
            occupancy: {
                itemDescription: osConstant.occupancy,
                rowType: model.rowTypeConfig.readonly,
                groupID: 9,
                level: 1,
                rowClass: "total"
            },
            turnOverPercentage: {
                itemDescription: osConstant.hdrTurnOverPercentage,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 1,
                level: 2
            },
            occupancyTurnOverPercent: {
                itemDescription: osConstant.occupancyTurnOverPercent,
                rowType: model.rowTypeConfig.readonly,
                groupID: 2,
                level: 2,
                total: ''
            },
            previousTurnOverPercent: {
                itemDescription: osConstant.previousTurnOverPercent,
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 2

            },
            nonRevenueUnits: {
                itemDescription: osConstant.hdrNonRevenueUnits,
                rowType: model.rowTypeConfig.groupHeader1,
                groupID: 1,
                level: 3
            },

            modelUnits: {
                itemDescription: osConstant.modelUnits,
                rowType: model.rowTypeConfig.editable,
                groupID: 2,
                level: 3,
                total: ''
            },
            adminUnits: {
                itemDescription: osConstant.adminUnits,
                rowType: model.rowTypeConfig.editable,
                groupID: 2,
                level: 3,
                total: ''

            },
            employeeUnits: {
                itemDescription: osConstant.employeeUnits,
                rowType: model.rowTypeConfig.editable,
                groupID: 2,
                level: 3,
                total: ''
            },
            downUnits: {
                itemDescription: osConstant.downUnits,
                rowType: model.rowTypeConfig.editable,
                groupID: 2,
                level: 3,
                total: ''

            },

            totalNonRevenueUnits: {
                itemDescription: osConstant.totalNonRevenueUnits,
                rowType: model.rowTypeConfig.readonly,
                groupID: 6,
                level: 3,
                rowClass: "total"
            },

            vacantUnits: {
                itemDescription: osConstant.vacantUnits,
                rowType: model.rowTypeConfig.readonly,
                groupID: 7,
                level: 3,
                rowClass: "total"
            },
            vacany: {
                itemDescription: osConstant.vacany,
                rowType: model.rowTypeConfig.readonly,
                groupID: 8,
                level: 3,
                rowClass: "total"
            },

            //Ref Data
            referenceData: {
                itemDescription: osConstant.hdrReferenceData,
                rowType: model.rowTypeConfig.refDataHeader,
                groupID: 9,
                level: 5
            },
            //refSubText: {
            //    itemDescription: "2016 Actual",//osConstant.hdrReferenceData,
            //    rowType: model.rowTypeConfig.groupHeader,
            //    groupID: 1,
            //    level: 5
            //},
            refMoveIns: {
                itemDescription: osConstant.refMoveIns,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 9,
                level: 5

            },
            refMoveOuts: {
                itemDescription: osConstant.refMoveOuts,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 9,
                level: 5

            },
            refTurnoverPercent: {
                itemDescription: osConstant.refTurnoverPercent,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 9,
                level: 5
            },

            refVacancyPercent: {
                itemDescription: osConstant.refVacancyPercent,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 9,
                level: 5
            },
            refOccupancyPercent: {
                itemDescription: osConstant.refOccupancyPercent,
                rowType: model.rowTypeConfig.referenceData,
                groupID: 9,
                level: 5
            },

            //revForecastOccupancy

            revForecast: {
                itemDescription: osConstant.hdrRevForecast,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 101,
                level: 6
            },
            revForecastOccupancy: {
                itemDescription: osConstant.revForecastOccupancy,
                rowType: model.rowTypeConfig.readonly,
                groupID: 101,
                level: 6

            },
        };

        model.getRowConfigs = function() {
            return model.rowConfig;
        };


        model.getRowTypeConfigs = function() {
            return model.rowTypeConfig;
        };

        model.getMethodConfigs = function() {
            return model.methodConfig;
        };

        model.getTemplateConfigs = function() {
            return model.templateConfig;
        };

        model.Postformat = [
            { name: osConstant.beginingOccupiedUnits, value: 'BeginingOccupiedUnits' },
            { name: osConstant.occupancyGoal, value: 'OccupancyGoal' },
            { name: osConstant.moveins, value: 'Moveins' },
            { name: osConstant.moveoutsSkipEviction, value: 'MoveoutsSkipEviction' },
            { name: osConstant.endingOccupiedUnits, value: 'EndingOccupiedUnits' },
            { name: osConstant.occupancy, value: 'Occupancy' },
            { name: osConstant.modelUnits, value: 'ModelUnits' },
            { name: osConstant.adminUnits, value: 'AdminUnits' },
            { name: osConstant.employeeUnits, value: 'EmployeeUnits' },
            { name: osConstant.downUnits, value: 'DownUnits' },
            { name: osConstant.vacantUnits, value: 'VacantUnits' },
            { name: osConstant.vacany, value: 'Vacany' },
            { name: osConstant.occupancyTurnOverPercent, value: 'OccupancyTurnOverPercent' },
            { name: osConstant.occupancyNumberOfUnits, value: 'OccupancyNumberOfUnits' },
            { name: osConstant.moveoutsNonRenewal, value: 'MoveoutsNonRenewal' }
        ];


        return model;
    }

    angular
        .module("budgeting")
        .factory("worksheetConstantModel", [
            'bmGridConstantModel',
            'worksheetContentModel',
            factory
        ]);
})(angular);