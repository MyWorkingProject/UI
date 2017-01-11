//  Budget Model Workflow level model

(function (angular) {
    "use strict";

    function BdgtWorkFlowLevel(levelSvc, langTranslate,budgetModelSVC) {
        var model = {};
        var translate;
        translate = langTranslate('BdgtModelWorkflow').translate;

        model.emptyData = {
            distID: 0,
            levelSections: [],
            viewAllDetailsText: "View All Details",
            workflowHeaderText: translate('bdgt_model_workflow_header'),
            dueText: translate('bdgt_model_workflow_due'),
            dateText: translate('bdgt_model_workflow_date'),
            byText: translate('bdgt_model_workflow_by'),
            sectionsText: translate('bdgt_model_workflow_sections'),
            usersText: translate('bdgt_model_workflow_users'),
            showDetails: translate('bdgt_model_workflow_show_details'),
            hideDetails: translate('bdgt_model_workflow_hide_details'),
            modelName: "",
            modelYear: "",
            propertyName: "",
            showPopUp:false
        };

        model.levelData = {};

        angular.copy(model.emptyData, model.levelData);

        model.setDistID = function (id) {
            model.levelData.distID = id;
        };

        model.getLevelSections = function () {
            var params = {
                distID: model.levelData.distID
            };
            return levelSvc.getWorkflowLevels(params).$promise;
        };

        model.setLevelSections = function (resp) {
            if (resp.records.length > 0) {
                model.setShowHideStates(resp.records);
                model.levelData.levelSections = resp.records;
            }
        };

        model.setShowHideStates = function (records) {
            records.forEach(function (item) {
                item.state = {
                    open: true
                };
                item.workflows.forEach(function (val) {
                    val.showHideDetails = {
                        state: {
                            active: true
                        }
                    };
                });
            });
        };

        model.toggleAllDetails = function () {
            var applyState = false;
            if (model.levelData.viewAllDetailsText === 'View All Details') {
                model.levelData.viewAllDetailsText = 'Hide All Details';
                applyState = false;
            }
            else {
                model.levelData.viewAllDetailsText = 'View All Details';
                applyState = true;
            }
        
            model.levelData.levelSections.forEach(function (item) {
                item.workflows.forEach(function (role) {
                    role.showHideDetails.state.active = applyState;
                });
            });
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.levelData);
        };

        model.getModelDetails = function () {
            var params = {
                distID: model.levelData.distID
            };
            return budgetModelSVC.getPropertyModelDetails(params).$promise;
        };

        model.getModelData =function(){
             model.getModelDetails().then(model.setModelDetails);
        };

        model.setModelDetails = function (resp) {
            model.levelData.modelYear = resp.records.budgetYear; 
            model.levelData.modelName = resp.records.budgetType + "-" + resp.records.assettype;
            model.levelData.propertyName= resp.records.propertyName;
        };

        model.setShowPopUp=function(val){
            model.levelData.showPopUp = val;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('BdgtWorkFlowLevel', [
            'BdgtWorkflowLevelsSvc',
            'appLangTranslate',
            'BdgtModelSvc',
            BdgtWorkFlowLevel
        ]);
})(angular);

