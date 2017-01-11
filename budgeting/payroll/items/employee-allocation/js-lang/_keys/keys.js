(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            'emp_allocation_view_pageTitle',
            'emp_allocation_view_payType',
            'emp_allocation_view_salary',
            'emp_allocation_view_hourly',
            'emp_allocation_view_allocation_percent',
            'emp_allocation_view_startDate',
            'emp_allocation_view_endDate',
            'emp_allocation_validation_required',
            'emp_allocation_validation_numbers',
            'emp_allocation_validation_range',
            'emp_allocation_validation_pay_type',
            'date_format'
        ];

        appLangKeys.app('payroll.items.employee_allocation').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);


