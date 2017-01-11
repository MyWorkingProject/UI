//  Payroll Hourly Pay Item Controller

(function (angular) {
    "use strict";

    function PayrollHourlyItemCtrl(
        $scope,
        hourlyContent,
        payrollItemState,
        hourlyModel,
        hourlyGridConfig,
        hourlyFormConfig,
        hourlyCalculation,
        hourlyValidation,
        calcuStateModel,
        asideModal,
        budgetDetails,
        svc,
        commentService) {
        var vm = this,
            model,
            payrollByModel,
            budgetModel,
            accessPrivilages,
            calculatorAside,
            commentsAside,
            payrollItem,
            onSaveSuccessUnSubscribe,
            onStateChangeUnSubscribe;

        vm.init = function () {
            vm.fieldLabels = hourlyContent;
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            var startDate = payrollItemState.getStartDate();
            var endDate = payrollItemState.getEndDate();
            payrollByModel = payrollItemState.get();

            var gridConfig = hourlyGridConfig(vm,
                    budgetModel.budgetYear,
                    budgetModel.startMonth - 1,
                    budgetModel.noOfPeriods,
                    startDate,
                    endDate),
                formConfig = vm.formConfig = hourlyFormConfig(vm);

            model = vm.model = hourlyModel(gridConfig,  payrollByModel.payrollID, budgetModel.payrollRunType);
            calculatorAside = asideModal("calculator")
                .done(vm.applyCalculatorChanges);
            commentsAside = asideModal("budgetComments")
                    .done(vm.updateCommentCount);
            //vm.isReadOnly = payrollItemState.getIsReadOnly();

            svc
                .getHourlyDetails({
                    distID: payrollByModel.distID,
                    payrollID: payrollByModel.payrollID,
                    payrollBy: payrollByModel.payrollBy,
                    payrollByID: payrollByModel.payrollByID
                })
                .then(vm.setHourlyDetails)
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

        vm.setHourlyDetails = function (response) {
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
                errMsgRequired:  hourlyContent.calcRequireRowMessage
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
        vm.updateCommentCount = function (count) {
            payrollItem.commentCount = count;
            model.setCommentCount(count);
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

        vm.beginningHourlyRateChanged = function (value) {
            if (model.chkIncreasePercentage(value)) {
                model
                    .setBeginningHourlyRate(value)
                    .setHourlyRates
                    .delay();
            }
        };

        vm.dateOfIncreaseChanged = function (value) {
            if (model.isValid()) {
                model
                    .setHourlyRates
                    .delay();
            }
        };

        vm.increasePercentageChanged = function (value) {
            if (model.chkBeginningHourlyRate(value)) {
                model
                    .setIncreasePercentage(value)
                    .setHourlyRates
                    .delay();
            }
        };

        vm.increaseCurrencyChanged = function (value) {
            if (model.chkBeginningHourlyRate(value)) {
                model
                    .setIncreaseCurrency(value)
                    .setHourlyRates
                    .delay();
            }
        };

        vm.endingHourlyRateChanged = function (value) {
            if (model.chkBeginningHourlyRate(value)) {
                model
                    .setEndingHourlyRate(value)
                    .setHourlyRates
                    .delay();
            }
        };

        vm.regularHoursPerWeekChanged = function (value) {
            if (model.isValid()) {
                model
                    .setRegularHoursPerWeek(value);
            }
        };

        vm.overtimeHoursPerWeekChanged = function (value) {
            if (model.isValid()) {
                model
                    .setOvertimeHoursPerWeek(value);
            }
        };

        vm.getMontlyWorkedHoursTotal = function (column, row, rows) {
            return hourlyCalculation.getMontlyWorkedHoursTotal(column, row, rows);
        };

        vm.getMontlyPayTotal = function (column, row, rows) {
            return hourlyCalculation.getMontlyPayTotal(column, row, rows);
        };

        vm.getRowTotal = function (column, row, rows) {
            return hourlyCalculation.getRowTotal(column, row, rows);
        };

        vm.getTotal = function (column, row, rows) {
            return hourlyCalculation.getTotal(column, row, rows);
        };

        vm.onHourlyChange = function (column, row) {
            model.updateGrid(column, row);
        };

        vm.onHourlyBlur = function (column, row) {
            model.setSelectedRow(column, row);
        };

        vm.chkIsNumber = function (value) {
            return hourlyValidation.chkIsNumber(value);
        };

        vm.chkIsNumberBeween = function (value) {
            return hourlyValidation.chkIsNumberBeween(value);
        };

        vm.chkNumberHasFourDecimals = function (value) {
            return hourlyValidation.chkNumberHasFourDecimals(value);
        };

        vm.chkIsDate = function (value) {
            return hourlyValidation.chkIsDate(value);
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
        .controller("PayrollHourlyItemCtrl", [
            '$scope',
            'hourlyContentModel',
            'payrollItemStateModel',
            'hourlyModel',
            'hourlyGridConfigModel',
            'hourlyFormConfigModel',
            'hourlyCalculationModel',
            'hourlyValidationModel',
            'calculatorStateModel',
            'rpBdgtAsideModalService',
            'budgetDetails',
            'hourlyService',
            'payrollItemCommentService',
            PayrollHourlyItemCtrl]);
})(angular);
