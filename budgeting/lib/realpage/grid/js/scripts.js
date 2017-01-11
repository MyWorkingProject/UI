//  Source: _lib\realpage\grid\js\_bundle.inc
//  Source: _lib\realpage\grid\js\templates\templates.inc.js
angular.module('rpGrid').run(['$templateCache', function($templateCache) {
$templateCache.put("realpage/grid/templates/grid-datetimepicker-filter.html",
"<div class=\"rp-grid-datetimepicker-filter\"><rp-datetimepicker config=\"filter.config\" rp-model=\"filter.value\"></rp-datetimepicker></div>");
$templateCache.put("realpage/grid/templates/grid-filters.html",
"<div ng-class=\"model.state\" class=\"{{model.classNames || 'rp-grid-filters-1'}}\"><div class=\"rp-grid-row\"><div ng-switch=\"filter.config.type\" ng-repeat=\"filter in model.list\" class=\"rp-grid-cell {{::filter.key.decamelize()}}\"><select ng-switch-when=\"menu\" class=\"rp-form-select\" rp-wrapper-class=\"small\" name=\"filter{{::$index}}\" ng-change=\"filter.activate()\" rp-update-display-text=\"true\" ng-model=\"filter.config.value\" rp-select-options=\"filter.config\" ng-options=\"option.value as option.name for option in filter.config.options\"></select><input ng-switch-when=\"text\" class=\"rp-form-input\" rp-wrapper-class=\"small\" ng-change=\"filter.activate()\" ng-model=\"filter.config.value\" placeholder=\"{{::filter.config.placeholder}}\"><rp-grid-datetimepicker-filter model=\"filter\" ng-switch-when=\"datetimepicker\"></rp-grid-datetimepicker-filter></div></div></div>");
$templateCache.put("realpage/grid/templates/grid-headers.html",
"<div class=\"{{model.classNames || 'rp-grid-headers-1'}} ft-form\"><div class=\"rp-grid-row\" ng-repeat=\"row in model.rows\"><div ng-repeat=\"header in row\" ng-switch=\"header.config.type\" class=\"rp-grid-cell rp-grid-header {{::header.key.decamelize()}}\"><label ng-switch-when=\"select\" class=\"md-check dark-bluebox ng-hide\"><input type=\"checkbox\" ng-true-value=\"true\" ng-false-value=\"false\" class=\"rp-form-checkbox\" ng-model=\"model.selectModel.selected\" ng-change=\"model.selectModel.publishState()\"> <i class=\"primary\"></i></label><span ng-switch-default class=\"rp-grid-text\" ng-class=\"header.state\" ng-click=\"header.activate()\">{{::header.config.text}}</span> <i ng-switch-default ng-class=\"header.state\" class=\"rp-grid-header-icon\"></i><div ng-if=\"header.hasTooltip\" class=\"rp-grid-header-tooltip {{::header.config.tooltipClass}}\"><span ng-click=\"gridHeaderTooltip.toggleTooltip()\" class=\"rp-grid-header-tooltip-icon {{::header.config.tooltipIcon}}\"></span><div ng-show=\"gridHeaderTooltip.isVisible\" class=\"fdn-arrow box-color text-color rp-grid-header-tooltip-content-wrap\"><span class=\"arrow left white rp-grid-header-tooltip-content-arrow\"></span><div class=\"box-body rp-grid-header-tooltip-content\">{{::header.config.tooltipContent}}</div></div></div></div></div></div>");
$templateCache.put("realpage/grid/templates/grid.html",
"<div class=\"rp-grid-wrap rp-float-scroll\" ng-class=\"model.state\"><div class=\"rp-grid\"><rp-grid-headers model=\"model.headersModel\"></rp-grid-headers><rp-grid-filters model=\"model.filtersModel\"></rp-grid-filters><div class=\"rp-grid-body-wrap\"><rp-busy-indicator model=\"model.busyModel\"></rp-busy-indicator><div class=\"rp-grid-body-1 ft-form\" ng-class=\"{init: model.state.busy}\"><div class=\"rp-grid-row\" ng-repeat=\"record in model.data.records\" ng-class=\"{active: record[model.getSelectKey()]}\"><div ng-switch=\"config.type\" ng-repeat=\"config in model.config\" class=\"rp-grid-cell {{::config.key.decamelize()}}\"><div ng-switch-when=\"actionsMenu\" class=\"rp-actions-menu\" model=\"config.getActions(record)\"></div><label ng-switch-when=\"select\" class=\"md-check dark-bluebox\"><input type=\"checkbox\" ng-true-value=\"true\" ng-false-value=\"false\" class=\"md-check dark-bluebox\" ng-model=\"record[config.key]\" ng-change=\"model.updateSelected()\" ng-disabled=\"record.disableSelection\" rp-track-selection=\"record[config.key]\" rp-track-selection-id=\"record[config.idKey]\" rp-selection-manager=\"model.selectionManager\"> <i class=\"primary\"></i></label><span ng-switch-when=\"button\" class=\"button {{config.getButtonClassNames(record)}}\" ng-click=\"config.method(record)\">{{config.getButtonText(record)}}</span> <a ng-switch-when=\"link\" href=\"{{config.getLink(record)}}\" class=\"rp-grid-text rp-grid-link\">{{record[config.key]}}</a> <span ng-switch-when=\"actionLink\" ng-click=\"config.method(record)\" class=\"rp-grid-text rp-grid-link\">{{record[config.key]}}</span> <span ng-switch-when=\"date\" class=\"rp-grid-text\">{{record[config.key] | date: config.dateFormat || \"MM/dd/yyyy\"}}</span> <span ng-switch-when=\"currency\" class=\"rp-grid-text\">{{record[config.key] | currency : config.currencySymbol || \"$\" : config.decimalLength === undefined ? 2 : config.decimalLength}}</span> <span ng-switch-default class=\"rp-grid-text\">{{record[config.key]}}</span></div></div><div class=\"rp-grid-empty\" ng-show=\"!model.data.records.length\"><div class=\"empty-msg\">{{model.emptyMsg || \"No results were found.\"}}</div></div></div></div></div><rp-pagination model=\"model.paginationModel\"></rp-pagination></div>");
}]);


