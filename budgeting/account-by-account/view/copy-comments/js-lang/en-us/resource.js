(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('accountByaccount.copy_comments');

        bundle.set({         
            bdgt_model_account_copy_comments_lbl_copy_comments: 'Copy Comments',
            bdgt_model_account_copy_comments_lbl_model_type: 'Model Type',
            bdgt_model_account_copy_comments_lbl_model_name: 'Model Name',
            bdgt_model_account_copy_comments_lbl_cancel: 'Cancel',
            bdgt_model_account_copy_comments_lbl_required: 'Required field',
            bdgt_model_account_copy_comments_lbl_success_msg: 'Successfully copied comments from',
            bdgt_model_account_copy_comments_select_model_name: 'Select Model Name',
            bdgt_model_account_copy_comments_select_budget: 'Budget',
            bdgt_model_account_copy_comments_select_proforma: 'Proforma',
            bdgt_model_account_copy_comments_select_forecast: 'Forecast'
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
