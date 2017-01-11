//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'header_salary_sub_title',
            'lbl_taxCapEffectiveMonth',
            'lbl_cumulative_compensation',
            'lbl_ending_salary_rate',
            'lbl_calculator',
            'lbl_increase',
            'lbl_no_of_payroll_runs',
            'lbl_monthly_salary',
            'lbl_total_montly_salary',
            'pre_suf_fix_currency',
            'pre_suf_fix_percentage',
            'pre_suf_fix_year',
            'header_salary_sub_refresh',
            'lbl_No_Payroll',
            'lbl_add_an_item'
        ];

        appLangKeys.app('payroll.items.taxesInsurance').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
