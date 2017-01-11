//  Budget Model Allocation CONTROLLER

(function (angular) {
    function BdgtAllocationsCtrl(
        $scope,
        $state,
        $stateParams,
        budgetDetails,
        breadcrumbs) {
        // initialization of controller
        var vm = this,
            budgetDetailEventSubscribe;

        vm.init = function () {
            if (angular.isFunction(budgetDetailEventSubscribe)) {
                budgetDetailEventSubscribe();
            }
            var budgetModel = budgetDetails.getModelDetails();
            logc(budgetModel);
            breadcrumbs.updateLink('allocations', { distID: $stateParams.distID }, budgetModel.modelName);
        };

        vm.destroy = function () {
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtAllocationsCtrl', [
            '$scope',
            '$state',
            '$stateParams',
            'budgetDetails',
            "rpBdgtBreadcrumbsModel",
             BdgtAllocationsCtrl
        ]);
})(angular);
