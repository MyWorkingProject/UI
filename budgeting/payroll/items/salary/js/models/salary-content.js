//  Provides lang content for salary  Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.items.salary').translate,
            model = {
                headerTitle: translate('header_title'),
                subTitle: translate('header_salary_sub_title'),
                beginningSalaryRateText: translate('lbl_beginning_salary_rate'),
                dateOfIncreaseText: translate('lbl_date_of_increase'),
                endingSalaryRateText: translate('lbl_ending_salary_rate'),
                calculatorText: translate('lbl_calculator'),
                increaseText: translate('lbl_increase'),
                noOfPayrollRunText: translate('lbl_no_of_payroll_runs'),
                monthlySalaryText: translate('lbl_monthly_salary'),
                totalMonthlySalaryText: translate('lbl_total_montly_salary'),
                preSuffixCurrency: translate('pre_suf_fix_currency'),
                preSuffixPercentage: translate('pre_suf_fix_percentage'),
                preSuffixYear: translate('pre_suf_fix_year'),
                dateFormat: translate('date_format'),
                requiredErrorText: translate('lbl_required_error_message'),
                shouldBeNumberErrorText: translate('lbl_not_number_error_message'),
                calcRequireRowMessage: translate('lbl_selected_row_missing_message')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("salaryContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
