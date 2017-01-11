//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'header_salary_sub_title',
            'lbl_beginning_salary_rate',
            'lbl_date_of_increase',
            'lbl_ending_salary_rate',
            'lbl_calculator',
            'lbl_increase',
            'lbl_no_of_payroll_runs',
            'lbl_monthly_salary',
            'lbl_total_montly_salary',
            'pre_suf_fix_currency',
            'pre_suf_fix_percentage',
            'pre_suf_fix_year',
            'date_format',
            'lbl_required_error_message',
            'lbl_not_number_error_message',
            'lbl_selected_row_missing_message'
        ];

        appLangKeys.app('payroll.items.salary').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
