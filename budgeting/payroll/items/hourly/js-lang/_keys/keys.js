//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'header_hourly_sub_title',
            'lbl_beginning_hourly_rate',
            'lbl_date_of_increase',
            'lbl_ending_hourly_rate',
            'lbl_regular_hours_per_week',
            'lbl_overtime_hours_per_week',
            'lbl_calculator',
            'lbl_increase',
            'pre_suf_fix_currency',
            'pre_suf_fix_percentage',
            'pre_suf_fix_hour',
            'lbl_no_of_payroll_runs',
            'lbl_regular_hours',
            'lbl_hourly_rate',
            'lbl_weekly_hours_worked',
            'lbl_monthly_hours_worked',
            'lbl_regular_monthly_pay',
            'lbl_overtitme_hours',
            'lbl_weekly_overtime_hours_worked',
            'lbl_monthly_overtime_hours_worked',
            'lbl_overtime_monthly_pay',
            'lbl_total_montly_salary',
            'date_format',
            'lbl_required_error_message',
            'lbl_not_number_error_message',
            'lbl_number_not_range_error_message',
            'lbl_decimal_not_range_error_message',
            'lbl_selected_row_missing_message'
        ];

        appLangKeys.app('payroll.item.hourly').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
