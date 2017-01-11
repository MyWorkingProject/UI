// Defining market-rent by UNIT CONTROLLER //

(function(angular)
{
    function MarketrntByUnitCtrl($scope,model,gridModel,gridConfigModel,mkrentByUnitGridConfig, marketRentCalculationModel, navModel, asideModal, commentSvc, commentModel, budgetDetails)
    {
        var vm = this, grid, gridConfig, calcSubsribe, isCalcSubscribed = false, commentsAside;
       
        vm.init = function () {
            //vm.readyGrid = false;
            model.setGridReady(false);
            //model.edit(true);
            vm.model = model;
            if(navModel.isUnit()){
                if(!marketRentCalculationModel.isReady()){
                        isCalcSubscribed = true;
                        calcSubsribe = marketRentCalculationModel.subscribe("update",vm.setGridData);
                }
                else{
                      vm.setGridData();
                }
                commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);
            }
            //vm.setGridData();
            //mkrentByUnitGridConfig(gridConfig, marketRentCalculationModel.periodModel);

           
            //MarketrntByUnitSvc.get(vm.setGridData); 
            //MarketrntByUnitSvc.getmarketRentByUnitDetails(vm.setGridData);
           
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
             //TODO: based on the type market rent type page editable grid will be shown

        };
       
        vm.edit = function () {
            model.edit(true);
        };

        vm.save = function () {
            //model.edit(false);
            vm.grid.saveChanges();
        };

        vm.cancel = function () {
            model.edit(false);
            vm.grid.flushChanges();
        };        

        vm.setGridData = function () {
            //vm.readyGrid = true;
            model.setEditMode();
            model.setGridReady(true);
            grid = gridModel();
            gridConfig = gridConfigModel();
            gridConfig.setSrc(vm);
            grid.setConfig(gridConfig);
            mkrentByUnitGridConfig(gridConfig, marketRentCalculationModel.getPeriodModel());
            //marketRentCalculationModel.dtRentdtls = response.records.units;
            //grid.setConfig(gridConfig);
            vm.grid = grid;
            //grid.busy(true);
            grid.setData(marketRentCalculationModel.getDetailData());
            //grid.busy(false);
            vm.pageType = true;
        };

        vm.makeRentVal = function (column, colrows, row) {
            marketRentCalculationModel.getKeyValue(column.key);
            marketRentCalculationModel.getTotals(colrows, row);
        };

        vm.makeRentFocus = function(column, row){
            marketRentCalculationModel.setCurrentPeriodValue(column.key, row);
        };

        vm.updateCommentCount=function(count){
           marketRentCalculationModel.updateCommentCount(commentModel.getCurrentRecord(), count);
           //commentsModel.closeComments();     
        };

       vm.makeRentComment = function(column){
            commentModel.setCurrentData(column);
            var paramData = angular.copy(column.row.data);
            paramData.accessPrivilages = budgetDetails.getAccessPrivileges().allowComments;
            paramData.subTitle = paramData.unitNumber;
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

        vm.destroy = function () {
            //vm.grid.destroy();
            vm.grid = undefined;
            if(isCalcSubscribed){
                calcSubsribe();
                isCalcSubscribed = false;
            }
            model.reset();
            vm.model = undefined;
            vm.destWatch();
        };

        vm.init();

    }

angular.module("budgeting").controller("MarketrntByUnitCtrl",
                                      ['$scope','MarketRentEditModel','rpCgModel','rpCgConfigModel','mkrentByUnitGridConfig','MarketRentCalculationModel','BdgtRentalIncomeModelNav', 'rpBdgtAsideModalService',
                                        'marketRentCommentSvc', 'marketRentComments', 'budgetDetails',
                                      MarketrntByUnitCtrl]);
})(angular);

