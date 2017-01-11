//  SampleCg Controller

(function (angular) {
    "use strict";

    function MarketRentUnitTypeProgramCtrl($scope, model, gridModel, gridConfigModel, MarketRentUnitTypeProgramModelConfig, marketRentCalculationModel, navModel, commentModel, asideModal, commentSvc, budgetDetails) {
        var vm = this,
            grid = gridModel(),
            gridConfig = gridConfigModel(), calcSubsribe, isCalcSubscribed = false, commentsAside;

        vm.init = function () {
            model.setGridReady(false);
            //model.edit(true);
            vm.model = model;
            if(navModel.isProgram()){
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
                
            }

          /*  vm.model = model;

            gridConfig.setSrc(vm);            
            MarketRentUnitTypeProgramModelConfig(gridConfig, marketRentCalculationModel.periodModel);

            vm.grid = grid;
            grid.setConfig(gridConfig);

            //MarketRentUnitTypeProgramSvc.get(vm.setGridData); // marketRentSvc.getData(vm.setGridData); 
            MarketRentUnitTypeProgramSvc.getMarketRentProgramDetails(vm.setGridData); // marketRentSvc.getData(vm.setGridData);  */

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
            MarketRentUnitTypeProgramModelConfig(gridConfig, marketRentCalculationModel.getPeriodModel());
            vm.grid = grid;
            grid.setData(marketRentCalculationModel.getDetailData());
            vm.pageType = true;
           /* var data = marketRentCalculationModel.addDynamicColumn(response.records.unitTypeProgram);            
            marketRentCalculationModel.dtRentdtls = data;
            grid.setData(data); */
        };

        vm.makeRentUnitVal = function (column, colrows, gridRow) {
            marketRentCalculationModel.getGroupUnitBalance(gridRow.row.data, colrows);
            marketRentCalculationModel.updateTotalData(false);
        };

        vm.makeRentCountFocus = function(column, row){
           marketRentCalculationModel.setCurrentCntValue(column.key, row, "program");
        };

        vm.makeRentVal = function (column, colrows, gridRow) {
            marketRentCalculationModel.getKeyValue(column.key);
            marketRentCalculationModel.getTotals(colrows, gridRow);
            //marketRentCalculationModel.getGroupUnitBalance(gridRow.row.data, colrows);
        };

        vm.makeRentFocus = function(column, row){
            marketRentCalculationModel.setCurrentPeriodValue(column.key, row);
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
        }; */

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
         .controller("MarketRentUnitTypeProgramCtrl", [
             "$scope",
             "MarketRentEditModel",
             "rpCgModel",
             "rpCgConfigModel",
             "MarketRentUnitTypeProgramModelConfig",
             "MarketRentCalculationModel",
             "BdgtRentalIncomeModelNav",
             "marketRentComments",
             'rpBdgtAsideModalService',
             'marketRentCommentSvc',
             'budgetDetails',  
             MarketRentUnitTypeProgramCtrl
         ]);
})(angular);

