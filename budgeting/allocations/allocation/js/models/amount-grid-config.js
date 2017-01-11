//  salary grid config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, salaryConstant) {
        return function (src, startYear, startMonth, noOfPeriods) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = salaryConstant.getConfigs(),
                groupColumns = salaryConstant.getGroupColumns(),
                columns = salaryConstant.getColumns(),
                rowTypes = salaryConstant.getRowTypeConfigs(),
                methods = salaryConstant.getMethodConfigs(),
                templates = salaryConstant.getTemplateConfigs(),
                filters = salaryConstant.getFilterConfigs();

            model.init = function () {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                     gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    gridColumns = model.buildColumns(configs.column, columns),
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
                        }));



                gridColumns.forEach(function (column, index) {
                    if (column.isDataColumn) {
                        column.isEditable = true;
                    }
                });

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.editable, editable);

                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("amountGridConfig", [
            "bmGridConfigModel",
            "bmGridFilters",
            "amountConstantModel",
            factory]);
})(angular);
