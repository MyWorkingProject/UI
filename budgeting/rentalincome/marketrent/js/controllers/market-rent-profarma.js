//  SampleCg Controller

(function (angular) {
    "use strict";

    function MarketRentProfarmaCtrl($scope, model, gridModel, gridConfigModel, marketRentProformaModelConfig, marketRentCalculationModel, commentModel, asideModal, commentSvc, budgetDetails, mrModel, confirmModal) {
      var vm = this,
          grid = gridModel(),
          gridConfig = gridConfigModel(), calcSubsribe, isCalcSubscribed = false, commentsAside, msgModal;

      vm.init = function () {

        model.setGridReady(false);
        //model.edit(true);
        vm.model = model;
        if(!marketRentCalculationModel.isReady()){
                //marketRentCalculationModel.events.update.subscribe(vm.setGridData);
                 isCalcSubscribed = true;
                 calcSubsribe = marketRentCalculationModel.subscribe("update",vm.setGridData);
        }
        else{
                vm.setGridData();
        }
        commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);
        /*  vm.model = model;

          gridConfig.setSrc(vm);
          marketRentProfarmaModelConfig(gridConfig);

          vm.grid = grid;
          grid.setConfig(gridConfig);

          marketRentProfarmaSvc.get(vm.setGridData); // marketRentSvc.getData(vm.setGridData); */

          vm.destWatch = $scope.$on("$destroy", vm.destroy);
      };

      vm.edit = function () {
          model.edit(true);
      };

      vm.setGridData = function (response) {
          //grid.setData(response.records);
        model.setEditMode();
        model.setGridReady(true);
        grid = gridModel();
        gridConfig = gridConfigModel();
        gridConfig.setSrc(vm);
        grid.setConfig(gridConfig);
        marketRentProformaModelConfig(gridConfig, marketRentCalculationModel.getPeriodModel());
        vm.grid = grid;
        grid.setData(marketRentCalculationModel.getDetailData());
        vm.pageType = true;  
      };

      vm.logTitle = function (data) {
          logc(data);
      };

      vm.destroy = function () {
         // vm.grid.destroy();
          vm.grid = undefined;
           if(isCalcSubscribed){
                calcSubsribe();
                isCalcSubscribed = false;
            }  
          vm.model.reset();
          vm.model = undefined;
          vm.destWatch();
      };

      vm.addNewRow  = function()
      {
        marketRentCalculationModel.addNewUnitType();
        grid.setData(marketRentCalculationModel.getDetailData());
      };
        
    vm.validateDescr = function(column){
        marketRentCalculationModel.validateDescr(column);
    };

    vm.removeUnitType = function(column){
        marketRentCalculationModel.removeUnitType(column);
        grid.setData(marketRentCalculationModel.getDetailData());
        vm.updateUnitCount();
    };

    vm.makeRentVal = function (column, colrows, row) {
        marketRentCalculationModel.getKeyValue(column.key);
        marketRentCalculationModel.getTotals(colrows, row);
    };

    vm.makeRentFocus = function(column, row){
        marketRentCalculationModel.setCurrentPeriodValue(column.key, row);
    }; 

    vm.updateUnitCount = function(){
        marketRentCalculationModel.updateUnitTypeSummaryData();
        marketRentCalculationModel.updateUnitCount();
    };

   /* vm.makeRentComment = function(column){
            commentModel.getCommentData(column);
     }; */
    
    vm.updateCommentCount=function(count){
           marketRentCalculationModel.updateCommentCount(commentModel.getCurrentRecord(), count);
           //commentsModel.closeComments();     
    };

    vm.makeRentComment = function(column){
            commentModel.setCurrentData(column);
            var paramData = angular.copy(column.row.data);
            paramData.subTitle = paramData.description;
            if(paramData.proformaUnitTypeID > 0 || paramData.unitTypeID > 0){
                paramData.accessPrivilages = budgetDetails.getAccessPrivileges().allowComments;
            var resolveData = {
                commentParams:  function () {
                    return paramData;
                }, 
                commentsSvc: function () {
                    return commentSvc;
                }
            };
            commentsAside.resolve(resolveData).show();
            }
            else{
                //show message
                vm.ShowSaveMsg();
            }
    }; 

     vm.ShowSaveMsg = function(){
            msgModal = confirmModal.alert().setContent({
                    title: vm.getKeyValue('bdgt_rental_mr_prof_save_header') ,
                    message: vm.getKeyValue('bdgt_rental_mr_prof_save_msg') ,
                    btnOkText: vm.getKeyValue('bdgt_rental_mr_ok_text')
                }).ok(vm.subscribeSave); 
                msgModal.show();
        };    

    vm.subscribeSave = function(){
        if(isCalcSubscribed){
            calcSubsribe();
        }
        isCalcSubscribed = true;
        calcSubsribe = marketRentCalculationModel.subscribe("update",vm.setGridData);
    };

    vm.getKeyValue = function(key){
           return mrModel.getKeyValue(key);
    };

    vm.init();
    }

    angular
         .module("budgeting")
         .controller("MarketRentProfarmaCtrl", [
             "$scope",
             "MarketRentEditModel",
             "rpCgModel",
             "rpCgConfigModel",
             "MarketRentProformaModelConfig",
             "MarketRentCalculationModel",
             "marketRentComments",
             'rpBdgtAsideModalService',
             'marketRentCommentSvc',
             'budgetDetails', 
             'MarketRentModel',
            'rpBdgtModalService',
             MarketRentProfarmaCtrl
         ]);
})(angular);
