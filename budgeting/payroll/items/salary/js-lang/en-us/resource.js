//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('payroll.items.salary')
            .set({
                'header_title': 'Pay',
                'header_salary_sub_title': 'Salary',
                'lbl_beginning_salary_rate': 'Beginning Annual Salary',
                'lbl_date_of_increase': 'Date of Increase',
                'lbl_ending_salary_rate': 'Ending Annual Salary',
                'lbl_calculator': 'Calculator',
                'lbl_increase': 'Increase',
                'lbl_no_of_payroll_runs':'Number of Payroll Runs',
                'lbl_monthly_salary':'Monthly Salary',
                'lbl_total_montly_salary':'Total Monthly Salary Allocated',
                'pre_suf_fix_currency': '$',
                'pre_suf_fix_percentage': '%',
                'pre_suf_fix_year': '/Year',
                'date_format': 'MM/DD/YYYY',
                'lbl_required_error_message': 'Required',
                'lbl_not_number_error_message': 'Should be a number',
                'lbl_selected_row_missing_message': 'Please select row in Salary'
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
