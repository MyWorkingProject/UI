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
        model.methodConfig.onBlur = "selectRow";
        model.methodConfig.getRowAvg = 'getRowAvg';
        model.methodConfig.onMoveInsValueChange = 'onMoveInsValueChange';



        model.templateConfig.occupancyGoalPercent = "occupancy-renewals/occupancy-vacancy-service-group/templates/occupancy-goal-percentage.html";
        model.templateConfig.beginingUnits = "occupancy-renewals/occupancy-vacancy-worksheet/templates/occupancy-update-column.html";
        model.templateConfig.refDataHeader = "occupancy-renewals/occupancy-vacancy-worksheet/templates/reference-data-header.html";




        model.rowTypeConfig.occupancyGoal = "occupancyGoal";
        model.rowTypeConfig.moveIn = "moveIn";
        model.rowTypeConfig.beginingUnits = "beginingUnits";
        model.rowTypeConfig.groupHeader1 = 'groupHeader';
        model.rowTypeConfig.totalMoveouts = 'totalMoveoutsEditable';
        model.rowTypeConfig.netOccupancyChange = 'netOccupancyChange';


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

            totalMoveouts: {
                itemDescription: osConstant.totalMoveouts,
                rowType: model.rowTypeConfig.totalMoveouts,
                groupID: 8,
                level: 1,
                total: ''
            },
            netOccupancyChange: {
                itemDescription: osConstant.netOccupancyChange,
                rowType: model.rowTypeConfig.netOccupancyChange,
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
            }

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
            { name: osConstant.vacantUnits, value: 'VacantUnits' },
            { name: osConstant.vacany, value: 'Vacany' },
            { name: osConstant.occupancyTurnOverPercent, value: 'OccupancyTurnOverPercent' },
            { name: osConstant.occupancyNumberOfUnits, value: 'OccupancyNumberOfUnits' },
        ];
        return model;
    }

    angular
        .module("budgeting")
        .factory("serviceGroupConstantModel", [
            'bmGridConstantModel',
            'serviceGroupContentModel',
            factory
        ]);
})(angular);