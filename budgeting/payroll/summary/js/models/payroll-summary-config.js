//  Payroll summary grid config

(function (angular) {
    'use strict';

    function factory(
        gridConfig,
        payrollBaseModel,
        actions,
        summaryContent) {
        var model = gridConfig();
        model.get = function () {
            var cols = [
            {
                key: 'action',
                type: 'actionsMenu',
                getActions: actions.get
            },
            {
                key: 'employJobName',
                type: 'custom',
                templateUrl: 'app/templates/payroll-employee.html',
                method: model.getMethod('viewPayrollBy')
            },
            {
                key: 'jobPosition'
            }];
            payrollBaseModel.getPayrollItems().forEach(function (item) {
                cols.push({ key: item.itemColumnName });
            });
            cols.push({ key: 'total' });
            cols.push({ key: 'allocationPercent' });
            return cols;
        };
        model.getHeaders = function () {
            var headers = [{
                text: summaryContent.gridAction,
                key: 'action',
                isSortable: false,
                className: 'action-menu'

            }, {
                key: 'employJobName',
                text: summaryContent.employee,
                isSortable: false
            },
            {
                key: 'jobPosition',
                text: summaryContent.position,
                isSortable: false
            }];
            payrollBaseModel.getPayrollItems().forEach(function (item) {
                headers.push({
                    key: item.itemColumnName,
                    text: item.payrollItemName,
                    isSortable: false
                });
            });
            headers.push({
                key: 'total',
                text: summaryContent.total,
                isSortable: false
            });
            headers.push({
                key: 'allocationPercent',
                text: summaryContent.propertyAllocation,
                isSortable: false
            });
            return [headers];
        };
        model.getFilters = function () {
            var filters = [{
                type: '',
                key: 'action'
            },
            {
                key: 'employJobName',
                type: 'text',
                filterDelay: 0,
                placeholder: summaryContent.filterByName
            },
            {
                key: 'jobPosition',
                type: 'text',
                filterDelay: 0,
                placeholder: summaryContent.filterByTitle
            }];
            payrollBaseModel.getPayrollItems().forEach(function (item) {
                filters.push({ key: item.itemColumnName });
            });
            filters.push({ key: 'total' });
            filters.push({ key: 'allocationPercent' });
            return filters;
        };
        return model;
    }
    angular
        .module('budgeting')
        .factory('payrollGridConfig', [
            'rpGridConfig',
            'payrollBaseModel',
            'budgetPayrollSummaryActionsDef',
            'payrollSummaryContent',
            factory]);
})(angular);
