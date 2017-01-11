//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
                'header_title',
                'lbl_unit',
                'lbl_unit_type',
                'lbl_allowance_criteria',
                'lbl_input_type',
                'lbl_calculator',
                'lbl_flat_rate',
                'lbl_percentage',
                'lbl_market_rent_by',
                'lbl_housing_allowance_total',
                'pre_suf_fix_currency',
                'pre_suf_fix_percentage',
                'lbl_required_error_message',
                'lbl_not_number_error_message',
                'lbl_selected_row_missing_message'
        ];

        appLangKeys.app('payroll.items.housing-allowance').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
