//  hourly grid config Model

(function(angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, osConstant, worksheetModel) {
        return function(src, startYear, startMonth, noOfPeriods, occupancyType) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = osConstant.getConfigs(),
                columns = osConstant.getColumns(),
                groupColumns = osConstant.getGroupColumns(),
                rowTypes = osConstant.getRowTypeConfigs(),
                methods = osConstant.getMethodConfigs(),
                templates = osConstant.getTemplateConfigs(),
                filters = osConstant.getFilterConfigs(),
                moveInEditable,
                occupancyGoalEditable,
                beginingOccupied,
                referenceData,
                refDataHeader;

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
                            //column.calculationMethod = methods.getRowTotal;
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
                            //column.calculationMethod = methods.getRowTotal;
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
                        })),
                    groupHeader1 = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.classNames = "occupancy-worksheet-header toggle-icon";
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
                        })),



                    total = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            // column.calculationMethod = methods.getTotal;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            //column.calculationMethod = methods.getRowTotal;
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
                            //column.calculationMethod = methods.getRowTotal;
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
                                'change': model.getMethod(methods.onValueChange),
                                'blur': model.getMethod(methods.onBlur)

                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }));

                beginingOccupied = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.beginingUnits;
                            column.action = {
                                'click': model.getMethod(methods.updateOccupiedUnits),
                                'onIconClick': model.getMethod(methods.helpTextForBeginingUnits)

                            };

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

                        }));

                refDataHeader = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.classNames = "occupancy-worksheet-header";
                            column.templateUrl = templates.refDataHeader;
                            column.action = {
                                'onRefIconClick': model.getMethod(methods.helpTextForRefData)

                            };
                            column.data = {
                                'refBudgetYear': 2015,
                                'refMonth': 'Nov'
                            };
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

                referenceData = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.readonly;
                            //column.action = {
                            //    'click': model.getMethod(methods.updateOccupiedUnits),
                            //    'onIconClick': model.getMethod(methods.helpTextForBeginingUnits)

                            //};

                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonly;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;

                        }));

                //gridColumns.forEach(function (column, index) {
                //    if (column.isDataColumn) {
                //        var periodDate = model.getPeriodDate(column.period - 1);
                //        column.isEditable = true;
                //        if (!column.isEditable) {
                //            editable[index].templateUrl = templates.readonlyColumnUrl;                           
                //        }
                //    }
                //});


                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.groupHeader1, groupHeader1)
                    .setRowConfig(rowTypes.groupHeader, groupHeader)
                    .setRowConfig(rowTypes.moveIn, moveInEditable)
                    .setRowConfig(rowTypes.occupancyGoal, occupancyGoalEditable)
                    .setRowConfig(rowTypes.beginingUnits, beginingOccupied)

                .setRowConfig(rowTypes.referenceData, referenceData)
                    .setRowConfig(rowTypes.refDataHeader, refDataHeader)



                .setRowConfig(rowTypes.readonly, readonly)
                    .setRowConfig(rowTypes.editable, editable)
                    .setRowConfig(rowTypes.total, total);

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
                    if (column.key === columns.title.key) {
                        column.templateUrl = templates.occupancyGoalPercent;
                    } else if (column.key !== columns.total.key) {
                        column.templateUrl = flg ? templates.editableColumnUrl : templates.readonlyColumnUrl;
                    }
                });
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("worksheetGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "worksheetConstantModel", 'worksheetModel',
            factory
        ]);
})(angular);