//  Budget Model Controller

(function (angular) {
    function PayrollglViewCtrl($scope, $stateParams,gridModel,gridConfigModel,payrollglConfig,model,budgetDetails,mock) {
        var vm = this,grid,gridConfig,budgetDetailEventSubscribe;

        vm.init = function () { 
          /*  if (angular.isFunction(budgetDetailEventSubscribe)) {
                budgetDetailEventSubscribe();
            }*/
             vm.rowOptions=false;         
            vm.loadPayrollglView(); 
        };

         vm.loadPayrollglView=function(){
            grid = gridModel();
            gridConfig = gridConfigModel();
            gridConfig.setSrc(vm);                                
            var promise = model.getPayrollglHeaders();
            promise.then(vm.loadPayrollGlData);
        };

        vm.loadPayrollGlData=function(data){
              model.updateHeaderData(data);
              var promise = model.getPayrollglData().success(vm.setGridData);
             // promise.success(vm.setGridData);
        };

         vm.setGridData = function (data) {
            //mock.mockData
             vm.rowOptions=true; 
             grid.setConfig(gridConfig);

            //Handling MockData
           /*  payrollglConfig(gridConfig, model.getHeaderData(),mock.mockData.records);
             vm.grid = grid;                     
             vm.grid.setData(mock.mockData.records);   */    
            payrollglConfig(gridConfig, model.getHeaderData(),data.records);
             vm.grid = grid;                     
             vm.grid.setData(data.records);            
        };      

        vm.destroy = function () {
            vm = undefined;
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('PayrollglViewCtrl', [
            '$scope',          
            '$stateParams',
            'rpCgModel',
            'rpCgConfigModel',
            'payrollglConfig',
            'PayrollglView',	
            'budgetDetails',
            'PayrollglViewMock',	     
            PayrollglViewCtrl
        ]);
})(angular);