//  Source: _lib\realpage\grid\js\directives\track-selection.js
//  Track Selection Directive

(function (angular) {
    "use strict";

    function rpTrackSelection(watchList) {
        function link(scope, elem, attr) {
            var watch,
                dir = {},
                firstPass = true;

            dir.init = function () {
                scope.trackSelection = dir;
                dir.watchList = watchList();
                dir.watchList.add(scope.$watch(dir.getValue, dir.onChange));
                dir.watchList.add(scope.$on('$destroy', dir.destroy));
            };

            dir.getId = function () {
                return scope.$eval(attr.rpTrackSelectionId);
            };

            dir.getManager = function () {
                return scope.$eval(attr.rpSelectionManager);
            };

            dir.getValue = function () {
                return scope.$eval(attr.rpTrackSelection);
            };

            dir.onChange = function (bool) {
                if (firstPass) {
                    firstPass = false;
                    dir.defVal = bool;
                }
                else {
                    dir.recordChange(bool);
                }
            };

            dir.recordChange = function (bool) {
                var method,
                    id = dir.getId();

                if (bool === dir.defVal) {
                    method = 'remove' + (bool ? 'Deselected' : 'Selected');
                    dir.getManager()[method](id);
                }
                else {
                    method = 'add' + (bool ? 'Selected' : 'Deselected');
                    dir.getManager()[method](id);
                }
            };

            dir.destroy = function () {
                dir.watchList.destroy();
                dir = undefined;
                scope.trackSelection = undefined;
            };

            dir.init();
        }

        return {
            link: link,
            restrict: 'A'
        };
    }

    angular
        .module("rpGrid")
        .directive('rpTrackSelection', ['rpWatchList', rpTrackSelection]);
})(angular);

//  Source: _lib\realpage\grid\js\models\grid-transform.js
//  Grid Transform Service

