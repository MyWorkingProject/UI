//  hourly Model

(function (angular) {
    "use strict";

    function factory(
        serviceGroupConstant,          
        bmGrid,     
        serviceGroupMapper) {
        return function (gridConfig) {
            var model = {} ,
                grid,             
                responseData,              
                rowConfig = serviceGroupConstant.getRowConfigs();

            model.init = function () {
                grid = model.grid = bmGrid()
                    .setConfig(gridConfig);
                grid.events.subscribe('toggleRow', model.toggleRows);
                return model;
            };

            model.setData = function (data) {
             
                //gridConfig
                //    .forEachColumn(serviceGroupMapper.resetData, [data.occupancyServiceGroup]);
                //responseData = angular.copy(data);         
                var dataRows = serviceGroupMapper.prepareOccupancyData(gridConfig, data.monthlyOccupancyVacancy, data.monthlyOccupancyVacancyReference);
                model.setGridData(dataRows);
                return model;
            };

            model.toggleRows = function (row) {
                grid.toggleRows(grid.getRowsBy({
                    groupID: row.getGroupID() + 1,
                    level: row.getLevel()
                }), row.isOpen());
            };

            model.handleReferenceRow = function (options) {
                //model.form.refValue = options.refValue;
                grid.toggleRows(grid.getRowsBy({
                    level: 5
                }), options.refValue);
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

            model.destroy = function () {
                grid.destroy();
                model = undefined;
            };

            /**
            * get all the column Info
            */
            model.getColumnInfo = function () {
                return grid;
            };

            /**
            * get all the Row Options Info
            */
            model.getRowOptions = function () {
                return grid;
            };



            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("lrSummaryModel", [
            'lrSummaryConstantModel',
            'bmGridModel',          
            'lrSummaryMapperModel',
            factory]);
})(angular);
