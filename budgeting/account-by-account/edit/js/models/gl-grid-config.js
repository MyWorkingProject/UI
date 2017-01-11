//  SampleCg Grid Config Model

(function(angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, glGridFilters, glEditConstant) {

        return function(src, startYear, startMonth, noOfPeriods,
            isActualThrough, actualThroughYear, actualThroughMonth) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = glEditConstant.getConfigs(),
                groupColumns = glEditConstant.getGroupColumns(),
                columns = glEditConstant.getColumns(),
                rowTypes = glEditConstant.getRowTypeConfigs(),
                methods = glEditConstant.getMethodConfigs(),
                templates = glEditConstant.getTemplateConfigs(),
                filters = glEditConstant.getFilterConfigs();

            model.init = function() {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    itemization = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.action = {
                                'add': model.getMethod(methods.addItemizationRow),
                                'delete': model.getMethod(methods.removeItemizationRow)
                            };
                            column.templateUrl = templates.itemizationTitleColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.action = {
                                'change': model.getMethod(methods.updateItemization),
                                'blur': model.getMethod(methods.selectRow)
                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        })),
                customItemization = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.action = {
                                'change': model.getMethod(methods.updateItemization)
                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        })),
                adjustment = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.action = {
                                'showAdjustment': model.getMethod(methods.showAdjustment)
                            };
                            column.templateUrl = templates.adjustmentTitleColumnUrl;
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
                            column.calculationMethod = methods.getRowTotal;
                        })),

                workSheet = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.action = {
                                'navigateTo': model.getMethod(methods.navigateTo)
                            };
                            column.templateUrl = templates.workSheetTitleUrl;
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
                            column.calculationMethod = methods.getRowTotal;
                        })),

                total = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getGLTotal;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        })),

                referenceDataHeader = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.classNames = "reference-data-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.classNames = "reference-data-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.classNames = "reference-data-header";
                        })),

                referenceDataSection = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.referenceTypeColumnUrl;
                            column.action = {
                                'showHistoryByPeriod': model.getMethod(methods.showHistoryByPeriod),
                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                        })),

                referenceDataDetails = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.calculationMethod = methods.getReferenceDiffPerType;
                            column.filter = filters.formatCalculatedReferenceData;
                            column.templateUrl = templates.referenceCalculatedColumnUrl;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.calculationMethod = methods.getReferenceDiffPerType;
                            column.validationMethod = methods.applyRuleBasedValidation;
                            column.filter = filters.formatCalculatedReferenceData;
                            column.templateUrl = templates.referenceCalculatedColumnUrl;
                        }));

                gridColumns.forEach(function(column, index) {
                    if (column.isDataColumn) {
                        column.isEditable = !(isActualThrough &&
                            (actualThroughYear > column.year ||
                                (actualThroughYear === column.year && actualThroughMonth >= column.month)));
                        if (column.isEditable) {
                            itemization[index].templateUrl = templates.editableColumnUrl;
                            customItemization[index].templateUrl = templates.editableColumnUrl;
                        }
                    }
                });

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.itemization, itemization)
                    .setRowConfig(rowTypes.customWorksheetItemized, customItemization)
                    .setRowConfig(rowTypes.adjustment, adjustment)
                    .setRowConfig(rowTypes.workSheet, workSheet)
                    .setRowConfig(rowTypes.glAccount, total)
                    .setRowConfig(rowTypes.glAccountGroup, total)
                    .setRowConfig(rowTypes.glAccountType, total)
                    .setRowConfig(rowTypes.groupHeader, referenceDataHeader)
                    .setRowConfig(rowTypes.referenceDataSection, referenceDataSection)
                    .setRowConfig(rowTypes.referenceDataDetail, referenceDataDetails);

                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("glGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "glGridFilters",
            "glEditConstantModel",
            factory
        ]);
})(angular);
