(function (angular) {
    "use strict";

    function ModelDetailsInfoCtrl($scope, budgetDetails) {
        var vm = this;

        vm.init = function () {
            vm.model = budgetDetails.getModelDetails();
            vm.accessPrivileges = budgetDetails.getAccessPrivileges();
        };

        vm.destroy = function () {
        };

        vm.init();
    }

    angular
         .module("budgeting")
         .controller("ModelDetailsInfoCtrl", [
             '$scope',
            'budgetDetails',
             ModelDetailsInfoCtrl
         ]);
})(angular);