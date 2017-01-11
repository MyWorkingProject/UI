//  SampleCg Controller

(function (angular) {
    "use strict";

    function MarketRentUnitTypeStudentCtrl($scope, model, gridModel, gridConfigModel, marketRentUnitTypeStudentModelConfig, marketRentCalculationModel, commentModel, asideModal, commentSvc, budgetDetails) {
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
                    calcSubsribe = marketRentCalculationModel.subscribe("update",vm.setGridData);
            }
            else{
                    vm.setGridData();
            }
            commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);

          /*  vm.model = model;

            gridConfig.setSrc(vm);
            marketRentUnitTypeStudentModelConfig(gridConfig, marketRentCalculationModel.periodModel);

            vm.grid = grid;
            grid.setConfig(gridConfig);

            marketRentUnitTypeStudentSvc.getmarketRentUnitTypeStudentDetails(vm.setGridData); // marketRentSvc.getData(vm.setGridData);  */

            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.edit = function () {
            model.edit(true);
        };

        //vm.setGridData = function () {
        //    if (marketRentCalculationModel.isReady()) {
        //        grid.setData(marketRentCalculationModel.dtRentdtls);
        //        if (vm.initModelWatch) {
        //            vm.initModelWatch();
        //        }
        //    } else {
        //        vm.initModelWatch = marketRentCalculationModel.subscribe("update", vm.setGridData);
        //    }
        //    return vm;
        //};

        vm.setGridData = function (response) {
           /* marketRentCalculationModel.dtRentdtls = response.records.studentUnitType;
            grid.setData(marketRentCalculationModel.dtRentdtls);*/
            model.setEditMode();
            model.setGridReady(true);
            grid = gridModel();
            gridConfig = gridConfigModel();
            gridConfig.setSrc(vm);
            grid.setConfig(gridConfig);
            marketRentUnitTypeStudentModelConfig(gridConfig, marketRentCalculationModel.getPeriodModel());
            vm.grid = grid;
            grid.setData(marketRentCalculationModel.getDetailData());
            vm.pageType = true;
        };

        vm.logTitle = function (data) {
            logc(data);
        };

        vm.makeRentVal = function (column, colrows, row) {
            marketRentCalculationModel.getKeyValue(column.key);
            marketRentCalculationModel.getTotals(colrows, row);
        };

        vm.makeRentFocus = function(column, row){
            marketRentCalculationModel.setCurrentPeriodValue(column.key, row);
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
         .controller("MarketRentUnitTypeStudentCtrl", [
             "$scope",
             "MarketRentEditModel",
             "rpCgModel",
             "rpCgConfigModel",
             "MarketRentUnitTypeStudentModelConfig",
             "MarketRentCalculationModel",
             "marketRentComments",
             'rpBdgtAsideModalService',
             'marketRentCommentSvc',
             'budgetDetails',     
             MarketRentUnitTypeStudentCtrl
         ]);
})(angular);

