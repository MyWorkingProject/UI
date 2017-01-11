(function (angular) {
    "use strict";
    var fn = angular.noop;

    function BdgtEditMasterchartCtrl($stateParams, editModel, $scope) {
        var vm, watch1;
        watch1 = fn;
        vm = this;

        vm.model = editModel;

        vm.init = function () {
            editModel.getMasterchartMenuData($stateParams.chartID);
            $scope.$watch('page.model.glAccounts.isActive', editModel.showGlAccount, true);
            $scope.$watch('page.model.category.isActive', editModel.showCategory, true);
            $scope.$watch('page.model.cloneChart.isActive', editModel.showClone, true);
            watch1 = $scope.$on('$destroy', vm.destroy);
        };

        vm.showTab = function () {
            editModel.showTab();
        };

        vm.destroy = function () {
            watch1();
            editModel.resetTab();
        };

        vm.init();

    }

    angular
        .module("budgeting")
        .controller('BdgtEditMasterchartCtrl', ['$stateParams', 'editMasterChartModel', '$scope', BdgtEditMasterchartCtrl]);
})(angular);
