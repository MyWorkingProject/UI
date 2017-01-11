//  hourly grid config Model

(function(angular) {
    "use strict";

    function factory(gridConfig, bmGridFilters, osConstant, serviceGroupModel) {
        return function(src, startYear, startMonth, noOfPeriods) {
            var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                configs = osConstant.getConfigs(),
                columns = osConstant.getColumns(),
                groupColumns = osConstant.getGroupColumns(),
                rowTypes = osConstant.getRowTypeConfigs(),
                methods = osConstant.getMethodConfigs(),
                templates = osConstant.getTemplateConfigs(),
                filters = osConstant.getFilterConfigs(),
                referenceData, refDataHeader;

            model.init = function() {
                var gridHeaders = model.buildHeaders(configs.header, columns),
                    gridColumns = model.buildColumns(configs.column, columns),
                    gridHeaderGroups = model.buildGroupHeaders(configs.groupHeader, groupColumns),
                    readonly = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
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
                    readonlySum = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
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
                            column.calculationMethod = methods.getRowAvg;
                        })),

                    groupHeader = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.classNames = "hourly-duration-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.classNames = "hourly-duration-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.classNames = "hourly-duration-header";
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

                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;
                        }));
                refDataHeader = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.classNames = "occupancy-worksheet-header";
                            column.templateUrl = templates.refDataHeader;
                            column.data = {
                                'refBudgetYear': 2015,
                                'refMonth': 'Nov'
                            };
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.classNames = "occupancy-worksheet-header";
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.classNames = "occupancy-worksheet-header";
                        }));

                referenceData = []
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.filter = filters.noFormat;
                            column.templateUrl = templates.readonly;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonly;
                        }))
                    .concat(
                        model.generateColumns(configs.customRow, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.filter = filters.roundNumber;
                            column.templateUrl = templates.readonlyColumnUrl;
                            column.calculationMethod = methods.getRowTotal;

                        }));

                model
                    .setColumns(gridColumns)
                    .setHeaders([gridHeaders])
                    .setColHeaderGroups([gridHeaderGroups])
                    .setRowConfig(rowTypes.groupHeader, groupHeader)
                    .setRowConfig(rowTypes.readonly, readonly)
                    .setRowConfig(rowTypes.readonlySum, readonlySum)
                    .setRowConfig(rowTypes.total, total)
                    .setRowConfig(rowTypes.referenceData, referenceData)
                    .setRowConfig(rowTypes.refDataHeader, refDataHeader);

                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("serviceGroupGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "serviceGroupConstantModel",
            'serviceGroupModel',
            factory
        ]);
})(angular);