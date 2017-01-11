// GL Import Grid Model for L&R

(function (angular) {
    "use strict";

    function importGlLRGridModel(langTranslate, gridModel, gridConfig, lrModel, errModel) {
        var model, translate, grid, filterState;
        translate = langTranslate('import').translate;
        model = {};
        model.chartID = 0;

        filterState = {
            active: false
        };

        model.gridData = {};

        model.setGridReady = function () {
            grid = gridModel().setConfig(gridConfig.updateLRGridModel());
            grid.flushData().busy(true);
        };

        model.updateGrid = function () {
            model.grid = grid;
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.setFilterState(filterState).setEmptyMsg('No properties found.');

            return model;
        };

        model.load = function () {
            var data = grid.busy(true).flushData().getQuery();
            lrModel.getProperties().then(model.updateResults, errModel.getPropertiesError);
        };

        model.updateResults = function (resp) {
            var result = lrModel.updateRecordsMessage(resp.data);
            model.setGridData(result);
        };

        model.updateRefreshResults = function (resp) {
            var result = {};
            result.records = lrModel.updateRefreshRecordsMessage(resp, model.gridData);
            model.setGridData(result);
        };

        model.paginate = function () {
            var data = grid.getQuery();
        };

        model.setGridData = function (response) {
            model.gridData = response.records;
            grid.setData(response).busy(false);
        };

        model.addGridData = function (response) {
            grid.addData(response).busy(false);
        };

        model.flushGridData = function () {
            grid.flushData();
            return model;
        };

        model.getPropsSelected = function () {
            var data = grid.getSelectionChanges().selected;
            var records = model.gridData;
            var filteredArray = records.filter(function (item) {
                return data.indexOf(item.propertyID) > -1;
            });

            return filteredArray;
        };

        model.hasPropsSelections = function () {
            return grid.hasSelectionChanges();
        };

        model.setChartID = function (val) {
            model.chartID = val;
        };

        model.getChartID = function () {
            return model.chartID;
        };

        model.saveLrGlAccs = function () {
            lrModel.saveGlAccs(model.getChartID(), model.getPropsSelected()).then(model.load, errModel.saveGlAccsError);
        };

        model.refreshGrid = function () {
            if (model.hasPropsSelections()) {
                lrModel.getStatus(grid.getSelectionChanges().selected.toString()).then(model.updateRefreshResults, errModel.getStatusError);
            }
        };

        model.reset = function () {
            model.chartID = 0;
            model.gridData = {};
        };

        return model;
    }
    angular
        .module("budgeting")
        .factory('importGlLRGridModel', [
            'appLangTranslate',
            'rpGridModel',
            'importGlLrGrid',
            'importGlLrModel',
            'importGlAccMsgModel',
            importGlLRGridModel
        ]);
})(angular);