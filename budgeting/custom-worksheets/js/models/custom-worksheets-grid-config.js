//  custom worksheet grid config Model

(function(angular) {
    "use strict";

    function factory(gridConfig, customWorkSheetsGridFilters, customWorksheetsConstant) {
        return function(src, startYear, startMonth, noOfPeriods) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = customWorksheetsConstant.getConfigs(),
                groupColumns = customWorksheetsConstant.getGroupColumns(),
                columns = customWorksheetsConstant.getColumns(),
                rowTypes = customWorksheetsConstant.getRowTypeConfigs(),
                methods = customWorksheetsConstant.getMethodConfigs(),
                templates = customWorksheetsConstant.getTemplateConfigs(),
                filters = customWorksheetsConstant.getFilterConfigs();

            model.init = function() {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    readonly = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.action = {
                                click: model.getMethod(methods.onClick)
                            };
                            column.templateUrl = templates.itemDescriptionColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title1.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            //column.filter = filters.roundNumber;
                            //column.templateUrl = templates.readonlyColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            //column.filter = filters.roundNumber;
                            //column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        })),


                    groupHeader = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.classNames = "account-type-header toggle-icon";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title1.key;
                            column.classNames = "account-type-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.classNames = "account-type-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.classNames = "account-type-header";
                        }));

                // gridColumns.forEach(function (column, index) {
                //     if (column.isDataColumn) {
                //         var periodDate = model.getPeriodDate(column.period - 1);
                //         column.isEditable = ((!endDate || periodDate <= endDate) && periodDate >= joinDate);
                //         if (!column.isEditable) {
                //             editable[index].templateUrl = templates.readonlyColumnUrl;
                //             monthlyPayTotal[index].templateUrl = templates.readonlyColumnUrl;
                //         }
                //     }
                // });

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.groupHeader, groupHeader)
                    .setRowConfig(rowTypes.readonly, readonly);

                return model;
            };


            model.buildGroupHeaders = function(groupHeaderConfig, columns) {
                var groupHeader = []
                    .concat(model.generateColumns(groupHeaderConfig, 1, function(column, index) {
                        column.key = columns.title.key;
                        column.text = columns.title.text;
                        column.colspan = 1;
                        column.state = {
                            active: columns.title.state.active,
                            locked: columns.title.state.locked
                        };
                    }))
                    .concat(model.generateColumns(groupHeaderConfig, 1, function(column, index) {
                        column.key = columns.title1.key;
                        column.text = columns.title1.text;
                        column.colspan = 1;
                        column.state = {
                            active: columns.title1.state.active,
                            locked: columns.title1.state.locked
                        };
                    }))
                    .concat(model.generateColumns(groupHeaderConfig, model.getNoOfGroups(), function(column, index) {
                        column.key = model.getPeriodGroupKey(columns.period, index);
                        column.text = model.getGroupPeriodYear(index);
                        column.colspan = model.getGroupPeriodColSpan(index);
                        column.state = {
                            active: columns.period.state.active,
                            locked: columns.period.state.locked
                        };
                    }))
                    .concat(model.generateColumns(groupHeaderConfig, 1, function(column, index) {
                        column.key = columns.total.key;
                        column.text = columns.total.text;
                        column.state = {
                            active: columns.total.state.active,
                            locked: columns.total.state.locked
                        };
                        column.colspan = 1;
                    }));
                return groupHeader;
            };

            model.buildHeaders = function(headerConfig, columns) {
                return []
                    .concat(
                        model.generateColumns(headerConfig, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.text = columns.title.text;
                        }))
                    .concat(
                        model.generateColumns(headerConfig, 1, function(column, index) {
                            column.key = columns.title1.key;
                            column.text = columns.title1.text;
                        }))
                    .concat(
                        model.generateColumns(headerConfig, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.text = model.getPeriodLabel(index);
                        }))
                    .concat(
                        model.generateColumns(headerConfig, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.text = columns.total.text;
                        }));
            };

            model.buildColumns = function(columnConfig, columns) {
                return []
                    .concat(
                        model.generateColumns(columnConfig, 1, function(column, index) {
                            column.width = columns.title.width;
                            column.key = columns.title.key;
                            column.state = {
                                active: columns.title.state.active,
                                locked: columns.title.state.locked
                            };
                            column.classNames = "toggle-text";
                            column.isDataColumn = columns.title.isDataColumn;
                        }))
                    .concat(
                        model.generateColumns(columnConfig, 1, function(column, index) {
                            column.width = columns.title1.width;
                            column.key = columns.title1.key;
                            column.state = {
                                active: columns.title1.state.active,
                                locked: columns.title1.state.locked
                            };
                            column.classNames = "toggle-text";
                            column.isDataColumn = columns.title1.isDataColumn;
                        }))
                    .concat(
                        model.generateColumns(columnConfig, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.width = columns.period.width;
                            column.label = model.getPeriodLabel(index);
                            column.month = model.getPeriodMonth(index);
                            column.period = index + 1;
                            column.year = model.getPeriodYear(index);
                            column.dateStr = model.getPeriodDateString(index);
                            column.isEditable = false;
                            column.state = {
                                active: columns.period.state.active,
                                locked: columns.period.state.locked
                            };
                        }))
                    .concat(
                        model.generateColumns(columnConfig, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.width = columns.total.width;
                            column.label = columns.total.text;
                            column.isDataColumn = columns.total.isDataColumn;
                            column.state = {
                                active: columns.total.state.active,
                                locked: columns.total.state.locked
                            };
                        }));

            };


            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("customWorksheetsGridConfigModel", [
            "bmGridConfigModel",
            "customWorkSheetsGridFiltersModel",
            "customWorksheetsConstantModel",
            factory
        ]);
})(angular);
