//  payroll Controller

(function (angular) {
    "use strict";

    function PayrollCtrl(
        $scope,
        $state,
        $stateParams,
        budgetDetails,
        baseModel,
        svc,
        breadcrumbs) {
        var vm = this;

        vm.init = function () {
            var budgetModel = budgetDetails.getModelDetails();

            svc.getPayrollItems({
                propertyID: budgetModel.propertyID,
                budgetModelID: budgetModel.budgetModelID
            }).then(function (data) {
                baseModel.setPayrollItems(data.records);
            });

            //breadcrumb
            breadcrumbs.updateLink('budgetmodel.overview', { distID: $stateParams.distID },  budgetModel.modelName);
        };

        vm.destroy = function () {
            baseModel.reset();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("PayrollCtrl", [
            '$scope',
            '$state',
            '$stateParams',
            'budgetDetails',
            'payrollBaseModel',
            'payrollService',
            'rpBdgtBreadcrumbsModel',
            PayrollCtrl]);
})(angular);
