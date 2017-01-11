//  Payroll Pay Item Controller

(function (angular) {
    "use strict";
    function PayrollTaxInsuranceCtrl(
        $scope,
        taxesInsuranceContent,
        payrollItemState,
        taxesInsuranceModel,
        asideModal,
        taxesInsuranceGridConfig,
        taxesInsuranceFormConfig,
        budgetDetails,
        svc,
        commentService) {
        var vm = this,
            model,
            payrollByModel,
            budgetModel,
            formConfig,
            payrollItem,
            accessPrivilages,
            commentsAside,
            onSaveSuccessUnSubscribe,
            onStateChangeUnSubscribe;

        vm.init = function () {
            vm.fieldLabels = taxesInsuranceContent;
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            var startDate = payrollItemState.getStartDate();
            var endDate = payrollItemState.getEndDate();

            var gridConfig = taxesInsuranceGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods,
                startDate,
                endDate);

            model = vm.model = taxesInsuranceModel(gridConfig);
            formConfig = vm.formConfig = taxesInsuranceFormConfig(vm);

            payrollByModel = payrollItemState.get();

            onStateChangeUnSubscribe = payrollItemState.onStateChange(vm.changeState);
            onSaveSuccessUnSubscribe = payrollItemState.onSaveSuccess(vm.savedSuccess);

            commentsAside = asideModal("budgetComments")
                   .done(vm.updateCommentCount);

            model.setCumulativeCompensation(payrollByModel.details.capEffectiveMonth,
                budgetModel.startMonth,
                budgetModel.budgetYear,
                budgetModel.noOfPeriods);
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };


        /**
         * setModel will set model to payroll item state
         * @param {number} index current item in tab
         */
        vm.setModel = function (index) {
            payrollItem = payrollItemState
                .setModel(index, model)
                .getPayrollItem(index);

            model.setCommentCount(payrollItem.commentCount);
            vm.getPayrollTaxDetails(0);
        };

        vm.getPayrollTaxDetails = function (value) {
            var params = {
                payrollID: payrollByModel.payrollID,
                distID: payrollByModel.distID,
                calValue: value
            };
            svc.getPayrollTaxDetails(params).then(vm.setPayrollTaxDetails);

        };

        vm.setPayrollTaxDetails = function (response) {
            model
                .edit(payrollItemState.getIsEditable())
                .setData(payrollByModel.payrollID, payrollItem.payrollItemID, response.records);
        };

        vm.getNonExemptedItems = function () {
            return model.getNonExemptedItems();
        };

        vm.showComments = function () {
            var resolveData = {
                commentParams: function () {
                    return {
                        distID: budgetModel.distributedID,
                        propertyID: budgetModel.propertyID,
                        payrollID: payrollByModel.payrollID,
                        payrollType: payrollItem.payrollType,
                        payrollItemID: payrollItem.payrollItemID,
                        subTitle: payrollItem.payrollItemName,
                        accessPrivilages: accessPrivilages.allowComments
                    };
                },
                commentsSvc: function () {
                    return commentService;
                }
            };
            commentsAside.resolve(resolveData).show();
        };

        vm.updateCommentCount = function (count) {
            payrollItem.commentCount = count;
            model.setCommentCount(count);
        };

        vm.cumelativeCompensationChanged = function (value) {
            if (value !== '') {
                vm.getPayrollTaxDetails(value);
            }
        };

        vm.changeState = function () {
            if (!payrollItemState.getIsEditable()) {
                model.rollback();
            }
            model
                .edit(payrollItemState.getIsEditable());
        };

        vm.savedSuccess = function () {
            vm.getPayrollTaxDetails(0);
        };

        vm.getRowTotal = function (column, row, rows) {
            return model.getRowTotal(column, row, rows);
        };

        vm.getTotalByGroup = function (column, row, rows) {
            return model.getTotalByGroup(column, row, rows);
        };

        vm.onAddPayrollTaxInsurance = function (column, row, item) {
            model.addPayrollTaxInsurance(column, row, item);
        };

        vm.onRemovePayrollTaxInsurance = function (column, row) {
            model.removePayrollTaxInsurance(column, row);
        };

        vm.addNewItem = function (item) {
            model.addNewPayrollTaxInsurance(item, 1, 0);
        };

        vm.destroy = function () {
            onSaveSuccessUnSubscribe();
            onStateChangeUnSubscribe();
            model.destroy();
            vm.destWatch();
            commentsAside.destroy();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("PayrollTaxInsuranceCtrl", [
            '$scope',
            'taxInsuranceContentModel',
            'payrollItemStateModel',
            'taxInsuranceModel',
            'rpBdgtAsideModalService',
            'taxInsuranceGridConfigModel',
            'taxInsuranceFormConfigModel',
            'budgetDetails',
            'taxInsuranceService',
            'payrollItemCommentService',
            PayrollTaxInsuranceCtrl]);
})(angular);
