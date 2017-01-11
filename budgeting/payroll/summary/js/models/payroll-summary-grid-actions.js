// Payroll summary grid actions
(function (angular) {
    'use strict';

    function factory(
        gridActions,
        actionsMenuModel,
        langTranslate,
        summaryContent
        ) {
        var
            model = gridActions();
            model.get = function (record) {
            if (record.isLastRecord) {
                return;
            }
            var actionsModel = actionsMenuModel();
            actionsModel.className = 'rp-actions-menu-1';
            var actionInfo = [{
                data: record,
                text: angular.lowercase(record.payrollBy) === 'employee' ? summaryContent.viewEmployeeDetails : summaryContent.viewJobDetails,
                method: model.getMethod('viewDetails')
            },
             {
                 data: record,
                 text: summaryContent.txtEdit,
                 method: model.getMethod('editPayrollBy')
             }
            ];
            actionsModel.actions = actionInfo;
            
            return actionsModel;
        };
        return model;
    }

    angular
        .module('budgeting')
        .factory('budgetPayrollSummaryActionsDef', [
            'rpGridActions',
            'rpActionsMenuModel',
            'appLangTranslate',
            'payrollSummaryContent',
            factory]);
})(angular);
