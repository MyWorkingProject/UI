(function (angular) {
    "use strict";

   // var fn = angular.noop;

    function BdgtModelWidgetCtrl($scope, gridConfig, gridActions, gridFactory,model,session,preferences) {
        var vm = this;
 


        vm.init = function () {      
            
           gridConfig.setSrc(vm);
           gridActions.setSrc(vm);
           $scope.gridModel = gridFactory;         
           vm.sessionWatch = session.subscribe("update",vm.initializeModel);         
           vm.initializeModel();
           vm.destroyWatch =$scope.$on('$destroy', vm.destroy);
           
        };

        vm.sortBudgetModels=function(type){
               gridFactory.sortBudgetModel(type);               
        };

        vm.getPreferenceData=function(data){
            gridFactory.setGridFilterData(data);
        };

        vm.initializeModel = function () {  
           if (session.isReady()) { 
                vm.getFilterOptions();  
                if (vm.initModelWatch) {
                    vm.initModelWatch();
                }
            }
            else {
                vm.initModelWatch = session.subscribe(vm.initializeModel);
            } 
        };        

         vm.getFilterOptions = function () {      
            var promise;
            if(model.getBudgetYearsFilters().length>1){
                 model.getFilterData().then(vm.getPreferenceData);
            }
            else
            {   
                promise = model.getBudgetYears();
                promise.then(vm.loadModels);
            } 
        };

        vm.loadModels=function(){
            gridFactory.initLoad();
            model.getFilterData().then(vm.getPreferenceData);
        };

         vm.destroy = function () {        
            vm.sessionWatch();
             vm.destroyWatch(); 
            gridFactory.saveFilterData();
        };

    

        vm.init();
    }


    angular
           .module("budgeting")
           .controller('BdgtModelWidgetCtrl', [
                       '$scope',
                        'modelWidgetConfig',
                        'modelWidgetActions',
                        'modelWidgetGridFactory',
                        'modelWidget',
                        'sessionInfo',
                        'preferences',
                                     
                       BdgtModelWidgetCtrl]);
})(angular);