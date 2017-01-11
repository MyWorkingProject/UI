//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('payroll.items.housing-allowance')
            .set({
                'header_title': 'Housing Allowance',
                'lbl_unit': 'Unit',
                'lbl_unit_type': 'Unit Type',
                'lbl_allowance_criteria': 'Allowance Criteria',
                'lbl_input_type': 'Input Type',
                'lbl_calculator': 'Calculator',
                'lbl_flat_rate': 'Flat Rate $',
                'lbl_percentage':'Percentage %',
                'lbl_market_rent_by':'Market Rent of ',
                'lbl_housing_allowance_total':'Housing Allowance Total',
                'pre_suf_fix_currency': '$',
                'pre_suf_fix_percentage': '%',
                'lbl_required_error_message': 'Required',
                'lbl_not_number_error_message': 'Should be a number',
                'lbl_selected_row_missing_message': 'Please select row in Housing Allowance'
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
