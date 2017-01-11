(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
           'bdgt_rental_mr_lable',
           'bdgt_rental_ar_lable',
           'bdgt_rental_mr_summary_lable',
           'bdgt_rental_mr_save_lable',
           'bdgt_rental_mr_cancel_lable', 
           'bdgt_rental_mr_row_optn_lable', 
           'bdgt_rental_mr_row_optn_SR_lable',  
           'bdgt_rental_mr_row_optn_SC_lable',   
           'bdgt_rental_mr_row_optn_SRS_lable',
           'bdgt_rental_mr_row_optn_LRS_lable', 
           'bdgt_rental_mr_col_optn_lable', 
           'bdgt_rental_mr_detail_lable', 
           'bdgt_rental_mr_change_rent_lable',  
           'bdgt_rental_mr_filter_lable',   
           'bdgt_rental_mr_refresh_lable' ,
           'bdgt_rental_mr_refdata_lable',
           'bdgt_rental_mr_new_unit_type_lable',
           'bdgt_rental_mr_refresh_header',
           'bdgt_rental_mr_refresh_desc',
           'bdgt_rental_mr_refresh_confirm',
           'bdgt_rental_mr_refresh_load',
           'bdgt_rental_mr_refresh_cancel',
           'bdgt_rental_mr_save_err_msg',
           'bdgt_rental_mr_unit_pogram_cnt_msg',       
           'bdgt_rental_mr_unit_service_cnt_msg', 
           'bdgt_rental_mr_unit_text', 
           'bdgt_rental_mr_unitType_dup_err_msg',
           'bdgt_rental_mr_cmnt_header',
           'bdgt_rental_mr_cmnt_post_btn_text',   
           'bdgt_rental_mr_prior_change_text', 
           'bdgt_rental_mr_prior_per_text',  
           'bdgt_rental_mr_dollor_change_text', 
           'bdgt_rental_mr_dollor_per_text',
           'bdgt_rental_mr_import_header',
           'bdgt_rental_mr_import_desc', 
           'bdgt_rental_mr_import_confirm',          
           'bdgt_rental_mr_import_load',
           'bdgt_rental_sr_save_msg',
           'bdgt_rental_sr_save_err_msg',
           'bdgt_rental_ar_cap_lable',   
           'bdgt_rental_mr_changes_header',
           'bdgt_rental_mr_changes_desc',
           'bdgt_rental_mr_changes_ok' ,
           'bdgt_rental_mr_unitCnt_header',
           'bdgt_rental_mr_unitCnt_msg',
           'bdgt_rental_mr_ok_text',
           'bdgt_rental_mr_sg_text',
           'bdgt_rental_mr_prg_text',
           'bdgt_rental_mr_reference_header',
           'bdgt_rental_mr_table_settings',
           'bdgt_rental_mr_reference_lable' ,
            'bdgt_rental_mr_prof_save_header',
            'bdgt_rental_mr_prof_save_msg'
        ];

        appLangKeys.app('market-rent').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
