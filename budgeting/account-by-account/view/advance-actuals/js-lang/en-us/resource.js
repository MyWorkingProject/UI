(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('accountByaccount.advance_actuals');

        bundle.set({         
            bdgt_model_account_advance_actuals_header_text: 'Advance Actuals',
            bdgt_model_account_advance_actuals_lbl_use_actuals: 'Use Actuals Through',
            bdgt_model_account_advance_actuals_lbl_cancel: 'Cancel',
            bdgt_model_account_advance_actuals_lbl_apply_actuals: 'Apply Actuals',
            bdgt_model_account_advance_actuals_modal_title: 'Actual data will overwrite open period(s)',
            bdgt_model_account_advance_actuals_modal_data: 'The data in the open period(s) will be overwritten with the actual data through the period selected. This cannot be undone.',
            bdgt_model_account_advance_actuals_confirm_text: 'What do you want to do?',
            bdgt_model_account_advance_actuals_lbl_update_btn: 'Update',
            bdgt_model_account_advance_actuals_lbl_success_msg: 'Successfully advanced actuals through'
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
