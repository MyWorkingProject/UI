//  BdgtMasterChartWizCtrl Controller

(function (angular) {
    "use strict";

    function BdgtMasterChartWizCtrl($scope, model) {
        var vm = this;

        vm.init = function () {
            vm.model = model;
            model.setChartID();
            model.setChartType();
            model.updateWizSteps();

            $scope.$on('$destroy', vm.reset);
        };

        vm.reset = function () {
            model.reset();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtMasterChartWizCtrl', ['$scope', 'bdgtMasterChartWizModel', BdgtMasterChartWizCtrl]);
})(angular);
