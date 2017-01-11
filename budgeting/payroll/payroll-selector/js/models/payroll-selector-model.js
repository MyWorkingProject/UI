//  Users List Model

(function (angular) {
    'use strict';

    function factory($filter, gridModel) {
        return function (gridConfig) {
            var model = {},
                grid  = model.grid = gridModel();

            model.init = function () {
                grid
                    .setConfig(gridConfig)
                    .setEmptyMsg("No results found");
                grid
                    .subscribe("filterBy", model.searchEmployee);
                return model;
            };

            model.searchEmployee = function () {
                var data = $filter('filter')(model.gridData.records, {
                    employeeName: model.grid.filtersModel.filterData.employeeName,
                    jobTitle: model.grid.filtersModel.filterData.jobTitle
                });
                model.grid.setData({ records: data }).busy(false);
            };
            
            model.setGridData = function (response) {
                model.gridData = angular.copy(response.data);
                grid
                    .setData(response.data)
                    .busy(false);
                return model;
            };
          
            return model.init();
        };
    }
    angular
        .module('budgeting')
        .factory('employeeSelectorModel', [
                "$filter",
                "rpGridModel",
                factory
        ]);
})(angular);
