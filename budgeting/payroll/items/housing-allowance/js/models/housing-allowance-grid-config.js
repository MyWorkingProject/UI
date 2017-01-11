//  ha grid config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, haConstant) {
        return function (src, startYear, startMonth, noOfPeriods, joinDate, endDate) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = haConstant.getConfigs(),
                groupColumns = haConstant.getGroupColumns(),
                columns = haConstant.getColumns(),
                rowTypes = haConstant.getRowTypeConfigs(),
                methods = haConstant.getMethodConfigs(),
                templates = haConstant.getTemplateConfigs(),
                filters = haConstant.getFilterConfigs();

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
                            column.calculationMethod = methods.getRowTotal;
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
                            column.templateUrl = templates.editableColumnUrl;
                            column.action = {
                                'change': model.getMethod(methods.onMonthlyChange),
                                'blur': model.getMethod(methods.onMonthlyBlur)
                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
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
                            column.calculationMethod = methods.getTotalMonthlyHA;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        }));

                gridColumns.forEach(function (column, index) {
                    if (column.isDataColumn) {
                        var periodDate = model.getPeriodDate(column.period - 1);
                        column.isEditable = ((!endDate || periodDate <= endDate) && periodDate >= joinDate);
                        if (!column.isEditable) {
                            editable[index].templateUrl = templates.readonlyColumnUrl;
                        }
                    }
                });

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.readonly, readonly)
                    .setRowConfig(rowTypes.editable, editable)
                    .setRowConfig(rowTypes.total, total);

                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("haGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "haConstantModel",
            factory]);
})(angular);
