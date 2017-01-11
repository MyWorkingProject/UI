//  App Controller

(function (angular) {
    "use strict";

    function AppCtrl($scope, $timeout, layout, session, headerModel) {
        var vm = this;

        vm.init = function () {
            $scope.AppCtrl = vm;
            $timeout(vm.setReady, 100);
            $scope.appLayout = layout.getLayout();
            session.subscribe("update", vm.updateHeaderData);

            if (session.isReady()) {
                vm.updateHeaderData();
            }
        };

        vm.setReady = function () {
            vm.ready = true;
        };

        vm.updateHeaderData = function () {
            headerModel.setData({
                username: session.get("name")
            });
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('AppCtrl', [
            "$scope",
            "$timeout",
            "appLayout",
            "sessionInfo",
            "rpGlobalHeaderModel",
            AppCtrl
        ]);
})(angular);
