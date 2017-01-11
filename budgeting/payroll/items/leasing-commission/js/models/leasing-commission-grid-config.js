// Payroll Leasing Commissions Grid Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, leasingCommGridFilters, leasingCommConstant) {
        return function (src, startYear, startMonth, noOfPeriods, joinDate, endDate) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = leasingCommConstant.getConfigs(),
                groupColumns = leasingCommConstant.getGroupColumns(),
                columns = leasingCommConstant.getColumns(),
                rowTypes = leasingCommConstant.getRowTypeConfigs(),
                methods = leasingCommConstant.getMethodConfigs(),
                templates = leasingCommConstant.getTemplateConfigs(),
                filters = leasingCommConstant.getFilterConfigs();

            model.init = function () {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    readonly,
                    editable,
                    percentEditable,
                    additionalEditable,
                    commissionTotal,
                    total;

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
                            column.calculationMethod = methods.getRowTotal;
                        }));

                editable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundDecimalsTo10;
                            column.templateUrl = templates.editableColumnUrl;
                            column.action = {
                                "change": model.getMethod(methods.onMonthlyChange),
                                "blur": model.getMethod(methods.onMonthlyBlur)
                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }));

                percentEditable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.formatPercent;
                            column.templateUrl = templates.editableColumnUrl;
                            column.action = {
                                "change": model.getMethod(methods.onMonthlyChange),
                                "blur": model.getMethod(methods.onMonthlyBlur)
                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.readonlyColumnUrl;
                        }));

                additionalEditable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundDecimalsTo10;
                            column.templateUrl = templates.editableColumnUrl;
                            column.action = {
                                "change": model.getMethod(methods.onMonthlyChange),
                                "blur": model.getMethod(methods.onMonthlyBlur)
                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundDecimalsTo10;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getCommissionTotal;
                        }));

                commissionTotal = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundDecimalsTo10;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getCommissionTotal;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundDecimalsTo10;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        }));

                total = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundDecimalsTo10;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getTotalByGroup;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundDecimalsTo10;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        }));

                gridColumns.forEach(function (column, index) {
                    if (column.isDataColumn) {
                        var periodDate = model.getPeriodDate(column.period - 1);
                        column.isEditable = ((!endDate || periodDate <= endDate) && periodDate >= joinDate);
                        if (!column.isEditable) {
                            editable[index].templateUrl = templates.readonlyColumnUrl;
                            percentEditable[index].templateUrl = templates.readonlyColumnUrl;
                            additionalEditable[index].templateUrl = templates.readonlyColumnUrl;
                        }
                    }
                });

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.readonly, readonly)
                    .setRowConfig(rowTypes.editable, editable)
                    .setRowConfig(rowTypes.percentEditable, percentEditable)
                    .setRowConfig(rowTypes.commissionTotal, commissionTotal)
                    .setRowConfig(rowTypes.additionalEditable, additionalEditable)
                    .setRowConfig(rowTypes.total, total);

                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("leasingCommGridConfigModel", [
            "bmGridConfigModel",
            "leasingCommGridFiltersModel",
            "leasingCommConstantModel",
            factory]);
})(angular);
