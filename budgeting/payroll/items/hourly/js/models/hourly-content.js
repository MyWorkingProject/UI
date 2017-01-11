//  Provides lang content for hourly  Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.item.hourly').translate,
            model = {
                headerTitle: translate('header_title'),
                subTitle: translate('header_hourly_sub_title'),
                calculatorText: translate('lbl_calculator'),
                beginningHourlyRateText: translate('lbl_beginning_hourly_rate'),
                dateOfIncreaseText: translate('lbl_date_of_increase'),
                increaseText: translate('lbl_increase'),
                endingHourlyRateText: translate('lbl_ending_hourly_rate'),
                regularHoursPerWeekText: translate('lbl_regular_hours_per_week'),
                overtimeHoursPerWeekText: translate('lbl_overtime_hours_per_week'),
                preSuffixCurrency: translate('pre_suf_fix_currency'),
                preSuffixPercentage: translate('pre_suf_fix_percentage'),
                preSuffixHour: translate('pre_suf_fix_hour'),
                noOfPayrollRunText: translate('lbl_no_of_payroll_runs'),
                regularHour: translate('lbl_regular_hours'),
                hourlyRate: translate('lbl_hourly_rate'),
                weeklyHoursWorked: translate('lbl_weekly_hours_worked'),
                monthlyHoursWorked: translate('lbl_monthly_hours_worked'),
                regularMonthlyPay: translate('lbl_regular_monthly_pay'),
                overtimeHours: translate('lbl_overtitme_hours'),
                weeklyOvertimeHoursWorked: translate('lbl_weekly_overtime_hours_worked'),
                monthlyOvertimeHoursWorked: translate('lbl_monthly_overtime_hours_worked'),
                overtimeMonthlyPay: translate('lbl_overtime_monthly_pay'),
                totalMonthlySalary: translate('lbl_total_montly_salary'),
                dateFormat: translate('date_format'),
                requiredErrorText: translate('lbl_required_error_message'),
                shouldBeNumberErrorText: translate('lbl_not_number_error_message'),
                shouldBeBetweenErrorText: translate('lbl_number_not_range_error_message'),
                shouldBeFourDecimalErrorText: translate('lbl_decimal_not_range_error_message'),
                calcRequireRowMessage: translate('lbl_selected_row_missing_message')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("hourlyContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
