//Occupancy and Renewals > Summary > Grid Model
(function (angular) {
    "use strict";

    function factory(bmGridModel, oarSummaryGridConfig, oarBudgetDetails) {
        return function () {
            var grid = {},
                gridModel = null,
                gridConfig = null;

            grid.init = function() {
                grid.model = gridModel = bmGridModel();
                gridConfig = oarSummaryGridConfig(
                    grid,
                    oarBudgetDetails.getStartYear(),
                    oarBudgetDetails.getStartMonth() - 1,
                    oarBudgetDetails.getNoOfPeriods());

                gridModel.setConfig(gridConfig);

                return grid;
            };

            grid.setGridData = function(data) {
                var rowData = [];

                //add the series based on a specific order
                if(oarBudgetDetails.isDisplayOccupancyVacancy()) {
                    rowData.push(data.moveIns);
                    rowData.push(data.moveOuts);
                }
                if(oarBudgetDetails.isDisplayLeaseRenewals()) {
                    rowData.push(data.leaseRenewals);
                }
                if(oarBudgetDetails.isDisplayOccupancyVacancy()) {
                    rowData.push(data.occupancyPercent);
                }

                gridModel.setData(rowData)
                    .refresh();
            };

            grid.destroy = function() {
                gridModel.destroy();
                grid = undefined;
            };


            return grid.init();
        };
    }

    angular
        .module("budgeting")
        .factory("oarSummaryGridModel", [
            "bmGridModel",
            "oarSummaryGridConfig",
            "oarBudgetDetails",
            factory
        ]);
})(angular);