(function (angular) {
    "use strict";
    var fn = angular.noop;

    function TaskBudgetModelCtrl($scope, model, listSVC) {
        var tasks, grid, headers, filters, pagination, pgData, activeWatch, watch1, watch2, watch3, watch4;

        tasks = this;
        tasks.model = model;
        watch1 = fn;
        watch2 = fn;
        watch3 = fn;
        watch4 = fn;

        tasks.init = function () {
            //$scope.$watch('page.model.form.alltasks.isActive', tasks.getData);
            $scope.$on('$destroy', tasks.reset);
            tasks.getData();
        };
        tasks.reset = function () {
            model.reset();
        };
        tasks.getData = function () {
            tasks.initList();
        };

        tasks.initList = function () {
            grid = tasks.model.grid;
            headers = grid.headersModel;
            filters = grid.filtersModel;
            pagination = grid.pagination;
            pgData = pagination.data;
            pgData.pages.resultsPerPage = 5;
            watch1 = headers.events.sort.subscribe(tasks.sortList);
            pagination.data.sortBy = {
                budgetYear: "asc"
            };
            watch2 = pagination.events.update.subscribe(tasks.paginateList);
            watch3 = filters.events.filter.subscribe(tasks.filterList);
            tasks.model.grid.flushRows().busy(true).pagination.reset();
            grid.busy(true);
            //model.getTaskModelData(pgData).then(tasks.loadList, listSVC.onError);
            var data = model.getTaskModelData();
            tasks.loadList(data);

        };

        tasks.loadList = function (data) {
            grid.flushRows().setData(data).build().busy(false);
        };

        tasks.paginateList = function () {
            //model.getTaskModelData(pgData).then(tasks.addData, listSVC.onError);
            var data = model.getTaskModelData();
            tasks.addData(data);

        };

        tasks.addData = function (data) {
            grid.flushRows().addData(data).build();
        };
        tasks.sortList = function (sortBy) {
            pagination.reset().setSortBy(sortBy);
            tasks.initList();
        };
        tasks.filterList = function (filter) {
            pagination.reset().data.filterBy = filter;
            tasks.initList();
        };
        tasks.init();
    }

    angular
        .module("budgeting")
        .controller('TaskBudgetModelCtrl', [
            '$scope',
            'taskBudgetModel',
            'taskBudgetModelSvc',
            TaskBudgetModelCtrl
        ]);
})(angular);
