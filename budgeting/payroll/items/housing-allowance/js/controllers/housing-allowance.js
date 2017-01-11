//  Payroll HA Pay Item Controller

(function (angular) {
    "use strict";

    function PayrollHAItemCtrl(
        $scope,
        //$q,
        haContent,
        payrollItemState,
        haModel,
        haGridConfig,
        haFormConfig,
        haCalculation,
        haValidation,
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
            vm.fieldLabels = haContent;
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            var startDate = payrollItemState.getStartDate();
            var endDate = payrollItemState.getEndDate();
            payrollByModel = payrollItemState.get();

            var gridConfig = haGridConfig(vm,
                    budgetModel.budgetYear,
                    budgetModel.startMonth - 1,
                    budgetModel.noOfPeriods,
                    startDate,
                    endDate),
                formConfig = vm.formConfig = haFormConfig(vm);

            model = vm.model = haModel(gridConfig,
                formConfig,
                payrollByModel,
                budgetModel.incomeModel,
                budgetModel.payrollRunType,
                startDate,
                endDate);

            calculatorAside = asideModal("calculator")
                .done(vm.applyCalculatorChanges);
            commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);
            //vm.isReadOnly = payrollItemState.getIsReadOnly();
            svc
                .getHADetails({
                    distID: payrollByModel.distID,
                    budgetModelID: budgetModel.budgetModelID,
                    propertyID: budgetModel.propertyID,
                    payrollID: payrollByModel.payrollID,
                    payrollBy: payrollByModel.payrollBy,
                    payrollByID: payrollByModel.payrollByID,
                    incomeModel: budgetModel.incomeModel
                }).then(vm.setHADetails)
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

        vm.setHADetails = function (response) {
            model
                .setData(response.records)
                .updateDescription()
                .edit(payrollItemState.getIsEditable());
        };

        vm.showCalculator = function () {
            var calculatorState = {
                activePeriod: model.getSelectedRow(),
                startMonth: budgetModel.startMonth,
                startYear: budgetModel.budgetYear,
                noOfPeriods: budgetModel.noOfPeriods,
                errMsgRequired: haContent.calcRequireRowMessage
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
                .edit(payrollItemState.getIsEditable())
                .updateDescription();
        };

        vm.savedSuccess = function () {
            payrollItemState.setPayrollByInfo(model.getPayrollByModelChanges());
            model
                .restore()
                .updateDescription();
        };

        vm.onRateChanged = function (value) {
            svc.getMarketRentBy({
                distID: payrollByModel.distID,
                housingMarketRentID: value
            }).then(model.updateUnitType).catch(vm.error);
        };

        vm.onCriteriaChanged = function (value) {
            if (model.isValid()) {
                model
                    .updateDescription()
                    .setMonthlyHA
                    .delay();
            }
        };

        vm.allowanceChanged = function (value) {
            if (model.isValid()) {
                model
                    .setMonthlyHA
                    .delay();
            }
        };

        vm.getRowTotal = function (column, row, rows) {
            return haCalculation.getRowTotal(column, row, rows);
        };

        vm.getTotalMonthlyHA = function (column, row, rows) {
            return haCalculation.getTotalMonthlyHA(column, row, rows, model.getApplyType());
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
            return haValidation.chkIsNumber(value);
        };

        vm.chkIsDate = function (value) {
            return haValidation.chkIsDate(value);
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
        .controller("PayrollHAItemCtrl", [
            '$scope',
            //'$q',
            'haContentModel',
            'payrollItemStateModel',
            'haModel',
            'haGridConfigModel',
            'haFormConfigModel',
            'haCalculationModel',
            'haValidationModel',
            'calculatorStateModel',
            'rpBdgtAsideModalService',
            'budgetDetails',
            'haService',
            'payrollItemCommentService',
            PayrollHAItemCtrl]);
})(angular);
