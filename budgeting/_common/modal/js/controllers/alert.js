//  Alert Controller

(function (angular) {
    "use strict";

    function AlertCtrl($scope, modalInstance, content) {
        var vm = this;

        vm.init = function () {
            vm.ok = modalInstance.ok;
            vm.cancel = modalInstance.cancel;

            vm.content = content;
        };

        vm.destroy = function () {

        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("AlertCtrl", [
            '$scope',
            'rpBdgtModalInstance',
            'rpBdgtContentModel',
            AlertCtrl]);
})(angular);
