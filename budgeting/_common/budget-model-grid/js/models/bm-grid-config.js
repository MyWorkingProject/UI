//  budget model grid config Model

(function(angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        return function(src, startYear, startMonth, noOfPeriods) {
            var model = gridConfig().setSrc(src),
                translate = langTranslate('common.budget-model-grid').translate,
                dateLocale,
                periods,
                periodGroups;

            model.init = function() {
                dateLocale = {
                    month_names: translate("full_month_names"),
                    month_names_short: translate("short_month_names")
                };
                periods = model.getPeriodsInDuration(startYear, startMonth, noOfPeriods);
                periodGroups = model.getGroupsByPeriod();
                return model;
            };

            model.buildGroupHeaders = function(groupHeaderConfig, columns) {
                var groupHeader = []
                    .concat(model.generateColumns(groupHeaderConfig, 1, function(column, index) {
                        column.key = columns.title.key;
                        column.text = columns.title.text;
                        column.colspan = 1;
                        column.state = {
                            active: columns.title.state.active,
                            locked: columns.title.state.locked
                        };
                    }))
                    .concat(model.generateColumns(groupHeaderConfig, model.getNoOfGroups(), function(column, index) {
                        column.key = model.getPeriodGroupKey(columns.period, index);
                        column.text = model.getGroupPeriodYear(index);
                        column.colspan = model.getGroupPeriodColSpan(index);
                        column.state = {
                            active: columns.period.state.active,
                            locked: columns.period.state.locked
                        };
                    }))
                    .concat(model.generateColumns(groupHeaderConfig, 1, function(column, index) {
                        column.key = columns.total.key;
                        column.text = columns.total.text;
                        column.state = {
                            active: columns.total.state.active,
                            locked: columns.total.state.locked
                        };
                        column.colspan = 1;
                    }));
                return groupHeader;
            };

            model.buildHeaders = function(headerConfig, columns) {
                return []
                    .concat(
                        model.generateColumns(headerConfig, 1, function(column, index) {
                            column.key = columns.title.key;
                            column.text = columns.title.text;
                        }))
                    .concat(
                        model.generateColumns(headerConfig, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.text = model.getPeriodLabel(index);
                        }))
                    .concat(
                        model.generateColumns(headerConfig, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.text = columns.total.text;
                        }));
            };

            model.buildColumns = function(columnConfig, columns) {
                return []
                    .concat(
                        model.generateColumns(columnConfig, 1, function(column, index) {
                            column.width = columns.title.width;
                            column.key = columns.title.key;
                            column.state = {
                                active: columns.title.state.active,
                                locked: columns.title.state.locked
                            };
                            column.classNames = "toggle-text";
                            column.isDataColumn = columns.title.isDataColumn;
                        }))
                    .concat(
                        model.generateColumns(columnConfig, noOfPeriods, function(column, index) {
                            column.key = model.getPeriodKey(columns.period, index);
                            column.width = columns.period.width;
                            column.label = model.getPeriodLabel(index);
                            column.month = model.getPeriodMonth(index);
                            column.period = index + 1;
                            column.year = model.getPeriodYear(index);
                            column.dateStr = model.getPeriodDateString(index);
                            column.isEditable = false;
                            column.state = {
                                active: columns.period.state.active,
                                locked: columns.period.state.locked
                            };
                        }))
                    .concat(
                        model.generateColumns(columnConfig, 1, function(column, index) {
                            column.key = columns.total.key;
                            column.width = columns.total.width;
                            column.label = columns.total.text;
                            column.isDataColumn = columns.total.isDataColumn;
                            column.state = {
                                active: columns.total.state.active,
                                locked: columns.total.state.locked
                            };
                        }));

            };

            model.forEachColumn = function(fn, args) {
                model.getColumns().getData().forEach(function(column, index, columns) {
                    var _args = [];
                    if (args) {
                        _args = _args.concat(args);
                    }
                    _args = _args.concat([column, index, columns]);
                    fn.apply(this, _args);
                });

                return model;
            };

            model.getPeriodKey = function(config, index) {
                return config.key + (index + 1);
            };

            model.getNoOfGroups = function() {
                return periodGroups.length;
            };

            model.getPeriodGroupKey = function(config, index) {
                var group = periodGroups[index];
                return config.key + group.year + group.colSpan;
            };

            model.getPeriodLabel = function(index) {
                return periods[index].short_month;
            };

            model.getPeriodMonth = function(index) {
                return periods[index].month;
            };

            model.getPeriodYear = function(index) {
                return periods[index].year;
            };

            model.getGroupsByPeriod = function() {
                var groupPeriods = [];
                var colSpan = 0;
                for (var i = 0; i < periods.length; i++) {
                    colSpan++;
                    if (periods[i + 1] === undefined || periods[i].year !== periods[i + 1].year) {
                        groupPeriods.push({
                            year: periods[i].year,
                            colSpan: colSpan
                        });
                        colSpan = 0;
                    }
                }
                return groupPeriods;
            };

            model.getGroupPeriodYear = function(index) {
                return periodGroups[index].year;
            };

            model.getGroupPeriodColSpan = function(index) {
                return periodGroups[index].colSpan;
            };

            model.getPeriodDate = function(index) {
                return periods[index].date;
            };

            model.getPeriodDateString = function(index) {
                var month = periods[index].month + 1;
                month = (month < 9 ? "0" + month : month);
                return periods[index].year + "-" + month + "-01";
            };

            model.generateColumns = function(config, noOfColumns, customHandler) {
                var columns = [];
                for (var i = 0; i < noOfColumns; i++) {
                    var column = angular.copy(config);
                    if (angular.isFunction(customHandler)) {
                        customHandler(column, i);
                    }
                    columns.push(column);
                }
                return columns;
            };

            model.getPeriodsInDuration = function(year, month, noOfColumns) {
                var periods = [];
                for (var i = 0; i < noOfColumns; i++) {
                    var date = new Date(year, month + i, 1, 0, 0, 0, 0);
                    periods.push({
                        date: date,
                        year: date.getFullYear(),
                        month: date.getMonth(),
                        short_month: dateLocale.month_names_short[date.getMonth()]
                    });
                }
                return periods;
            };

            model.getDefaultRow = function(config, defaultValue, customValueHandler) {
                var row = {};
                model.getColumns().getData().forEach(function(column) {
                    row[column.key] = customValueHandler ? customValueHandler(column) : defaultValue;
                });
                return angular.extend(row, config);
            };

            model.destroy = function() {
                model = undefined;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("bmGridConfigModel", [
            'rpCgConfigModel',
            'appLangTranslate',
            factory
        ]);
})(angular);
