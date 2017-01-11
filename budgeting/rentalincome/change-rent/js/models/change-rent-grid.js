/* CLASSIC GRID CONFIGURATION */
(function (angular) {
    "use strict";

    function gridFactory(gridConfig, rpGridModel) {
        var grid = {},
            gridModel = null;

        grid.init = function () {
            grid.model = gridModel = rpGridModel();
            gridConfig.setSrc(grid);
            
            return grid;
        };

        grid.initGrid = function(calcuStateParams) {
            gridConfig.initColumns(calcuStateParams.startYear, 
                calcuStateParams.startMonth, calcuStateParams.noOfPeriods);
            gridModel.setConfig(gridConfig.config);
        };

        grid.populateGrid = function (baseRecords) {
            gridModel.setData({
                totalRecords: 1,
                records: baseRecords
            });
        };

        grid.reset = function () {
            gridModel.flushChanges();
        };

        return grid.init();
    }

    angular
        .module("budgeting")
        .factory("changeRentGridModel", [
                "changeRentGridConfig",
                "rpGridModel",
                gridFactory
        ]);

})(angular);

