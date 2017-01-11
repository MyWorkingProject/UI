(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            
            // Vendor Form
            "bdgt_new_contract_vendor_lbl_number",
            "bdgt_new_contract_vendor_lbl_name",
            "bdgt_new_contract_vendor_lbl_state",
            "bdgt_new_contract_vendor_lbl_status",
            "bdgt_new_contract_vendor_lbl_save",
            "bdgt_new_contract_vendor_lbl_cancel",


            // Error Messages
            "bdgt_contract_new_vendor_vendorNumber_required",
            "bdgt_contract_new_vendor_vendorNumber_invalid",
            "bdgt_contract_new_vendor_vendorName_required",
            "bdgt_contract_new_vendor_vendorName_invalid",
            "bdgt_contract_new_vendor_vendorStatus_required",
            "bdgt_contract_new_vendor_data_duplicate",
            "bdgt_contract_new_vendor_states_error",

            //Success Messages
            "bdgt_contract_new_vendor_data_success",

        ];

        appLangKeys.app("vendorForm").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
