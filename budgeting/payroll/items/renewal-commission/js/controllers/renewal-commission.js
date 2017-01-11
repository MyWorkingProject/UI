//  Payroll RenewalCommn Pay Item Controller

(function (angular) {
    "use strict";

    function PayrollRenewalCommnItemCtrl(
        $scope,
        renewalCommnContent,
        payrollItemState,
        renewalCommnModel,
        renewalCommnGridConfig,
        renewalCommnFormConfig,
        renewalCommnValidation,
        calcuStateModel,
        asideModal,
        budgetDetails,
        svc,
        commentService) {
        var vm = this,
            model,
            payrollByModel,
            budgetModel,
            calculatorAside,
            accessPrivilages,
            commentsAside,
            payrollItem,
            onSaveSuccessUnSubscribe,
            onStateChangeUnSubscribe;

        vm.init = function () {
            vm.fieldLabels = renewalCommnContent;
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            var startDate = payrollItemState.getStartDate();
            var endDate = payrollItemState.getEndDate();
            payrollByModel = payrollItemState.get();
            
            var gridConfig = renewalCommnGridConfig(vm,
                    budgetModel.budgetYear,
                    budgetModel.startMonth - 1,
                    budgetModel.noOfPeriods,
                    startDate,
                    endDate),
                formConfig = vm.formConfig = renewalCommnFormConfig(vm);

            model = vm.model = renewalCommnModel(gridConfig, payrollByModel.payrollID, budgetModel.payrollRunType);
            calculatorAside = asideModal("calculator")
                .done(vm.applyCalculatorChanges);
            commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);
            //vm.isReadOnly = payrollItemState.getIsReadOnly();

            svc
                .getRenewalCommnDetails({
                    distID: payrollByModel.distID,
                    payrollID: payrollByModel.payrollID,
                    payrollBy: payrollByModel.payrollBy,
                    payrollByID: payrollByModel.payrollByID
                })
                .then(vm.setRenewalCommnDetails)
                .catch(vm.error);

            onStateChangeUnSubscribe = payrollItemState.onStateChange(vm.changeState);
            onSaveSuccessUnSubscribe = payrollItemState.onSaveSuccess(vm.savedSuccess);
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

        vm.setRenewalCommnDetails = function (response) {
            model
                .setData(response.records)
                .edit(payrollItemState.getIsEditable());
        };

        vm.showCalculator = function () {
            var calculatorState = {
                activePeriod: model.getSelectedRow(),
                startMonth: budgetModel.startMonth,
                startYear: budgetModel.budgetYear,
                noOfPeriods: budgetModel.noOfPeriods,
                errMsgRequired: renewalCommnContent.calcRequireRowMessage
            };

            var resolveData = {
                calculatorParamData: function () {
                    return new calcuStateModel(calculatorState);
                }
            };

            calculatorAside
                .resolve(resolveData)
                .show();
        };

        vm.showComments = function () {
            var resolveData = {
                commentParams: function () {
                    return {
                        payrollID: payrollByModel.payrollID,
                        distID: payrollByModel.distID,
                        payrollType: payrollItem.payrollType,
                        payrollItemID: payrollItem.payrollItemID,
                        propertyID: payrollItem.propertyID,
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

        vm.applyCalculatorChanges = function (calculatedData) {
            model.applyCalculatorChanges(calculatedData);
        };

        vm.changeState = function () {
            if (!payrollItemState.getIsEditable()) {
                model.rollback();
            }
            model
                .edit(payrollItemState.getIsEditable());
        };

        vm.savedSuccess = function () {
            model.restore();
        };


        vm.leaseRenewalPercentageChanged = function (value) {
            if (renewalCommnValidation.chkIsPositiveNumber(value)) {
                model.setLeaseRenewalPercentage(value);
            }
        };

        vm.renewalCommissionChanged = function (value) {
           if (renewalCommnValidation.chkIsPositiveNumber(value)) {
                model.setRenewalCommission(value);
            }
        };

        vm.mtmRenewalPercentageChanged = function(value){
             if (renewalCommnValidation.chkIsPositiveNumber(value)) {
                model.setMtmRenewalPercentage(value);
            }
        };

        vm.mtmCommissionChanged = function(value){
             if (renewalCommnValidation.chkIsPositiveNumber(value)) {
                model.setMtmCommission(value);
            }
        };

        vm.getRowTotal = function (column, row, rows) {
            return model.getRowTotal(column, row, rows);
        };

        vm.getRenewalTotal = function(column, row, rows){
            return model.getRenewalTotal(column, row, rows);
        };

        vm.getTotalByGroup = function (column, row, rows) {
            return model.getTotalByGroup(column, row, rows);
        };

        vm.onMonthlyChange = function (column, row) {
            model.updateGrid(column, row);
        };

        vm.onMonthlyBlur = function (column, row) {
            model.setSelectedRow(column, row);
        };

        vm.destroy = function () {
            onSaveSuccessUnSubscribe();
            onStateChangeUnSubscribe();
            model.destroy();
            calculatorAside.destroy();
            vm.destWatch();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("PayrollRenewalCommnItemCtrl", [
            '$scope',
            'renewalCommnContentModel',
            'payrollItemStateModel',
            'renewalCommnModel',
            'renewalCommnGridConfigModel',
            'renewalCommnFormConfigModel',
            'renewalCommnValidationModel',
            'calculatorStateModel',
            'rpBdgtAsideModalService',
            'budgetDetails',
            'renewalCommnService',
            'payrollItemCommentService',
            PayrollRenewalCommnItemCtrl]);
})(angular);
