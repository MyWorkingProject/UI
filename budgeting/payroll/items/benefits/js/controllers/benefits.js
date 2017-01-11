//  Payroll Pay Item Controller

(function (angular) {
    "use strict";

    function PayrollBenefitsCtrl(
        $scope,
        benefitsContent,
        payrollItemState,
        benefitsGridConfig,
        benefitsFormConfig,
        benefitsModel,
        asideModal,
        budgetDetails,
        svc,
        commentService
    ) {
        var vm = this,
            model,
            payrollByModel,
            payrollItem,
            budgetModel,
            accessPrivilages,
            commentsAside,
            onSuccessSaveUnSubscribe,
            onStateChangeUnSubscribe;

        vm.init = function () {
            vm.fieldLabels = benefitsContent;
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            var startDate = payrollItemState.getStartDate();
            var endDate = payrollItemState.getEndDate();

            var gridConfig = benefitsGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods,
                startDate,
                endDate);
            model = vm.model = benefitsModel(gridConfig);
            vm.formConfig = benefitsFormConfig(vm);

            payrollByModel = payrollItemState.get();
            onStateChangeUnSubscribe = payrollItemState.onStateChange(vm.changeState);
            onSuccessSaveUnSubscribe = payrollItemState.onSaveSuccess(vm.savedSuccess);

            commentsAside = asideModal("budgetComments")
                   .done(vm.updateCommentCount);

            vm.getBenefitsDetails();
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
        };

        vm.getBenefitsOptions = function () {
            return model.getBenefitsOptions();
        };

        vm.onBenefitChange = function (column, row) {
            model.updateBenefitRow(column, row);
        };

        vm.getBenefitsDetails = function () {
            var param = {
                distId: payrollByModel.distID,
                payrollId: payrollByModel.payrollID
            };
            svc.getBenefitsDetails(param)
                .then(vm.setBenefitsDetails).catch(vm.error);
        };

        vm.setBenefitsDetails = function (data) {
            model
                .edit(payrollItemState.getIsEditable())
                .prepareBenefitsOptions(data.records)
                .setData(payrollByModel.payrollID, payrollItem.payrollItemID, data.records);
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


        vm.chkUniqueBenefit = function (column, row, rows) {
            return model.chkUniqueBenefit(column, row, rows);
        };

        vm.addBenefitsItem = function (column, row) {
            model
                .addBenefitsItem(column, row);
        };

        vm.deleteBenefitsItem = function (column, row) {
            model
                .deleteBenefitsItem(column, row);
        };

        vm.addNewBenefitsItem = function () {
            model
                .addNewBenefitsItem(1, 0);
        };

        vm.changeState = function () {
            if (!payrollItemState.getIsEditable()) {
                model.rollback();
            }
            model
                .edit(payrollItemState.getIsEditable());
        };

        vm.savedSuccess = function () {
            vm.getBenefitsDetails();
        };

        vm.chkBonusNameNotEmpty = function (column, row, rows) {
            return row.getData().bonusName !== "";
        };

        vm.getRowTotal = function (column, row, rows) {
            return model.getRowTotal(column, row, rows);
        };

        vm.getTotalByGroup = function (column, row, rows) {
            return model.getTotal(column, row, rows);
        };

        vm.destroy = function () {
            onSuccessSaveUnSubscribe();
            onStateChangeUnSubscribe();
            model.destroy();
            commentsAside.destroy();
            vm.destWatch();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("PayrollBenefitsCtrl", [
            '$scope',
            'benefitsContentModel',
            'payrollItemStateModel',
            'benefitsGridConfigModel',
            'benefitsFormConfig',
            'benefitsModel',
            'rpBdgtAsideModalService',
            'budgetDetails',
            'benefitsService',
            'payrollItemCommentService',
            PayrollBenefitsCtrl]);
})(angular);
