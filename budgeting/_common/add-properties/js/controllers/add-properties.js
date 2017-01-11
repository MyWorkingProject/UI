//  Add Properties Controller
(function (angular) {
    "use strict";

    function AddPropertiesCtrl(
        $scope,
        model,
        gridModel,
        displayProperties,
        gridConfig,
        asideModalInstance,
        addPropertiesSvc,
            $window) {

        var vm = this, grid;
               
        vm.init = function () {
            vm.model = model;          
            grid = vm.grid = gridModel.grid;           
            grid.subscribe('filterBy', vm.loadData);
            grid.subscribe('sortBy', vm.loadData);
            grid.subscribe('paginate', vm.loadData);
            gridModel.displayProperties.mastarChart = displayProperties.mastarChart;
            vm.loadData();           
        };

        vm.loadData = function () {            
            displayProperties.dataFilter = gridModel.grid.getQuery();            
            addPropertiesSvc.getPropertyList(displayProperties).then(gridModel.load);
        };
        
        vm.assignSelectedProperties = function () {
            vm.selectedProperties = gridModel.getSelectedProperties();           
        };

        vm.getSelectedProperties = function () {
            vm.assignSelectedProperties();
            asideModalInstance.done(vm.selectedProperties);
        };

        vm.close = function (){
            asideModalInstance.cancel();
        };

        vm.init();
    }
    angular
        .module("budgeting")
        .controller("AddPropertiesCtrl", [
            '$scope',
            'addPropertiesModel',
            'addPropertiesGridFactory',
            'displayProperties',
            'rpGridTransform',
            'rpBdgtAsideModalInstance',
            'addPropertiesSvc',
            '$window',
             AddPropertiesCtrl
        ]);
})(angular);
