(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            
            'bdgt_model_account_copy_comments_lbl_copy_comments',
            'bdgt_model_account_copy_comments_lbl_model_type',
            'bdgt_model_account_copy_comments_lbl_model_name',
            'bdgt_model_account_copy_comments_lbl_cancel',
            'bdgt_model_account_copy_comments_lbl_required',
            'bdgt_model_account_copy_comments_lbl_success_msg',
            'bdgt_model_account_copy_comments_select_model_name',
            'bdgt_model_account_copy_comments_select_budget',
            'bdgt_model_account_copy_comments_select_proforma',
            'bdgt_model_account_copy_comments_select_forecast'

        ];

        appLangKeys.app('contracts').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
