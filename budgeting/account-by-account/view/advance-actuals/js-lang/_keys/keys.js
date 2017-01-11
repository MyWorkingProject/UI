(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            'bdgt_model_account_advance_actuals_header_text',
            'bdgt_model_account_advance_actuals_lbl_use_actuals',
            'bdgt_model_account_advance_actuals_lbl_cancel',
            'bdgt_model_account_advance_actuals_lbl_apply_actuals',
            'bdgt_model_account_advance_actuals_modal_title',
            'bdgt_model_account_advance_actuals_modal_data',
            'bdgt_model_account_advance_actuals_confirm_text',
            'bdgt_model_account_advance_actuals_lbl_update_btn',
            'bdgt_model_account_advance_actuals_lbl_success_msg'
        ];

        appLangKeys.app('contracts').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
