//  Confirm Controller

(function (angular) {
    "use strict";

    function ConfirmCtrl($scope, modalInstance, content, result) {
        var vm = this;

        vm.init = function () {
            vm.accept = modalInstance.accept;
            vm.reject = modalInstance.reject;

            vm.content = content;
            vm.result = result;
        };

        vm.destroy = function () {

        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("ConfirmCtrl", [
            '$scope',
            'rpBdgtModalInstance',
            'rpBdgtContentModel',
            'rpBdgtResultModel',
            ConfirmCtrl]);
})(angular);
