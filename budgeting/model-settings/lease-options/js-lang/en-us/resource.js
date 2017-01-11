//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('LeaseOptions');

        bundle.set({
            lease_options_page_title: "Lease Renewal Options",
            lease_options_lease_renewal_method: "Lease Renewal Method",
            lease_options_use_reference_data: "Use Reference Data",
            lease_options_assumptions: "Assumptions",
            lease_options_market_rent_move_in: "Market Rent Move-In %",
            lease_options_lease_term: "Lease Term",
            lease_options_market_rent_lease_renewal: "Market Rent Lease Renewal %",
            lease_options_lease_renewal: "Lease Renewal %",
            lease_options_mtm_renewal: "MTM Renewal %",
            lease_options_mtm_lease_market_rent: "MTM Lease at Market Rent",
            lease_options_show_reference_data: "Show Reference Data",
            lease_options_open_period_reference_data: "Open Period Reference Data",

            lease_options_save: "Save",
            lease_options_cancel: "Cancel",
            lease_options_edit: "Edit",
            
            lease_options_market_rent_move_in_tool_tip:"This is the percentage of market rent new move-ins are leased. The percentage entered should be the average of all move-ins. If all move-ins are leased at market rent, this percentage will be 100% otherwise, it will be a lesser figure",
            lease_options_market_rent_lease_renewal_tool_tip:"This is the percentage of market rent lease renewals are leased. The percentage entered should be the average of all lease renewals. When a renewal lease is signed, what is the average rent rate compared to market rent?  If all renewals are leased at market rent, this percentage will be 100% otherwise, it will be a lesser figure.",
            lease_options_open_period_tool_tip:"Selected data will be loaded in to the open periods if any on lease renewals worksheet",

            lease_options_get_msgs_inv_param_txt:"Invalid data is passed, unable to get the lease details of the property.",
            lease_options_get_msgs_unknwn_err_desc:"Error occurred while retreiving the lease details of the property.",
            lease_options_put_msgs_inv_param_txt:"Invalid data is passed, unable to save the lease details of the property.",
            lease_options_save__succ_msg_txt:"Lease options data saved successfully."

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
