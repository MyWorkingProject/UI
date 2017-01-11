
(function (angular) {
    "use strict";

    function factory(gridModel, gridConfig, manageGlGrid, exHandling, $filter) {
        var model, translate, grid, filterState;
        model = {};


        model.setGridReady = function (data) {
         //   gridConfig.setSrc(vm);
            grid = gridModel().setConfig(gridConfig.updateGridModel(data));
            grid.flushData().busy(true);
        };

        model.updateGrid = function () {
            model.grid = grid;
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.setEmptyMsg('No results were found');
            return model;
        };

        model.load = function () {
            var data = grid.busy(true).flushData().getQuery();
            manageGlGrid.getGlAccList(data).success(model.setGridData, exHandling.getglListException);
        };

        model.paginate = function () {
            var data = grid.getQuery();
            return manageGlGrid.getGlAccList(data).success(model.addGridData, exHandling.getglListException);
        };

        model.setGridData = function (response) {
            model.setSelectColumn(response);
            grid.setData(response).busy(false);
        };

        model.setSelectColumn = function (data) {
            angular.forEach(data.records, function (item) {
                item.isSelected = false;
            });
        };

        model.addGridData = function (response) {
            model.setSelectColumn(response);
            grid.addData(response).busy(false);
        };

        model.getSelectedGls = function () {
            return $filter('filter')(model.grid.data.records, { isSelected: 'true' });
        };

        model.isValidWizardNext = function () {
            if (model.grid.data.records.length > 0) {
                return true;
            }
            else {
                exHandling.wizAlertException();
                return false;
            }
        };



        return model;
    }
    angular
        .module("budgeting")
        .factory('manageGlGridFactory', [
            'rpGridModel',
            'manageGlAccountConfig',
            'manageGlGrid',
            'manageGlErrorHandling',
            '$filter',
            factory
        ]);
})(angular);