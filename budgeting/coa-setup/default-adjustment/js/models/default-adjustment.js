//  Default Adjustment Model

(function (angular) {
    "use strict";
    //defAdjGrid
    function factory(langTranslate, listSvc, bdgtModel, $filter, gridConfig, gridModel, errModel) {
        var model, translate, grid;
        translate = langTranslate('defaultAdjustment').translate;
        model = {};

        model.text = {
            pageTitle: translate('bdgt_defadj_page_title'),
            showFilters: translate('bdgt_defadj_show_filters'),
            hideFilters: translate('bdgt_defadj_hide_filters'),
            pageHeading: translate('bdgt_defadj_page_heading'),
            saveTxt: translate('bdgt_defadj_save_txt'),
            assignDefaultPerTxt: translate('bdgt_defadj_assgn_default_per_txt'),
            defaultPer: translate('bdgt_defadj_default_per_txt'),
            assignTxt: translate('bdgt_defadj_assign_txt'),
            cancelTxt: translate('bdgt_defadj_cancel_txt')
        };

        model.emptyData = {
            chartID: 0,
            adjPer: "",
            chartName: "",
            toggleDefAdjState: {
                state: {
                    open: false
                }
            },
            accTypeFiltrOptions: [{
                "name": "All",
                "value": ""
            }],
            showDataGrid: false,
            defBdgtModel: 2016,
            tooltipState: false,
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: ''
            }
        };

        model.formDefault = {};
        angular.copy(model.emptyData, model.formDefault);

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
            var params = {
                chartID: model.getChartID()
            };
            listSvc.abortGetCategoryData().getCategoryData(params, data).then(model.setGridData, errModel.onError);
            //model.getGridData(data).then(model.setGridData, errModel.onError);
            //manageGlGrid.getGlAccList(data).success(model.setGridData, exHandling.getglListException);
        };

        model.paginate = function () {
            var data = grid.getQuery();
            return model.getAccTypes(data).then(model.addGridData, errModel.onError);
            //return manageGlGrid.getGlAccList(data).success(model.addGridData, exHandling.getglListException);
        };

        model.setGridData = function (response) {
            model.setSelectColumn(response);
            grid.setData(response.data).busy(false);
            //model.setBdgtModel();
        };

        model.setSelectColumn = function (data) {
            angular.forEach(data.records, function (item) {
                item.selectedBit = false;
            });
        };

        model.addGridData = function (response) {
            model.setSelectColumn(response);
            grid.addData(response.data).busy(false);
        };

        model.setBdgtModel = function () {
            model.getBdgtModel().then(model.loadModelWorkFlow, errModel.onError);
        };

        model.loadModelWorkFlow = function (resp) {
            bdgtModel.updateDefModelYear(resp.records[0]);
            bdgtModel.updateYearOptions(resp.records);
            bdgtModel.getModelNames().then(model.loadModelNames, errModel.onError);
        };

        model.loadModelNames = function (resp) {
            bdgtModel.setDefaultModelSelection();
            bdgtModel.updateModelOptions(resp);
        };

        model.getData = function () {
            return model.grid.data.records;
        };

        model.setChartID = function (id) {
            model.formDefault.chartID = id;
        };

        model.getChartID = function () {
            return model.formDefault.chartID;
        };

        /* model.updateGrid = function (filtData) {
             model.grid = defAdjGrid.gridBody(filtData);
             return model.grid;
         };*/

        model.toggleDefAdjPercent = function () {
            bdgtModel.toggleBdgtModel(false);
            if (model.isWorkFlowOpen()) {
                model.setAdjPerToEmpty();
            }
            model.formDefault.toggleDefAdjState.state.open = !model.formDefault.toggleDefAdjState.state.open;
        };

        model.isWorkFlowOpen = function () {
            return model.formDefault.toggleDefAdjState.state.open;
        };

        model.setAdjPerToEmpty = function () {
            model.formDefault.adjPer = "";
        };

        model.toggleDefAdjModel = function () {
            model.formDefault.toggleDefAdjState.state.open = false;
            bdgtModel.toggleBdgtModel(!(bdgtModel.getToggleBgtModelState()));
        };

        model.updateChartName = function (name) {
            model.formDefault.chartName = name;
        };

        model.updateAccTypeFilterOptions = function (opts) {
            model.formDefault.accTypeFiltrOptions = model.formDefault.accTypeFiltrOptions.concat(opts);
        };

        model.showHideGrid = function (blnVal) {
            model.formDefault.showDataGrid = blnVal;
        };

        model.initPageControls = function () {
            var params = {
                chartID: model.getChartID()
            };
            return listSvc.getChartName(params).$promise; //.then(model.updateChartName, model.onErrorResp);
        };

        model.getAccTypes = function () {
            return listSvc.getAccTypes().$promise;
        };

        model.getGridData = function (data) {
            var params = {
                chartID: model.getChartID()
            };
            return listSvc.abortGetCategoryData().getCategoryData(params, data);
        };

        model.getBdgtModel = function () {
            return listSvc.getBdgtModel().$promise;
        };

        model.saveDefAdjPer = function (data) {
            return listSvc.saveDefPer(data).$promise;
        };

        model.showToolTip = function () {
            model.formDefault.tooltipState = true;
        };

        model.hideToolTip = function () {
            model.formDefault.tooltipState = false;
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.formDefault);
            bdgtModel.reset();
        };

        model.getAcctypeOptions = function () {
            return model.formDefault.accTypeFiltrOptions;
        };

        model.getAdjPer = function () {
            return model.formDefault.adjPer;
        };

        model.getFilterObj = function (data, filt) {
            if (filt.accountTypeCode && filt.accountTypeCode !== "" && angular.isNumber(filt.accountTypeCode)) {
                filt.accountTypeCode = $filter('filter')(model.formDefault.accTypeFiltrOptions, {
                    value: filt.accountTypeCode
                }, false)[0].name;
            }
            return $filter('filter')(data.records, filt, false);
        };

        model.isValidSelection = function (data) {
            var selCats = $filter('filter')(data, {
                'selectedBit': true
            }, false);
            if (selCats.length > 0) {
                return true;
            }
            return false;
        };

        model.updatePerValForItems = function (data) {
            angular.forEach($filter('filter')(data, {
                'selectedBit': true
            }, false), function (item) {
                item.adjPercent = model.getAdjPer();
            });
        };

        model.isToolTip = function () {
            return model.formDefault.tooltipState;
        };

        model.setToolTip = function (flag) {
            model.formDefault.tooltipState = flag;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('defaultAdjustmentModel', [
           // 'defaultAdjustmentGrid',
            'appLangTranslate',
            'defaultAdjustmentList',
            'defaultAdjustmentBdgtModel',
            '$filter', 'defaultAdjustmentConfig', 'rpGridModel', 'defaultAdjustmentErrModel',
            factory
        ]);
})(angular);
