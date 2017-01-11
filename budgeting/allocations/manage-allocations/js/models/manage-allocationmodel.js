//  Budgeting Overview Workflow MODEL

(function (angular) {
    "use strict";

    function factory(gridModel, gridConfig, svc, $filter, $window) {

        var model = {}, grid, filterState, updRecs = {};//, isSiteLevel = false;

        model.dataTarget = false;

        filterState = {
            active: false
        };

        model.init = function () {

            grid = model.grid = gridModel();
            grid.setConfig(gridConfig).setEmptyMsg('No results were found');

            grid.setResultsPerPage(20);

            //filters in Grid
            model.filterState = filterState;
            grid.subscribe('filterBy', model.filterCilentSidePage);
            grid.setFilterState(filterState).setEmptyMsg('No results were found.');

            //Sorting in Grid 
            grid.subscribe('sortBy', model.sort);

            return model;
        };

        model.setGridData = function (response) {
            var gridData = {}, gridDatacopy;
            //gridData.records = $filter('filter')(response.data.records, {
            //    isSiteLevel: isSiteLevel
            //});
            gridData.records = response.data.records;
            grid
                .setData(gridData)
                .busy(false);

            //creating copy of data/json object for filtering
            model.gridDatacopy = angular.copy(gridData);
            model.total = model.gridDatacopy.records.length;
            return model;
        };


        model.filterCilentSidePage = function () {
            var data = $filter('filter')(model.gridDatacopy.records,
                {
                    name: model.grid.filtersModel.filterData.name,
                    lastModifiedBy: model.grid.filtersModel.filterData.lastModifiedBy,
                    //lastModifiedDate: model.grid.filtersModel.filterData.lastModifiedDate,
                    description: model.grid.filtersModel.filterData.description
                });
            model.total = data.length;
            model.grid.setData({ records: data }).busy(false);
        };

        model.sort = function () {
            var data, validData, sortBy, sortByValue, reverse, activeRecords = [];
            data = grid.busy(true).getQuery();
            data = data.replace("?datafilter=", "");
            data = $window.atob(data);
            validData = JSON.parse(data);
            angular.forEach(validData.sortBy, function (value, key) {
                sortBy = key;
                sortByValue = value;
            });
            if (sortByValue === "ASC") {
                reverse = true;
            }
            else {
                reverse = false;
            }
            activeRecords = grid.getData();
            data = $filter('orderBy')(activeRecords.records, sortBy, reverse);
            model.grid.setData({ records: data }).busy(false);
        };


        model.getMngAllCopyData = function (record) {
            console.log(record);
        };




        return model.init();

    }
    angular
        .module("budgeting")
        .factory('allocationModelGridFactory', ['rpGridModel', 'allocationsConfig',
            'bdgtModelAllocationSvc', '$filter', '$window',
            factory
        ]);
})(angular);
