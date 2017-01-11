//  Users List Model

(function (angular) {
    'use strict';

    function factory(langTranslate, budgetWorkflowStatusSvc, $filter, exception, $location,workflowSVC, sessionSVC) {

        var model;
        var translate = langTranslate('budgetWorkflowStatus').translate;
        model = {};
        model.text = {
            PageHeaderText: translate('bdgt_budgetWorkflowStatus_PageHeaderText'),
            hideFilters: translate('bdgt_budgetWorkflowStatus_hideFilters'),
            showFilters: translate('bdgt_budgetWorkflowStatus_showFilters'),
            print: "Print"
        };

        model.includePage="";
        
        model.moduleTitle = {
            text: translate('bdgt_budgetWorkflowStatus_moduleTitle')
        };

        model.toolTip = {
            toolTipText: translate('bdgt_budgetWorkflowStatus_selectText')
        };

        model.errorMsgs = {
            comments: "Comments are Required"
        };

        model.state = {
            tableFilter: {
                filter: false
            },
            toolTipAlert: false,
            toolTipReject: false
        };

        model.emptyData = {
            subscribed: false,          
            inProgress: {
                isActive: true,
                text: translate('bdgt_budgetWorkflowStatus_tabLabels_inProgress')
            },
            needApproval: {
                isActive: false,
                text: translate('bdgt_budgetWorkflowStatus_tabLabels_needApproval')
            },
            slideCommentsForm: {
                state: {
                    open: false
                }
            },        

            filterOptions: [{
                "name": "All",
                "value": ""
            }],

            propertyID:0,
            isConfigReady: false
        };

        model.isSelectAll = false;

        model.form = angular.extend({}, model.emptyData);

        model.showHideToolTipAlertlert = function (flag) {
            model.state.toolTipAlert = flag;
            model.state.toolTipReject = !flag;
        };

        model.setConfigReady = function (flag) {
            model.form.isConfigReady = flag;
        };

        model.showHideToolTip = function () {
            model.showHideToolTipAlertlert(true);
            model.showHideForm(false);
        };

        model.setTabsMenu=function(tabType){
            if (tabType === 'Need Approval') {
                model.form.inProgress.isActive = false;
                model.form.needApproval.isActive = true;
            } else if(tabType === 'In Progress' || tabType === 'Overdue'){
                model.form.inProgress.isActive = true;
                model.form.needApproval.isActive = false;
            }
          
        };


        model.updateSlideCommentsFlag = function (status) {
            model.form.slideCommentsForm.state.open = status;
        };

        model.showHideForm = function (flag) {
            model.form.slideCommentsForm.state.open = flag;
        };

        model.isToolTipisMenuOn = function () {
            return model.state.toolTipAlert;
        };

        model.updateTipisMenuOn = function (flag) {
            model.state.toolTipAlert = flag;
        };

        model.updateFiltTypes = function (data) {
            if (model.form.filterOptions.length === 1) {
                var modelTypes = model.getModelsArray(data);
                model.form.filterOptions = model.form.filterOptions.concat(modelTypes);
            }
            return model.form.filterOptions;
        };

        model.getModelsArray = function (records) {
            var modelTypes = [];
            angular.forEach(records, function (item) {
                var newItem = { "name": item.budgetYearText, "value": item.budgetYearValue };
                modelTypes.push(newItem);
            });
            return modelTypes;
        };

        model.getBdgtModel = function () {
            return budgetWorkflowStatusSvc.getBdgtModel().$promise;
        };

        model.getBudgetWorkFlowStatusList = function (pgdata) {
            var params = {
                statusType: model.form.inProgress.isActive ? 1 : 2,
                propertyID: sessionSVC.getPropertyID(), //model.form.propertyID,
                datafilter: pgdata
            };
            return budgetWorkflowStatusSvc.getBudgetWorkFlowStatusList(params, pgdata);
        };               

        /*model.setPropertyID=function(propertyID,pmcID){
            if(propertyID!==null && propertyID!==undefined && propertyID!=="" && (propertyID !== pmcID)){
                model.form.propertyID=propertyID;
            }
            else{
                model.form.propertyID = 0;
            }
        };*/

        model.isSubscribed = function () {
            return model.form.subscribed;
        };

        model.setSubscribeVal = function (flag) {
            model.form.subscribed = flag;
        };

        model.reset = function () {
            model.form = angular.extend({}, model.emptyData);
        };

        model.getInProgress=function(){
            return model.form.inProgress;
        };

        model.getNeedApproval=function(){
            return model.form.needApproval;
        };

        model.getInProgressActive=function(){
            return model.form.inProgress.isActive;
        };
    
        model.updateTabs = function(type){
            if(type==="inProgress"){
                model.form.inProgress.isActive = true;
                model.form.needApproval.isActive = false;
            }
            else{
                model.form.inProgress.isActive = false;
                model.form.needApproval.isActive = true;
            }
        };

        model.editModel = function(record){
            $location.path("/budgetmodel/" + record.distributedID + "overview");
        };

        model.setSrcPage = function(){
            model.resetSrcPage();
            model.includePage="budgetmodel/workflow/index.html";
       };

       model.resetSrcPage = function(){
            model.includePage="";
       }; 

       model.updateToolTip = function(btnText){
            if(btnText==="Submit"){
                model.toolTip.toolTipText = translate('bdgt_budgetWorkflowStatus_selectText');
            }
            else if(btnText==="Approve"){
                model.toolTip.toolTipText = translate('bdgt_budgetWorkflowStatus_selectApprvText');
            }
            else{
                model.toolTip.toolTipText = translate('bdgt_budgetWorkflowStatus_selectRejectText');
            }
       }; 
    
       /* model.showPopUp = function(record){
            workflowSVC.setCalledFromGrid(true);
            workflowSVC.setDistributedID(record.distributedID);
        };*/

       model.getSelectAll = function(){
            return model.isSelectAll;
       };

       model.setSelectAll = function(val){
            model.isSelectAll = val;
       };

        return model;
    }

    angular
        .module('budgeting')
        .factory('budgetWorkflowStatusModel', [
                'appLangTranslate',
                'budgetWorkflowStatusSvc',
                 '$filter',
                 'budgetWorkflowStatusErrorHandling',
                 '$location',
                 'workflowCommonSVC',
                 'sessionInfo',   
                factory
        ]);
})(angular);
