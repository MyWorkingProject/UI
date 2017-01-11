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
        .factory("calculatorGridModel", [
                "calculatorGridConfig",
                "rpGridModel",
                gridFactory
        ]);

})(angular);


/* COMPLEX GRID CONFIGURATION */
/*
(function (angular) {
    "use strict";

    function gridFactory(rpCgModel, rpCgConfigModel, calculatorGridConfig) {
        var grid = {},
            gridModel = rpCgModel(),
            gridConfig = rpCgConfigModel();

        grid.init = function () {
            grid.model = gridModel;

            //set configuration
            gridConfig.setSrc(grid);
            calculatorGridConfig(gridConfig);
            gridModel.setConfig(gridConfig);
            gridModel.rowHeightClass = "";
            
            return grid;
        };

        grid.populateGrid = function (baseRecords) {
            gridModel.setData(baseRecords);
        };

        grid.reset = function () {
            gridModel.flushChanges();
        };

        grid.toggleMonthlyRow = function(flag) {
            if(gridModel.rows && gridModel.rows.length > 0) {
                var monthlyRow = gridModel.rows[0],
                    isDisplay = flag;
                if(flag === undefined || flag === null) {
                    isDisplay = !monthlyRow.state.hidden;
                }

                monthlyRow.show(isDisplay);
            }
        };

        return grid.init();
    }

    angular
        .module("budgeting")
        .factory("calculatorGridModel", [
                "rpCgModel",
                "rpCgConfigModel",
                "calculatorGridConfig",
                gridFactory
        ]);
})(angular);
*/