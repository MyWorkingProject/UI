//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate, listSVC, newMasterchartModel, $location, $stateParams, errorHandling, wiznav) {
        var translate, model, form;
        translate = langTranslate('manageGlAccount').translate;

        model = {};
        model.fieldLabel = {
            saveText: translate('bdgt_manageglaccount_fieldLabel_saveText'),
            cancelText: translate('bdgt_manageglaccount_fieldLabel_cancelText')
        };

        model.text = {
            PageHeaderText: translate('bdgt_manageglaccount_pageheadertext'),
            hideFilters: translate('bdgt_manageglaccount_hidefilters'),
            showFilters: translate('bdgt_manageglaccount_showfilters'),
            importGLAccount: translate('bdgt_manageglaccount_importGLAccount'),
            btnNext: translate('bdgt_manageglaccount_btnNext'),
            btnBack: translate('bdgt_manageglaccount_btnBack')


        };

        model.state = {
            tableFilter: {
                filter: false
            }
        };

        model.baseParams = {
            propertyId: 0,
            masterChartID: 0,
            chartType: "0"
        };

        model.globalParams = angular.extend({}, model.baseParams);

        model.isChartType = function () {
            if (model.globalParams.chartType === "0") {
                return false;
            }
            else {
                return true;
            }
        };

        model.isAccountCategory = function () {
            return model.types.flagAccountCategory;
        };

        model.getMasterChartID = function () {
            return model.globalParams.masterChartID;
        };

        model.getPropertyId = function () {
            return model.globalParams.propertyId;
        };

        model.isAddedToSite = function (record) {
            model.types.isAddedToSite = record.isAddedToSite;
        };

        model.isAddedToSiteFlag = function () {
            return model.types.isAddedToSite;
        };

        model.getEditParams = function (record) {
            var paramsData = {
                "masterChartID": model.getMasterChartID(),
                "propertyID": model.getPropertyId(),
                "glAccountID": record.glAccountID
            };
            return paramsData;
        };

        model.defaultPageProps = {
            isPropertyChart: false,
            subscribed: false,
            isEditMode: false,
            wizard: false,
            flagAccountCategory: false,
            accountCategoryAccess: false,
            isAddedToSite: false,
            isAlternateChart:false,
            importGLPath: "",
            masterChartName: ""
        };

        model.types = angular.extend({}, model.defaultPageProps);

        model.reset = function () {
            model.types = angular.extend({}, model.defaultPageProps);
            if ((model.globalParams.chartType) && (model.globalParams.chartType !== "0")) {
                newMasterchartModel.edit(false);
            }
            model.globalParams = angular.extend({}, model.baseParams);
        };

        model.initializeParams = function () {
            model.updateChartID($stateParams.chartID);
            model.updateChartType($stateParams.type);
            model.checkMode($location.absUrl());
            model.setPropertyVals();
            if (model.isWizard()) {
                model.setWizCompletedSteps();
            }
            model.getMasterChartData();
        };

        model.updateChartID = function (chartID) {
            model.globalParams.masterChartID = chartID;
        };

        model.updateChartType = function (type) {
            if (type) {
                model.globalParams.chartType = type; //0 - mastercharts, otherthan 0- Property Charts propertyid
                if (type !== "0") {
                    model.setPropertyFlags();
                }
                else {
                    model.setChartsFlag();
                }

            }
        };

        model.setPropertyFlags = function () {
            model.AssignIsEditMode(true);
            newMasterchartModel.edit(true);
        };

        model.setChartsFlag = function () {
            model.setIsWizardFlag(false);
            model.AssignIsEditMode(false);
            newMasterchartModel.edit(false);
        };

        model.updateSubscribe = function (bln) {
            model.types.subscribed = bln;
        };

        model.AssignIsEditMode = function (flag) {
            model.types.isEditMode = flag;
        };

        model.setIsWizardFlag = function (flag) {
            model.types.wizard = flag;
        };

        model.checkMode = function (path) {
            if (path.indexOf("admin/coa/wiz") > 0) {
                model.setIsWizardFlag(true);
                model.AssignIsEditMode(true);
                newMasterchartModel.edit(true);
                model.types.importGLPath = "/admin/coa/wiz/import/" + model.globalParams.masterChartID;
            }
            else {
                model.types.importGLPath = "/admin/coa/import/" + model.globalParams.masterChartID;
            }

        };

        model.setPropertyVals = function () {
            var bln = model.isChartType();
            model.updatePropertyChart(bln);
            model.globalParams.propertyId = model.globalParams.chartType;
        };

        model.updatePropertyChart = function (bln) {
            model.types.isPropertyChart = bln;
        };

        model.getAccTypes = function () {
            return listSVC.getAccTypes().$promise;
        };

        model.getAccCategory = function (val) {
            var params = {
                masterChartID: model.globalParams.masterChartID,
                accountTypeID: val
            };
            return listSVC.getAccCategory(params).$promise;
        };

        model.getMasterChartData = function () {
            var params = {
                chartID: model.globalParams.masterChartID
            };
            var promise=listSVC.getMasterChartData(params).$promise;
            return promise.then(model.getMasterChartSuccess, errorHandling.masterChartFailure);
        };

        model.getMasterChartSuccess = function (data) {
            model.types.masterChartName = data.records[0].name;
            model.types.isAlternateChart = data.records[0].isAlternativeCOA;
            model.updateWizNext();
        };

        model.updateWizStep = function () {
            var reqdata = {
                "wizardType": "MasterChart",
                "referenceID": model.getMasterChartID(),
                "stepID": 4
            };
            return listSVC.updateWizStep(reqdata).$promise;
        };

        model.isPropertyChart = function () {
            return model.types.isPropertyChart;
        };

        model.isWizard = function () {
            return model.types.wizard;
        };

        model.navToWizard = function () {
            if (model.isWizard()) {
                wiznav.activate('step2');
            }
            else {
                $location.path(model.types.importGLPath);
            }
        };

        model.completeEnableWiz = function () {
            if (!model.isAlternateChart()) {
                wiznav.complete('step4', true);
                wiznav.enable('step5', true);
            }
            else {
                $location.path('/admin/coa');

            }
        };

        model.updateWizNext = function () {
            if (model.isAlternateChart()) {
                model.text.btnNext = "Finish";
            }
            else {
                model.text.btnNext = translate('bdgt_manageglaccount_btnNext');
            }
        };

        model.setWizCompletedSteps = function () {
            wiznav.complete('step1', true);
            wiznav.complete('step2', true);
            wiznav.complete('step3', true);
            wiznav.complete('step4', false);
        };

        model.wizBackClick = function () {
            wiznav.complete('step3', false);
            wiznav.prev();
        };


        model.isAlternateChart = function () {
            return model.types.isAlternateChart;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory('manageGlAccountModel', [
            'appLangTranslate',
            'manageGLAccountsSvc',
            'newMasterchartModel',
            '$location',
            '$stateParams',
            'manageGlErrorHandling',
            'rpWizardNavModel',
            factory
        ]);
})(angular);