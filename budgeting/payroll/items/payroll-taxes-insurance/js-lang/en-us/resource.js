//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('payroll.items.taxesInsurance')
            .set({
                'header_title': 'Payroll Taxes & Insurance',
                'header_salary_sub_title': 'Salary',
                'lbl_taxCapEffectiveMonth': 'Tax Cap Effective Month',
                'lbl_cumulative_compensation': 'Cumulative Compensation',
                'lbl_ending_salary_rate': 'Ending Annual Salary',
                'lbl_calculator': 'Calculator',
                'lbl_increase': 'Enter Value',
                'lbl_no_of_payroll_runs':'Number of Payroll Runs',
                'lbl_monthly_salary':'Monthly Salary',
                'lbl_total_montly_salary':'Taxes & Insurance Total',
                'pre_suf_fix_currency': '$',
                'pre_suf_fix_percentage': '%',
                'pre_suf_fix_year': '/Year',
                'header_salary_sub_refresh': 'Refresh',
                'lbl_No_Payroll': 'No Payroll Taxes or Insurance have been entered.',
                'lbl_add_an_item': 'Add an item'
                
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
