(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
           'cap_method_text',
           'save_btn_text',
           'actual_rent_cap_unittype',
           'actual_rent_cap_avg_market',
           'actual_rent_cap_amount',
           'actual_rent_cap_get_invalid_param_error',
           'actual_rent_cap_get_no_data_error',
           'actual_rent_cap_put_invalid_param_error',
           'actual_rent_cap_save_succ_msg',
           'actual_rent_cap_save_err_msg',
           'cap_header',
           'cap_popUp_header',
           'cap_popUp_desc',
           'cap_popUp_confirm',
           'cap_popUp_cancel',
           'cap_popUp_contnue'          
        ];

        appLangKeys.app('actual-rent-cap').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
