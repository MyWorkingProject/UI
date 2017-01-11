(function (angular) {
    "use strict";

    function gridFactory(defaultAdjModel, gridConfig, rpGridModel, i18n) {
        var grid = {},
            gridModel = null;

        grid.MAX_ROWS = 3;

        grid.init = function () {
            grid.model = gridModel = rpGridModel();
            gridModel.setEmptyMsg(i18n.translate("def_adj_not_available"));

            gridConfig.setSrc(grid);            
            return grid;
        };

        grid.populateGrid = function () {
            var gridData = defaultAdjModel.getGridData();
            //set columns
            gridData[0].rowType = "baseRow";
            gridData[0].description = defaultAdjModel.getBaseRowTitle();

            gridData[1].rowType = "adjustmentPercent";
            gridData[1].description = i18n.translate("def_adj_percent");

            gridData[2].rowType = "resultsRow";
            gridData[2].description = i18n.translate("def_adj_amt");


            gridModel.setData({
                totalRecords: grid.MAX_ROWS,
                records: gridData
            });
        };

        grid.initGrid = function(startYear, startMonth, noOfPeriods) {
            gridConfig.initColumns(startYear, startMonth, noOfPeriods);
            gridModel.setConfig(gridConfig.config);
        };

        grid.reset = function () {
            gridModel.flushChanges();
        };

        return grid.init();
    }

    angular
        .module("budgeting")
        .factory("defaultAdjGridModel", [
                "defaultAdjModel",
                "defaultAdjGridConfig",
                "rpGridModel",
                "defaultAdjTranslatorSvc",
                gridFactory
        ]);

})(angular);
