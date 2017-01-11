//  hourly grid config Model

(function(angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, osConstant) {
        return function(src, startYear, startMonth, noOfPeriods, occupancyType) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = osConstant.getConfigs(),
                columns = osConstant.getColumns(),
                groupColumns = osConstant.getGroupColumns(),
                rowTypes = osConstant.getRowTypeConfigs(),
                methods = osConstant.getMethodConfigs(),
                templates = osConstant.getTemplateConfigs(),
                filters = osConstant.getFilterConfigs(),
                moveInEditable, beginingOccupied,
                occupancyGoalEditable,
                totalMoveoutsEditable, netOccupancyChangeReadonly;




            var createPeriodKey = function(index) {
                return "period" + (index + 1);
            };
            model.init = function() {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    readonly = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.templateUrl = templates.serviceGroupName;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowAvg;
                        })),

                    editable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.readonlyColumnUrl;

                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.editableColumnUrl;
                            column.action = {
                                'change': model.getMethod(methods.onValueChange),
                                'blur': model.getMethod(methods.onBlur)

                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowAvg;
                        })),

                    groupHeader = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.classNames = "occupancy-worksheet-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.classNames = "occupancy-worksheet-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.classNames = "occupancy-worksheet-header";
                        }));

                occupancyGoalEditable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.occupancyGoalPercent;
                            column.action = {
                                'change': model.getMethod(methods.onOccupancyGoalChange),
                                'blur': model.getMethod(methods.onBlur)
                            };

                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.editableColumnUrl;
                            column.action = {
                                'change': model.getMethod(methods.onValueChange),
                                'blur': model.getMethod(methods.onBlur)

                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowAvg;
                        }));
                beginingOccupied = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.readonlyColumnUrl;



                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;

                            column.templateUrl = index === 0 ? templates.editableColumnUrl : templates.readonly;
                            column.action = {
                                'change': model.getMethod(methods.onValueChange),
                                'blur': model.getMethod(methods.onBlur)

                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowAvg;

                        }));
                moveInEditable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.readonlyColumnUrl;

                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.editableColumnUrl;
                            column.action = {
                                'change': model.getMethod(methods.onMoveInsValueChange),
                                'blur': model.getMethod(methods.onBlur)

                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        }));


                totalMoveoutsEditable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.editableColumnUrl;
                            column.action = {
                                'change': model.getMethod(methods.onValueChange),
                                'blur': model.getMethod(methods.onBlur)

                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        }));
                netOccupancyChangeReadonly = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.templateUrl = templates.serviceGroupName;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        }));

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.groupHeader, groupHeader)
                    .setRowConfig(rowTypes.occupancyGoal, occupancyGoalEditable)
                    .setRowConfig(rowTypes.beginingUnits, beginingOccupied)
                    .setRowConfig(rowTypes.moveIn, moveInEditable)
                    .setRowConfig(rowTypes.totalMoveouts, totalMoveoutsEditable)
                    .setRowConfig(rowTypes.netOccupancyChange, netOccupancyChangeReadonly)
                    .setRowConfig(rowTypes.readonly, readonly)
                    .setRowConfig(rowTypes.editable, editable);

                return model;
            };

            model.updateMoveInColumns = function(flg) {
                moveInEditable.forEach(function(column) {
                    if (column.key !== columns.title.key && column.key !== columns.total.key) {
                        column.templateUrl = flg ? templates.editableColumnUrl : templates.readonlyColumnUrl;
                    }
                });
            };

            model.updateoccupancyGoalColumns = function(flg) {
                occupancyGoalEditable.forEach(function(column) {
                    if (column.key !== columns.title.key && column.key !== columns.total.key) {
                        column.templateUrl = flg ? templates.editableColumnUrl : templates.readonlyColumnUrl;
                    }
                });
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("sgworksheetGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "sgworksheetConstantModel",
            factory
        ]);
})(angular);