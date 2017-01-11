//  Payroll Leasing Commissions Pay Item Controller

(function (angular) {
    "use strict";

    function PayrollLeasingCommItemCtrl(
        $scope,
        leasingComContent,
        payrollItemState,
        leasingCommModel,
        leasingCommGridConfig,
        leasingCommFormConfig,
        leasingCommValidation,
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
            vm.fieldLabels = leasingComContent;
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            var startDate = payrollItemState.getStartDate();
            var endDate = payrollItemState.getEndDate();
            payrollByModel = payrollItemState.get();
            
            var gridConfig = leasingCommGridConfig(vm,
                    budgetModel.budgetYear,
                    budgetModel.startMonth - 1,
                    budgetModel.noOfPeriods,
                    startDate,
                    endDate),
                formConfig = vm.formConfig = leasingCommFormConfig(vm);

            model = vm.model = leasingCommModel(gridConfig, payrollByModel.payrollID, budgetModel.payrollRunType);
            calculatorAside = asideModal("calculator")
                .done(vm.applyCalculatorChanges);
            commentsAside = asideModal("budgetComments")
                   .done(vm.updateCommentCount);
            //vm.isReadOnly = payrollItemState.getIsReadOnly();

            svc.getLeasingCommDetails({
                    distID: payrollByModel.distID,
                    payrollID: payrollByModel.payrollID,
                    payrollBy: payrollByModel.payrollBy,
                    payrollByID: payrollByModel.payrollByID
                })
                .then(vm.setLeasingCommDetails)
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

        vm.setLeasingCommDetails = function (response) {
            model.setData(response.records)
                .edit(payrollItemState.getIsEditable());
        };

        vm.showCalculator = function () {
            var calculatorState = {
                activePeriod: model.getSelectedRow(),
                startMonth: budgetModel.startMonth,
                startYear: budgetModel.budgetYear,
                noOfPeriods: budgetModel.noOfPeriods,
                errMsgRequired: leasingComContent.calcRequireRowMessage
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
            model.edit(payrollItemState.getIsEditable());
        };

        vm.savedSuccess = function () {
            model.restore();
        };

        vm.updateMonthlyMoveinsPercentage = function (value) {
            if (leasingCommValidation.chkIsPositiveNumber(value)) {
                model.setMoveinsPercentage(value);
            }
        };

        vm.updateMonthlyCommissionAmt = function (value) {
            if (leasingCommValidation.chkIsPositiveNumber(value)) {
                model.setCommissionAmt(value);
            }
        };

        vm.validateNumber = function (value) {
            return leasingCommValidation.chkIsPositiveNumber(value);
        };

        vm.getRowTotal = function (column, row, rows) {
            return model.getRowTotal(column, row, rows);
        };

        vm.getCommissionTotal = function (column, row, rows) {
            return model.getCommissionTotal(column, row, rows);
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
        .controller("PayrollLeasingCommItemCtrl", [
            "$scope",
            "leasingComContentModel",
            "payrollItemStateModel",
            "leasingCommModel",
            "leasingCommGridConfigModel",
            "leasingCommFormConfigModel",
            "leasingCommValidationModel",
            "calculatorStateModel",
            "rpBdgtAsideModalService",
            "budgetDetails",
            "leasingCommService",
            "payrollItemCommentService",
            PayrollLeasingCommItemCtrl]);
})(angular);
