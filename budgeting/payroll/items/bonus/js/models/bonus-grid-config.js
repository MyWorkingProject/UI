//  salary grid config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, bonusConstant) {
        return function (src, startYear, startMonth, noOfPeriods, joinDate, endDate) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = bonusConstant.getConfigs(),
                groupColumns = bonusConstant.getGroupColumns(),
                columns = bonusConstant.getColumns(),
                rowTypes = bonusConstant.getRowTypeConfigs(),
                methods = bonusConstant.getMethodConfigs(),
                templates = bonusConstant.getTemplateConfigs(),
                filters = bonusConstant.getFilterConfigs();

            model.init = function () {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    editable = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function (column, index) {
                            column.key = columns.title.key;
                            column.templateUrl = templates.bonusNameUrl;
                            column.action = {
                                'change': model.getMethod(methods.onBonusNameChange),
                                'onRemoveBonus': model.getMethod(methods.onRemoveBonus),
                                'onAddBonus': model.getMethod(methods.onAddBonus)
                            };
                            column.validationMethod = methods.validateBounsName;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function (column, index) {
                            var periodDate = model.getPeriodDate(index);
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.editableColumnUrl;
                            column.action = {
                                'change': model.getMethod(methods.onBonusChange),
                                'blur': model.getMethod(methods.onBonusBlur)
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
                            column.calculationMethod = methods.getTotalBonus;
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
                    .setRowConfig(rowTypes.editable, editable)
                    .setRowConfig(rowTypes.total, total);

                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("bonusGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "bonusConstantModel",
            factory]);
})(angular);
