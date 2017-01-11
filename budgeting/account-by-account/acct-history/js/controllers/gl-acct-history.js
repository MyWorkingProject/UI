(function (angular) {
    "use strict";

    var GLAcctHistoryController = function($scope, budgetDetails, glHistoryModel, glHistoryFormConfig, glAcctBookType, 
            params, glHistoryParams, glHistoryState, glHistorySvc, budgetCommentsSvc,
            i18n, asideModalInstance, rpBaseForm, rpWatchList, notifSvc) {
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

            vm.initData();
        };

        vm.initData = function() {
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

            glHistoryState.setDataType(glParameters.getParamValue("dataType")); //set data type
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
            }
        };

        vm.setBookType = function(response) {
            var bookType = null;
            if(response && response.records && response.records.length > 0) {
                bookType = response.records[0].bookType;
            } else {
                bookType = "ACCRUAL";
            }

            vm.glParameters.setData({bookType:bookType});                    
            glHistoryModel.setBookType(bookType);

            vm.getHistory();
        };

        vm.getHistory = function() {
            //get data for the modal display
            if(vm.glParameters.isByPeriod()) {
                glHistorySvc.getGLAcctHistoryByPeriod(vm.glParameters.getParamData())
                    .then(vm.initDisplay, vm.getHistoryError);
            } else {
                glHistorySvc.getGLAcctHistory(vm.glParameters.getParamData())
                    .then(vm.initDisplay, vm.getHistoryError);
            }    
        };

        vm.getBudgetHistory = function() {
            glHistorySvc.getGLBudgetAcctHistory(vm.glParameters.getParamData())
                .then(vm.initDisplay, vm.getBudgetHistoryError);
        };

        vm.getBudgetComments = function() {
            glHistoryState.showComments();
            budgetCommentsSvc.getComments(vm.glParameters.getParamData())
                .then(vm.displayGLComments, vm.glCommentsErrCallback);
        };

        vm.initDisplay = function(response) {
            if(response && response.totalRecords > 0) {
                glHistoryModel.initDisplay(glHistoryState.isActualData(), response.records, vm.glParameters);
                glHistoryState.hasData();

                if(!glHistoryState.isActualData() && glHistoryState.isShowComments()) {
                    vm.getBudgetComments();
                }
            }

            glHistoryState.ready();
        };

        vm.getHistoryError = function(response) {
            if(response.status == -1 && response.data === null) {
                return; //cancelled request, don't do anything else
            }

            vm.displayErrorNotif("", response.data.message); //"gah_err_cant_get_history"
            glHistoryState.ready();
        };

        vm.getBudgetHistoryError = function(response) {
            if(response.status == -1 && response.data === null) {
                return; //cancelled request, don't do anything else
            }

            if(response.status == 404) { //display default value if no records
                glHistoryModel.initDisplay(glHistoryState.isActualData(), [], vm.glParameters);
                glHistoryState.hasData();
            } else {
                vm.displayErrorNotif("", response.data.message); //"gah_err_cant_get_history"
            }
            glHistoryState.ready();
        };            

        vm.bookTypeErrCallback = function(response) {
            if(response !== undefined && response.status == -1 && response.data === null) {
                return; //cancelled request, don't do anything else
            }

            vm.displayErrorNotif("", response.data.message); //"gah_err_cant_get_booktype"
            glHistoryState.ready();                
        };
        
        vm.displayGLComments = function(response)  {
            if(response && response.totalRecords > 0) {
                glHistoryModel.initComments(response.records);
                glHistoryState.hasComments();
            }

            glHistoryState.isCommentsReady();
        };

        vm.glCommentsErrCallback = function(response)  {
            if(response.status == -1 && response.data === null) {
                return; //cancelled request, don't do anything else
            }

            vm.displayErrorNotif("", response.data.message); //"gah_err_cant_get_comments"
            glHistoryState.isCommentsReady();
        };  

        vm.reset = function() {
            glHistorySvc.cancelRequests();
            budgetCommentsSvc.cancelRequests();
            // notifSvc.removeNotifications(); TODO apply when pNotify has been updated

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

        vm.displayErrorNotif = function(msgKey, title) {
            if(title && msgKey) {
                var opt = {
                    type: "error",
                    icon: true,
                    title: title,
                    text: i18n.translate(msgKey)
                };

                notifSvc.notify(opt);
            } else if(msgKey) {
                notifSvc.error( i18n.translate(msgKey) );
            } else if(title) {
                notifSvc.error(title);
            }
        };

        vm.close = function() {
            asideModalInstance.cancel();
        };

        vm.init();
    };


    angular
        .module("budgeting")
        .controller("GLAcctHistoryCtrl", [
            "$scope",
            "budgetDetails",
            "glHistoryModel",
            "glHistoryFormConfig",
            "glAcctBookType",
            "glHistoryParamData",            
            "glHistoryParameters",
            "glHistoryState",
            "glAcctHistorySvc",
            "glHistoryBudgetCommentsSvc",
            "glAcctTranslatorSvc",
            "rpBdgtAsideModalInstance",             
            "baseForm",
            "rpWatchList",
            "notificationService",            
            GLAcctHistoryController
        ]);
})(angular);
