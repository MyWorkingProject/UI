(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("contract");

        bundle.set({

            // Common
            bdgt_new_contract_edit: "Edit",
            bdgt_new_contract_del: "Delete",
            bdgt_contract_save: "Save",
            bdgt_new_contract_cancel: "Cancel",
            bdgt_contract_title: "CONTRACT",
            bdgt_new_contract_title: "New Contract",
            bdgt_contract_calculator: "Calculator",
            bdgt_contract_new_vendor_title: "New Vendor",

            bdgt_new_contract_na: "N/A",
            bdgt_new_contract_grid_empty: "No results were found.",


            // Define New Contract Form
            bdgt_new_contract_vendor_lbl: "Vendor",
            bdgt_new_contract_vendor_placeholder: "Select a vendor",

            bdgt_new_contract_desc_lbl: "Description",
            bdgt_new_contract_desc_placeholder: "Enter contract description",

            bdgt_new_contract_notes_lbl: "Notes",
            bdgt_new_contract_notes_placeholder: "Add contract notes if any",

            
            // Define Contract Tabs
            bdgt_contract_schedule_title: "Schedules",
            bdgt_contract_document_title: "Documents",
            bdgt_contract_properties_title: "Properties",

            bdgt_contract_new_sched: "New Schedule",
            bdgt_contract_new_doc: "New Document",


            // Define New Contract Payment Terms
            bdgt_schedule_charges: "SCHEDULED CHARGES",
            bdgt_schedule_add: "Add",
            bdgt_new_contract_add_schedule_hd: "New Contract Schedule",
            bdgt_new_contract_edit_schedule_hd: "Edit Contract Schedule",

            bdgt_new_contract_hd_action: "Actions",
            bdgt_new_contract_hd_date_range: "Date",
            bdgt_new_contract_hd_start_date: "Start Date",
            bdgt_new_contract_hd_end_date: "End Date",
            bdgt_new_contract_hd_frequency: "Frequency",
            bdgt_new_contract_hd_amount: "Amount",
            bdgt_new_contract_hd_total: "Total",

            bdgt_new_contract_lbl_expiration_reminder: "Email expiration reminder",
            bdgt_new_contract_lbl_expiration_days: "Days Before Expires",
            bdgt_new_contract_lbl_expiration_email: "Send Email To",
            bdgt_new_contract_lbl_annual_increase: "Apply annual increase",

            bdgt_new_contract_filter_start_date: "Filter by start date",
            bdgt_new_contract_filter_end_date: "Filter by end date",
            bdgt_new_contract_filter_amount: "Filter by amount",
            bdgt_new_contract_filter_total: "Filter by total amount",

            bdgt_new_contract_email_placeholder: "Separate multiple emails with comma",
            bdgt_contract_pt_grid_empty: "No schedules have been entered for this contract.",
            bdgt_contract_add_schedule: "Add a Schedule",

            // Filter
            bdgt_contract_filter_show: "Show Filters",
            bdgt_contract_filter_hide: "Hide Filters",
            bdgt_contract_filter: "Filter",

            // Filter by Frequency
            bdgt_new_contract_filter_fq_all: "All",
            bdgt_new_contract_filter_fq_others: "Others",
            bdgt_new_contract_filter_fq_weekly: "Weekly",
            bdgt_new_contract_filter_fq_biweekly: "Bi Weekly",
            bdgt_new_contract_filter_fq_monthly: "Monthly",
            bdgt_new_contract_filter_fq_quarterly: "Quarterly",
            bdgt_new_contract_filter_fq_annually: "Annually",
            bdgt_new_contract_filter_fq_annualized: "Annualized",

            // Vendor List
            bdgt_contract_vendor_select: "Select a vendor",
            bdgt_new_contract_addVendor_lnk: "+ Add Vendor",

            // Annual Increase Options
            bdgt_new_contract_ai_increase: "Annual Increase",
            bdgt_new_contract_ai_basis_lbl: "Basis for Increase",
            bdgt_new_contract_ai_anniv: "Contract Anniversary",
            bdgt_new_contract_ai_calendar: "Calendar Year Begin",

            // Dialog: Delete Payment Term
            bdgt_new_contract_dlg_del_pt_title: "Delete Schedule",
            bdgt_new_contract_dlg_del_pt_ask: "You are about to permanently delete this, continue?",

            // Dialog: Confirm Cancel New Schedule
            bdgt_new_contract_dlg_cancel_ns_title: "Unsaved Changes",
            bdgt_new_contract_dlg_cancel_ns_info: "You are leaving without saving your changes.",
            bdgt_new_contract_dlg_cancel_ns_ask: "Do you wish to continue?",

            // Dialog: Delete Property
            bdgt_properties_del_title: "Deleting Properties",
            bdgt_properties_del_ask: "Are you sure you want to delete assigned property?",            

            // Pricing
            bdgt_new_contract_year: "Year",
            bdgt_new_contract_total: "Total",
            bdgt_new_contract_jan: "Jan",
            bdgt_new_contract_feb: "Feb",
            bdgt_new_contract_mar: "Mar",
            bdgt_new_contract_apr: "Apr",
            bdgt_new_contract_may: "May",
            bdgt_new_contract_jun: "Jun",
            bdgt_new_contract_jul: "Jul",
            bdgt_new_contract_aug: "Aug",
            bdgt_new_contract_sep: "Sep",
            bdgt_new_contract_oct: "Oct",
            bdgt_new_contract_nov: "Nov",
            bdgt_new_contract_dec: "Dec",

            // Properties Grid
            bdgt_new_contract_prop_name: "Property",
            bdgt_new_contract_chart_name: "Master Chart",
            bdgt_new_contract_allocation: "Allocation %",
            bdgt_new_contract_gl_account: "GL Account",

            bdgt_new_contract_filter_prop_name: "Filter by property name",
            bdgt_new_contract_filter_chart_name: "Filter by masterchart name",
            bdgt_new_contract_filter_allocation: "Filter by allocation %",
            bdgt_new_contract_filter_gl_account: "Filter by GL account",

            bdgt_properties_add_prop: "Add Property",
            bdgt_properties_assign_gl: "Assign GL Accounts",

            // Error Titles
            bdgt_new_contract_update_err: "Update Error",
            
            // Error Messages
            bdgt_contract_desc_required: "Add a short description",
            bdgt_contract_invalid_vendor: "Search and select from the list of vendors",
            bdgt_contract_vendor_fail: "Unable to retrieve vendors",
            
            bdgt_new_contract_new_contract_fail: "Unable to create contract",
            
            bdgt_new_contract_get_glacct_fail: "Unable to retrieve GL accounts",
            
            bdgt_new_contract_get_sched_fail: "Unable to retrieve contract schedules",
            bdgt_new_contract_new_sched_fail: "Unable to create new schedule",
            bdgt_schedule_required: "Add at least one schedule",
            bdgt_schedule_details_fail: "Unable to get the details for the schedule",
            bdgt_schedule_unavailable: "Schedule not available",

            bdgt_contract_assign_txt: "Assign",
            bdgt_contract_overwrite_text: "Overwrite Property GL Assignments",

            bdget_contract_invalid_id: "Unable to get contract",

            bdgt_properties_selection_error: "At least select one property",
            bdgt_properties_percentage_error: "Allocation percentages should match 100",
            bdgt_properties_gl_error: "Select valid GL account for all selected properties",
            bdgt_properties_tool_tip: "Add at least one property to assign a GL account",
            bdgt_properties_no_data: "Unable to get property list",

            bdgt_calculator_required_fields: "Make sure that there is a start and end date. Also, The calculator is only available if there is an active year. Please select one of the input fields to set active year.",

            bdgt_schedule_start_date_req: "Select a starting date", 
            bdgt_schedule_end_date_req: "Select an ending date",
            bdgt_schedule_invalid_dates: "Start date should be before end date",
            bdgt_schedule_amt_req: "Add an amount", 
            bdgt_schedule_countdown_req: "Select how many days before the reminder",
            bdgt_schedule_email_req: "Add a valid email for the reminder",
            bdgt_schedule_frequency_req: "Select one of the frequency options",
            bdgt_schedule_increase_val_req: "Add annual increase value",
            bdgt_schedule_increase_type_req: "Select increase type",
            bdgt_schedule_increase_basis_req: "Select increase basis",

            bdgt_schedule_invalid_float: "Use numbers and a decimal point only", 

        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();