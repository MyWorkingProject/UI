//  Controller
(function (angular) {
    "use strict";

    function SelectUnitTypeCtrl(
        $scope,
        model,
        gridModel,
        unitTypeParams,
        gridConfig,
        asideModalInstance,
        unitTypeSvc,
            $window) {

        var vm = this, grid;
               
        vm.init = function () {
            vm.model = model;          
            grid = vm.grid = gridModel.grid;                              
            vm.loadData();           
        };

        vm.loadData = function () {                       
            unitTypeSvc.getUnitTypeList(unitTypeParams).then(vm.setData);
        };

        vm.setData = function (data) {
            gridModel.originalData = data;
            gridModel.load(data);
        };
        
        vm.assignSelectedUnitTypes = function () {
            vm.selectedUnitTypes = gridModel.getSelectedUnitTypes();
        };

        vm.getSelectedUnitTypes = function () {
            vm.assignSelectedUnitTypes();
            asideModalInstance.done(vm.selectedUnitTypes);
        };

        vm.close = function (){
            asideModalInstance.cancel();
        };

        vm.init();
    }
    angular
        .module("budgeting")
        .controller("SelectUnitTypeCtrl", [
            '$scope',
            'selectUnitTypeModel',
            'selectUnitTypeGridFactory',
            'unitTypeParams',
            'rpGridTransform',
            'rpBdgtAsideModalInstance',
            'unitTypeSvc',
            '$window',
             SelectUnitTypeCtrl
        ]);
})(angular);
