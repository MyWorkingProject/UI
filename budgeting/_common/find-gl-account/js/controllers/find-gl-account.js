//  Sample Input Text Controller

(function (angular) {
    "use strict";

    function FindGlAccountCtrl($scope, model, selectedGlAccountData, formConfig, asideModalInstance) {
        var vm = this;
        vm.selectedGLAccountNumber = "";
        vm.formConfig = formConfig;
        formConfig.setMethodsSrc(vm);

        vm.init = function () {
            vm.model = model;
            vm.loadData();                       
        };

        vm.selectedGlAccountInfo = function (glAcctInfo) {
            vm.selectedGLAccountNumber = glAcctInfo;          
        };

        vm.showSelectedGlAccount = function () {            
            asideModalInstance.done(vm.selectedGLAccountNumber);
        };

        vm.loadData = function () {
            model.findGlAccountDetails(selectedGlAccountData);          
        };

        vm.onSelectedGlAccount = function () {
             model.onSelectedGlAccount();
        };
      
        vm.init();
    }
    angular
        .module("budgeting")
        .controller("FindGlAccountCtrl", ['$scope', 'findGlAccount', 'selectedGlAccountData', 'find-gl-account-config','rpBdgtAsideModalInstance',
             FindGlAccountCtrl
        ]);
})(angular);
