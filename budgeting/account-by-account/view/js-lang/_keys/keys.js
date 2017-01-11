//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
          'bdgt_model_account_copy_comments_page_title',
            'bdgt_model_account_copy_comments_lbl_model_type',
            'bdgt_model_account_copy_comments_lbl_model_name',
            'bdgt_model_account_copy_comments_lbl_cancel',
            'bdgt_model_account_copy_comments_lbl_copy_comments',
            'bdgt_model_account_lblheader',
            'bdgt_model_account_advance_actuals_header_text',
            'bdgt_model_account_advance_actuals_lbl_use_actuals',
            'bdgt_model_account_advance_actuals_lbl_cancel',
            'bdgt_model_account_advance_actuals_lbl_apply_actuals',
            'bdgt_model_account_advance_actuals_modal_title',
            'bdgt_model_account_advance_actuals_modal_data',
            'bdgt_model_account_advance_actuals_confirm_text',
            'bdgt_model_account_advance_actuals_lbl_update_btn',
            'bdget_accByAcc_hideZeroRows',
            'bdget_accByAcc_hasRefData',
            'bdget_accByAcc_smallRows',
            'bdget_accByAcc_largeRows',
            'bdget_accByAcc_colOptions', 
            'bdget_accByAcc_Summary',
            'bdget_accByAcc_quaterly',
            'bdget_accByAcc_monthly',
            'bdget_accByAcc_rowOptions',
            'bdget_accByAcc_refresh',
            'bdget_accByAcc_restrict_gl',
            'bdget_accByAcc_restrict_gl_title',
            'bdget_accByAcc_table_settings',
            'bdget_accByAcc_refData',
            'bdget_accByAcc_apply',

            'grid_col_forecast_data',
            'grid_col_ref_data',
            'grid_col_total',
            'grid_col_avg_monthly',
         
            'grid_col_dol_variance',
            'grid_col_per_variance',
            'grid_col_per_unit',
            'grid_col_per_sqft',
            'grid_col_rolling_actual'
     
    
        ];

        appLangKeys.app('account-by-account-view').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
