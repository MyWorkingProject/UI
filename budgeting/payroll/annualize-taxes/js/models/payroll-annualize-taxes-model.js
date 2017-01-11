//  Users List Model

(function (angular) {
    'use strict';

    function factory($filter, gridModel) {
        return function (gridConfig) {
            var model = {},
                grid = model.grid = gridModel();

            model.init = function () {
                grid
                    .setConfig(gridConfig)
                    .setEmptyMsg('No results were found');
                return model;
            };

            model.setGridData = function (response) {
                //angular.forEach(response.data.records, function (item) {
                //    item.isSelected = false;
                //});
                grid
                    .setData(response.data)
                    .busy(false);
                return model;
            };

            model.getSelectedList = function (distID) {
                var dataRows = [];
                var girdData = $filter('filter')(model.grid.data.records);
                girdData.forEach(function (item) {
                    var dataRow = {
                        "annualizeTax": item.annualizeTax,
                        "payrollAnnualizeTaxID": item.payrollAnnualizeTaxID,
                        "distributedID": distID,
                        "payrollType": item.payrollType,
                        "dataType": item.dataType
                    };
                    dataRows.push(dataRow);
                });
                return dataRows;
            };
            return model.init();
        };
    }
    angular
        .module('budgeting')
        .factory('annualizeTaxGridModel', [
                "$filter",
               "rpGridModel",
                factory
        ]);
})(angular);
