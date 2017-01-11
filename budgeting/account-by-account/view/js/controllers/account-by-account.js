//  SampleCg Controller

(function (angular) {
    "use strict";

    function AccountByAccountCtrl($scope, model, formConfig, gridModel, gridConfigModel, glSearchSvc,
                        budgetDetails, svc, preferences, managePreferences, configKeys, seriveConfig, quaterlyConfig,
                        monthlyConfing, summaryGridConfig, manageConfig, rpGridEvent, asideModalInstance, ConfigSettings) {
        var vm = this,
            grid,
            gridRecords,
            gridConfig,
            commentAside, advanceActualsAside, copyCommentsAside, bdgtDetails, tableSettings, budgetDetailEventSubscribe;
       
        vm.init = function () {

            vm.model = model;
            vm.rowOptions = false;
            glSearchSvc.events.update.subscribe(vm.eidtGL);
            //   bdgtDetails= budgetDetails.events.update.subscribe( model.loadInfoOnEvent);
            model.loadInfoOnEvent();
            
            formConfig.setMethodsSrc(vm);
            vm.formConfig = formConfig;
            var promise = model.getAccTypes();
            promise.then(vm.initialLoad);

            commentAside = asideModalInstance('glComment')
               .done(model.updateCommentCountForGLAccount);

            advanceActualsAside = asideModalInstance('advanceActuals')
              .done();

            copyCommentsAside = asideModalInstance('copyComments')
              .done();

            tableSettings = asideModalInstance('accountByAccountTableSettings')
               .done(vm.applyTableChages);
        };
        vm.showAdvanceActualsLink = function () {
            var budgetType = budgetDetails.getModelDetails().budgetType;
            vm.showAdvanceActualsSection = budgetType && budgetType.toLowerCase() === "forecast";
        };
        vm.initialLoad = function (data) {
            model.loadInitialFunctions(data); 
            vm.showAdvanceActualsLink();
             managePreferences.getRowOptions().then(vm.onReady);                   
            vm.destWatch = $scope.$on("$destroy", vm.destroy);

        };

        vm.onReady = function (data) {
            model.loadedConfig = true;
            managePreferences.setRowOptions(data); 
           vm.loadGLBudgetData(); 
        };
        
        vm.loadGLBudgetData = function () {
            vm.rowOptions = false;
            var promise = seriveConfig.getMonthlyViewData();
            promise.then(vm.setGridData);
        };

        vm.setGridData = function (data) {
            model.copyGridData(data.records.glBudgetData);

            if (grid) {
                grid.destroy();
            }
            
            gridConfig = gridConfigModel();
            gridConfig.setSrc(vm);
            vm.manageConfig(data);

            grid = gridModel();
            grid.setConfig(gridConfig);
            grid.setData(data.records.glBudgetData);

            vm.grid = grid;                     
            grid.events.publish('dataReady');

             vm.rowOptions = true;
            model.assignColumnOptions(grid);
              model.manageSummaryViewType();
           // vm.setFilterOptions(data.records.glBudgetData);
        };

        vm.manageConfig = function (data) {
            switch (model.getGridViewType()) {
                case "monthly":
                    monthlyConfing(gridConfig, model.getPeriodModel(), data.records);
                     break;
                case "quarterly":
                    quaterlyConfig(gridConfig, model.getPeriodModel(), data.records);
                     break;
                case "summary":
                    summaryGridConfig(gridConfig, data.records);
                     break;
            }           
              
        };
    
        vm.chageRowOptions = function (column) {
            var isServiceCallReq = manageConfig.handleRowOptions(column);
            if (isServiceCallReq) {
                 vm.loadGLBudgetData();    
            } 
            else {
                vm.grid.publish(rpGridEvent.dataReady);
            } 
        };

        vm.getRefData = function () {
             vm.loadGLBudgetData();
        };

        vm.changeViewType = function () {
            vm.loadGLBudgetData();
        };

        vm.navigateToDetailView = function (glAccount, isCatRestricted, desc) {
            model.navigateToDetailView(glAccount, isCatRestricted, desc);
        };

        vm.onSelectedGLaccount = function (selectedGLAccount) {          
            model.navigateToDetailViewBySearch(selectedGLAccount.glAccountNumber);
        };

        vm.showCopyComments = function () {
            var resolve = {
                copyCommentsParams: function () {
                }
        };
            copyCommentsAside
                .resolve(resolve)
                .show();
        };


        vm.showAdvanceActuals = function () {
            var resolve = {
                advanceActualsParams: function () {
                }
        };
            advanceActualsAside
                .resolve(resolve)
                .show();
        };


         vm.getLangValue = model.getLangValue;



        vm.updateAccCategories = function (data) {
           model.loadAccountCategory(data);
        };

        vm.destroy = function () {
             configKeys.reset(); 
             managePreferences.saveRowOptions();
             ConfigSettings.reset();
             tableSettings.destroy();
            // bdgtDetails();
             model.reset();
                
        };

         vm.loadComments = function (column, row) {
              model.setSelectedRow(row);
             var resolve = {
                 commentInfoModel: function () {
                     return {
                        glAccountNumber: row.data.description,
                         glGeneralCommentsCount: row.data.reviewerCommentCount,
                         glReviewerCommentsCount: row.data.commentCount
                     };
                 }
             };
             commentAside
                 .resolve(resolve)
                 .show();
        };

        vm.loadTableSettings = function () {
                model.preserveSettings();                             
                var resolve = {
                 tableSettingsModel: function () {
                     return {
                        allowApply: ""
                        
                     };
                 }
             };            
             tableSettings  
                  .resolve(resolve)             
                 .show();
        };

        vm.refresh = function () {
            vm.loadGLBudgetData();
         };

        vm.applyTableChages = function (tableSettingsModel) {
            if (tableSettingsModel.allowApply) {
               manageConfig.handleTableSettingsforPeriods(); 
                if (model.isColumnOptionChanged() || model.isRowOptionChanged() || model.isPeriodOptionsChnaged()) {
                  // vm.grid.flushChanges();
                    vm.loadGLBudgetData();                    
                }
               else {                   
                    model.applyPeriodChanges(vm.grid);
                   vm.grid.rowHeightClass = model.getRowHeightClass();
                    vm.grid.publish(rpGridEvent.dataReady);
                } 
            }
            else {
                     model.revertChangesOnCancel();
            }
        };

        vm.init();

    }

    angular
         .module("budgeting")
         .controller("AccountByAccountCtrl", [
            "$scope",
            "accountByAccountView",
            "account-by-account-config",
            "rpCgModel",
            "rpCgConfigModel",
            "glSearchSvc", 
            "budgetDetails",
            "sampleMonthlySvc",
            "preferences", 
            "managePreferences", 
            "configKeys", 
            "serviceConfiguration",            
            "accountByAccountQuaterlyGridConfig",
            "accountByAccountMonthlyGridConfig",
            "summaryGridConfig", 
            "manageConfig",  
            "rpCgEventName",
            "rpBdgtAsideModalService",
            "ConfigSettings",
             AccountByAccountCtrl
         ]);
})(angular);
