//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('payroll.item.hourly')
            .set({
                'header_title': 'Pay',
                'header_hourly_sub_title': 'Hourly',
                'lbl_beginning_hourly_rate': 'Beginning Hourly Rate',
                'lbl_date_of_increase': 'Date of Increase',
                'lbl_ending_hourly_rate': 'Ending Hourly Rate',
                'lbl_regular_hours_per_week': 'Regular Hours / wk',
                'lbl_overtime_hours_per_week': 'Overtime Hours / wk',
                'lbl_calculator': 'Calculator',
                'lbl_increase': 'Increase',
                'pre_suf_fix_currency': '$',
                'pre_suf_fix_percentage': '%',
                'pre_suf_fix_hour': '/hour',
                'lbl_no_of_payroll_runs': 'Number of Payroll Runs',
                'lbl_regular_hours': 'Regular Hours',
                'lbl_hourly_rate': 'Hourly Rate',
                'lbl_weekly_hours_worked': 'Hours Worked / wk',
                'lbl_monthly_hours_worked': 'Hours Worked / mo',
                'lbl_regular_monthly_pay': 'Regular Monthly Pay',
                'lbl_overtitme_hours': 'Overtime Hours',
                'lbl_weekly_overtime_hours_worked': 'Overtime Hours / wk',
                'lbl_monthly_overtime_hours_worked': 'Overtime Hours / mo',
                'lbl_overtime_monthly_pay': 'Overtime Monthly Pay',
                'lbl_total_montly_salary': 'Total Monthly Pay',
                'date_format': 'MM/DD/YYYY',
                'lbl_required_error_message': 'Required',
                'lbl_not_number_error_message': 'Should be a number',
                'lbl_number_not_range_error_message': 'Should be less than 40',
                'lbl_decimal_not_range_error_message': 'Allowed up to four decimal places',
                'lbl_selected_row_missing_message': 'Please select row in Hourly'
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
