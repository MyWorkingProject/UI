angular.module("rpComplexGrid", []);

//  Source: _lib\realpage\complex-grid\js\templates\templates.inc.js
angular.module('rpComplexGrid').run(['$templateCache', function($templateCache) {
$templateCache.put("realpage/complex-grid/templates/grid-editable.html",
"<div class=\"rp-cg-editable\"><span class=\"rp-cg-text rp-cg-body-text\">{{column.getVal().toLocaleString()}}</span><div class=\"rp-input-text small\"><input class=\"rp-cg-input-text rp-form-input\" ng-model-options=\"{updateOn: 'blur'}\" ng-model=\"column.row.data[column.config.key]\"></div></div>");
$templateCache.put("realpage/complex-grid/templates/grid-headers.html",
"<div class=\"rp-cg-headers\" rp-sticky=\"{lockTop: 90}\"><div class=\"rp-cg-locked rp-cg-headers-locked\"><table ng-style=\"{width: model.getLockedWidth()}\" class=\"rp-cg-table rp-cg-table-locked rp-cg-headers-table\"><tr ng-repeat=\"rows in model.colHeaderGroups.rows\" class=\"rp-cg-col-headers-group\"><td ng-repeat=\"colHeaderGroup in rows\" ng-if=\"colHeaderGroup.isLocked() && colHeaderGroup.isActive()\" class=\"rp-cg-col-headers-group-cell rp-cg-cell {{::colHeaderGroup.config.classNames}} {{::colHeaderGroup.config.key.decamelize()}}\" colspan=\"{{colHeaderGroup.config.colspan || 1}}\"><span class=\"rp-cg-col-headers-group-text rp-cg-text\">{{ colHeaderGroup.config.text }}</span></td></tr><tr ng-repeat=\"headers in model.rows\" class=\"rp-cg-row rp-cg-headers-row\"><td ng-repeat=\"header in headers\" ng-style=\"{width: header.config.width}\" colspan=\"{{header.config.colspan || 1}}\" rowspan=\"{{header.config.rowspan || 1}}\" ng-if=\"header.isLocked() && header.isActive()\" class=\"rp-cg-cell rp-cg-headers-cell {{::header.config.classNames}} {{::header.config.key.decamelize()}}\"><span ng-class=\"header.sort\" ng-click=\"model.sortBy(header)\" class=\"rp-cg-text rp-cg-headers-text\">{{::header.config.text}}</span></td></tr></table></div><div class=\"rp-cg-free rp-cg-headers-free\"><table ng-style=\"{width: model.getFreeWidth()}\" class=\"rp-cg-table rp-cg-table-free rp-cg-headers-table\"><tr ng-repeat=\"rows in model.colHeaderGroups.rows\" class=\"rp-cg-col-headers-group\"><td ng-repeat=\"colHeaderGroup in rows\" ng-if=\"!colHeaderGroup.isLocked() && colHeaderGroup.isActive()\" class=\"rp-cg-col-headers-group-cell rp-cg-cell {{::colHeaderGroup.config.classNames}} {{::colHeaderGroup.config.key.decamelize()}}\" colspan=\"{{colHeaderGroup.config.colspan || 1}}\"><span class=\"rp-cg-col-headers-group-text rp-cg-text\">{{ colHeaderGroup.config.text }}</span></td></tr><tr ng-repeat=\"headers in model.rows\" class=\"rp-cg-row rp-cg-headers-row\"><td ng-repeat=\"header in headers\" ng-style=\"{width: header.config.width}\" colspan=\"{{header.config.colspan || 1}}\" rowspan=\"{{header.config.rowspan || 1}}\" ng-if=\"!header.isLocked() && header.isActive()\" class=\"rp-cg-cell rp-cg-headers-cell {{::header.config.classNames}} {{::header.config.key.decamelize()}}\"><span ng-class=\"header.sort\" ng-click=\"model.sortBy(header)\" class=\"rp-cg-text rp-cg-headers-text\">{{::header.config.text}}</span></td></tr></table></div></div>");
$templateCache.put("realpage/complex-grid/templates/grid.html",
"<div ng-class=\"model.state\" class=\"rp-cg busy {{model.rowHeightClass}}\"><rp-cg-headers model=\"model.headers\"></rp-cg-headers><div class=\"rp-cg-body\"><div class=\"rp-cg-locked rp-cg-body-locked\"><table class=\"rp-cg-table\" ng-style=\"{width: model.getLockedWidth()}\"><tr ng-class=\"row.state\" ng-click=\"row.toggle()\" class=\"{{::row.classNames}}\" ng-repeat=\"row in model.rows\" ng-if=\"!row.state.hidden && !row.state.zeroRow\"><td ng-repeat=\"column in row.columns\" ng-style=\"{width: column.config.width}\" class=\"rp-cg-cell rp-cg-body-cell {{::column.config.classNames}} {{::column.config.key.decamelize()}}\" ng-if=\"column.isLocked() && column.isActive()\"><span class=\"rp-cg-text rp-cg-body-text\">{{column.getVal().toLocaleString()}}</span></td></tr></table></div><div class=\"rp-cg-free rp-cg-body-free rp-float-scroll\"><table class=\"rp-cg-table\" ng-style=\"{width: model.getFreeWidth()}\"><tr ng-class=\"row.state\" ng-click=\"row.toggle()\" class=\"{{::row.classNames}}\" ng-repeat=\"row in model.rows\" ng-if=\"!row.state.hidden && !row.state.zeroRow\"><td ng-repeat=\"column in row.columns\" ng-style=\"{width: column.config.width}\" class=\"rp-cg-cell rp-cg-body-cell {{::column.config.classNames}} {{::column.config.key.decamelize()}}\" ng-if=\"!column.isLocked() && column.isActive()\"><span class=\"rp-cg-text rp-cg-body-text\">{{column.getVal().toLocaleString()}}</span></td></tr></table></div><div class=\"rp-cg-empty\" ng-show=\"!model.rows.length\"><div class=\"empty-msg\" ng-bind-html=\"model.emptyMsg\"></div></div></div></div>");
}]);


