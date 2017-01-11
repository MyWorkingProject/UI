//  Source: _lib\realpage\grid-pagination\js\templates\templates.inc.js
angular.module('rpGrid').run(['$templateCache', function($templateCache) {
$templateCache.put("realpage/grid-pagination/templates/grid-pagination.html",
"<div class=\"rp-grid-pagination\" ng-class=\"{active: model.isActive}\"><div class=\"rp-grid-pagination-inner\"><p class=\"rp-grid-pagination-displaying\">Displaying {{model.rangeStart}}-{{model.rangeEnd}} of {{model.dataCount}}</p><p class=\"rp-grid-pagination-controls prev\"><span ng-class=\"{active: model.allowFirst}\" ng-click=\"gridPagination.goToFirstPage()\" class=\"rp-grid-pagination-control rp-grid-pagination-control-first\"></span> <span ng-class=\"{active: model.allowPrev}\" ng-click=\"gridPagination.goToPrevPage()\" class=\"rp-grid-pagination-control rp-grid-pagination-control-prev\"></span></p><ul class=\"rp-grid-pagination-pages\"><li class=\"rp-grid-pagination-page\" ng-repeat=\"page in model.pages\" ng-class=\"{active: page.active}\" ng-click=\"gridPagination.goToPage(page)\">{{page.number + 1}}</li></ul><p class=\"rp-grid-pagination-controls\"><span ng-class=\"{active: model.allowNext}\" ng-click=\"gridPagination.goToNextPage()\" class=\"rp-grid-pagination-control rp-grid-pagination-control-next\"></span> <span ng-class=\"{active: model.allowLast}\" ng-click=\"gridPagination.goToLastPage()\" class=\"rp-grid-pagination-control rp-grid-pagination-control-last end\"></span></p></div></div>");
}]);


//  Source: _lib\realpage\grid-pagination\js\directives\grid-pagination.js
//  Grid Pagination Directive

