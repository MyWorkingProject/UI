//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('account-by-account-view');

        bundle.set({
            bdgt_model_account_copy_comments_page_title: "Copy Comments",
            bdgt_model_account_copy_comments_lbl_model_type: "Model Type",
            bdgt_model_account_copy_comments_lbl_model_name: "Model Name",
            bdgt_model_account_copy_comments_lbl_cancel: "Cancel",
            bdgt_model_account_copy_comments_lbl_copy_comments: "Copy Comments",
            bdgt_model_account_lblheader: "Account By Account",

            
            //Advance Actuals
        
            bdgt_model_account_advance_actuals_header_text:"Advance Actuals",
            bdgt_model_account_advance_actuals_lbl_use_actuals: "Use Actuals Through",
            bdgt_model_account_advance_actuals_lbl_cancel: "Cancel",
            bdgt_model_account_advance_actuals_lbl_apply_actuals: "Apply Actuals",
            bdgt_model_account_advance_actuals_modal_title: "Actual data will overwrite open period(s)",
            bdgt_model_account_advance_actuals_modal_data:"The data in the open period(s) will be overwritten with the actual data through the period selected. This cannot be undone.",
            bdgt_model_account_advance_actuals_confirm_text: "What do you want to do?",
            bdgt_model_account_advance_actuals_lbl_update_btn: "Update",
            bdget_accByAcc_hideZeroRows:"Hide zero rows",
            bdget_accByAcc_hasRefData:"Has Referace Data",
            bdget_accByAcc_smallRows:"Smaller Rows",
            bdget_accByAcc_largeRows:"Larger Rows",
            bdget_accByAcc_colOptions:"Column Options", 
            bdget_accByAcc_Summary:"Summary View",
            bdget_accByAcc_quaterly:"Quarterly View",
            bdget_accByAcc_monthly:"Monthly View",
            bdget_accByAcc_rowOptions:"Row Options",
            bdget_accByAcc_refresh:"Refresh",
            bdget_accByAcc_restrict_gl:"You have no permissions to edit ",
            bdget_accByAcc_restrict_gl_title:"No Permissions",
            bdget_accByAcc_table_settings:"Table Settings",
            bdget_accByAcc_refData:"Has reference data",
            bdget_accByAcc_apply: "Apply",
            grid_col_forecast_data: "Forecast UseData",
            grid_col_ref_data: "First Reference Data",
            grid_col_total: "Total",
            grid_col_avg_monthly: "Avg Monthly",

            grid_col_dol_variance: "$ Variance",
            grid_col_per_variance: "% Variance",
            grid_col_per_unit: "$ Per Unit",
            grid_col_per_sqft: "$ Per SqFT",
            grid_col_rolling_actual: "Rolling actuals"








  


 
 
            
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
