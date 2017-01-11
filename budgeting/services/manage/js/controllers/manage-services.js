// manage services controller

(function (angular) {
    "use strict";

    function ManageServicesCtrl( $scope, $state) {
        var vm = this;

        vm.init = function () {


        };

        vm.navigateToPage = function () {
            $state.go('services.service', { servID: 0 }, { isEdit: true });
        };

        vm.init();

    }
    angular
        .module("budgeting")
        .controller("ManageServicesCtrl", [
            "$scope",
            "$state",
        ManageServicesCtrl]);
})(angular);