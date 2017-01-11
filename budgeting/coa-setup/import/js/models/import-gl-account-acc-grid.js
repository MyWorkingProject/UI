// GL Import Grid Model for Accounting/CSV/Yardi/MRI

(function (angular) {
    "use strict";

    function importGlGridModel(langTranslate, gridModel, gridConfig, accModel, errModel) {
        var model, translate, grid, filterState;
        translate = langTranslate('import').translate;
        model = {};
        model.chartID = 0;

        filterState = {
            active: false
        };

        model.gridData = {};

        model.setGridReady = function (data) {
            grid = gridModel().setConfig(gridConfig.updateGridModel(data));
            grid.flushData().busy(true);
        };

        model.updateGrid = function () {
            model.grid = grid;
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.setFilterState(filterState).setEmptyMsg('No gl accounts found.');

            return model;
        };

        model.load = function () {
            var data = grid.busy(true).flushData().getQuery();
            return accModel.getStagingData(model.getChartID(), data).then(model.setGridData, errModel.getStagingDataError);
        };

        model.paginate = function () {
            var data = grid.getQuery();
            return accModel.getStagingData(model.getChartID(), data).then(model.addGridData, errModel.getStagingDataError);
        };

        model.setGridData = function (response) {
            model.gridData = response.data.records;
            grid.setData(response.data).busy(false);
        };

        model.addGridData = function (response) {
            grid.addData(response.data).busy(false);
        };

        model.flushGridData = function () {
            grid.flushData();
            return model;
        };

        model.deleteGls = function () {
            var selGls = model.getGlsSelected();
            return accModel.delGlAccs(selGls);
        };

        model.getGlsSelected = function () {
            var data = grid.getSelectionChanges().selected;
            var records = model.gridData;
            var filteredArray = records.filter(function (item) {
                return data.indexOf(item.glAccountNumber) > -1;
            });

            return filteredArray;
        };

        model.hasGlSelections = function () {
            return grid.hasSelectionChanges();
        };

        model.setChartID = function (val) {
            model.chartID = val;
        };

        model.getChartID = function () {
            return model.chartID;
        };

        model.reset = function () {
            model.chartID = 0;
            model.gridData = {};
        };

        return model;
    }
    angular
        .module("budgeting")
        .factory('importGlGridModel', [
            'appLangTranslate',
            'rpGridModel',
            'importGlAccGrid',
            'importGlAccModel',
            'importGlAccMsgModel',
            importGlGridModel
        ]);
})(angular);