(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("vendorForm");

        bundle.set({
            // Vendor Form
            bdgt_new_contract_vendor_lbl_number: "Number",
            bdgt_new_contract_vendor_lbl_name: "Name",
            bdgt_new_contract_vendor_lbl_state: "State",
            bdgt_new_contract_vendor_lbl_status: "Status",
            bdgt_new_contract_vendor_lbl_save: "Save",
            bdgt_new_contract_vendor_lbl_cancel: "Cancel",
            

            // Error Messages
            bdgt_contract_new_vendor_vendorNumber_required: "Vendor Number is required",
            bdgt_contract_new_vendor_vendorNumber_invalid: "Vendor Number should not exceed the 30 characters",
            bdgt_contract_new_vendor_vendorName_required: "Vendor Name is required",
            bdgt_contract_new_vendor_vendorName_invalid: "Vendor Name should not exceed the 255 characters",
            bdgt_contract_new_vendor_vendorStatus_required: "Vendor status is required",
            bdgt_contract_new_vendor_data_duplicate: "Duplicate Vendor An active vendor with the same number already esists.",
            bdgt_contract_new_vendor_states_error: "Error occured. Unable to load the states",
            //Success Messages
            bdgt_contract_new_vendor_data_success: "Record saved succesfully",
        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();