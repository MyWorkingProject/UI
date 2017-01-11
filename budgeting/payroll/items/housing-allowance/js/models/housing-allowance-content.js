//  Provides lang content for salary  Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.items.housing-allowance').translate,
            model = {
                headerTitle: translate('header_title'),
                unitText: translate('lbl_unit'),
                unitTypeText: translate('lbl_unit_type'),
                allowanceCriteriaText: translate('lbl_allowance_criteria'),
                inputTypeText: translate('lbl_input_type'),
                calculatorText: translate('lbl_calculator'),
                flatRateText: translate('lbl_flat_rate'),
                percentageText: translate('lbl_percentage'),
                marketRentByText: translate('lbl_market_rent_by'),
                housingAllowanceTotalText: translate('lbl_housing_allowance_total'),
                preSuffixCurrency: translate('pre_suf_fix_currency'),
                preSuffixPercentage: translate('pre_suf_fix_percentage'),
                requiredErrorText: translate('lbl_required_error_message'),
                shouldBeNumberErrorText: translate('lbl_not_number_error_message'),
                calcRequireRowMessage: translate('lbl_selected_row_missing_message')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("haContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
