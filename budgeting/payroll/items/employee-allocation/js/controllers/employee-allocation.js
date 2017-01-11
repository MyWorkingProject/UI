(function (angular) {
    'use strict';
    function EmployeeAllocationCtrl(
        $scope,
        payrollItemState,
        basicEmployeeModel,
        formConfig,
        employeeAllocationContent) {
        var vm = this,
            onSaveSuccessUnSubscribe = angular.noop,
            onStateChangeUnSubscribe = angular.noop,
            model,
            payrollByModel;

        vm.init = function () {
            vm.fieldLabels = employeeAllocationContent;
            model = vm.model = basicEmployeeModel();
            vm.formConfig = formConfig;
            formConfig.setMethodsSrc(vm);
            vm.changeState();
            onStateChangeUnSubscribe = payrollItemState.onStateChange(vm.changeState);
            onSaveSuccessUnSubscribe = payrollItemState.onSaveSuccess(vm.savedSuccess);
            $scope.$on("$destroy", vm.destroy);
        };

        vm.setModel = function (index) {
            payrollItemState.setModel(index, model);
        };

        vm.changeState = function () {
            model
                .setData(payrollItemState.get())
                .edit(payrollItemState.getIsEditable());

            model.resetForm.delay();
        };
        vm.savedSuccess = function () {
            payrollItemState.setPayrollByInfo(model.getPayrollByModelChanges());
        };
        vm.destroy = function () {
            onSaveSuccessUnSubscribe();
            onStateChangeUnSubscribe();
            model.destroy();
        };
        vm.init();
    }

    angular
        .module('budgeting')
        .controller('EmployeeAllocationCtrl', [
            '$scope',
            'payrollItemStateModel',
            'employeeAllocationModel',
            'employeeAllocationConfig',
            'employeeAllocationContentModel',
             EmployeeAllocationCtrl]);
})(angular);
