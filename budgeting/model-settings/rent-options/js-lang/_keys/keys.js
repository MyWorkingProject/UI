//  Configure App Language Keys for Model Settings - Rent options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'mr_page_title',
            'mr_body_title',
            'mr_method',
            'mr_option_none',
            'mr_option_unit',
            'mr_option_unit_type',
            'mr_option_unit_Program',
            'mr_option_unit_service_Group',
            'mr_market_rent_GL',
            'mr_body_actual_rent',
            'mr_actual_rent_method',
            'mr_actual_rent_GL',
            'mr_body_loss_gain_lease',
            'mr_loss_gain_lease_method',
            'mr_loss_gain_lease',
            'mr_gain_loss_lease',
            'mr_options_save',
            'mr_options_cancel',
            'mr_options_edit',
            'rent_options_save',
            'rent_options_cancel',
            'rent_options_edit',
            'mr_total_Percent',
            'mr_ex_invalid_param',
            'mr_ex_loss_lease_req',
            'mr_ex_market_gl_req',
            'mr_ex_Actual_gl_req',
            'mr_ex_invalid_mr_Percentage',
            'mr_ex_invalid_ar_Percentage',
            'mr_add_GL:"Add GL',
            'EMPTY_BothGL',
            'mr_ex_either_gl_req',
            'mr_loss_gain_sg',
            'mr_helptext'
          
        ];

        appLangKeys.app('RentOptions').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
