// services controller

(function (angular) {
    "use strict";
   
    function ServicesCtrl( $scope) {
        var vm = this;
        vm.init = function () {


        };

        vm.init();

    }

    angular
        .module("budgeting")
        .controller("ServicesCtrl", [
            '$scope',
          
        ServicesCtrl]);

})(angular);
