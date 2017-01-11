//  Payroll Summary Item Controller

(function (angular) {
    "use strict";

    function PayrollSummaryItemCtrl(
        $scope,
        summaryModel,
        summaryContent,
        payrollItemState,
        summaryGridConfig,
        budgetDetails,
        svc) {
        var vm = this,
            model,
            payrollByModel,
            budgetModel;

        vm.init = function () {
            budgetModel = budgetDetails.getModelDetails();
            payrollByModel = payrollItemState.get();

            var gridConfig = summaryGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods);

            model = vm.model = summaryModel(gridConfig);

            var params = {
                distributedID: payrollByModel.distID,
                payrollBy: payrollByModel.payrollBy
            };

            if (payrollItemState.getIsEmployee()) {
                vm.headerTitle = summaryContent.employeeHeaderTitle;
                params.employeePropertyID = payrollByModel.payrollByID;
            }
            else {
                vm.headerTitle = summaryContent.jobPositionHeaderTitle;
                params.jobPositionID = payrollByModel.payrollByID;
            }

            svc
                .getSummaryBy(params)
                .then(model.setGridData)
                .catch(vm.error);

            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.destroy = function () {
            vm.destWatch();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("PayrollSummaryItemCtrl", [
            '$scope',
            'summaryModel',
            'summaryContentModel',
            'payrollItemStateModel',
            'summaryGridConfigModel',
            'budgetDetails',
            'payrollItemSummaryService',
            PayrollSummaryItemCtrl]);
})(angular);
