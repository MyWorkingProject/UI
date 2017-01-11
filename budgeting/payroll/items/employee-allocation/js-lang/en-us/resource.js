(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('payroll.items.employee_allocation');

        bundle.set({
            emp_allocation_view_pageTitle: 'Model Specific Details',
            emp_allocation_view_payType: 'Pay Type',
            emp_allocation_view_salary: 'Salary',
            emp_allocation_view_hourly: 'Hourly',
            emp_allocation_view_allocation_percent: 'Allocation %',
            emp_allocation_view_startDate: 'Start Date',
            emp_allocation_view_endDate: 'End Date',
            emp_allocation_validation_required: 'Required field',
            emp_allocation_validation_numbers: 'Percentage should be in numbers',
            emp_allocation_validation_range: 'Percentage should be between 1 - 100',
            emp_allocation_validation_pay_type: 'Pay Type field is required',
            date_format: 'MM/DD/YYYY'
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
