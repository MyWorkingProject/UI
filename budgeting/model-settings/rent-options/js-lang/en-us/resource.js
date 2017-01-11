//  English Resource Bundle for Model Settings - Rent Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('RentOptions');

        bundle.set({
            mr_page_title: "Rent Options",
            mr_body_title: "Market Rent",
            mr_method: "Market Rent Method",
            mr_option_none: "None",
            mr_option_unit: "Unit",
            mr_option_unit_type: "Unit Type",
            mr_option_unit_Program: "Unit Type Program",
            mr_option_unit_service_Group: "Unit Type Service Group",
            mr_market_rent_GL:"Market Rent GL",
            mr_body_actual_rent:"Actual Rent",
            mr_actual_rent_method:"Actual Rent Method",
            mr_actual_rent_GL:"Actual Rent GL",
            mr_body_loss_gain_lease:"Loss or Gain to Lease",
            mr_loss_gain_lease_method:"Loss/Gain to Lease Method",
            mr_loss_gain_lease:"Loss to Lease GL",
            mr_gain_loss_lease:"Gain to Lease GL",
            mr_options_save: "Save",
            mr_options_cancel: "Cancel",
            mr_options_edit: "Edit",
            mr_total_Percent:"% of Total",
            mr_ex_invalid_param:"RentOptionModel object is invalid",
            mr_ex_loss_lease_req:"Either of the Loss or Gain to Lease GL is required",
            mr_ex_market_gl_req:"Market Rent GL is required",
            mr_ex_Actual_gl_req:"Actual Rent GL is required",
            mr_ex_invalid_mr_Percentage:"Total Percentage of Market Rent GL's Should be 100 %",
            mr_ex_invalid_ar_Percentage:"Total Percentage of Actual Rent GL's Should be 100 %",
            mr_add_GL:"Add GL",
            EMPTY_BothGL:"",
            mr_ex_either_gl_req: "Either Market Rent/ Actual Rent GL is required",
            mr_loss_gain_sg: "Loss/Gain to Lease GL",
            mr_helptext: "Can split market rent by entering the total percent and assign GL account for the respective postings."

           

           
            
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
