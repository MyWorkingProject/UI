//  hourly grid config Model

(function(angular) {
    "use strict";
    angular
        .module("budgeting")
        .factory("summaryGridConfigModel", [
            "bmGridConfigModel",
            "bmGridFilters",
            "summaryConstantModel",
            function(gridConfig, bmGridFilters, osConstant) {
                return function(src, startYear, startMonth, noOfPeriods, occupancyType) {
                    var model = gridConfig(src, startYear, startMonth, noOfPeriods),
                        configs = osConstant.getConfigs(),
                        columns = osConstant.getColumns(),
                        groupColumns = osConstant.getGroupColumns(),
                        rowTypes = osConstant.getRowTypeConfigs(),
                        methods = osConstant.getMethodConfigs(),
                        templates = osConstant.getTemplateConfigs(),
                        filters = osConstant.getFilterConfigs();

                    var createPeriodKey = function(index) {
                        return "period" + (index + 1);
                    };
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
                                    column.calculationMethod = methods.getRowAvg;
                                })),
                            totalRow = []
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
                                    column.classNames = "adjustment-header";
                                }))
                            .concat(
                                model.generateColumns(configs.customRow, noOfPeriods, function(column, index) {
                                    column.key = model.getPeriodKey(columns.period, index);
                                    column.classNames = "adjustment-header";
                                }))
                            .concat(
                                model.generateColumns(configs.customRow, 1, function(column, index) {
                                    column.key = columns.total.key;
                                    column.classNames = "adjustment-header";
                                    column.calculationMethod = methods.getRowTotal;
                                }));

                        model
                            .setColumns(gridColumns)
                            .setHeaders([gridHeaders])
                            .setColHeaderGroups([gridHeaderGroups])
                            .setRowConfig(rowTypes.groupHeader, groupHeader)
                            .setRowConfig(rowTypes.readonly, readonly)
                            .setRowConfig(rowTypes.totalRow, totalRow);

                        return model;
                    };


                    return model.init();
                };
            }
        ]);
})(angular);