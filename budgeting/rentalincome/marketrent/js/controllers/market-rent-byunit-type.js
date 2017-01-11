// Defining market-rent by UNIT Type CONTROLLER //

(function(angular)
{
    function MarketrntByUnitTypeCtrl($scope,model,gridModel,gridConfigModel,mkrentByUnittypeGridConfig, marketRentCalculationModel, navModel, commentModel, asideModal, commentSvc, budgetDetails)
    {
        var vm = this,
        grid = gridModel(),
        gridConfig = gridConfigModel(), calcSubsribe, isCalcSubscribed = false, commentsAside;
       
        vm.init = function () {

            //vm.model = model; 
            model.setGridReady(false);
            //model.edit(true);
            vm.model = model;
            if(navModel.isUnitType()){
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
            }
           
          /*  gridConfig.setSrc(vm);
            mkrentByUnittypeGridConfig(gridConfig, marketRentCalculationModel.periodModel);

            vm.grid = grid;
            grid.setConfig(gridConfig);

            //MarketrntByUnitTypeSvc.get(vm.setGridData); 
            MarketrntByUnitTypeSvc.getmarketRentByUnitTypeDetails(vm.setGridData); */
           
            vm.destWatch = $scope.$on("$destroy", vm.destroy);          

        };

        vm.edit = function () {
            model.edit(true);
        };
     
        vm.save = function () {
            model.edit(false);
            vm.grid.saveChanges();
        };
        
        vm.setGridData = function (response) {
            model.setEditMode();
            model.setGridReady(true);
            grid = gridModel();
            gridConfig = gridConfigModel();
            gridConfig.setSrc(vm);
            grid.setConfig(gridConfig);
            mkrentByUnittypeGridConfig(gridConfig, marketRentCalculationModel.getPeriodModel());
            vm.grid = grid;
            grid.setData(marketRentCalculationModel.getDetailData());
            vm.pageType = true;

          /*  marketRentCalculationModel.dtRentdtls = response.records.unitTypes;
            grid.setData(response.records.unitTypes); */
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

         vm.updateCommentCount=function(count){
           marketRentCalculationModel.updateCommentCount(commentModel.getCurrentRecord(), count);
           //commentsModel.closeComments();     
        };

        vm.makeRentComment = function(column){
            commentModel.setCurrentData(column);
            var paramData = angular.copy(column.row.data);
            paramData.accessPrivilages = budgetDetails.getAccessPrivileges().allowComments;
            paramData.subTitle = paramData.description;
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
            vm.model.reset();
            vm.model = undefined;
            vm.destWatch();
        };

        vm.init();

    }

angular.module("budgeting").controller("MarketrntByUnitTypeCtrl",
                                      ['$scope','MarketRentEditModel','rpCgModel','rpCgConfigModel','mkrentByUnittypeGridConfig',
                                       'MarketRentCalculationModel', 'BdgtRentalIncomeModelNav', 'marketRentComments','rpBdgtAsideModalService',
                                        'marketRentCommentSvc',  'budgetDetails',   MarketrntByUnitTypeCtrl]);
})(angular);

