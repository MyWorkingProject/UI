//  English Resource Bundle for Budget Model Overview

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('market-rent');

        bundle.set({
            bdgt_rental_mr_lable:'Market Rent',
            bdgt_rental_ar_lable:'Actual Rent',
            bdgt_rental_mr_summary_lable:'Summary',
            bdgt_rental_mr_save_lable:'Save',
            bdgt_rental_mr_cancel_lable:'Cancel', 
            bdgt_rental_mr_row_optn_lable:'Row Options', 
            bdgt_rental_mr_row_optn_SR_lable:'Show Reference Data',  
            bdgt_rental_mr_row_optn_SC_lable:'Show Calculation Rows',   
            bdgt_rental_mr_row_optn_SRS_lable:'Smaller Rows',
            bdgt_rental_mr_row_optn_LRS_lable:'Larger Rows', 
            bdgt_rental_mr_col_optn_lable:'Column Options', 
            bdgt_rental_mr_detail_lable:'Details', 
            bdgt_rental_mr_change_rent_lable:'Change',  
            bdgt_rental_mr_filter_lable:'Filter',   
            bdgt_rental_mr_refresh_lable:'Refresh', 
            bdgt_rental_mr_refdata_lable:'Reference Data',
            bdgt_rental_mr_new_unit_type_lable:'New Unit Type',
            bdgt_rental_mr_save_msg:'Market Rent data saved successfully',
            bdgt_rental_mr_get_msgs_inv_param_txt:"Invalid Paramters passed to the request",
            bdgt_rental_mr_get_msgs_ntfnd_err_desc:"No Market rent data found for the request",
            bdgt_rental_mr_put_msgs_inv_param_txt:"Error occurred while saving the market rent data",
            bdgt_rental_mr_refresh_header:"Do you want to refresh the rent information?",
            bdgt_rental_mr_refresh_desc:"The changes done to the worksheet will be updated with the default values imported. Click 'Load' to update this worksheet. Click 'Cancel' to open the worksheet without updating. If you click 'Load' and do want to keep the changes to the worksheet, close the worksheet and do not save your changes.",
            bdgt_rental_mr_refresh_confirm:"What do you want to do?",
            bdgt_rental_mr_refresh_load:"Load",
            bdgt_rental_mr_refresh_cancel:"Cancel",
            bdgt_rental_mr_save_err_msg:"Unable to save data, invalid data. Please verify the data in the worksheet.",
            bdgt_rental_mr_unit_pogram_cnt_msg:"Units of this program should not be more than ",
            bdgt_rental_mr_unit_service_cnt_msg:"Units of this service group should not be more than ",
            bdgt_rental_mr_unit_text:" units",
            bdgt_rental_mr_unitType_dup_err_msg: "Unit type name already exists, please enter different name",
            bdgt_rental_mr_cmnt_header: "Comments",
            bdgt_rental_mr_cmnt_post_btn_text: "Post",
            bdgt_rental_mr_prior_change_text: "Prior Period $ Change", 
            bdgt_rental_mr_prior_per_text:"Prior Period % Change",  
            bdgt_rental_mr_dollor_change_text:"$ Change from ", 
            bdgt_rental_mr_dollor_per_text:"% Change from ",
            bdgt_rental_mr_import_header:"Unit information has recently been imported",
            bdgt_rental_mr_import_desc: "New unit data has recently been imported into Budgeting, which may change this market rent worksheet.  Click 'Load' to update this worksheet.  Click 'Cancel' to open the worksheet without updating.  If you click 'Load' and do want to keep the changes to the worksheet, close the worksheet and do not save your changes.",
            bdgt_rental_mr_import_confirm:"Do you want to update the unit information?",
            bdgt_rental_mr_import_load:"Load",
            bdgt_rental_sr_save_msg: "Actual Rent data saved successfully",
            bdgt_rental_sr_save_err_msg: "Unable to save data, invalid data. Please verify the data in the worksheet.",
            bdgt_rental_ar_cap_lable: "Manage Actual Rent Cap",
            bdgt_rental_mr_changes_header:"Changes will be lost",
            bdgt_rental_mr_changes_desc:"Click 'Close' to discard any changes. Click 'Cancel' to continue the working in the ",
            bdgt_rental_mr_changes_ok:"Close",
            bdgt_rental_mr_unitCnt_header : "Units not assigned to ",
            bdgt_rental_mr_unitCnt_msg:" units are not assigned to any ",
            bdgt_rental_mr_ok_text:"Ok",
            bdgt_rental_mr_sg_text:"service group ",
            bdgt_rental_mr_prg_text:"program",
            bdgt_rental_mr_reference_header: "Reference Data",
            bdgt_rental_mr_table_settings: "Table Settings",
            bdgt_rental_mr_reference_lable: "Month lease expires",
            bdgt_rental_mr_prof_save_header: "Please save the data",
            bdgt_rental_mr_prof_save_msg:"Please save the data to add the comments to newly added profroma unit type"
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
