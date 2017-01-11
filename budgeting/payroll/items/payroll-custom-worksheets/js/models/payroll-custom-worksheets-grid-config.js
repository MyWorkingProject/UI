//  custom worksheet grid config model

(function (angular) {
    "use strict";

    function factory(
        gridConfig,
        bmGridFilters,
        customWorksheetConstant) {
        return function (src, startYear, startMonth, noOfPeriods) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = customWorksheetConstant.getConfigs(),
                groupColumns = customWorksheetConstant.getGroupColumns(),
                columns = customWorksheetConstant.getColumns(),
                methods = customWorksheetConstant.getMethodConfigs(),
                templates = customWorksheetConstant.getTemplateConfigs(),
                filters = customWorksheetConstant.getFilterConfigs();

            model.init = function () {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    readonly = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                            column.templateUrl = templates.itemDescriptionUrl;
                            column.action = {
                                'navigateTo': model.getMethod(methods.navigateTo),
                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.filter = filters.roundNumber;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.filter = filters.roundNumber;
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
                            column.calculationMethod = methods.getTotal;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        }));

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(customWorksheetConstant.rowTypeConfig.readonly, readonly)
                    .setRowConfig(customWorksheetConstant.rowTypeConfig.total, total);

                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("payrollCustomWorksheetsGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "payrollCustomWorksheetsConstantModel",
            factory]);
})(angular);
