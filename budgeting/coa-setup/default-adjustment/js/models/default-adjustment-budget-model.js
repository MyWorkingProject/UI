//  Default Adjustment Budget Model

(function (angular) {
    "use strict";

    function defaultAdjustmentBdgtModel(langTranslate, listSvc) {
        var model, translate;
        model = {};
        translate = langTranslate('defaultAdjustment').translate;

        model.labels = {
            applyDefaultPerTxt: translate('bdgt_defadj_apply_default_per_txt'),
            yearTxt: translate('bdgt_defadj_year_txt'),
            modelTypeTxt: translate('bdgt_defadj_model_type_txt'),
            modelNameTxt: translate('bdgt_defadj_model_name_txt'),
            defChkOverWriteTxt: translate('bdgt_defadj_overwrite_apply_model'),
            overWriteHelp: translate('bdgt_defadj_over_write_help_text'),
            applyTxt: translate('bdgt_defadj_apply_txt'),
            cancelTxt: translate('bdgt_defadj_cancel_txt')
        };

        model.emptyData = {
            toggleDefAdjModelState: {
                state: {
                    open: false
                }
            },
            defBdgtYear: 0,
            adjPerYearSrc: {
                options: [{
                    "budgetYearValue": 2016,
                    "budgetYearText": "2016"
                }]
            },
            defModelType: "Budget",
            modelTypes: {
                options: [{
                    "name": translate('bdgt_defadj_budget_txt'),
                    "value": "Budget"
                }, {
                    "name": translate('bdgt_defadj_forecast_txt'),
                    "value": "Forecast"
                }, {
                    "name": translate('bdgt_defadj_proforma_txt'),
                    "value": "Proforma"
                }]
            },
            adjPerModel: 0,
            adjPerModelSrc: {
                options: [{
                    "budgetModelID": 0,
                    "budgetModelName": "All"
                }]
            },
            defChkOverWrite: false,
            infoToolTip: false,
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: ''
            }
        };

        model.form = {};
        angular.copy(model.emptyData, model.form);

        model.toggleBdgtModel = function (bln) {
            model.form.toggleDefAdjModelState.state.open = bln;
        };

        model.getToggleBgtModelState = function () {
            return model.form.toggleDefAdjModelState.state.open;
        };

        model.updateDefModelYear = function (year) {
            model.form.defBdgtYear = year.budgetYearValue;
        };

        model.getModelNames = function () {
            var params = {
                year: model.form.defBdgtYear,
                type: model.form.defModelType
            };
            return listSvc.getModels(params).$promise;
        };

        model.applyBdgtModel = function (chartID) {
            var postData = model.getBdgtModelData(chartID);
            return listSvc.applyBdgtmodel(postData).$promise;
        };

        model.getBdgtModelData = function (id) {
            return {
                "masterChartID": id,
                "budgetYear": model.form.defBdgtYear,
                "budgetType": model.form.defModelType,
                "budgetModelID": model.form.adjPerModel,
                "isOverWrite": model.form.defChkOverWrite
            };
        };

        model.updateYearOptions = function (data) {
            model.form.adjPerYearSrc = {
                options: data
            };
        };

        model.setDefaultModelSelection = function () {
            model.form.adjPerModel = 0;
        };

        model.updateModelOptions = function (data) {
            var ddlData = data.records.concat([{
                "budgetModelID": 0,
                "budgetModelName": "All"
            }]);
            model.form.adjPerModelSrc = {
                options: ddlData
            };
        };

        model.updateChkOverWrite = function (blnVal) {
            model.form.defChkOverWrite = blnVal;
        };

        model.showModelHelpInfo = function () {
            model.form.infoToolTip = !model.form.infoToolTip;
        };

        model.isHelpIconInfo = function () {
            return model.form.infoToolTip;
        };

        model.setHelpIconInfo = function (flag) {
            model.form.infoToolTip = flag;
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('defaultAdjustmentBdgtModel', [
            'appLangTranslate',
            'defaultAdjustmentList',
            defaultAdjustmentBdgtModel
        ]);
})(angular);
