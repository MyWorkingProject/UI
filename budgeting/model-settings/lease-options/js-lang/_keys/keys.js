//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'lease_options_page_title',
            'lease_options_lease_renewal_method',
            'lease_options_use_reference_data',
            'lease_options_assumptions',
            'lease_options_market_rent_move_in',
            'lease_options_lease_term',
            'lease_options_market_rent_lease_renewal',
            'lease_options_lease_renewal',
            'lease_options_mtm_renewal',
            'lease_options_mtm_lease_market_rent',
            'lease_options_show_reference_data',
            'lease_options_open_period_reference_data',

            'lease_options_save',
            'lease_options_cancel',
            'lease_options_edit',
            
            'lease_options_market_rent_move_in_tool_tip',
            'lease_options_market_rent_lease_renewal_tool_tip',
            'lease_options_open_period_tool_tip',

            'lease_options_get_msgs_inv_param_txt',
            'lease_options_get_msgs_unknwn_err_desc',
            'lease_options_put_msgs_inv_param_txt',
            'lease_options_save__succ_msg_txt'
    
        ];

        appLangKeys.app('LeaseOptions').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
