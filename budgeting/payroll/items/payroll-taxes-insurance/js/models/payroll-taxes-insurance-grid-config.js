//  Constant grid config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, taxesInsuranceConstant) {
        return function (src, startYear, startMonth, noOfPeriods, joinDate, endDate) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = taxesInsuranceConstant.getConfigs(),
                groupColumns = taxesInsuranceConstant.getGroupColumns(),
                columns = taxesInsuranceConstant.getColumns(),
                rowTypes = taxesInsuranceConstant.getRowTypeConfigs(),
                methods = taxesInsuranceConstant.getMethodConfigs(),
                templates = taxesInsuranceConstant.getTemplateConfigs(),
                filters = taxesInsuranceConstant.getFilterConfigs();



            model.init = function () {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    editable = []
                        .concat(
                            model.generateColumns(configs.customRow, 1, function (column, index) {
                                column.key = columns.title.key;                            
                                column.templateUrl = templates.payrollTaxInsuranceType;
                                column.action = {
                                    "add": model.getMethod(methods.onAddPayrollTaxInsurance),
                                    "delete": model.getMethod(methods.onRemovePayrollTaxInsurance)
                                };
                                column.getNonExemptedItems = model.getMethod(methods.getNonExemptedItems);
                            }))
                        .concat(
                            model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                                var periodDate = model.getPeriodDate(index);
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
                                column.calculationMethod = methods.getTotalByGroup;
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
                    }
                });

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                     .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.editable, editable)
                    .setRowConfig(rowTypes.total, total);

                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("taxInsuranceGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "taxInsuranceConstantModel",
            factory]);
})(angular);
