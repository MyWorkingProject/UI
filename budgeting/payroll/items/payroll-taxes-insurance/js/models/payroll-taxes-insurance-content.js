//  Provides lang content for salary  Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.items.taxesInsurance').translate,
            model = {
                headerTitle: translate('header_title'),
                subTitle: translate('header_salary_sub_title'),
                refresh: translate('header_salary_sub_refresh'),
                taxCapEffectiveMonth: translate('lbl_taxCapEffectiveMonth'),
                cumulativeCompensation: translate('lbl_cumulative_compensation'),
                endingSalaryRateText: translate('lbl_ending_salary_rate'),
                calculatorText: translate('lbl_calculator'),
                increaseText: translate('lbl_increase'),
                noOfPayrollRunText: translate('lbl_no_of_payroll_runs'),
                monthlySalaryText: translate('lbl_monthly_salary'),
                totalMonthlySalaryText: translate('lbl_total_montly_salary'),
                preSuffixCurrency: translate('pre_suf_fix_currency'),
                preSuffixPercentage: translate('pre_suf_fix_percentage'),
                preSuffixYear: translate('pre_suf_fix_year'),
                noPayroll: translate('lbl_No_Payroll'),
                addAnItem: translate('lbl_add_an_item')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("taxInsuranceContentModel", [
        	'appLangTranslate',
        	factory]);
})(angular);
