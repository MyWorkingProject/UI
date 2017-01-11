
(function (angular) {
    "use strict";

    function factory(
        $filter,
        $window,
        gridModel,
        gridConfig,
        selectUnitTypeModel,      
        selectUnitTypeError) {
        var grid, model = {};
        model.originalData = {};
        model.isSelectAll = false;

        model.init = function () {
            grid = model.grid = gridModel();
            grid.subscribe('filterBy', model.filterGrid);
            grid.subscribe('sortBy', model.sortGrid);
            grid.setConfig(gridConfig).setEmptyMsg(selectUnitTypeModel.text.noDataFound);           
            return model;
        };

        model.load = function (data) {
            model.setGridData(data);
        };

        model.setGridData = function (response) {           
            grid.flushData().busy(true);
            grid.setData(response).busy(false);                          
        };

        model.getSelectedUnitTypes = function () {
            return $filter('filter')(model.grid.data.records, { isSelected: 'true' });
        };
           
        model.setGridFilterState = function (state) {
            grid.setFilterState(state);
            return model;
        };

        model.sortGrid = function () {
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
            grid.setData({ records: data }).busy(false);
        };

        model.filterGrid = function () {          
            var data = $filter('filter')(model.originalData.records, {
                name: model.grid.filtersModel.filterData.name,
                unitCount: model.grid.filtersModel.filterData.unitCount
            });         
            grid.setData({
                records: data
            }).busy(false);
        };

        return model.init();
    }
      
    angular
        .module("budgeting")
        .factory('selectUnitTypeGridFactory', [
            '$filter',
            '$window',
            'rpGridModel',
            'selectUnitTypeGridConfig',
            'selectUnitTypeModel',         
            'selectUnitTypeError',            
            factory
        ]);
})(angular);
