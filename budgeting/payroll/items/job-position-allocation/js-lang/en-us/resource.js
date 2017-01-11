(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('payroll.items.job_position_allocation');

        bundle.set({
            job_allocation_view_pageTitle: 'Model Specific Details',
            job_allocation_view_payType: 'Pay Type',
            job_allocation_view_salary: 'Salary',
            job_allocation_view_hourly: 'Hourly',
            job_allocation_view_allocation_percent: 'Allocation %',
            job_allocation_view_startDate: 'Start Date',
            job_allocation_view_endDate: 'End Date',
            job_allocation_validation_required: 'Required field',
            job_allocation_validation_numbers: 'Percentage should be in numbers',
            job_allocation_validation_range: 'Percentage should be between 1 - 100',
            job_allocation_validation_pay_type: 'Pay Type field is required',
            job_allocation_no_of_employees: 'Number of Employees',
            date_format: 'MM/DD/YYYY',
            job_allocation_payrate_error: 'No of employees should be less than position count'
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
