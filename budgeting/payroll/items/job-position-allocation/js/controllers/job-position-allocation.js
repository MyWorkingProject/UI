(function (angular) {
    'use strict';
    function JobPositionAllocationCtrl(
        $scope,
        payrollItemState,
        basicJobModel,
        formConfig,
        jobAllocationContent
        ) {
        var vm = this,
            onSaveSuccessUnSubscribe = angular.noop,
            onStateChangeUnSubscribe = angular.noop,
            model;

        vm.init = function () {
            vm.fieldLabels = jobAllocationContent;
            model = vm.model = basicJobModel();
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
                .setData(payrollItemState.get(), payrollItemState.getTotalPayRateCount())
                .edit(payrollItemState.getIsEditable());

            model.resetForm.delay();
        };

        vm.savedSuccess = function () {
            payrollItemState
                .setPayRatesPostionCount(model.getPayRateTotal())
                .setPayrollByInfo(model.getPayrollByModelChanges());
        };

        vm.onChangeStartDate = function (date) {
            model.onChangeStartDate(date);
        };

        vm.onChangeEndDate = function (date) {
            model.onChangeEndDate(date);
        };

        vm.chkPayrateCount = function (value) {
            var valid = true;
            if (payrollItemState.getIsLockCount()) {
                valid = model.getPayRateTotal() < payrollItemState.getJobPositionCount();
            }
            return valid;
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
        .controller('JobPositionAllocationCtrl', [
            '$scope',
            'payrollItemStateModel',
            'jobPositionAllocationModel',
            'jobPositionAllocationConfig',
            'jobPositionAllocationContentModel',
             JobPositionAllocationCtrl]);
})(angular);
