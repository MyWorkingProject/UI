(function (angular) {
    "use strict";
    function PayrollCustomWorksheetsCtrl(
        $scope,
        budgetDetails,
        asideModal,
        payrollItemState,
        cwGridConfig,
        customWorksheetsModel,
        cwContent,
        cwService,
        commentService) {
        var vm = this,
            model,
            budgetModel,
            payrollByModel,
            accessPrivilages, 
            payrollItem,
            commentsAside;
            vm.init = function () {
                budgetModel = budgetDetails.getModelDetails();
                accessPrivilages = budgetDetails.getAccessPrivileges();
                var gridConfig = cwGridConfig(vm,
                    budgetModel.budgetYear,
                    budgetModel.startMonth - 1,
                    budgetModel.noOfPeriods);
                vm.fieldLabels = cwContent;
                model = vm.model = customWorksheetsModel(gridConfig);
                payrollByModel = payrollItemState.get();
                vm.getLangValue = model.getLangValue;
                commentsAside = asideModal("budgetComments")
                    .done(vm.updateCommentCount);

                vm.getCustomWorksheets();
                vm.destWatch = $scope.$on("$destroy", vm.destroy);
            };
            vm.getCustomWorksheets = function () {
                var param = {
                    distId: payrollByModel.distID,
                    payrollId: payrollByModel.payrollID,
                    jobPositionId: payrollByModel.details.jobPositionID
                };
                cwService.getCustomWorksheets(param)
                    .then(vm.setWorksheetDetails)
                    .catch(vm.error);
            };

            /**
           * setModel will set model to payroll item state
           * @param {number} index current item in tab
           */
            vm.setModel = function (index) {
                payrollItem = payrollItemState
                    .getPayrollItem(index);

                model.setCommentCount(payrollItem.commentCount);
            };

            vm.updateCommentCount = function (count) {
                payrollItem.commentCount = count;
                model.setCommentCount(count);
            };

            vm.getRowTotal = function (column, row, rows) {
                return model.getRowTotal(column, row, rows);
            };
            vm.getTotal = function (column, row, rows) {
                return model.getTotal(column, row, rows);
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
            vm.setWorksheetDetails = function (data) {
                model
                    .setGridData(data.records);
            };
            vm.destroy = function () {
                model.destroy();
                vm.destWatch();
            };
        vm.init();
    }
    angular.module("budgeting").controller("PayrollCustomWorksheetsCtrl", [
        '$scope',
        'budgetDetails',
        'rpBdgtAsideModalService',
        'payrollItemStateModel',
        'payrollCustomWorksheetsGridConfigModel',
        'payrollCustomWorksheetsModel',
        'payrollCustomWorksheetsContentModel',
        'payrollCustomWorksheetService',
        'payrollItemCommentService',
        PayrollCustomWorksheetsCtrl]);
})(angular);