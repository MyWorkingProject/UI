//  Hourly Grid Constants Model

(function(angular) {
    "use strict";

    function factory(
        bmGridConstant,
        osConstant) {
        var model = angular.merge({}, bmGridConstant);
        model.templateConfig.refDataHeader = "occupancy-renewals/base/templates/reference-data-headers.html";
        model.rowTypeConfig.referenceData = "referenceData";
        model.rowTypeConfig.refDataHeader = "refDataHeader";
        model.rowTypeConfig.readonlySum = "readonlySum";
        model.methodConfig.getRowAvg = 'getRowAvg';
        model.rowConfig = {
            occupancyNumberOfUnits: {
                itemDescription: osConstant.occupancyNumberOfUnits, //AVG
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
                itemDescription: osConstant.beginingOccupiedUnits, //AVG
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 1,
                total: ''
            },
            occupancyGoal: {
                itemDescription: osConstant.occupancyGoal, //AVG
                rowType: model.rowTypeConfig.readonly,
                groupID: 4,
                level: 1,
                total: ''
            },
            moveins: {
                itemDescription: osConstant.moveins, //sum
                rowType: model.rowTypeConfig.readonlySum,
                groupID: 5,
                level: 1,
                total: ''
            },
            totalMoveouts: {
                itemDescription: osConstant.totalMoveouts, //sum
                rowType: model.rowTypeConfig.readonlySum,
                groupID: 6,
                level: 1,
                total: ''
            },
            netOccupancyChange: {
                itemDescription: osConstant.netOccupancyChange, //sum
                rowType: model.rowTypeConfig.readonlySum,
                groupID: 7,
                level: 1,
                rowClass: "total"
            },
            endingOccupiedUnits: {
                itemDescription: osConstant.endingOccupiedUnits, //AVG
                rowType: model.rowTypeConfig.readonly,
                groupID: 8,
                level: 1,
                rowClass: "total"
            },
            occupancy: {
                itemDescription: osConstant.occupancy, //AVG
                rowType: model.rowTypeConfig.readonly,
                groupID: 9,
                level: 1,
                rowClass: "total"
            },
            turnOverPercentage: {
                itemDescription: osConstant.hdrTurnOverPercentage, //AVG
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 1,
                level: 2
            },
            occupancyTurnOverPercent: {
                itemDescription: osConstant.occupancyTurnOverPercent, //AVG
                rowType: model.rowTypeConfig.readonly,
                groupID: 2,
                level: 2,
                total: ''
            },
            previousTurnOverPercent: {
                itemDescription: osConstant.previousTurnOverPercent, //AVG
                rowType: model.rowTypeConfig.readonly,
                groupID: 3,
                level: 2

            },
            vacantUnits: {
                itemDescription: osConstant.vacantUnits, //AVG
                rowType: model.rowTypeConfig.readonly,
                groupID: 4,
                level: 2,
                rowClass: "total"
            },
            vacany: {
                itemDescription: osConstant.vacany, //AVG
                rowType: model.rowTypeConfig.readonly,
                groupID: 5,
                level: 2,
                rowClass: "total"
            },
            referenceData: {
                itemDescription: osConstant.hdrReferenceData,
                rowType: model.rowTypeConfig.refDataHeader,
                groupID: 1,
                level: 5
            },
            refMoveIns: {
                itemDescription: osConstant.refMoveIns, //AVG
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5

            },
            refMoveOuts: {
                itemDescription: osConstant.refMoveOuts, //AVG
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5

            },
            refTurnoverPercent: {
                itemDescription: osConstant.refTurnoverPercent, //AVG
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },

            refVacancyPercent: {
                itemDescription: osConstant.refVacancyPercent, //AVG
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
            },
            refOccupancyPercent: {
                itemDescription: osConstant.refOccupancyPercent, //AVG
                rowType: model.rowTypeConfig.referenceData,
                groupID: 2,
                level: 5
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