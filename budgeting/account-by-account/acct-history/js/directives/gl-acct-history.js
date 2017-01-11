(function (angular, jQuery, json) {
    "use strict";

    function glAcctHistoryDirective(budgetDetails, glHistoryModel, glHistoryFormConfig, glAcctBookType, 
            glHistoryParams, glHistoryState, glHistorySvc, budgetCommentsSvc,
            i18n, rpBaseForm, rpWatchList, notifSvc) {

        var GLAcctHistoryController = function($scope, $stateParams) {
            var vm = this,
                form = rpBaseForm();

            vm.init = function () {
                vm.watchList = rpWatchList();
                vm.watchList.add($scope.$on("$destroy", vm.destroy));

                vm.model = glHistoryModel.model;
                vm.formConfig = glHistoryFormConfig;
                vm.translate = i18n.translate;
                vm.state = glHistoryState.data;
                vm.busyModel = glHistoryState.busyModel;
                vm.glParameters = null;

                form.setData(glHistoryModel.model);

                glHistoryFormConfig.setMethodsSrc(vm);
                glHistoryFormConfig.setOptions("bookType", glAcctBookType.options);
            };

            vm.initData = function(params) {
                // console.debug("Passed parameters...");
                // console.debug(params);

                glHistoryState.busy();

                var bmDetails = budgetDetails.getModelDetails(), //assumed that the parent already triggered the request
                    glParameters = new glHistoryParams(params);

                glParameters.setData({
                    masterChartID: bmDetails.masterChartID,
                    propertyID: bmDetails.propertyID,
                    distributedID: bmDetails.distributedID
                });
                vm.glParameters = glParameters;

                glHistoryState.setDataType(params.dataType); //set data type
                if(glHistoryState.isActualData()) {
                    //set title
                    if(glParameters.isByPeriod()) {
                        glHistoryState.byPeriod();
                        glHistoryModel.setTitle(true, glParameters);
                    } else { //all periods
                        glHistoryModel.setTitle(false, glParameters);
                    }

                    //get initial value for the book type
                    glHistorySvc.getBookType(glParameters.getParamData())
                        .then(vm.setBookType, vm.bookTypeErrCallback);
                } else { //model data
                    glHistoryModel.setTitle(true, glParameters);
                    vm.getBudgetHistory();
                    vm.getBudgetComments();                    
                }
            };

            vm.setBookType = function(response) {
                if(response && response.records && response.records.length > 0) {
                    var bookType = response.records[0].bookType;

                    //set Book Type
                    vm.glParameters.setData({bookType:bookType});                    
                    glHistoryModel.setBookType(bookType);

                    vm.getHistory();                                    
                } else {
                    vm.bookTypeErrCallback();
                }
            };

            vm.getHistory = function() {
                //get data for the modal display
                if(vm.glParameters.isByPeriod()) {
                    glHistorySvc.getGLAcctHistoryByPeriod(vm.glParameters.getParamData())
                        .then(vm.initDisplay, vm.getHistoryAgain);
                } else {
                    glHistorySvc.getGLAcctHistory(vm.glParameters.getParamData())
                        .then(vm.initDisplay, vm.getHistoryAgain);
                }    
            };

            vm.getBudgetHistory = function() {
                glHistorySvc.getGLBudgetAcctHistory(vm.glParameters.getParamData())
                    .then(vm.initDisplay, vm.getBudgetHistoryAgain);
            };

            vm.getBudgetComments = function() {
                budgetCommentsSvc.getComments(vm.glParameters.getParamData())
                    .then(vm.displayGLComments, vm.glCommentsErrCallback);
            };

            vm.initDisplay = function(response) {
                if(response && response.totalRecords > 0) {
                    glHistoryModel.initDisplay(glHistoryState.isActualData(), response.records);
                    glHistoryState.hasData();
                }

                glHistoryState.resetRetries();
                glHistoryState.ready();
            };

            vm.getHistoryAgain = function(response) {
                if(response.status == -1 && response.data === null) {
                    glHistoryState.resetRetries();                    
                    return; //cancelled request, don't do anything else
                }

                glHistoryState.retry();
                if(glHistoryState.canRetryReq()) {
                    vm.getBudgetHistory();
                } else {
                    notifSvc.error(i18n.translate("gah_err_cant_get_history"));
                    glHistoryState.ready();
                }
            };

            vm.getBudgetHistoryAgain = function(response) {
                if(response.status == -1 && response.data === null) {
                    glHistoryState.resetRetries();                    
                    return; //cancelled request, don't do anything else
                }

                glHistoryState.retry();
                if(glHistoryState.canRetryReq()) {
                    vm.getHistory();
                } else {
                    notifSvc.error(i18n.translate("gah_err_cant_get_history"));
                    glHistoryState.ready();
                }
            };            

            vm.bookTypeErrCallback = function(response) {
                if(response !== undefined && response.status == -1 && response.data === null) {
                    glHistoryState.resetRetries();                    
                    return; //cancelled request, don't do anything else
                }

                notifSvc.error(i18n.translate("gah_err_cant_get_booktype"));
                glHistoryState.ready();                
            };
            
            vm.displayGLComments = function(response)  {
                if(response && response.totalRecords > 0) {
                    glHistoryModel.initComments(response.records);
                    glHistoryState.hasComments();
                }

                glHistoryState.resetCommentRetries();
                glHistoryState.isCommentsReady();
            };

            vm.glCommentsErrCallback = function(response)  {
                if(response.status == -1 && response.data === null) {
                    glHistoryState.resetCommentRetries();                    
                    return; //cancelled request, don't do anything else
                }

                glHistoryState.retryComments();
                if(glHistoryState.canRetryCommentsReq()) {
                    vm.getBudgetComments();
                } else {
                    notifSvc.error(i18n.translate("gah_err_cant_get_comments"));
                    glHistoryState.isCommentsReady();                    
                }
            };  

            vm.reset = function() {
                glHistorySvc.cancelRequests();
                budgetCommentsSvc.cancelRequests();

                form.reset();
                glHistoryModel.reset();
                glHistoryState.reset();
                vm.glParameters = null;
            };       

            vm.destroy = function () {
                vm.reset();
                vm.watchList.destroy();
            };

            vm.updateGrids = function(newBookType) {
                glHistoryState.resetContents();
                glHistoryModel.resetContents();

                //set Book Type
                vm.glParameters.setData({bookType:newBookType});                    
                glHistoryModel.setBookType(newBookType);

                vm.getHistory();
            };

            vm.init();
        };

        var GLAcctHistoryCtrl = ["$scope", "$stateParams", GLAcctHistoryController];

        var GLAcctHistoryLink = function(scope, elem, attrs, ctrl) {
            jQuery("#gl-account-history.modal")
                .on("show.bs.modal", function(evt) {
                    var paramDataStr = jQuery(evt.relatedTarget).attr("data-gl-history-params"),
                        paramData = JSON.parse(paramDataStr);

                    ctrl.initData(paramData);
                    scope.$apply();
                })
                .on("hidden.bs.modal", function() {
                    ctrl.reset();
                });
        };

        return {
            controller: GLAcctHistoryCtrl,
            controllerAs: "page",
            link: GLAcctHistoryLink,
            scope: {},
            restrict: "E",
            replace: true,
            templateUrl: "app/templates/gl-acct-history.html"
        };
    }

    angular
        .module("budgeting")
        .directive("rpGlAccountHistory", [
            "budgetDetails",
            "glHistoryModel",
            "glHistoryFormConfig",
            "glAcctBookType",
            "glHistoryParameters",
            "glHistoryState",
            "glAcctHistorySvc",
            "glHistoryBudgetCommentsSvc",
            "glAcctTranslatorSvc",
            "baseForm",
            "rpWatchList",
            "notificationService",            
            glAcctHistoryDirective
        ]);
})(angular, $, JSON);

/*
var budgetDetails = {
    getModelDetails: function() {
        return {
        "budgetModelID": 65,
        "distributedID": 156,
        "propertyID": 1192424,
        "propertyName": "Hidden Springs",
        "modelName": "2018 Budget",
        "budgetType": "Budget",
        "budgetYear": 2018,
        "assettype": "Conventional",
        "isFinal": false,
        "startMonth": 1,
        "noOfPeriods": 12,
        "currentSequence": 1,
        "noOfUnits": 56,
        "rentableSqFt": 66438,
        "masterChartID": 1,
        "masterChartName": "Conventional COA",
        "unitCustomLabel": null,
        "incomeModel": "Unit",
        "scheduleRentMethod": "Unit type",
        "lossToLeaseMethod": "Worksheet",
        "leaseRenewalMethod": "Summary",
        "capitalExpenseMethod": "Worksheet",
        "occupancyModel": "Worksheet",
        "payrollRunType": "Bi-weekly",
        "contractMethod": "Worksheet",
        "debtServiceMethod": "Worksheet",
        "useActualThroughYear": 0,
        "useActualThroughMonth": 0,
        "allowActualThrough": false,
        "actualThrough": ""
      };
    }
};
*/