(function (angular) {
    "use strict";

    function rpGridPagination() {
        function link(scope, elem, attr) {
            var dir = {},
                model = scope.model;

            dir.init = function () {
                scope.gridPagination = dir;
            };

            dir.goToPage = function (page) {
                if (!page.active) {
                    model.goToPage(page);
                }
            };

            dir.goToFirstPage = function () {
                model.goToFirstPage();
            };

            dir.goToPrevPage = function () {
                model.goToPrevPage();
            };

            dir.goToNextPage = function () {
                model.goToNextPage();
            };

            dir.goToLastPage = function () {
                model.goToLastPage();
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
            templateUrl: "realpage/grid-pagination/templates/grid-pagination.html"
        };
    }

    angular
        .module("rpGrid")
        .directive("rpGridPagination", [rpGridPagination]);
})(angular);

//  Source: _lib\realpage\grid-pagination\js\models\grid-pagination.js
//  Grid Pagination Model

(function (angular) {
    "use strict";

    function factory($filter) {
        return function () {
            var model,
                config;

            config = {
                currentPage: 0,
                pagesPerGroup: 5,
                recordsPerPage: 2,
                currentPageGroup: 0
            };

            model = {
                data: [],
                pages: [],
                config: config,
                pageGroups: [],
                isActive: false,
                allowPrev: false,
                allowNext: false,
                allowLast: false,
                allowFirst: false,
            };

            model.setConfig = function (data) {
                angular.extend(config, data);
                return model;
            };

            model.setData = function (data) {
                var dataCount = data.length;

                if (model._data === undefined) {
                    model._data = [].concat(data);
                }

                model.dataCount = dataCount;
                model.data = [].concat(data);
                model.setPageGroups(dataCount);
                model.isActive = dataCount !== 0;
                model.totalPages = Math.ceil(dataCount / config.recordsPerPage);
                return model;
            };

            model.getMaxPages = function () {
                return Math.ceil(model.dataCount / config.recordsPerPage);
            };

            model.setPageGroups = function (dataCount) {
                var setIndex = 0,
                    maxPages = model.getMaxPages(),
                    setCount = Math.ceil(dataCount / (config.pagesPerGroup * config.recordsPerPage));

                model.pages = [];
                model.pageGroups = [];

                while (setIndex < setCount) {
                    var pageStart = setIndex * config.pagesPerGroup,
                        pageEnd = (setIndex + 1) * config.pagesPerGroup;

                    if (pageEnd > maxPages) {
                        pageEnd = maxPages;
                    }

                    var pages = [],
                        pageIndex = 0;

                    for (var i = pageStart; i < pageEnd; i++) {
                        pages.push({
                            active: false,
                            number: setIndex * config.pagesPerGroup + pageIndex++
                        });
                    }

                    model.pageGroups.push(pages);

                    setIndex++;
                }

                model.setPageGroup();

                return model;
            };

            model.setGrid = function (grid) {
                model.grid = grid;
                grid.subscribe("sortBy", model.sort);
                grid.subscribe("filterBy", model.filter);
                return model;
            };

            model.sortData = function (sortBy) {
                var key = Object.keys(sortBy)[0],
                    reverse = sortBy[key] !== "ASC";

                return $filter("naturalSort")(model.data, key, reverse);
            };

            model.sort = function (sortBy) {
                var data = model.sortData(sortBy);
                model.sortBy = sortBy;
                model.setData(data).setGridData();
            };

            model.filterData = function (filterBy) {
                return $filter("filter")(model._data, filterBy);
            };

            model.filter = function (filterBy) {
                var data = model.filterData(filterBy);
                model.allowFirst = true;
                model.setData(data);
                if (model.sortBy) {
                    model.sort(model.sortBy);
                }
                model.goToFirstPage();
            };

            model.setPageGroup = function () {
                model.pages = model.pageGroups[config.currentPageGroup] || [];
                return model;
            };

            model.setDataRange = function () {
                model.rangeStart = config.currentPage * config.recordsPerPage + 1;
                model.rangeEnd = model.rangeStart + config.recordsPerPage - 1;

                if (model.rangeEnd > model.dataCount) {
                    model.rangeEnd = model.dataCount;
                }

                return model;
            };

            model.setControls = function () {
                model.allowFirst = !(config.currentPageGroup === 0 && config.currentPage === 0);
                model.allowPrev = config.currentPageGroup !== 0;
                model.allowNext = config.currentPageGroup != model.pageGroups.length - 1;
                model.allowLast = !(config.currentPageGroup === model.pageGroups.length - 1 &&
                    config.currentPage === model.pages.last().number);
                return model;
            };

            model.setActivePage = function () {
                model.pages.forEach(function (item) {
                    item.active = item.number === config.currentPage;
                });
                return model;
            };

            model.getDataSlice = function () {
                var start = config.currentPage * config.recordsPerPage,
                    end = start + config.recordsPerPage;

                if (end > model.dataCount) {
                    end = model.dataCount;
                }

                return model.data.slice(start, end);
            };

            model.setGridData = function () {
                var data = model.getDataSlice();
                model.grid.flushData().setData({
                    records: data
                });
                return model;
            };

            model.goToPage = function (page) {
                config.currentPage = page.number;
                model.setPageGroup().setDataRange().setControls().setActivePage().setGridData();
            };

            model.goToFirstPage = function () {
                if (!model.allowFirst) {
                    return;
                }
                config.currentPage = 0;
                config.currentPageGroup = 0;
                model.setPageGroup().setDataRange().setControls().setActivePage().setGridData();
            };

            model.goToPrevPage = function () {
                if (!model.allowPrev) {
                    return;
                }
                config.currentPageGroup--;
                config.currentPage -= config.pagesPerGroup;
                model.setPageGroup().setDataRange().setControls().setActivePage().setGridData();
            };

            model.goToNextPage = function () {
                if (!model.allowNext) {
                    return;
                }

                var maxPages = model.getMaxPages();
                config.currentPageGroup++;
                config.currentPage += config.pagesPerGroup;

                if (config.currentPage > maxPages) {
                    config.currentPage = maxPages;
                }

                model.setPageGroup().setDataRange().setControls().setActivePage().setGridData();
            };

            model.goToLastPage = function () {
                if (!model.allowLast) {
                    return;
                }
                config.currentPageGroup = model.pageGroups.length - 1;
                model.setPageGroup();
                config.currentPage = model.pages.last().number;
                model.setDataRange().setControls().setActivePage().setGridData();
            };

            model.destroy = function () {
                model = undefined;
                config = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpGrid")
        .factory("rpGridPaginationModel", ["$filter", factory]);
})(angular);

