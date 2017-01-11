//  Home Controller

(function (angular) {
    "use strict";

    function BdgtAdminCtrl($location, model) {
        var vm = this;

        vm.init = function () {
            vm.bdgtadminnav = model.text.adminNav;
        };

        vm.navigateToPage = function (url) {
            $location.path(url);
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtAdminCtrl', ['$location', 'adminModel', BdgtAdminCtrl]);
})(angular);