(function (angular) {
    "use strict";

    function factory($filter) {
        return function () {
            var model = {};

            model.watch = function (grid) {
                model.grid = grid;
                grid.subscribe("sortBy", model.sort);
                grid.subscribe("filterBy", model.filter);
            };

            model.filter = function (filterBy) {
                if (model.gridData === undefined) {
                    model.gridData = [].concat(model.grid.getData().records);
                }

                var records = $filter("filter")(model.gridData, filterBy);

                if (model.sortBy) {
                    records = model.sortData(records, model.sortBy);
                }

                model.grid.flushData().setData({
                    records: records
                });
            };

            model.sort = function (sortBy) {
                var records = model.grid.getData().records;

                model.sortBy = sortBy;
                records = model.sortData(records, sortBy);

                model.grid.flushData().setData({
                    records: records
                });
            };

            model.sortData = function (records, sortBy) {
                var key = Object.keys(sortBy)[0],
                    reverse = sortBy[key] !== "ASC";

                return $filter("naturalSort")(records, key, reverse);
            };

            model.reset = function () {
                model.sortBy = undefined;
                model.gridData = undefined;
            };

            model.destroy = function () {
                model.reset();
                model.grid = undefined;
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("app")
        .factory("rpGridTransform", ["$filter", factory]);
})(angular);


//  Source: _lib\realpage\grid\js\directives\grid-datetimepicker-filter.js
//  Grid Date Time Picker Directive

(function (angular) {
    "use strict";

    function rpGridDatetimepickerFilter(datetimepickerConfig) {
        function link(scope, elem, attr) {
            var dir = {},
                filter = scope.model;

            dir.init = function () {
                dir.value = "";

                dir.config = datetimepickerConfig({
                    onChange: dir.onChange
                });

                scope.filter = dir;
            };

            dir.onChange = function (data) {
                filter.setValue(data).activate();
            };

            dir.init();
        }

        return {
            scope: {
                model: "="
            },
            link: link,
            restrict: "E",
            replace: true,
            templateUrl: "realpage/grid/templates/grid-datetimepicker-filter.html"
        };
    }

    angular
        .module("rpGrid")
        .directive("rpGridDatetimepickerFilter", [
            "rpDatetimepickerConfig",
            rpGridDatetimepickerFilter
        ]);
})(angular);


//  Source: _lib\realpage\grid\js\models\grid-filter.js
//  Grid Filter Model

(function (angular) {
    "use strict";

    function factory(eventStream, timeout) {
        return function () {
            var model = {};

            model.events = {
                activate: eventStream()
            };

            model.setConfig = function (data) {
                model.config = data;
                model.key = data.key;
                model._defaultValue = data.value;
                model.delayFiltering = data.type == 'text';
                return model;
            };

            model.getKey = function () {
                return model.key;
            };

            model.hasKey = function (key) {
                return model.key == key;
            };

            model.setValue = function (value) {
                model.config.value = value;
                return model;
            };

            model.getValue = function () {
                return model.config.value;
            };

            model.isEmpty = function () {
                return !model.config || model.config.value === '' || model.config.value === undefined;
            };

            model.subscribe = function (eventName, callback) {
                model.events[eventName].subscribe(callback);
            };

            model.activate = function () {
                if (model.delayFiltering) {
                    timeout.cancel(model.timer);
                    var delay = model.config.filterDelay,
                        dt = delay === undefined ? 400 : delay;
                    model.timer = timeout(model.publish, dt);
                }
                else {
                    model.publish();
                }
            };

            model.publish = function () {
                model.events.activate.publish(model);
            };

            model.filterBy = function () {
                return {
                    key: model.key,
                    value: model.config.value
                };
            };

            model.reset = function () {
                model.config.value = model._defaultValue;
                return model;
            };

            return model;
        };
    }

    angular
        .module("rpGrid")
        .factory('rpGridFilterModel', ['eventStream', 'timeout', factory]);
})(angular);


//  Source: _lib\realpage\grid\js\directives\grid-filters.js
//  Grid Filters Directive

(function (angular) {
    "use strict";

    function rpGridFilters() {
        function link(scope, elem, attr) {}

        return {
            scope: {
                model: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "realpage/grid/templates/grid-filters.html"
        };
    }

    angular
        .module("rpGrid")
        .directive('rpGridFilters', [rpGridFilters]);
})(angular);

//  Source: _lib\realpage\grid\js\models\grid-filters.js
//  Grid Filters Model

(function (angular) {
    "use strict";

    function factory(gridFilter) {
        return function () {
            var model = {
                list: [],
                timer: '',
                filterData: {}
            };

            model.state = {
                active: false
            };

            model.setState = function (state) {
                model.state = state;
                return model;
            };

            model.setEvents = function (events) {
                model.events = events;
                return model;
            };

            model.setClassNames = function (classNames) {
                model.classNames = classNames;
                return model;
            };

            model.setConfig = function (config) {
                model.list.flush();

                config.forEach(function (data) {
                    var filter = gridFilter().setConfig(data);
                    filter.subscribe('activate', model.activate);
                    model.list.push(filter);
                });

                return model;
            };

            model.toggle = function () {
                model.state.active = !model.state.active;
                return model;
            };

            model.getFilterData = function () {
                model.list.forEach(function (filter) {
                    var key = filter.getKey();

                    if (filter.isEmpty()) {
                        delete model.filterData[key];
                    }
                    else {
                        model.filterData[key] = filter.getValue();
                    }
                });

                return model.filterData;
            };

            model.setFilterValue = function (key, value) {
                model.list.forEach(function (filter) {
                    if (filter.hasKey(key)) {
                        filter.setValue(value);
                    }
                });
                return model;
            };

            model.activate = function () {
                model.events.publish('filterBy', model.getFilterData());
            };

            model.reset = function () {
                model.list.forEach(function (filter) {
                    filter.reset();
                });

                model.list[0].activate();
            };

            return model;
        };
    }

    angular
        .module("rpGrid")
        .factory('rpGridFiltersModel', ['rpGridFilterModel', factory]);
})(angular);


//  Source: _lib\realpage\grid\js\directives\grid-header-tooltip.js
//  Grid Header Tooltip Directive

(function (angular) {
    "use strict";

    function rpGridHeaderTooltip($cache, $compile, timeout) {
        function link(scope, elem, attr) {
            var dir = {},
                body = angular.element("body"),
                config = scope.header.getConfig(),
                click = "click.rpGridHeaderTooltip";

            dir.init = function () {
                dir.getContent();
                dir.isVisible = false;
                scope.gridHeaderTooltip = dir;
            };

            dir.toggleTooltip = function () {
                dir.isVisible = !dir.isVisible;

                body.off(click);

                if (dir.isVisible) {
                    timeout(function () {
                        body.one(click, dir.hideTooltip);
                    }, 100);
                }
            };

            dir.hideTooltip = function () {
                scope.$apply(function () {
                    dir.isVisible = false;
                });
            };

            dir.getContent = function () {
                if (config.tooltipUrl) {
                    var contentHtml = $cache.get(config.tooltipUrl),
                        content = angular.element(contentHtml),
                        wrap = elem.find(".rp-grid-header-tooltip-content");

                    content = $compile(content)(scope);
                    wrap.html("").append(content);
                }
            };

            dir.init();
        }

        return {
            link: link,
            restrict: "C"
        };
    }

    angular
        .module("rpGrid")
        .directive("rpGridHeaderTooltip", [
            "$templateCache",
            "$compile",
            "timeout",
            rpGridHeaderTooltip
        ]);
})(angular);


//  Source: _lib\realpage\grid\js\directives\grid-header.js
//  Grid Header Directive

(function (angular) {
    "use strict";

    function rpGridHeader($cache, $compile) {
        function link(scope, elem, attr) {
            var dir = {},
                config = scope.header.config;

            dir.init = function () {
                if (config.type == "custom") {
                    var html = $cache.get(config.templateUrl),
                        child = angular.element(html);

                    child = $compile(child)(scope);
                    elem.html('').append(child);
                }
            };

            dir.init();
        }

        return {
            link: link,
            restrict: "C"
        };
    }

    angular
        .module("rpGrid")
        .directive("rpGridHeader", ["$templateCache", "$compile", rpGridHeader]);
})(angular);

//  Source: _lib\realpage\grid\js\models\grid-header.js
//  Grid Header Model

(function (angular) {
    "use strict";

    function factory(eventStream) {
        return function () {
            var state,
                icon,
                model = {};

            model.events = {
                activate: eventStream()
            };

            model.setConfig = function (data) {
                model.config = data;
                model.key = data.key;
                model.state = state = {
                    active: false,
                    reverse: false,
                    sortable: data && data.isSortable
                };

                model.hasTooltip = data.tooltipContent !== undefined;

                return model;
            };

            model.getConfig = function () {
                return model.config;
            };

            model.activate = function () {
                if (!state.sortable) {
                    return;
                }
                else if (!state.active) {
                    state.active = true;
                }
                else {
                    state.reverse = !state.reverse;
                }
                model.events.activate.publish(model);
            };

            model.is = function (item) {
                return model.key == item.key;
            };

            model.deactivate = function () {
                state.active = false;
                state.reverse = false;
                return model;
            };

            model.subscribe = function (eventName, callback) {
                return model.events[eventName].subscribe(callback);
            };

            model.sortBy = function () {
                var obj = {};
                obj[model.key] = state.reverse ? 'DESC' : 'ASC';
                return obj;
            };

            model.isActive = function () {
                return state.active;
            };

            return model;
        };
    }

    angular
        .module("rpGrid")
        .factory('rpGridHeaderModel', ['eventStream', factory]);
})(angular);


//  Source: _lib\realpage\grid\js\directives\grid-headers.js
//  Grid Headers Directive

(function (angular) {
    "use strict";

    function rpGridHeaders() {
        function link(scope, elem, attr) {}

        return {
            scope: {
                model: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "realpage/grid/templates/grid-headers.html"
        };
    }

    angular
        .module("rpGrid")
        .directive('rpGridHeaders', [rpGridHeaders]);
})(angular);

//  Source: _lib\realpage\grid\js\models\grid-headers.js
//  Grid Headers Model

(function (angular) {
    "use strict";

    function factory(gridHeaderModel) {
        return function () {
            var model = {
                list: [],
                sortBy: {}
            };

            model.setEvents = function (events) {
                model.events = events;
                return model;
            };

            model.setClassNames = function (classNames) {
                model.classNames = classNames;
                return model;
            };

            model.setConfig = function (rows) {
                model.rows = [];

                rows.forEach(function (list) {
                    var row = [];
                    list.forEach(function (config) {
                        var header = gridHeaderModel().setConfig(config);
                        header.subscribe('activate', model.activate);
                        row.push(header);
                    });
                    model.rows.push(row);
                });

                return model;
            };

            model.activate = function (header) {
                model.rows.forEach(function (row) {
                    row.forEach(function (item) {
                        if (!item.is(header)) {
                            item.deactivate();
                        }
                    });
                });

                model.sortBy = header.sortBy();

                model.events.publish('sortBy', model.sortBy);
            };

            model.getSortData = function () {
                return model.sortBy;
            };

            model.reset = function () {
                model.rows.forEach(function (row) {
                    row.forEach(function (header) {
                        header.deactivate();
                    });
                });

                return model;
            };

            return model;
        };
    }

    angular
        .module("rpGrid")
        .factory('rpGridHeadersModel', ['rpGridHeaderModel', factory]);
})(angular);


//  Source: _lib\realpage\grid\js\models\grid-actions.js
//  Grid Actions Model

(function (angular) {
    "use strict";

    function factory() {
        return function () {
            var model = {};

            model.setSrc = function (src) {
                model.src = src;
                return model;
            };

            model.getMethod = function (name) {
                return function (record) {
                    if (!model.src) {
                        logc('GridActionsModel: Method source has not been defined!');
                        return angular.noop;
                    }
                    else if (!model.src[name]) {
                        logc('GridActionsModel: Method ' + name + ' has not been defined!');
                        return angular.noop;
                    }
                    else {
                        return model.src[name](record);
                    }
                };
            };

            model.get = function () {

            };

            return model;
        };
    }

    angular
        .module("rpGrid")
        .factory('rpGridActions', [factory]);
})(angular);

//  Source: _lib\realpage\grid\js\models\grid-config.js
//  Grid Config Model

(function (angular) {
    "use strict";

    function factory() {
        return function () {
            var model = {};

            model.setSrc = function (src) {
                model.src = src;
                return model;
            };

            model.getMethod = function (name) {
                return function (record) {
                    if (!model.src) {
                        logc('GridConfig: Method source has not been defined!');
                    }
                    else if (!model.src[name]) {
                        logc('GridConfig: Method name ' + name + ' has not been defined!');
                    }
                    else {
                        return model.src[name](record);
                    }
                };
            };

            model.get = function () {
                return [];
            };

            model.getHeaders = function () {
                return [];
            };

            model.getFilters = function () {
                return [];
            };

            return model;
        };
    }

    angular
        .module("rpGrid")
        .factory('rpGridConfig', [factory]);
})(angular);


//  Source: _lib\realpage\grid\js\directives\grid-cell.js
//  Grid Cell Directive

(function (angular, und) {
    "use strict";

    function rpGridCell($templateCache, $compile) {
        function link(scope, elem, attr) {
            var column,
                dir = {};

            dir.init = function () {
                var custom = scope.config &&
                    scope.config.type !== und &&
                    scope.config.type == 'custom';

                if (custom) {
                    var html = $templateCache.get(scope.config.templateUrl),
                        el = angular.element(html);

                    el = $compile(el)(scope);
                    elem.html('').append(el);
                }
            };

            dir.init();
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("rpGrid")
        .directive('rpGridCell', ['$templateCache', '$compile', rpGridCell]);
})(angular);


//  Source: _lib\realpage\grid\js\models\grid.js
//  Grid Model

(function(angular, und) {
    "use strict";

    function factory(busyModel, paginationModel, gridHeadersModel, gridFiltersModel, eventsManager, selectionManager) {
        return function() {
            var busy,
                events,
                headers,
                filters,
                selection,
                pagination;

            var model = {
                state: {},
                emptyMsg: '',
                data: {
                    records: []
                }
            };

            model.init = function() {
                var eventNames = [
                    'ready',
                    'sortBy',
                    'select',
                    'filterBy',
                    'paginate',
                    'selectAll'
                ];

                busy = model.busyModel = busyModel();
                events = model.events = eventsManager();
                headers = model.headersModel = gridHeadersModel();
                filters = model.filtersModel = gridFiltersModel();
                pagination = model.paginationModel = paginationModel();
                selection = model.selectionManager = selectionManager();

                events.setEvents(eventNames);

                headers.setEvents(events);
                filters.setEvents(events);

                pagination.setEvents({
                    update: events.getEvent('paginate')
                });

                events.subscribe('sortBy', model.setSortBy);
                events.subscribe('select', model.selectAll);
                events.subscribe('filterBy', model.setFilterBy);

                return model;
            };

            // Getters

            model.getQuery = function() {
                return pagination.getQuery();
            };

            model.getData = function() {
                return model.data;
            };

            model.getSelectKey = function() {
                var key = '';

                model.config.forEach(function(item) {
                    if (item.type == 'select') {
                        key = item.key;
                    }
                });

                return key;
            };

            model.getEvents = function () {
                return events;
            };

            // Setters

            model.setConfig = function(cfg) {
                model.config = cfg.get();
                headers.setConfig(cfg.getHeaders());
                filters.setConfig(cfg.getFilters());
                var filterBy = filters.getFilterData();
                pagination.setFilterBy(filterBy);
                return model;
            };

            model.setEmptyMsg = function(msg) {
                model.emptyMsg = msg;
                return model;
            };

            model.setFilterState = function(state) {
                filters.setState(state);
                return model;
            };

            model.setData = function(data) {
                data.records = data.records || [];
                model.data = data;
                model.updateSelected();
                pagination.reset().updateState(data.totalRecords);
                model.events.publish('ready');
                return model;
            };

            model.setHeadersClassNames = function(classNames) {
                headers.setClassNames(classNames);
                return model;
            };

            model.setFiltersClassNames = function(classNames) {
                filters.setClassNames(classNames);
                return model;
            };

            model.setGridSelectModel = function (gridSelectModel) {
                model.gridSelectModel = gridSelectModel;
                return model;
            };

            // Data Management

            model.addData = function(data) {
                data.records = data.records || [];
                model.data.records = model.data.records.concat(data.records);
                model.updateSelected();
                pagination.updateState(data.totalRecords);
                model.events.publish('ready');
                return model;
            };

            model.flushData = function() {
                selection.reset();
                pagination.reset();
                model.data.records.flush();
                return model;
            };

            model.deleteRow = function(idKey, row) {
                model.data.records = model.data.records.filter(function(item) {
                    return item[idKey] != row[idKey];
                });

                pagination.setCurrent(pagination.getCurrent() - 1);

                return model;
            };

            // State Management

            model.busy = function(bool) {
                model.state.busy = bool;
                model.busyModel[bool ? 'busy' : 'off']();
                return model;
            };

            model.toggleFilters = function() {
                model.gridFilters.toggle();
                return model;
            };

            // Manage Row Selection

            model.selectAll = function(bool) {
                var key = model.getSelectKey();
                model.data.records.forEach(function(item) {
                    if (item.disableSelection !== true) {
                        item[key] = bool;
                    }
                });
                events.publish("selectAll", bool);
            };

            model.updateSelected = function() {
                if (!model.gridSelectModel) {
                    return;
                }

                var count = 0,
                    selCount = 0,
                    checked = false,
                    list = model.data.records,
                    key = model.getSelectKey();

                list.forEach(function(item) {
                    if (item.disableSelection !== true) {
                        count++;
                        selCount += item[key] ? 1 : 0;
                    }
                });

                checked = (count > 0) && (count === selCount);
                model.gridSelectModel.updateSelected(checked);
            };

            model.hasSelectionChanges = function() {
                return selection.hasChanges();
            };

            model.getSelectionChanges = function() {
                return selection.getChanges();
            };

            model.setSortBy = function(sortBy) {
                model.paginationModel.setSortBy(sortBy);
                return model;
            };

            model.setFilterBy = function(filterBy) {
                model.paginationModel.setFilterBy(filterBy);
                return model;
            };

            model.setFilterValue = function(key, val) {
                filters.setFilterValue(key, val);
                pagination.setFilterValue(key, val);
                return model;
            };

            model.setSortValue = function(key, val) {
                pagination.setSortValue(key, val);
                return model;
            };

            model.clearSortValue = function() {
                pagination.clearSortValue();
                return model;
            };

            model.resetFilters = function () {
                filters.reset();
                return model;
            };

            model.getFilterData = function() {
                return filters.getFilterData();
            };

            model.subscribe = function(eventName, callback) {
                return events.subscribe(eventName, callback);
            };

            model.setResultsPerPage = function(count) {
                pagination.setResultsPerPage(count);
                return model;
            };

            model.destroy = function() {
                // model.busyModel.destroy();
                // model.paginationModel.destroy();
                model = und;
            };

            return model.init();
        };
    }

    angular
        .module("rpGrid")
        .factory('rpGridModel', [
            'rpBusyIndicatorModel',
            'rpPaginationModel',
            'rpGridHeadersModel',
            'rpGridFiltersModel',
            'eventsManager',
            'rpSelectionManager',
            factory
        ]);
})(angular);

//  Source: _lib\realpage\grid\js\directives\grid.js
//  Grid Directive

(function (angular) {
    "use strict";

    function rpGrid(timeout) {
        function link(scope, elem, attr) {
            var dir = {},
                model = scope.model;

            dir.init = function () {
                model.subscribe('ready', dir.onReady);
            };

            dir.onReady = function () {
                timeout(dir.setVis);
            };

            dir.setVis = function () {
                if (scope.floatScroll) {
                    scope.floatScroll.setVis().setSize();
                }
                else {
                    console.log("rpGrid-setVis: FloatScroll module is missing!");
                }
            };

            dir.init();
        }

        return {
            scope: {
                model: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "realpage/grid/templates/grid.html"
        };
    }

    angular
        .module("rpGrid")
        .directive('rpGrid', ['timeout', rpGrid]);
})(angular);

