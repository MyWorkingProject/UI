//  Import category Gird Model

(function (angular) {
    "use strict";

    function importCategoryGridModel(gridModel, gridConfig, impCatModel, errorModel, $filter) {
        var model, grid, filterState;
        model = {};

        filterState = {
            active: false
        };

        model.gridData = {};
        model.gridOrgData = {};

        grid = gridModel().setConfig(gridConfig);
        grid.flushData().busy(true);

        model.setGridReady = function () {
            model.grid = grid;
            grid.subscribe('filterBy', model.filterload);
            grid.setFilterState(filterState).setEmptyMsg('No categories found.');

            return model;
        };

        model.filterload = function () {
            var data = grid.busy(true).flushData().getQuery();
            model.gridData = impCatModel.filterSvc(data, model.gridOrgData);
            model.setGridData();
        };

        model.loadAccountingCategories = function () {
            impCatModel.getCategoriesAcc().then(model.loadAccsGrid, errorModel.onError);
        };

        model.loadCSVFile = function () {
            impCatModel.loadFile(impCatModel.getUploadedFile()).then(model.loadAccsGrid, errorModel.onError);
        };

        model.loadAccsGrid = function (resp) {
            //if (impCatModel.selectCsvForm()) {
                model.useResult(resp.records);
            //}
            //else {
                //model.useResult(resp.accountCategoryList);
            //}
            model.setGridData();
        };

        model.useResult = function (result) {
            model.gridOrgData = {};
            angular.forEach(result, function (item) {
                item.selectedBit = false;
            });

            model.gridOrgData = { records: result };
            model.gridData = model.gridOrgData;
        };

        model.setGridData = function () {
            grid.setData(model.gridData).busy(false);
        };

        model.flushGridData = function () {
            grid.flushData();
            return model;
        };

        model.saveGlCategories = function () {
            impCatModel.saveCategories('osa', model.gridOrgData.records).then(model.showSuccMessage, errorModel.onError);
        };

        model.saveGlAccountsCsv = function () {
            impCatModel.saveCategories('csv', model.gridOrgData.records).then(model.showSuccMessage, errorModel.onError);
        };

        model.showSuccMessage = function (resp) {
            impCatModel.setPostCalled(true);
            errorModel.showSuccMessage();
            return true;
        };

        model.deleteGls = function () {
            model.gridOrgData.records = $filter('filter')(model.gridData.records, {
                'selectedBit': false
            }, false);
            model.gridData = model.gridOrgData;
            model.setGridData();
        };

        model.reset = function () {
            model.gridData = {};
            model.gridOrgData = {};
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('importCategoryGridModel', [
            'rpGridModel',
            'importCategoryGrid',
            'importCategoryModel',
            'ImportCategoryErrorModel',
            '$filter',
            importCategoryGridModel
        ]);
})(angular);
