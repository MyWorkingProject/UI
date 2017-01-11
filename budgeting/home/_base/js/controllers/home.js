// Home Controller

(function() {
    "use strict";

    function HomeCtrl() {
        var vm = this;
        vm.message = "Welcome to Budgeting!";
    }

    angular
        .module("budgeting")
        .controller('HomeCtrl', [HomeCtrl]);
})(angular);
