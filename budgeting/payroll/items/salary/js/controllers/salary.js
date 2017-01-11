//  Payroll Salary Pay Item Controller

(function (angular) {
    "use strict";

    function PayrollSalaryItemCtrl(
        $scope,
        salaryContent,
        payrollItemState,
        salaryModel,
        salaryGridConfig,
        salaryFormConfig,
        salaryCalculation,
        salaryValidation,
        calcuStateModel,
        asideModal,
        budgetDetails,
        svc,
        commentService) {
        var vm = this,
            model,
            payrollByModel,
            payrollItem,
            budgetModel,
            calculatorAside,
            commentsAside,
            accessPrivilages,
            onSaveSuccessUnSubscribe,
            onStateChangeUnSubscribe;

        vm.init = function () {
            vm.fieldLabels = salaryContent;
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            var startDate = payrollItemState.getStartDate();
            var endDate = payrollItemState.getEndDate();
            payrollByModel = payrollItemState.get();

            var gridConfig = salaryGridConfig(vm,
                    budgetModel.budgetYear,
                    budgetModel.startMonth - 1,
                    budgetModel.noOfPeriods,
                    startDate,
                    endDate),
                formConfig = vm.formConfig = salaryFormConfig(vm);

            model = vm.model = salaryModel(gridConfig,
                payrollByModel.payrollID,
                budgetModel.payrollRunType,
                startDate,
                endDate);
            calculatorAside = asideModal("calculator")
                .done(vm.applyCalculatorChanges);
            commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);
            //vm.isReadOnly = payrollItemState.getIsReadOnly();

            svc
                .getSalaryDetails({
                    distID: payrollByModel.distID,
                    payrollID: payrollByModel.payrollID,
                    payrollBy: payrollByModel.payrollBy,
                    payrollByID: payrollByModel.payrollByID
                })
                .then(vm.setSalaryDetails)
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

        vm.setSalaryDetails = function (response) {
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
                errMsgRequired: salaryContent.calcRequireRowMessage
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

        vm.beginningSalaryRateChanged = function (value) {
            if (model.chkIncreasePercentage(value)) {
                model
                    .setBeginningSalaryRate(value)
                    .setMonthlySalary
                    .delay();
            }
        };

        vm.dateOfIncreaseChanged = function (value) {
            if (model.isValid()) {
                model
                    .setMonthlySalary
                    .delay();
            }
        };

        vm.increasePercentageChanged = function (value) {
            if (model.chkBeginningSalary(value)) {
                model
                    .setIncreasePercentage(value)
                    .setMonthlySalary
                    .delay();
            }
        };

        vm.increaseCurrencyChanged = function (value) {
            if (model.chkBeginningSalary(value)) {
                model
                    .setIncreaseCurrency(value)
                    .setMonthlySalary
                    .delay();
            }
        };

        vm.endingSalaryRateChanged = function (value) {
            if (model.chkBeginningSalary(value)) {
                model
                    .setEndingSalaryRate(value)
                    .setMonthlySalary
                    .delay();
            }
        };

        vm.getRowTotal = function (column, row, rows) {
            return salaryCalculation.getRowTotal(column, row, rows);
        };

        vm.getTotalMonthlySalary = function (column, row, rows) {
            return salaryCalculation.getTotalMonthlySalary(column, row, rows, payrollItemState.getAllocationPercent());
        };

        vm.onMonthlyChange = function (column, row) {
            model.updateGrid(column, row);
        };

        vm.onMonthlyBlur = function (column, row) {
            model.setSelectedRow(column, row);
        };
        vm.updateCommentCount = function (count) {
            payrollItem.commentCount = count;
            model.setCommentCount(count);
        };
        vm.chkIsNumber = function (value) {
            return salaryValidation.chkIsNumber(value);
        };

        vm.chkIsDate = function (value) {
            return salaryValidation.chkIsDate(value);
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
        .controller("PayrollSalaryItemCtrl", [
            '$scope',
            'salaryContentModel',
            'payrollItemStateModel',
            'salaryModel',
            'salaryGridConfigModel',
            'salaryFormConfigModel',
            'salaryCalculationModel',
            'salaryValidationModel',
            'calculatorStateModel',
            'rpBdgtAsideModalService',
            'budgetDetails',
            'salaryService',
            'payrollItemCommentService',
            PayrollSalaryItemCtrl]);
})(angular);
