//  salary grid config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, benefitsConstant) {
        return function (src, startYear, startMonth, noOfPeriods, joinDate, endDate) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = benefitsConstant.getConfigs(),
                groupColumns = benefitsConstant.getGroupColumns(),
                columns = benefitsConstant.getColumns(),
                rowTypes = benefitsConstant.getRowTypeConfigs(),
                methods = benefitsConstant.getMethodConfigs(),
                templates = benefitsConstant.getTemplateConfigs(),
                filters = benefitsConstant.getFilterConfigs();

            model.init = function () {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    editable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                            column.getBenefitsOption = model.getMethod(methods.getBenefitsOptions);
                            column.templateUrl = templates.itemDescriptionUrl;
                            column.action = {
                                deleteBenefitsItem: model.getMethod(methods.deleteBenefitsItem),
                                addBenefitsItem: model.getMethod(methods.addBenefitsItem),
                                onBenefitChange: model.getMethod(methods.onBenefitChange)
                            };
                            column.validationMethod = methods.validateBenefit;
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
        .factory("benefitsGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "benefitsConstantModel",
            factory]);
})(angular);
