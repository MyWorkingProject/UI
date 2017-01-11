// Assign GL Accounts Model

(function (angular) {
    "use strict";

    function factory(agaConstants, rpGridModel) {
        var defaultData = {
            assignGLsForm: null,
            overwriteGLAssignments: false
        };

        return function(gridConfig) {
            var model = angular.copy(defaultData);

            var gridModel = rpGridModel();
                gridModel.setConfig(gridConfig);

            model.grid = gridModel;

            model.setGridData_old = function(response) {
                angular.forEach(response.records, function(currData) {
                    //add required attribute for gl-account-search
                    currData[agaConstants.columnKey.glAccount] = {
                        masterchartID: currData.masterChartID || 0,
                        glAccountNumber: "",
                        glAccountDescription: ""
                    };
                });

                gridModel.setData(response);
            };

            model.setGridData = function(response) {
                angular.forEach(response.records, function(currData) {
                    //add required attribute for gl-account-search
                    currData[agaConstants.columnKey.glAccount] = {
                        masterchartID: currData.masterChartID || 0,
                        glAccountNumber: currData.glAccountNumber || "",
                        glAccountDescription: currData.glAccountDescription || ""
                    };
                });
                gridModel.setData(response);
            };
            


            model.getResponseData = function() {
                var gridData = model.grid.getData();

                return {
                    masterCharts: model.gridDataToJSON(gridData),
                    isOverwriteAssignment: model.overwriteGLAssignments
                };
            };

            model.gridDataToJSON = function(data) {
                var masterChartsList = [];
                angular.forEach(data.records, function(currRow) {
                    var updatedData = {
                        masterChartID: currRow.masterChartID,
                        masterChartName: currRow.masterChartName,
                        glAccountNumber: currRow.glAccount.glAccountNumber,
                        glAccountDescription: currRow.glAccount.glAccountDescription
                    };

                    masterChartsList.push(updatedData);
                });

                return masterChartsList;
            };

            model.destroy = function() {
                gridModel.flushData();
                gridModel = undefined;
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("assignGLsModel", [
                "assignGLsConstantModel",
                "rpGridModel",
                factory
        ]);

})(angular);