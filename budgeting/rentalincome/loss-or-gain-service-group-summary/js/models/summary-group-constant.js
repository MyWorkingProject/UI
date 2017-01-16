//  Hourly Grid Constants Model

(function(angular) {
    "use strict";

    angular
        .module("budgeting")
        .factory("summaryConstantModel", [
            'bmGridConstantModel',
            'summaryContentModel',
            function(bmGridConstant, osConstant) {
                var model = angular.merge({}, bmGridConstant);


                model.methodConfig.onBlur = "selectRow";
                model.methodConfig.getRowAvg = 'getRowAvg';

                model.rowTypeConfig.groupHeader = "groupHeader";
                model.rowTypeConfig.totalRow = "totalRow";


                model.rowConfig = {
                    marketRent: {
                        itemDescription: osConstant.toalMarketRent,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 1,
                        level: 1
                    },
                    scheduleRent: {
                        itemDescription: osConstant.totalActualRent,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 2,
                        level: 1
                    },
                    lossOrGainLeaseDiff: {
                        itemDescription: osConstant.lossOrGainLeaseDiff,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 3,
                        level: 1
                    },
                    avgLossOrGain: {
                        itemDescription: osConstant.avgLossOrGain,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 4,
                        level: 1
                    },
                    avgMarketRent: {
                        itemDescription: osConstant.avgMarketRent,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 5,
                        level: 1
                    },

                    adjustmentsHeader: {
                        itemDescription: osConstant.adjustmentsHeader,
                        rowType: model.rowTypeConfig.groupHeader,
                        groupID: 1,
                        level: 2
                    },
                    moveins: {
                        itemDescription: osConstant.moveins,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 2,
                        level: 2
                    },
                    adjustmentFromMoveIn: {
                        itemDescription: osConstant.adjustmentFromMoveins,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 3,
                        level: 2
                    },
                    moveOuts: {
                        itemDescription: osConstant.moveOuts,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 4,
                        level: 2
                    },
                    adjustmentFromMoveOut: {
                        itemDescription: osConstant.adjustmentfromMoveOuts,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 5,
                        level: 2
                    },
                    totalAdjustments: {
                        itemDescription: osConstant.totalAdjustments,
                        rowType: model.rowTypeConfig.totalRow,
                        groupID: 1,
                        level: 3,
                        rowClass: "total"
                    },
                    capExIncreaseActualRent: {
                        itemDescription: osConstant.capExIncreaseActualRent,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 1,
                        level: 4

                    },
                    otherAdjustments: {
                        itemDescription: osConstant.otherAdjustments,
                        rowType: model.rowTypeConfig.readonly,
                        groupID: 2,
                        level: 4
                    },
                    totalLossOrGain: {
                        itemDescription: osConstant.totalLossOrGain,
                        rowType: model.rowTypeConfig.totalRow,
                        groupID: 3,
                        level: 4,
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
                return model;
            }
        ]);
})(angular);