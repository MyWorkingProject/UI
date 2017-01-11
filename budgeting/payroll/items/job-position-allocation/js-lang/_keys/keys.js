(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            'job_allocation_view_pageTitle',
            'job_allocation_view_payType',
            'job_allocation_view_salary',
            'job_allocation_view_hourly',
            'job_allocation_view_allocation_percent',
            'job_allocation_view_startDate',
            'job_allocation_view_endDate',
            'job_allocation_validation_required',
            'job_allocation_validation_numbers',
            'job_allocation_validation_range',
            'job_allocation_validation_pay_type',
            'job_allocation_no_of_employees',
            'date_format',
            'job_allocation_payrate_error'
        ];

        appLangKeys.app('payroll.items.job_position_allocation').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);


