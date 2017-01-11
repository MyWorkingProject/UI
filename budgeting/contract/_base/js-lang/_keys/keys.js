(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            // Common
            "bdgt_new_contract_edit",
            "bdgt_new_contract_del",
            "bdgt_contract_save",
            "bdgt_new_contract_cancel",
            "bdgt_contract_title",
            "bdgt_new_contract_title",
            "bdgt_contract_calculator",
            "bdgt_contract_new_vendor_title",

            "bdgt_new_contract_na",
            "bdgt_new_contract_grid_empty",


            // Define New Contract Form
            "bdgt_new_contract_vendor_lbl",
            "bdgt_new_contract_vendor_placeholder",

            "bdgt_new_contract_desc_lbl",
            "bdgt_new_contract_desc_placeholder",

            "bdgt_new_contract_notes_lbl",
            "bdgt_new_contract_notes_placeholder",

            // Define Contract Tabs
            "bdgt_contract_schedule_title",
            "bdgt_contract_document_title",
            "bdgt_contract_properties_title",

            "bdgt_contract_new_sched",
            "bdgt_contract_new_doc",

            // Define New Contract Payment Terms
            "bdgt_schedule_charges",
            "bdgt_schedule_add",
            "bdgt_new_contract_add_schedule_hd",

            "bdgt_new_contract_hd_action",
            "bdgt_new_contract_hd_date_range",
            "bdgt_new_contract_hd_start_date",
            "bdgt_new_contract_hd_end_date",
            "bdgt_new_contract_hd_frequency",
            "bdgt_new_contract_hd_amount",
            "bdgt_new_contract_hd_total",

            "bdgt_new_contract_lbl_expiration_reminder",
            "bdgt_new_contract_lbl_expiration_days",
            "bdgt_new_contract_lbl_expiration_email",
            "bdgt_new_contract_lbl_annual_increase",

            "bdgt_new_contract_filter_start_date",
            "bdgt_new_contract_filter_end_date",
            "bdgt_new_contract_filter_amount",
            "bdgt_new_contract_filter_total",

            "bdgt_new_contract_email_placeholder",
            "bdgt_contract_pt_grid_empty",
            "bdgt_contract_add_schedule",

            // Filter
            "bdgt_contract_filter_show",
            "bdgt_contract_filter_hide",
            "bdgt_contract_filter",

            // Filter by Frequency
            "bdgt_new_contract_filter_fq_all",
            "bdgt_new_contract_filter_fq_others",
            "bdgt_new_contract_filter_fq_weekly",
            "bdgt_new_contract_filter_fq_biweekly",
            "bdgt_new_contract_filter_fq_monthly",
            "bdgt_new_contract_filter_fq_quarterly",
            "bdgt_new_contract_filter_fq_annually",
            "bdgt_new_contract_filter_fq_annualized",

            // Vendor List
            "bdgt_contract_vendor_select",
            "bdgt_new_contract_addVendor_lnk",

            // Annual Increase Options
            "bdgt_new_contract_ai_increase",
            "bdgt_new_contract_ai_basis_lbl",
            "bdgt_new_contract_ai_anniv",
            "bdgt_new_contract_ai_calendar",

            // Dialog: Delete Payment Term
            "bdgt_new_contract_dlg_del_pt_title",
            "bdgt_new_contract_dlg_del_pt_ask",

            // Dialog: Confirm Cancel New Schedule
            "bdgt_new_contract_dlg_cancel_ns_title",
            "bdgt_new_contract_dlg_cancel_ns_info",
            "bdgt_new_contract_dlg_cancel_ns_ask",

            // Pricing
            "bdgt_new_contract_year",
            "bdgt_new_contract_total",
            "bdgt_new_contract_jan",
            "bdgt_new_contract_feb",
            "bdgt_new_contract_mar",
            "bdgt_new_contract_apr",
            "bdgt_new_contract_may",
            "bdgt_new_contract_jun",
            "bdgt_new_contract_jul",
            "bdgt_new_contract_aug",
            "bdgt_new_contract_sep",
            "bdgt_new_contract_oct",
            "bdgt_new_contract_nov",
            "bdgt_new_contract_dec",

            // Properties Grid
            "bdgt_new_contract_prop_name",
            "bdgt_new_contract_chart_name",
            "bdgt_new_contract_allocation",
            "bdgt_new_contract_gl_account",

            "bdgt_new_contract_filter_prop_name",
            "bdgt_new_contract_filter_chart_name",
            "bdgt_new_contract_filter_allocation",
            "bdgt_new_contract_filter_gl_account",

            "bdgt_properties_add_prop",
            "bdgt_properties_assign_gl",

            
            // Error Titles
            "bdgt_new_contract_update_err",
            
            // Error Messages
            "bdgt_contract_desc_required",
            "bdgt_contract_invalid_vendor",
            "bdgt_contract_vendor_fail",
            
            "bdgt_new_contract_new_contract_fail",
            
            "bdgt_new_contract_get_glacct_fail",
            
            "bdgt_new_contract_get_sched_fail",
            "bdgt_new_contract_new_sched_fail",
            "bdgt_contract_schedule_required",
            "bdgt_contract_schedule_details_fail",

            "bdgt_contract_assign_txt",
            "bdgt_contract_overwrite_text",

            "bdget_contract_invalid_id",

            "bdgt_properties_selection_error",
            "bdgt_properties_percentage_error",
            "bdgt_properties_gl_error",
            "bdgt_properties_tool_tip",
            "bdgt_properties_no_data",

            "bdgt_schedule_start_date_req", 
            "bdgt_schedule_end_date_req", 
            "bdgt_schedule_invalid_dates", 
            "bdgt_schedule_amt_req", 
            "bdgt_schedule_countdown_req", 
            "bdgt_schedule_email_req", 
            "bdgt_schedule_frequency_req", 
            "bdgt_schedule_increase_val_req", 
            "bdgt_schedule_increase_type_req", 
            "bdgt_schedule_increase_basis_req", 

            "bdgt_calculator_required_fields"

        ];

        appLangKeys.app("contract").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
