//  SampleCg Controller

(function (angular) {
    "use strict";

    function MarketRentCtrl($scope, gridModel, gridConfigModel, model, marketRentModelConfig, marketRentSvc, marketRentSettingModel, marketRentCalculationModel, budgetDetails, formConfig, marketRentMsgSVC, /*commentsModel, dirModel ,*/ $location,  asideModal /*, commentSvc */, confirmModal, session, mrGridOptionConfigModel, breadcrumbs) {
        var vm = this, grid, gridConfig;
        var saveCmnt, delCmnt, closeCmnt, capAside, changeRentAside, commentsAside, alertModal, refreshModal, changeModal, msgModal, gridSettingAside;  
        vm.init = function () {
            if(model.isValidRoute()){
                model.setGridReady(false);
                //model.setReasponseReady(false);
                vm.model = model;
                //vm.commentsModel = commentsModel;
                capAside = asideModal('actualRentCap')
                .done(vm.setActualRentCapModel);
                changeRentAside = asideModal('changeRent')
                .done(vm.setChangeRent);
                alertModal = confirmModal.confirm().accept(vm.loadImportedData).reject(vm.loadCancel);
                refreshModal = confirmModal.confirm().accept(vm.onRefresh).reject(vm.refreshCancel);  
                changeModal = confirmModal.confirm().accept(vm.onChangesOK).reject(vm.onChangesCancel);
                gridSettingAside = asideModal('gridSettings')
                .done(vm.applyGridSettings); 
               
               /* commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);*/
                //marketRentCalculationModel.events.update.subscribe(vm.refreshData);
                //if(!budgetDetails.isReady()){
                //        budgetDetails.events.update.subscribe(vm.getImportedDates);
                //}
                //else{
                //      vm.getImportedDates();
                //}
                vm.getImportedDates();
              /*  saveCmnt = dirModel.events.subscribe("saveComments",vm.saveComments);
                
                delCmnt = dirModel.events.subscribe("deleteComment",vm.deleteComment); 
                closeCmnt = dirModel.events.subscribe("closeComments",vm.closeComments); */
                vm.formConfig = formConfig;
                formConfig.setMethodsSrc(vm);
               // vm.sessionWatch = session.subscribe("update",vm.navigateToHome);   
            }
            else{
                vm.navigateToHome();
            } 
        };

        vm.navigateToHome = function(){
             $location.path('/#');
        };

        vm.refreshCancel = function(){
            //refreshModal.destroy();
        };

        vm.showRefresh = function(){
            refreshModal.setContent({
                      title: vm.getKeyValue('bdgt_rental_mr_refresh_header'),
                      message: vm.getKeyValue('bdgt_rental_mr_refresh_desc'),
                      btnAcceptText: vm.getKeyValue('bdgt_rental_mr_refresh_load'),
                      btnRejectText: vm.getKeyValue('bdgt_rental_mr_refresh_cancel')
                  }).show();
        };
        
        vm.GetPreferenceData = function(){
          model.getPreferenceData().then(vm.loadPreferenceData);
        };

        vm.loadPreferenceData = function(response){
           var rowClass = model.loadPreferenceData(response);
            mrGridOptionConfigModel.restorePreference(response.records);
           //Need to Removed
           vm.grid.rowHeightClass =  rowClass;
        };

        vm.saveComments=function(data){
            //commentsModel.saveComment(data);
        };

        vm.deleteComment=function(CommentID){
            //commentsModel.deleteComment(CommentID);
        };

        vm.getImportedDates = function(){
            model.init();
            model.getImportedDates().then(vm.compareDates, marketRentMsgSVC.onGetError);
         /*   if(!model.isMarketRent()){
                model.getCapMethod().success(marketRentCalculationModel.assignCapMethod, vm.onCapError);   
            } */
        };

        vm.onCapError = function(response){
           // marketRentCalculationModel.setIsCapReady(true);
            marketRentMsgSVC.onGetError();
        };

        vm.compareDates = function(resp){
            if(model.isNewDataImported(resp) && !model.isModelFinal()){
                vm.showLoad();
            }
            else{
                 vm.onReady();
            }
        };

        vm.showLoad = function(){
            //Need to remove the belo code using angular strap
            //angular.element('#alertImportDialog').modal('show');
             alertModal.setContent({
                      title: vm.getKeyValue('bdgt_rental_mr_import_header'),
                      message: vm.getKeyValue('bdgt_rental_mr_import_desc'),
                      btnAcceptText: vm.getKeyValue('bdgt_rental_mr_import_load'),
                      btnRejectText: vm.getKeyValue('bdgt_rental_mr_refresh_cancel')
                  }).show();
        };

        vm.loadCancel = function(){
             vm.onReady();
             //alertModal.destroy();
        };

        //Called when load of imported data is clicked
        vm.loadImportedData = function(){
            vm.initalizeGrid();
            vm.onRefresh();
            //alertModal.destroy();
        };

        vm.updateCommentCount=function(count){
           //marketRentCalculationModel.updateCommentCount(commentsModel.getCurrentRecord(), count);
           //commentsModel.closeComments();     
        };

        vm.initalizeGrid = function(){
            grid = gridModel();
            vm.grid = grid;
            marketRentCalculationModel.init();
            //model.init();
            model.setGridReady(true);
            gridConfig = gridConfigModel();
 
            gridConfig.setSrc(vm);
            var periodModel = marketRentCalculationModel.getPeriodModel();
            periodModel.isStudentUnit = (model.isStudent() && model.getMRSubText() == "by Unit" ? true : false);
            periodModel.isStudentUnitType = (model.isStudent() && model.getMRSubText() == "by Unit type" ? true : false);
            marketRentModelConfig(gridConfig, periodModel);
            grid.setConfig(gridConfig);
            //grid.busy(true);
            marketRentCalculationModel.setInitalLoad(true);
            mrGridOptionConfigModel
                .setData(marketRentSettingModel.getColumnData());
               
        };

        vm.onReady = function(){
            vm.initalizeGrid();
            model.getmarketRentSummary("all").then(vm.setMRData, marketRentMsgSVC.onGetError);
            model.getUnitTypes().then(vm.bindUnitTypes, marketRentMsgSVC.onGetError);
            vm.GetPreferenceData();
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.refreshData = function(){
             grid.setData(marketRentCalculationModel.getSummaryData());
        };

        vm.getKeyValue = function(key){
           return model.getKeyValue(key);
        };

        vm.makeRentVal = function (column, colrows, row) {
            marketRentCalculationModel.getKeyValue(column.key);
            marketRentCalculationModel.getTotals(colrows, row);
        };

        vm.bindUnitTypes = function(response){
           marketRentCalculationModel.setUnitTypeList(response); 
           formConfig.setData(response);
        };

        vm.getMRText = function(key){
           return model.getMRText()+ " " + model.getKeyValue(key); 
        };

        vm.getUnitTypeName = function(val){
            //grid.busy(true);
            marketRentCalculationModel.setInitalLoad(false);
            model.getmarketRentSummary(val).then(vm.setMRData, marketRentMsgSVC.onGetError);
        };

        vm.showActualRentCap = function(){
            if(!model.isModelFinal()){
                var resolve = {
                    actualRentParamModel: marketRentCalculationModel.getActualRentCap
                };
                capAside
                        .resolve(resolve)
                        .show();
            }
        };

        vm.setActualRentCapModel = function(actualRentCap){
            marketRentCalculationModel.setActualRentModelCap(actualRentCap);
            grid.setData(marketRentCalculationModel.getSummaryData());
        };

        vm.setChangeRent = function(rentSettings){
             marketRentCalculationModel.applyChangeRent(rentSettings);
             grid.setData(marketRentCalculationModel.getSummaryData());
        };

        vm.showChangeRent = function(){
            if(!model.isModelFinal()){
                var resolve = {
                    changeRentParamData: marketRentCalculationModel.getChangeRentParam
                };
                changeRentAside
                        .resolve(resolve)
                        .show();
            }
        };

        vm.onRefresh = function(){
            //refreshModal.destroy();
            model.getImportedData().then(vm.setMRData, marketRentMsgSVC.onGetError);
            model.getUnitTypes().then(vm.bindUnitTypes, marketRentMsgSVC.onGetError);
        };

        vm.getMRSubText = function(){
            var subText = model.getMRSubText(); 
            switch(subText){
                case"by Unit type":
                    subText = model.isStudent() ? "by Unit Type - Student Living" : "by Unit Type";
                    break;
                case"by Service group":
                    subText = "by Unit Type - Service Group";
                    break;
                case"by Program":
                    subText = "by Unit Type - Program";
                    break;
                case"by Unit":
                    subText = model.isStudent() ? "by Unit - Student Living" : "by Unit";
                    break;
            }
            return subText;
        };

        vm.getChangeMRText = function(key){
           return model.getKeyValue(key) + " " + model.getMRText(); 
        };

        vm.toggleFilter = function(){
            model.toggleFilter();
        };

        vm.save = function () {
            if(marketRentCalculationModel.isDataValid()){
                //model.saveMRData(marketRentCalculationModel.getSaveData()).then(vm.showSccMsg, marketRentMsgSVC.onPutError);
                 vm.verifyWorkSheetData();
            }
            else{
                marketRentMsgSVC.showSaveErrorNotification();
            }
        };

        vm.verifyWorkSheetData = function(){
             if(model.isProgramService()){
                vm.ShowUnitCntMsg();
             }
             else{
                vm.saveWroksheetData();
             }   
        };

        vm.ShowUnitCntMsg = function(){
            if(marketRentCalculationModel.getNonGrpUnitCount() > 0){
               msgModal = confirmModal.alert().setContent({
                    title: vm.getKeyValue('bdgt_rental_mr_unitCnt_header') + (model.isServiceGroup() ? vm.getKeyValue('bdgt_rental_mr_sg_text') : vm.getKeyValue('bdgt_rental_mr_prg_text')),
                    message: marketRentCalculationModel.getNonGrpUnitCount() + vm.getKeyValue('bdgt_rental_mr_unitCnt_msg') + (model.isServiceGroup() ? vm.getKeyValue('bdgt_rental_mr_sg_text') : vm.getKeyValue('bdgt_rental_mr_prg_text')),
                    btnOkText: vm.getKeyValue('bdgt_rental_mr_ok_text')
                }).ok(vm.saveWroksheetData); 
                msgModal.show();
            }
            else{
                vm.saveWroksheetData();
            }
        };    

        vm.saveWroksheetData = function(){
            model.saveMRData(marketRentCalculationModel.getSaveData()).then(vm.showSccMsg, marketRentMsgSVC.onPutError);
        };
      
        vm.showSccMsg = function(){
            model.updateLatestRent(false);
            marketRentMsgSVC.showSaveSuccNotification();
            marketRentCalculationModel.resetPostData();
            if(model.isMarketRent() && marketRentCalculationModel.isDataModified()){
                model.autoUpdateActualRent();
                //Calling Auto Update of Actual Rent when MR data is saved
            }
            if(model.isProforma()){
                model.getmarketRentSummary("all").then(vm.setMRData, marketRentMsgSVC.onGetError);
            }
        };           

        vm.cancel = function () {
            if(marketRentCalculationModel.isDataModified()){
                changeModal.setContent({
                      title: vm.getKeyValue('bdgt_rental_mr_changes_header'),
                      message: vm.getKeyValue('bdgt_rental_mr_changes_desc') + model.getWorksheetText()+". "+ vm.getKeyValue('bdgt_rental_mr_confirm_msg'),
                      btnAcceptText: vm.getKeyValue('bdgt_rental_mr_changes_ok'),
                      btnRejectText: vm.getKeyValue('bdgt_rental_mr_refresh_cancel')
                  }).show();
            }
            else{
                //$location.path('budgetmodel/' + model.getDistID() + '/overview');
                breadcrumbs.goBack();
            }
        };

        vm.onChangesOK = function(){
            //$location.path('budgetmodel/' + model.getDistID() + '/overview');
            breadcrumbs.goBack();
        };

        vm.onChangesCancel = function(){
           
        };

       /* vm.assignMRData = function(response){
            if(model.isMarketRent() || (!model.isMarketRent() && marketRentCalculationModel.isCapReady())){
                vm.assignRentData(response);
            }
            else {
                marketRentCalculationModel.setResponseData(response);
                capSubr = marketRentCalculationModel.events.capData.subscribe(vm.onCapData);
            }
        }; */

        vm.updateGridData = function(){
          if(marketRentCalculationModel.getInitalLoad()){ 
                model.getMRRefernecData().then(vm.setGridData, marketRentMsgSVC.onGetError); 
           }
           else{
               var resultData = marketRentCalculationModel.addExstRefData();
               grid.setData(resultData);  
           }
           marketRentCalculationModel.updateUnitCount(); 
        };

        vm.assignRentData = function(response){
           marketRentCalculationModel.showMRData(response);
           vm.updateGridData();
        };

        vm.onCapData = function(){
            marketRentCalculationModel.showMRData(marketRentCalculationModel.getResponseData());
            vm.updateGridData();
        };

        vm.setMRData = function (response) {
           //vm.assignMRData(response);
           if(!model.isMarketRent()){
                marketRentCalculationModel.setResponseData(response);
                model.getCapMethod().success(vm.assignCapMethod, vm.onCapError);   
            }
            else{
                vm.assignRentData(response);
            }
        };

        vm.assignCapMethod = function(response){
            marketRentCalculationModel.assignCapMethod(response);
            if(marketRentCalculationModel.isCapMarketRent()){
               model.getMarketRentDataForCap(marketRentCalculationModel.getMarketRentURL(),  marketRentCalculationModel.getMarketRentParams()).then(vm.doMRCapValidation); 
            }
            else if(marketRentCalculationModel.isCapAvgMarketRent()){
                model.getAvgMRCap().then(vm.doAvgMRCapValidation);
            }
            else{
                vm.onCapData();
            }
       };

       vm.doMRCapValidation = function(response){
            marketRentCalculationModel.setMRValueCapMethod(response);
            vm.onCapData();
       }; 

       vm.doAvgMRCapValidation = function(response){
            marketRentCalculationModel.setAvgMRValueCapMethod(response);
            vm.onCapData();
       };  

        vm.setGridData = function(response){
            var resultData = marketRentCalculationModel.addMRRefData(response);
            grid.setData(resultData);
        };

        vm.showReferenceDataToggle = function () {
            model.setRefereceData();
        };
        
        vm.showCalculationRowsToggle = function () {
            model.setRefereceCalcData();
        };

        vm.isDataChanged = function(){

        };
      
        vm.destroy = function () {
            model.savePrefernce(vm.grid.rowHeightClass);
            marketRentSettingModel.reset();
            marketRentCalculationModel.reset();
            marketRentCalculationModel.resetEvents();
            model.reset(); 
            //vm.sessionWatch();
            vm.grid = undefined;
            vm.destWatch();
            alertModal.destroy();
            refreshModal.destroy();
           /* saveCmnt();
            delCmnt();
            closeCmnt(); */
            //dirModel.events[""].
            //commentsModel.reset();
        };

        vm.loadTableSettings = function () {
            mrGridOptionConfigModel
                .setData(marketRentSettingModel.getColumnData());
            var resolve = {
                rpBdgtGridSettings: function () {
                    return mrGridOptionConfigModel;
                }
            };
            gridSettingAside
                .resolve(resolve)
                .show();
        };

        vm.applyGridSettings = function(){
          vm.grid.rowHeightClass = model.setPreferenceValues(mrGridOptionConfigModel.getData());
          marketRentSettingModel.setColumnState(mrGridOptionConfigModel.getColumnOptions());
         // mrGridOptionConfigModel.reset();  
             /*model
                .setGridSize(mrGridOptionConfigModel.getGridRowSize())
                .toggleReferenceData(mrGridOptionConfigModel.getActiveLevel())
                .updateColumnVisibility(mrGridOptionConfigModel.getColumnOptions()); */
        };

        vm.init();
    }

    angular
         .module("budgeting")
         .controller("MarketRentCtrl", [
             "$scope",
             "rpCgModel",
             "rpCgConfigModel",
             "MarketRentModel",
             "MarketRentModelConfig",
             "MarketRentSvc",
             "MarketRentSettingModel",
             "MarketRentCalculationModel",
             "budgetDetails",
             "market-rent-config",
             "marketRentMsgSVC", 
             /*"marketRentComments",
             "commentsModel",  */
             "$location",
             "rpBdgtAsideModalService",
             /*"marketRentCommentSvc",*/
            "rpBdgtModalService",
            "sessionInfo",
            "mrGridOptionConfigModel",
            "rpBdgtBreadcrumbsModel",
             MarketRentCtrl
         ]);
})(angular);

