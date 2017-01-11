//  BudgetModel Details Model

(function (angular) {
    "use strict";

    function BdgtModelDetails(langTranslate, bdgtModelSvc,budgetDetails) {
        var translate;
        translate = langTranslate('BdgtModelDetails').translate;
        var model = {};
        model.emptyData = {
            distID: 0,
            budgetModelUnitsText: translate('bdgt_model_details_units_txt'),
            budgetModelSqFtText: translate('bdgt_model_details_sqft_txt'),
            budgetModelWorkflowText: translate('bdgt_model_details_workflow_status_txt'),
            modelDetails: {
                distributedID: 0,
                modelName: "",
                propertyName: "",
                budgetYear: "",
                budgetType: "",
                assettype: "",
                noOfUnits: 0,
                rentableSqFt: 0,
                currentSequence: 1,
                budgetModelUnitsText: translate('bdgt_model_details_units_txt'),
                budgetModelSqFtText: translate('bdgt_model_details_sqft_txt'),
                budgetModelWorkflowText: translate('bdgt_model_details_workflow_status_txt'),
                masterChartName: "",
                isUnitsShow: true,
                isChartNameShow: false,
            },
           ready:false
        };

        model.form = {};

        angular.copy(model.emptyData, model.form);

        model.setDistID = function (id) {
            model.form.distID = id;
        };

        model.getModelDetails = function () {
            var params = {
                distID: model.form.distID
            };
            return bdgtModelSvc.getPropertyModelDetails(params).$promise;
        };

        model.setModelDetails = function (resp) {
            angular.extend(model.form.modelDetails, resp);
          //  model.setPageTitle(translate('bdgt_model_tabs_budget_budget_categories_header'));
           // budgetDetails.setModelDetails(resp);
            model.setReadyFlag(true);
        };


        model.setReadyFlag=function(flag){
                  model.form.ready=flag;
        };
        model.setPageTitle = function (title) {
            angular.extend(model.form.modelDetails, { pageTitle: title });
        };

        model.hideUnits = function () {
            model.form.modelDetails.isUnitsShow = false;
        };

        model.showChartName = function () {
            model.form.modelDetails.isChartNameShow = true;
        };
        
        model.getModelName = function () {
            return model.form.modelDetails.modelName;
        };

        model.setWorkflowLevel = function (val) {
            model.form.modelDetails.workflow.level = val;
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('BdgtModelDetails', [
            'appLangTranslate',
            'BdgtModelSvc',
            'budgetDetails',
            BdgtModelDetails]);
})(angular);
