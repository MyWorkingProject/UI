//  Payroll Summary Item Controller

(function(angular) {
    "use strict";

    function PayrollItemViewCtrl(
        $scope,
        $stateParams,
        payrollItemViewModel,
        payrollItemViewGridConfig,
        budgetDetails,
        langTranslate,
        svc) {
        var vm = this,
            model,
            budgetModel;

        vm.init = function() {
          var translate = langTranslate('payroll.reports').translate;
            budgetModel = budgetDetails.getModelDetails();
            vm.headerTitle = translate('bdgt_payroll_payrollItemView');
            var gridConfig = payrollItemViewGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods);

            model = vm.model = payrollItemViewModel(gridConfig);

            var params = {
                distributedID: $stateParams.distID,
                payrollBy: 'all'
            };
            svc
                .getSummaryBy(params)
                .then(model.setGridData)
                .catch(vm.error);

            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.destroy = function() {
            vm.destWatch();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("PayrollItemViewCtrl", [
            '$scope',
            '$stateParams',
            'payrollItemViewModel',
            'payrollItemViewGridConfigModel',
            'budgetDetails',
            'appLangTranslate',            
            'payrollItemSummaryService',
            PayrollItemViewCtrl
        ]);
})(angular);
