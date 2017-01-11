//  SampleCg Controller

(function (angular) {
    "use strict";

    function MarketRentRefCtrl($scope, gridModel, gridConfigModel, marketRentRefModelConfig, marketRentRefSvc, marketRentSettingModel, marketRentCalculationModel, $stateParams) {
        var vm = this,
            grid = gridModel(),
            gridConfig = gridConfigModel();

        vm.init = function () {
            gridConfig.setSrc(vm);
            marketRentRefModelConfig(gridConfig, marketRentCalculationModel.periodModel);

            vm.grid = grid;
            grid.setConfig(gridConfig);

            marketRentRefSvc.getmarketRentReferenceDetails(vm.setGridData);
            //marketRentRefSvc.get(vm.setGridData);  //vm.setGridData(marketRentRefSvc.getData());

            vm.destWatch = $scope.$on("$destroy", vm.destroy);
            //marketRentModel.events.subscribe('referenceRows', vm.setGridRefData);
        };

        vm.setGridData = function (data) {
            // grid.setData(data.records);
            var resultData = marketRentCalculationModel.addRentReferenceRows(data.records);
            grid.setData(resultData);
        };

        vm.destroy = function () {
            vm.grid.destroy();
            vm.grid = undefined;
            vm.destWatch();
        };

        vm.init();
    }

    angular
         .module("budgeting")
         .controller("MarketRentRefCtrl", [
             "$scope",
             "rpCgModel",
             "rpCgConfigModel",
             "MarketRentRefModelConfig",
             "MarketRentRefSvc",
             "MarketRentSettingModel",
             "MarketRentCalculationModel",
             "$stateParams",
//             "MarketRentModel",
             MarketRentRefCtrl
         ]);
})(angular);

