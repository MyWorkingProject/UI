(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('payroll.summary');
        bundle.set({ 
            bdgt_payroll_summary_new_employee: 'New Employee',
            bdgt_payroll_summary_new_position: 'New Position',
            bdgt_payroll_summary_report_views: 'Payroll Report Views',
            bdgt_payroll_summary_annualize_taxes: 'Annualize Taxes',
            bdgt_payroll_summary_grid_action: 'Action',
            bdgt_payroll_summary_grid_filter: 'Filter',
            bdgt_payroll_summary_employee: 'Employee',
            bdgt_payroll_summary_position: 'Position',
            bdgt_payroll_summary_total: 'Total',
            bdgt_payroll_summary_property_allocation: 'Property Allocation',
            bdgt_payroll_summary_filter_by_name: 'Filter by name',
            bdgt_payroll_summary_filter_by_title: 'Filter by title',
            bdgt_payroll_summary_no_results: 'No results were found.',
            bdgt_payroll_summary_view_employee_details: 'View Employee Details',
            bdgt_payroll_summary_view_job_details: 'View Job Details',
            bdgt_payroll_summary_view: 'View',
            bdgt_payroll_summary_Edit: 'Edit Payroll',
            bdgt_payroll_summary_payroll_total: 'Employee & Payroll Total'
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
