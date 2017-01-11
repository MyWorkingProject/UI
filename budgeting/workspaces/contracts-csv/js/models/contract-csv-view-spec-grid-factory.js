
(function (angular) {
    "use strict";

    function factory(gridModel, gridConfig, contractModel, exception,viewModel, $filter) {
        var model, translate, grid, filterState;
        model = {};

        model.gridData = {
            records: ""
        };


        model.init = function () {
            grid = model.grid = gridModel();
            //grid.subscribe('sortBy', model.load);
            //grid.subscribe('filterBy', model.load);
            //grid.subscribe('paginate', model.paginate);
            grid.setConfig(gridConfig).setEmptyMsg('No results were found');
            return model;
        };

        model.loadGridConfig=function(){
            model.grid.setConfig(gridConfig);
        };

        model.load = function () {
           // model.grid.setConfig(gridConfig);
            var data = grid.busy(true).flushData().getQuery();
            model.setGridData();
            //return viewModel.getGridData(data).success(model.setGridData, exception.getCsvStatgingError);
        };

       
        model.setGridData = function (response) {
            //model.setSelectColumn(response);
            grid.setData(viewModel.getGridData()).busy(false);
        };


        return model.init();
    }
    angular
        .module("budgeting")
        .factory('contractsCSVViewGridFactory', [
            'rpGridModel',
            'contractCSVViewConfig',
            'contractsCSVModel',
            'contractCSVErrorHandling',
            'contractViewSpecModel',
            '$filter',
            factory
        ]);
})(angular);