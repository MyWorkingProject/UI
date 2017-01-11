//  SampleCg Controller

(function (angular) {
    "use strict";

    function MarketRentServiceGroupCtrl($scope, model, gridModel, gridConfigModel, MarketRentServiceGroupModelConfig, marketRentCalculationModel, commentModel, asideModal, commentSvc, budgetDetails) {
        var vm = this,
            grid = gridModel(),
            gridConfig = gridConfigModel(), calcSubsribe, isCalcSubscribed = false, commentsAside;

        vm.init = function () {
            model.setGridReady(false);
            //model.edit(true);
            vm.model = model;
            if(!marketRentCalculationModel.isReady()){
                //marketRentCalculationModel.events.update.subscribe(vm.setGridData);
                isCalcSubscribed = true;
                calcSubsribe =  marketRentCalculationModel.subscribe("update",vm.setGridData);
            }
            else{
                vm.setGridData();
            }
            commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);
        /*    gridConfig.setSrc(vm);
            MarketRentServiceGroupModelConfig(gridConfig, marketRentCalculationModel.periodModel);

            vm.grid = grid;
            grid.setConfig(gridConfig);

            MarketRentServiceGroupSvc.getMarketRentServiceDetails(vm.setGridData); // marketRentSvc.getData(vm.setGridData);  */
            //MarketRentServiceGroupSvc.get(vm.setGridData);

            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.edit = function () {
            model.edit(true);
        };

        vm.setGridData = function (response) {
            model.setEditMode();
            model.setGridReady(true);
            grid = gridModel();
            gridConfig = gridConfigModel();
            gridConfig.setSrc(vm);
            grid.setConfig(gridConfig);
            MarketRentServiceGroupModelConfig(gridConfig, marketRentCalculationModel.getPeriodModel());
            vm.grid = grid;
            grid.setData(marketRentCalculationModel.getDetailData());
            vm.pageType = true;
        };

        vm.makeRentUnitVal = function (column, colrows, gridRow) {
            marketRentCalculationModel.getGroupUnitBalance(gridRow.row.data, colrows);
            marketRentCalculationModel.updateTotalData(false);
        };

        vm.makeRentVal = function (column, colrows, gridRow) {
            marketRentCalculationModel.getKeyValue(column.key);
            marketRentCalculationModel.getTotals(colrows, gridRow);
        };

        vm.makeRentCountFocus = function(column, row){
            marketRentCalculationModel.setCurrentCntValue(column.key, row, "service");
        };

        vm.makeRentFocus = function(column, row){
            marketRentCalculationModel.setCurrentPeriodValue(column.key, row);
        };

        vm.logTitle = function (data) {
            logc(data);
        };

        vm.destroy = function () {
            //vm.grid.destroy();
            vm.grid = undefined;
            if(isCalcSubscribed){
                calcSubsribe();
                isCalcSubscribed = false;
            }
            vm.model.reset();
            vm.model = undefined;
            vm.destWatch();
        };

       /* vm.makeRentComment = function(column){
            commentModel.getCommentData(column);
        };*/
       
       vm.updateCommentCount=function(count){
           marketRentCalculationModel.updateCommentCount(commentModel.getCurrentRecord(), count);
           //commentsModel.closeComments();     
        };

        vm.makeRentComment = function(column){
            commentModel.setCurrentData(column);
            var paramData = angular.copy(column.row.data);
            paramData.accessPrivilages = budgetDetails.getAccessPrivileges().allowComments;
            paramData.subTitle = paramData.rowTitle;
            var resolveData = {
                commentParams:  function () {
                    return paramData;
                }, 
                commentsSvc: function () {
                    return commentSvc;
                }
            };
            commentsAside.resolve(resolveData).show();
        };  

        vm.init();
    }

    angular
         .module("budgeting")
         .controller("MarketRentServiceGroupCtrl", [
             "$scope",
             "MarketRentEditModel",
             "rpCgModel",
             "rpCgConfigModel",
             "MarketRentServiceGroupModelConfig",
             "MarketRentCalculationModel",
             "marketRentComments",
             'rpBdgtAsideModalService',
             'marketRentCommentSvc',
             'budgetDetails',   
             MarketRentServiceGroupCtrl
         ]);
})(angular);