//  Source: _lib\realpage\complex-grid\js\models\grid-column.js
//  Complex Grid Column Model

(function (angular) {
    "use strict";

    function factory() {
        return function () {
            var model = {},
                config = {};

            model.config = config;

            model.getConfig = function () {
                return model.config;
            };

            model.setRow = function (row) {
                model.row = row;
                return model;
            };

            model.setConfig = function (config) {
                angular.extend(model.config, config);
                return model;
            };

            model.isLocked = function () {
                return model.config.state.locked;
            };

            model.isActive = function () {
                return model.config.state.active;
            };

            model.getKey = function () {
                return model.config.key;
            };

            model.getVal = function () {
                return model.row.getColumnVal(model);
            };

            model.isStatic = function () {
                return !model.config.methodName;
            };

            model.isDataColumn = function () {
                return !!model.config.isDataColumn;
            };

            model.destroy = function () {
                model = undefined;
                config = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgColumnModel', [factory]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\models\grid-row.js
//  Row Model

(function (angular) {
    "use strict";

    function factory(eventName, columnModel) {
        return function () {
            var state;

            state = {
                open: true,
                hidden: false
            };

            var model = {
                data: {},
                config: [],
                columns: [],
                state: state,
                classNames: '',
                hasConfig: false,
            };

            // Setters

            model.setData = function (data) {
                var rowType = data.rowType || '',
                    rowClass = data.rowClass || '';

                var parts = [
                    rowClass,
                    'rp-cg-row',
                    'rp-cg-body-row',
                    rowType.decamelize(),
                    'level-' + data.level
                ];

                model.data = data;
                model.classNames = parts.join(' ');

                return model;
            };

            model.setColumns = function (columns) {
                columns.getData().forEach(function (colData) {
                    var key = colData.key,
                        column = columnModel(),
                        config = columns.getConfig(key);

                    column
                        .setRow(model)
                        .setConfig(config);

                    model.columns.push(column);
                });
                return model;
            };

            model.extendColumns = function (columns) {
                columns.forEach(function (column, index) {
                    model.columns[index].setConfig(column);
                });
                return model;
            };

            model.setFilters = function (filters) {
                model.filters = filters;
                return model;
            };

            model.setEvents = function (events) {
                model.events = events;
                return model;
            };

            model.setGrid = function (grid) {
                model.grid = grid;
                return model;
            };

            // Getters

            model.getID = function () {
                return model.data.rowID;
            };

            model.getGroupID = function () {
                return model.data.groupID;
            };

            model.getData = function () {
                return model.data;
            };

            model.getLevel = function () {
                return model.data.level;
            };

            model.getColumnVal = function (column) {
                var config = column.getConfig();

                if (column.isStatic()) {
                    return model.data[config.key];
                }
                else {
                    return model.grid.getColumnVal(config, model);
                }
            };

            // Assertions

            model.is = function (obj) {
                return obj.getID() === model.getID();
            };

            model.hasID = function (id) {
                return model.data.rowID == id;
            };

            model.hasGroupID = function (id) {
                return model.data.groupID == id;
            };

            model.isGroupHeader = function () {
                return model.data.rowType == 'groupHeader';
            };

            model.isAggregate = function () {
                return model.data.rowType == 'total' ||
                    model.data.rowType == 'average';
            };

            model.isChildOf = function (obj) {
                return model.getLevel() == obj.getLevel() + 1 &&
                    model.getGroupID() != obj.getGroupID();
            };

            model.isDescOf = function (obj) {
                return model.getLevel() > obj.getLevel() &&
                    model.getGroupID() != obj.getGroupID();
            };

            model.isSiblingOf = function (obj) {
                return model.getLevel() == obj.getLevel() &&
                    model.getGroupID() == obj.getGroupID();
            };

            model.isOpen = function () {
                return state.open;
            };

            model.open = function (bool) {
                state.open = bool;
                return model;
            };

            model.show = function (bool) {
                bool = bool === undefined ? true : bool;
                state.hidden = !bool;
                return model;
            };

            model.toggle = function () {
                if (model.data.rowType == 'groupHeader') {
                    model.events.publish(eventName.toggleRow, model);
                }
            };

            model.toggleZeroRow = function (hide) {
                var dataCols = 0,
                    zeroDataCols = 0;

                model.columns.forEach(function (col) {
                    if (col.isDataColumn()) {
                        dataCols++;

                        if (model.data[col.getKey()] === 0) {
                            zeroDataCols++;
                        }
                    }
                });

                model.state.zeroRow = dataCols === zeroDataCols && hide;
            };

            model.destroy = function () {
                model.columns.forEach(function (column) {
                    column.destroy();
                });

                model = undefined;
                state = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgRowModel', [
            'rpCgEventName',
            'rpCgColumnModel',
            factory
        ]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\models\grid-event-name.js
//  Complex Grid Events Model

(function (angular) {
    "use strict";

    function factory() {
        return {
            resize: 'resize',
            expRow: 'expRow',
            colRow: 'colRow',
            scroll: 'scroll',
            sortBy: 'sortBy',
            dataReady: 'dataReady',
            toggleRow: 'toggleRow',
            widthReady: 'widthReady',
            updateScroll: 'updateScroll'
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgEventName', [factory]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\models\grid-config.js
//  Grid Config Model

(function (angular) {
    "use strict";

    function factory(headersModel, columnsConfigModel) {
        return function () {
            var headers = headersModel(),
                columns = columnsConfigModel();

            var model = {
                src: '',
                emptyMsg: 'No results were found.',
                rowConfig: {},
                columns: columns,
                headers: headers
            };

            model.setHeaders = function (data) {
                headers.setColumns(columns).setConfig(data);
                return model;
            };

            model.setColHeaderGroups = function (data) {
                headers.setColHeaderGroups(data);
                return model;
            };

            model.setColumns = function (data) {
                columns.setData(data);
                return model;
            };

            model.setEmptyMsg = function (emptyMsg) {
                model.emptyMsg = emptyMsg;
                return model;
            };

            model.getHeaders = function () {
                return model.headers;
            };

            model.getColumns = function () {
                return model.columns;
            };

            model.getEmptyMsg = function () {
                return model.emptyMsg;
            };

            model.totalWidth = function () {
                return columns.getTotalWidth();
            };

            model.lockedWidth = function () {
                return columns.getLockedWidth();
            };

            model.freeWidth = function () {
                return columns.getFreeWidth();
            };

            model.maxWidth = function () {
                return columns.getMaxWidth();
            };

            model.setSrc = function (src) {
                model.src = src;
                return model;
            };

            model.hasMethod = function (methodName) {
                return !!model.src[methodName];
            };

            model.getMethod = function (methodName) {
                if (model.src[methodName]) {
                    return model.src[methodName];
                }
                else {
                    logc('RpCgConfigModel: Method name ' + methodName + ' is not defined!');
                    return angular.noop;
                }
            };

            model.setRowConfig = function (key, data) {
                model.rowConfig[key] = data;
                return model;
            };

            model.getRowConfig = function (key) {
                if (!model.rowConfig[key]) {
                    logc('RpCgConfigModel: Row config for ' + key + ' does not exist!');
                    return {};
                }
                return model.rowConfig[key];
            };

            return model;
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgConfigModel', [
            'rpCgHeadersModel',
            'rpCgColumnsConfigModel',
            factory
        ]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\models\grid-columns-config.js
//  Complex Grid Columns Config Model

(function (angular) {
    "use strict";

    function factory() {
        return function () {
            var model = {
                data: [],
                config: {}
            };

            model.setData = function (data) {
                model.data = data;

                data.forEach(function (item) {
                    model.config[item.key] = item;
                });

                return model;
            };

            model.getData = function () {
                return model.data;
            };

            model.getConfig = function (key) {
                if (!model.config[key]) {
                    logc('RpCgColumnsConfigModel: ' + key + ' is not a valid column key');
                    return {};
                }

                return model.config[key];
            };

            model.getFreeWidth = function () {
                var width = 0;

                model.data.forEach(function (column) {
                    if (!column.state.locked && column.state.active) {
                        width += column.width;
                    }
                });

                return width;
            };

            model.getTotalWidth = function () {
                var width = 0;

                model.data.forEach(function (column) {
                    if (column.state.active) {
                        width += column.width;
                    }
                });

                return width;
            };

            model.getLockedWidth = function () {
                var width = 0;

                model.data.forEach(function (column) {
                    if (column.state.locked && column.state.active) {
                        width += column.width;
                    }
                });

                return width;
            };

            model.getMaxWidth = function () {
                var width = 0;

                model.data.forEach(function (column) {
                    width += column.width;
                });

                return width;
            };

            model.destroy = function () {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgColumnsConfigModel', [factory]);
})(angular);


//  Source: _lib\realpage\complex-grid\js\models\grid-header.js
//  Grid Header Model

(function (angular) {
    "use strict";

    function factory() {
        return function () {
            var model = {
                config: {}
            };

            model.setData = function (data) {
                angular.extend(model.config, data);

                model.sort = {
                    active: false,
                    reverse: false,
                    sortable: data.isSortable
                };

                return model;
            };

            model.setConfig = function (data) {
                angular.extend(model.config, data);
                return model;
            };

            model.getKey = function () {
                return model.config.key;
            };

            model.is = function (obj) {
                return model.getKey() == obj.getKey();
            };

            model.isLocked = function () {
                return model.config.state.locked;
            };

            model.isActive = function () {
                return model.config.state.active;
            };

            model.isSortable = function () {
                return !!model.config.isSortable;
            };

            model.sortBy = function (activate) {
                if (activate && !model.sort.active) {
                    model.sort.active = true;
                }
                else if (activate && model.sort.active) {
                    model.sort.reverse = !model.sort.reverse;
                }
                else {
                    model.sort.active = false;
                    model.sort.reverse = false;
                }
            };

            model.getSortDir = function () {
                return model.sort.reverse;
            };

            model.destroy = function () {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgHeaderModel', [factory]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\models\grid-headers.js
//  Grid Headers Model

(function (angular) {
    "use strict";

    function factory(gridHeaderModel, gridHeadersGroupModel, evn) {
        return function () {
            var model = {
                rows: [],
                colHeaderGroups: gridHeadersGroupModel()
            };

            model.getFreeWidth = function () {
                return model.columns.getFreeWidth();
            };

            model.getLockedWidth = function () {
                return model.columns.getLockedWidth();
            };

            model.setEvents = function (events) {
                model.events = events;
                return model;
            };

            model.setColumns = function (columns) {
                model.columns = columns;
                return model;
            };

            model.setColHeaderGroups = function (colHeaderGroups) {
                return model.colHeaderGroups.setColHeaderGroups(colHeaderGroups);
            };

            model.sortBy = function (sel) {
                if (!sel.isSortable()) {
                    return;
                }

                model.rows.forEach(function (headers) {
                    headers.forEach(function (header) {
                        var bool = header.is(sel);
                        header.sortBy(bool);
                        if (bool) {
                            model.events.publish(evn.sortBy, header);
                        }
                    });
                });
            };

            model.setConfig = function (rows) {
                rows.forEach(function (columns) {
                    var row = [];
                    columns.forEach(function (data) {
                        var key = data.key,
                            config = model.columns.getConfig(key),
                            header = gridHeaderModel().setData(data);

                        row.push(header.setConfig(config));
                    });
                    model.rows.push(row);
                });
            };

            model.subscribe = function () {
                return model.events.subscribe.apply(model.events, arguments);
            };

            model.publish = function () {
                return model.events.publish.apply(model.events, arguments);
            };

            model.destroy = function () {
                model.colHeaderGroups.destroy();

                model.rows.forEach(function (row) {
                    row.forEach(function (column) {
                        column.destroy();
                    });
                });

                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgHeadersModel', [
            'rpCgHeaderModel',
            'rpCgHeadersGroupModel',
            'rpCgEventName',
            factory
        ]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\models\grid-header-group.js
//  Grid Header Group Model

(function (angular) {
    "use strict";

    function factory() {
        return function () {
            var model = {
                config: {}
            };

            model.setData = function (data) {
                angular.extend(model.config, data);
                return model;
            };

            model.isLocked = function () {
                return model.config.state.locked;
            };

            model.isActive = function () {
                return model.config.state.active;
            };

            model.destroy = function () {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgHeaderGroupModel', [
            factory
        ]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\models\grid-headers-group.js
//  Grid Headers Group Model

(function (angular) {
    "use strict";

    function factory(gridHeaderGroupModel) {
        return function () {
            var model = {
                rows: []
            };

            model.setColHeaderGroups = function (colHeaderGroups) {
                colHeaderGroups.forEach(function (colHeaderGroupRow) {
                    var row = [];

                    colHeaderGroupRow.forEach(function (data) {
                        var colHeaderGroup = gridHeaderGroupModel().setData(data);

                        row.push(colHeaderGroup);
                    });
                    model.rows.push(row);
                });

                return model;
            };

            model.destroy = function () {
                model.rows.forEach(function (row) {
                    row.forEach(function (colHeaderGroup) {
                        colHeaderGroup.destroy();
                    });
                });

                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgHeadersGroupModel', [
            'rpCgHeaderGroupModel',
            factory
        ]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\directives\grid-headers.js
//  Complex Grid Headers Directive

(function (angular) {
    "use strict";

    function rpCgHeaders(evn) {
        function link(scope, elem, attr) {
            var model,
                dir = {};

            dir.init = function () {
                if (scope.model) {
                    model = scope.model;
                    scope.rpCgHeaders = dir;
                    model.subscribe(evn.resize, dir.onResize);
                    dir.destWatch = scope.$on('$destroy', dir.destroy);
                }
            };

            dir.onResize = function (data) {
                elem.width(data.availWidth);
            };

            dir.destroy = function () {
                dir.destWatch();
                model = undefined;
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
            templateUrl: "realpage/complex-grid/templates/grid-headers.html"
        };
    }

    angular
        .module("rpComplexGrid")
        .directive('rpCgHeaders', [
            'rpCgEventName',
            rpCgHeaders
        ]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\directives\grid-headers-free.js
//  Complex Grid Headers Free Directive

(function (angular) {
    "use strict";

    function rpCgHeadersFree(evn) {
        function link(scope, elem, attr) {
            var model,
                dir = {};

            dir.init = function () {
                if (scope.model) {
                    model = scope.model;
                    model.subscribe(evn.resize, dir.setSize);
                    model.subscribe(evn.scroll, dir.onScroll);
                    dir.destWatch = scope.$on('$destroy', dir.destroy);
                    scope.rpCgHeadersFree = dir;
                }
            };

            dir.onScroll = function (scrollLeft) {
                elem.scrollLeft(scrollLeft);
            };

            dir.setSize = function (data) {
                elem.width(data.availWidth - data.lockedWidth);
            };

            dir.destroy = function () {
                dir.destWatch();
                model = undefined;
            };

            dir.init();
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("rpComplexGrid")
        .directive('rpCgHeadersFree', [
            'rpCgEventName',
            rpCgHeadersFree
        ]);
})(angular);


//  Source: _lib\realpage\complex-grid\js\directives\grid-options.js
//  Complex Grid Options Directive

(function (angular) {
    "use strict";

    function rpCgOptions($parse, timeout, eventName) {
        function link(scope, elem, attr) {
            var body,
                dir = {};

            dir.init = function () {
                dir.visible = false;
                scope.rpCgOptions = dir;
                dir.grid = $parse(attr.targetGrid)(scope);
                dir.destWatch = scope.$on("$destroy", dir.destroy);
            };

            dir.body = function () {
                body = body || angular.element("body");
                return body;
            };

            dir.toggle = function () {
                dir.visible = !dir.visible;

                if (dir.visible) {
                    timeout(dir.bind);
                }
                else {
                    dir.body().off("click.rpCgOptions");
                }
            };

            dir.bind = function () {
                dir.body().on("click.rpCgOptions", dir.hide);
            };

            dir.hide = function () {
                scope.$apply(function () {
                    dir.visible = false;
                });

                dir.body().off("click.rpCgOptions");
            };

            dir.updateLayout = function () {
                dir.grid.publish(eventName.dataReady);
            };

            dir.destroy = function () {
                dir.destWatch();
                dir.visible = false;
            };

            dir.init();
        }

        return {
            link: link,
            restrict: "C"
        };
    }

    angular
        .module("rpComplexGrid")
        .directive("rpCgOptions", ["$parse", "timeout", "rpCgEventName", rpCgOptions]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\directives\grid-body-cell.js
//  Complex Grid Body Cell Directive

(function (angular) {
    "use strict";

    function rpCgBodyCell($templateCache, $compile) {
        function link(scope, elem, attr) {
            var dir = {};

            dir.init = function () {
                dir.config = scope.column.config;

                if (dir.config.templateUrl) {
                    dir.assembleChild().appendChild();
                }

                scope.rpCgBodyCell = dir;
                scope.$on('$destroy', dir.destroy);
            };

            dir.assembleChild = function () {
                var url = dir.config.templateUrl,
                    html = $templateCache.get(url),
                    child = angular.element(html);

                dir.child = $compile(child)(scope);

                return dir;
            };

            dir.appendChild = function () {
                elem.children().remove();
                elem.append(dir.child);
            };

            dir.destroy = function () {
                if (dir.config.templateUrl) {
                    dir.child.remove();
                }
                dir.config = undefined;
            };

            dir.init();
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("rpComplexGrid")
        .directive('rpCgBodyCell', ['$templateCache', '$compile', rpCgBodyCell]);
})(angular);


//  Source: _lib\realpage\complex-grid\js\models\grid-filters.js
//  Complex Grid Filters Model

(function (angular) {
    "use strict";

    function factory() {
        var filters = {};

        filters.currency = function (data) {
            data = parseFloat(data, 10);
            return '$' + data.toLocaleString();
        };

        var model = {
            filters: filters
        };

        model.register = function (dataType, dataFilter) {
            model.filters[dataType] = dataFilter;
            return model;
        };

        model.hasFilter = function (dataType) {
            return !!model.filters[dataType];
        };

        model.getFilter = function (dataType) {
            return model.filters[dataType];
        };

        model.extendFilters = function (filters) {
            angular.extend(model.filters, filters);
            return model;
        };

        return model;
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgFilters', [factory]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\filters\grid-filter.js
//  Complex Grid Filter

(function (angular) {
    "use strict";

    function filter(filters) {
        return function (data, dataType) {
            if (filters.hasFilter(dataType)) {
                return filters.getFilter(dataType)(data);
            }
            else {
                // logc('RpCgFilters: filter for ' + dataType + ' is not defined');
                return data;
            }
        };
    }

    angular
        .module("rpComplexGrid")
        .filter('rpCgFilter', ['rpCgFilters', filter]);
})(angular);


//  Source: _lib\realpage\complex-grid\js\directives\grid-body-free.js
//  Complex Grid Body Free Directive

(function (angular) {
    "use strict";

    function rpCgBodyFree(evn) {
        function link(scope, elem, attr) {
            var model,
                dir = {};

            dir.init = function () {
                model = scope.model;
                scope.rpCgBodyFree = dir;
                elem.on('scroll', dir.onScroll);
                model.subscribe(evn.resize, dir.onResize);
                dir.destWatch = scope.$on('$destroy', dir.destroy);
            };

            dir.onScroll = function () {
                model.publish(evn.scroll, elem.scrollLeft());
            };

            dir.onResize = function (data) {
                elem.width(data.availWidth - data.lockedWidth);
            };

            dir.destroy = function () {
                dir.destWatch();
                model = undefined;
            };

            dir.init();
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("rpComplexGrid")
        .directive('rpCgBodyFree', [
            'rpCgEventName',
            rpCgBodyFree
        ]);
})(angular);


//  Source: _lib\realpage\complex-grid\js\directives\grid.js
//  Complex Grid Directive

(function (angular) {
    "use strict";

    function rpCg(timeout, evn, windowSize) {
        function link(scope, elem, attr) {
            var model,
                dir = {
                    maxWidthSet: false
                };

            dir.init = function () {
                scope.rpCg = dir;
                model = scope.model;
                var subs = model.subscribe;
                subs(evn.dataReady, dir.setWidth);
                subs(evn.updateScroll, dir.updateScroll);
                dir.destWatch = scope.$on('$destroy', dir.destroy);
                dir.resizeWatch = windowSize.subscribe(dir.setWidth);
            };

            dir.removeBusy = function () {
                elem.removeClass('busy');
            };

            dir.updateScroll = function () {
                timeout(scope.floatScroll.setSize, 10);
            };

            dir.calcWidth = function () {
                var availWidth = elem.parent().width(),
                    totalWidth = model.getTotalWidth(),
                    lockedWidth = model.getLockedWidth();

                availWidth = availWidth > totalWidth ? totalWidth : availWidth;

                return {
                    availWidth: availWidth,
                    lockedWidth: lockedWidth
                };
            };

            dir.setWidth = function () {
                var widthData = dir.calcWidth();

                if (!dir.maxWidthSet) {
                    dir.maxWidthSet = true;
                    elem.css('maxWidth', model.getTotalWidth());
                }

                dir.updateScroll();
                timeout(dir.removeBusy, 10);
                model.publish(evn.resize, widthData);
            };

            dir.destroy = function () {
                dir.destWatch();
                dir.resizeWatch();
                model = undefined;
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
            templateUrl: "realpage/complex-grid/templates/grid.html"
        };
    }

    angular
        .module("rpComplexGrid")
        .directive('rpCg', [
            'timeout',
            'rpCgEventName',
            'windowSize',
            rpCg
        ]);
})(angular);

//  Source: _lib\realpage\complex-grid\js\models\grid.js
//  Complex Grid Model

(function (angular) {
    "use strict";

    function factory($filter, $timeout, eventsManager, evn, rowModel, filters) {
        return function () {
            var state = {},
                events = eventsManager(),
                eventNames = Object.keys(evn);

            var model = {
                rows: [],
                state: state,
                rowHeightClass: 'large',
                events: events.setEvents(eventNames)
            };

            model.init = function () {
                events.subscribe(evn.sortBy, model.sortBy);
                events.subscribe(evn.toggleRow, model.toggleRow);
                return model;
            };

            model.edit = function (bool) {
                bool = bool === undefined ? true : bool;
                state.edit = bool;
                return model;
            };

            model.format = function (data, dataType) {
                if (!filters.hasFilter(dataType)) {
                    return data;
                }
                else {
                    return filters.getFilter(dataType)(data);
                }
            };

            model.sortBy = function (header) {
                var groupID,
                    list = [],
                    ordList = [],
                    sort = $filter('orderBy'),
                    reverse = header.getSortDir(),
                    key = 'data.' + header.getKey();

                model.rows.forEach(function (row, index) {
                    var aggregate = row.isAggregate(),
                        groupHeader = row.isGroupHeader(),
                        newGroup = groupID != row.getGroupID();

                    if (newGroup || groupHeader || aggregate) {
                        groupID = row.getGroupID();

                        if (!list.empty()) {
                            list = sort(list, key, reverse);
                            ordList = ordList.concat(list);
                            list = [];
                        }

                        if (groupHeader || aggregate) {
                            ordList.push(row);
                            return;
                        }
                        else {
                            list.push(row);
                        }
                    }
                    else {
                        list.push(row);
                    }

                    if (index == model.rows.length - 1 && !list.empty()) {
                        list = sort(list, key, reverse);
                        ordList = ordList.concat(list);
                        list = [];
                    }
                });

                model.rows = ordList;
            };

            model.toggleRow = function (row) {
                if (!row.isGroupHeader()) {
                    return;
                }

                var skip = true,
                    open = row.isOpen();

                row.open(!open);

                model.rows.forEach(function (item) {
                    if (item.is(row)) {
                        skip = false;
                        return;
                    }
                    else if (skip) {
                        return;
                    }

                    var desc = item.isDescOf(row),
                        child = item.isChildOf(row),
                        sibl = item.isSiblingOf(row),
                        grpHeader = item.isGroupHeader();

                    if (open && (sibl || desc)) {
                        item.show(false);

                        if (grpHeader) {
                            item.open(false);
                        }
                    }
                    else if (sibl || (child && grpHeader)) {
                        item.show();
                    }

                    if (!sibl && !desc) {
                        skip = true;
                    }
                });

                model.publish(evn.updateScroll);
            };

            model.forEachRow = function (fn) {
                model.rows.forEach(fn);
                return model;
            };

            model.setConfig = function (gridConfig) {
                model.gridConfig = gridConfig;
                model.headers = gridConfig.getHeaders();
                model.columns = gridConfig.getColumns();
                model.emptyMsg = gridConfig.getEmptyMsg();
                model.headers.setEvents(model.events);
                return model;
            };

            model.saveChanges = function () {
                model.gridDataCopy = angular.copy(model.gridData);
                return model;
            };

            model.flushChanges = function () {
                model.setData(model.gridDataCopy);
                return model;
            };

            model.setData = function (list) {
                model.gridData = list;
                model.gridDataCopy = angular.copy(list);

                model.rows.flush();

                list.forEach(function (rowData) {
                    var rowType = rowData.rowType,
                        row = rowModel().setGrid(model),
                        columns = model.gridConfig.getColumns();

                    row
                        .setData(rowData)
                        .setEvents(events)
                        .setColumns(columns);

                    if (rowType) {
                        var config = model.gridConfig.getRowConfig(rowType);
                        row.extendColumns(config);
                    }

                    model.rows.push(row);
                });

                $timeout(function () {
                    events.publish(evn.dataReady);
                });

                return model;
            };

            model.subscribe = function () {
                return events.subscribe.apply(events, arguments);
            };

            model.publish = function () {
                return events.publish.apply(events, arguments);
            };

            model.getColumnVal = function (config, row) {
                var methodName = config.methodName,
                    getMethod = model.gridConfig.getMethod,
                    localMethods = ['getAverage', 'getTotal'],
                    isLocalMethod = localMethods.contains(methodName),
                    configHasMethod = model.gridConfig.hasMethod(methodName),
                    method = configHasMethod ? getMethod(methodName) : angular.noop;

                method = isLocalMethod ? model[methodName] : angular.noop;

                return method(config, row, model.gridData);
            };

            model.getTotal = function (column, row, rows) {
                var total = 0;

                model.rows.forEach(function (item) {
                    if (item.isGroupHeader() || item.isAggregate()) {
                        return;
                    }

                    if (item.isSiblingOf(row) || item.isDescOf(row)) {
                        total += parseInt(item.getData()[column.key], 10);
                    }
                });

                return total;
            };

            model.getAverage = function (column, row, rows) {

            };

            model.getTotalWidth = function () {
                return model.gridConfig.totalWidth();
            };

            model.getFreeWidth = function () {
                return model.gridConfig.freeWidth();
            };

            model.getLockedWidth = function () {
                return model.gridConfig.lockedWidth();
            };

            model.getMaxWidth = function () {
                return model.gridConfig.maxWidth();
            };

            model.toggleZeroRows = function (hide) {
                model.rows.forEach(function (row) {
                    row.toggleZeroRow(hide);
                });
            };

            model.destroy = function () {
                events.destroy();
                model = undefined;
                events = undefined;
            };

            return model.init();
        };
    }

    angular
        .module("rpComplexGrid")
        .factory('rpCgModel', [
            '$filter',
            '$timeout',
            'eventsManager',
            'rpCgEventName',
            'rpCgRowModel',
            'rpCgFilters',
            factory
        ]);
})(angular);


