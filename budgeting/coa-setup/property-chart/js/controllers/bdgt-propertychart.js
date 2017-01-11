(function (angular) {
    "use strict";
    var fn = angular.noop;
    function BdgtPropertychartCtrl(model, $scope, config, actions, $location) {
        var vm;
        vm = this;

        vm.init = function () {
            config.setSrc(vm);
            actions.setSrc(vm);
            $scope.model = model;
            model.load();
            $scope.$on('$destroy', vm.destroy);


        };

        vm.destroy = function () {

        };

        vm.manageGL = function (record) {
            $location.path('/admin/coa/manageglaccount/' + record.clonedMasterChartID + '/' + record.propertyID);
        };

        vm.print = function (record) {

        };

        vm.init();

    }

    angular
        .module("budgeting")
        .controller('BdgtPropertychartCtrl', ['propertyChartModel', '$scope', 'propertyChartListConfig', 'propertyChartListActions', '$location', BdgtPropertychartCtrl]);
})(angular);
