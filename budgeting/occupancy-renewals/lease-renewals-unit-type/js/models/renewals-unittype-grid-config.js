//  hourly grid config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, osConstant) {
        return function (src, startYear, startMonth, noOfPeriods, occupancyType) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = osConstant.getConfigs(),
                groupColumns = osConstant.getGroupColumns(),
                columns = osConstant.getColumns(),
                rowTypes = osConstant.getRowTypeConfigs(),
                methods = osConstant.getMethodConfigs(),
                templates = osConstant.getTemplateConfigs(),
                filters = osConstant.getFilterConfigs(),
                budgetedMoveinsExpiring,
                renewalPercentageEditable,
                renewalUnitsEditable,
                leaseExpiredPreMonth,
                refDataHeader;


            model.init = function () {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    readonly = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                        })),
                    editable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.occupancyEditable;
                            column.action = {
                                'change': model.getMethod(methods.onValueChange),
                                'blur': model.getMethod(methods.onBlur)
                            };
                        })),

                    groupHeader = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                            column.classNames = "occupancy-worksheet-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.classNames = "occupancy-worksheet-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.classNames = "occupancy-worksheet-header";
                        })),

                    refDataHeader = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                            column.classNames = "occupancy-worksheet-header";
                            column.templateUrl = templates.refDataHeader;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.classNames = "occupancy-worksheet-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.classNames = "occupancy-worksheet-header";
                        })),

                    total = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }));

                budgetedMoveinsExpiring = []
                 .concat(
                       model.generateColumns(configs.customRow, 1, function (column, index) {
                           column.key = columns.title.key;
                           column.filter = filters.noFormat;
                           column.templateUrl = templates.budgetedMvExpiringNavigation;
                           column.action = {
                               'click': model.getMethod(methods.navigateToOccupancyWorksheet)
                           };
                       }));

                renewalPercentageEditable = []
                   .concat(
                       model.generateColumns(configs.customRow, 1, function (column, index) {
                           column.key = columns.title.key;
                           column.filter = filters.noFormat;
                           column.templateUrl = templates.readonlyColumnUrl;
                       }))
                   .concat(
                       model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                           column.key = model.getPeriodKey(columns.period, index);
                           column.filter = filters.roundNumber;
                           column.templateUrl = templates.occupancyEditable;
                           column.action = {
                               'change': model.getMethod(methods.onValueChange),
                               'blur': model.getMethod(methods.onBlur)
                           };
                       }))
                   .concat(
                       model.generateColumns(configs.customRow, 1, function (column, index) {
                           column.key = columns.total.key;
                           column.filter = filters.roundNumber;
                           column.templateUrl = templates.readonlyColumnUrl;
                       }));

                renewalUnitsEditable = []
                   .concat(
                       model.generateColumns(configs.customRow, 1, function (column, index) {
                           column.key = columns.title.key;
                           column.filter = filters.noFormat;
                           column.templateUrl = templates.readonlyColumnUrl;

                       }))
                   .concat(
                       model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                           column.key = model.getPeriodKey(columns.period, index);
                           column.filter = filters.roundNumber;
                           column.templateUrl = templates.occupancyEditable;
                           column.action = {
                               'change': model.getMethod(methods.onValueChange),
                               'blur': model.getMethod(methods.onBlur)
                           };
                       }))
                   .concat(
                       model.generateColumns(configs.customRow, 1, function (column, index) {
                           column.key = columns.total.key;
                           column.filter = filters.roundNumber;
                           column.templateUrl = templates.readonlyColumnUrl;
                       }));

                leaseExpiredPreMonth = []
                    .concat(
                       model.generateColumns(configs.customRow, 1, function (column, index) {
                           column.key = columns.title.key;
                           column.filter = filters.noFormat;
                           column.templateUrl = templates.readonlyColumnUrl;

                       }))
                    .concat(
                       model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                           column.key = model.getPeriodKey(columns.period, index);
                           column.filter = filters.roundNumber;
                           column.templateUrl = index === 0 ? templates.occupancyEditable : templates.readonly;
                           column.action = {
                               'change': model.getMethod(methods.onValueChange),
                               'blur': model.getMethod(methods.onBlur)
                           };
                       }))
                    .concat(
                       model.generateColumns(configs.customRow, 1, function (column, index) {
                           column.key = columns.total.key;
                           column.filter = filters.roundNumber;
                           column.templateUrl = templates.readonlyColumnUrl;
                       }));

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.groupHeader, groupHeader)
                    .setRowConfig(rowTypes.bdgtdMvinNavigation, budgetedMoveinsExpiring)
                    .setRowConfig(rowTypes.leaseRPType, renewalPercentageEditable)
                    .setRowConfig(rowTypes.leaseRP, renewalUnitsEditable)
                    .setRowConfig(rowTypes.leaseExpPreMonth, leaseExpiredPreMonth)
                    .setRowConfig(rowTypes.refDataHeader, refDataHeader)
                    .setRowConfig(rowTypes.readonly, readonly)
                    .setRowConfig(rowTypes.editable, editable)
                    .setRowConfig(rowTypes.total, total);

                return model;
            };

            model.updatePercentageColumns = function (flg) {
                renewalPercentageEditable.forEach(function (column) {
                    if (column.key !== columns.title.key && column.key !== columns.total.key) {
                        column.templateUrl = flg ? templates.occupancyEditable : templates.readonlyColumnUrl;
                    }
                });
            };

            model.updateUnitColumns = function (flg) {
                renewalUnitsEditable.forEach(function (column) {
                    if (column.key !== columns.title.key && column.key !== columns.total.key) {
                        column.templateUrl = flg ? templates.occupancyEditable : templates.readonlyColumnUrl;
                    }
                });
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("renewalsUnitTypeGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "renewalsUnitTypeConstantModel",
             factory]);
})(angular);
