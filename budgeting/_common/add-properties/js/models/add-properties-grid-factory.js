
(function (angular) {
    "use strict";

    function factory(
        $filter,
        gridModel,
        gridConfig,
        addPropertiesModel,      
        addPropertiesError) {
        var grid, model = {};
        model.displayProperties = { mastarChart: false };
        model.isSelectAll = false;

        model.init = function () {
            grid = model.grid = gridModel();         
            grid.setConfig(gridConfig).setEmptyMsg(addPropertiesModel.text.noDataFound);           
            return model;
        };

        model.load = function (data) {            
            model.setGridData(data);
        };

        model.setGridData = function (response) {           
            grid.flushData().busy(true);
            var data = { records: [] };
            if (model.displayProperties.mastarChart) {
                response.records.forEach(function (item) {
                    if (item.masterChartID>0) {
                       data.records.push(item);
                    }
                });                               
                grid.setData(data).busy(false);
            }
            else{
                grid.setData(response).busy(false);              
            }            
        };

        model.getSelectedProperties = function () {
            return $filter('filter')(model.grid.data.records, { isSelected: 'true' });
        };
           
        model.setGridFilterState = function (state) {
            grid.setFilterState(state);
            return model;
        };

        return model.init();
    }
      
    angular
        .module("budgeting")
        .factory('addPropertiesGridFactory', [
            '$filter',
            'rpGridModel',
            'addPropertiesGridConfig',
            'addPropertiesModel',         
            'addPropertiesError',            
            factory
        ]);
})(angular);
