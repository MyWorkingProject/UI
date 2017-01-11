//  hourly Model

(function (angular) {
    "use strict";

    function factory(
        detailsConstant,          
        bmGrid) {
        return function (gridConfig) {
            var model = {} ,
                grid,             
                responseData,              
                rowConfig = detailsConstant.getRowConfigs();

            model.init = function () {
                grid = model.grid = bmGrid()
                    .setConfig(gridConfig);
                return model;
            };

             model.setData = function (data) {             
                      
                model.setGridData(data.details);
                return model;
            };

            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function (data) {
                //var defaultRow = gridConfig.getDefaultRow({}, 0),
                //    dataRows = serviceGroupMapper.buildGridData(defaultRow, data);
                grid
                    .setData(data)
                    .refresh();

                return model;
            };

            /**
          * get all the column Info
          */
            model.getColumnInfo = function () {
                return grid;
            };


            model.destroy = function () {
                grid.destroy();
                model = undefined;
            };
             model.makeLeaseComment=function(data){  
             alert(1);
              };
            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("lrDetailsModel", [
            'lrDetailsConstantModel',
            'bmGridModel',
            factory]);
})(angular);
