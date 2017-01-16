//  Recall Distributed Allocation Grid Model

(function (angular) {
    'use strict';

    function factory($filter, gridModel) {

        return function (gridConfig, isHistory) {
            var model = {},
                grid = model.grid = gridModel();

            model.init = function () {
                model.isChecked = false;
                grid
                    .setConfig(gridConfig)
                    .setEmptyMsg('No results were found');
                return model;
            };

            model.setGridData = function (response) {
                var gridData = {};
                angular.copy(response, gridData);
                if (!isHistory) {
                    gridData.data.records = $filter('filter')(response.data.records, {
                        isRecalled: isHistory
                    });
                }
                logc(JSON.stringify(gridData.data.records));
                grid
                    .setData(gridData.data)
                    .busy(false);
                return model;
            };

            model.getSelectedList = function (distID) {
                var dataRows = [];
                var girdData = $filter('filter')(model.grid.data.records, {
                    isRecalled: true
                });
                girdData.forEach(function (item) {
                    dataRows.push(item.allocationDistributionID);
                });
                return dataRows;
            };
            return model.init();
        };
    }
    angular
        .module('budgeting')
        .factory('recallDistGridModel', [
                "$filter",
               "rpGridModel",
                factory
        ]);
})(angular);
