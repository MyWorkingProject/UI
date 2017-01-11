(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            'bdgt_payroll_summary_new_employee',
            'bdgt_payroll_summary_new_position',
            'bdgt_payroll_summary_report_views',
            'bdgt_payroll_summary_annualize_taxes',
            'bdgt_payroll_summary_grid_action',
            'bdgt_payroll_summary_grid_filter',
            'bdgt_payroll_summary_employee',
            'bdgt_payroll_summary_position',
            'bdgt_payroll_summary_total',
            'bdgt_payroll_summary_property_allocation',
            'bdgt_payroll_summary_filter_by_name',
            'bdgt_payroll_summary_filter_by_title',
            'bdgt_payroll_summary_no_results',
            'bdgt_payroll_summary_view_employee_details',
            'bdgt_payroll_summary_view_job_details',
            'bdgt_payroll_summary_view',
            'bdgt_payroll_summary_Edit',
            'bdgt_payroll_summary_payroll_total'
        ];
        appLangKeys.app('payroll.summary').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
