//  Payroll Pay Item Controller

(function (angular) {
    "use strict";

    function PayrollBonusItemCtrl(
        $scope,
        bonusContent,
        payrollItemState,
        bonusGridConfig,
        bonusModel,
        calcuStateModel,
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
            calculatorAside,
            commentsAside,
            onSuccessSaveUnSubscribe,
            onStateChangeUnSubscribe;

        vm.init = function () {
            vm.fieldLabels = bonusContent;
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            var startDate = payrollItemState.getStartDate();
            var endDate = payrollItemState.getEndDate();

            var gridConfig = bonusGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods,
                startDate,
                endDate);

            model = vm.model = bonusModel(gridConfig);
            calculatorAside = asideModal("calculator")
                .done(vm.applyCalculatorChanges);
            commentsAside = asideModal("budgetComments")
                .done(vm.updateCommentCount);
            //vm.isReadOnly = payrollItemState.getIsReadOnly();
            payrollByModel = payrollItemState.get();
            vm.getLangValue = model.getLangValue;
            onStateChangeUnSubscribe = payrollItemState.onStateChange(vm.changeState);
            onSuccessSaveUnSubscribe = payrollItemState.onSaveSuccess(vm.savedSuccess);

            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.getBounusDetails = function () {
            svc
                .getBonusDetails({
                    distID: payrollByModel.distID,
                    payrollID: payrollByModel.payrollID,
                    payrollItemID: payrollItem.payrollItemID
                })
                .then(vm.setBonusDetails)
                .catch(vm.error);
        };
         /**
         * setModel will set model to payroll item state
         * @param {number} index current item in tab
         */
        vm.setModel = function (index) {
            payrollItem = payrollItemState
                .setModel(index, model)
                .getPayrollItem(index);

            vm.getBounusDetails();

            model.setCommentCount(payrollItem.commentCount);
            vm.headerTitle = bonusContent.headerTitle.tokenReplace({
                name: payrollItem.payrollItemName
            });
            vm.noItemsMessage = bonusContent.noItemsMessage.tokenReplace({
                name: payrollItem.payrollItemName
            });
        };

        vm.updateCommentCount = function (count) {
            payrollItem.commentCount = count;
            model.setCommentCount(count);
        };

        vm.setBonusDetails = function (data) {
            model
                .edit(payrollItemState.getIsEditable())
                .setData(payrollByModel.payrollID, payrollItem.payrollItemID, payrollItem.payrollItemName, data.records);
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
        vm.showCalculator = function () {
            var calculatorState = {
                activePeriod: model.getSelectedRow(),
                startMonth: budgetModel.startMonth,
                startYear: budgetModel.budgetYear,
                noOfPeriods: budgetModel.noOfPeriods,
                errMsgRequired: bonusContent.calcRequireRowMessage.tokenReplace({
                name: payrollItem.payrollItemName
            })
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
            vm.getBounusDetails();
        };

        vm.addNewBonusItem = function () {
            model.addNewBonusItem(1, 0);
        };

        vm.onBonusNameChange = function (column, row) {
            model.validate();
        };

        vm.chkBonusName = function (column, row, rows) {
            return !model.isBonusNameEmpty(column, row, rows);
        };

        vm.onAddBonus = function (column, row) {
            model
                .addBonusItem(column, row);
        };

        vm.onRemoveBonus = function (column, row) {
            model
                .deleteBonusItem(column, row);
        };

        vm.onBonusBlur = function (column, row) {
            model.setSelectedRow(column, row);
        };

        vm.onBonusChange = function (column, row) {
            return model.bonusPeriodChange(column, row);
        };

        vm.getRowTotal = function (column, row, rows) {
            return model.getRowTotal(column, row, rows);
        };

        vm.getTotalBonus = function (column, row, rows) {
            return model.getTotal(column, row, rows);
        };

        vm.destroy = function () {
            onSuccessSaveUnSubscribe();
            onStateChangeUnSubscribe();
            model.destroy();
            vm.destWatch();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("PayrollBonusItemCtrl", [
            '$scope',
            'bonusContentModel',
            'payrollItemStateModel',
            'bonusGridConfigModel',
            'bonusModel',
            'calculatorStateModel',
            'rpBdgtAsideModalService',
            'budgetDetails',
            'bonusService',
            'payrollItemCommentService',
            PayrollBonusItemCtrl]);
})(angular);
