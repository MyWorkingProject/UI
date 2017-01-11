//  English Resource Bundle for Budget Model Overview

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('actual-rent-cap');

        bundle.set({
            cap_method_text:'Cap Method',
            save_btn_text:'Save',
            actual_rent_cap_unittype:"Unit Type",
            actual_rent_cap_avg_market:"Avg Mkt Rent",
            actual_rent_cap_amount:"Cap Amount",
            actual_rent_cap_get_invalid_param_error:"Invalid parameters are passed, unable to get data",
            actual_rent_cap_get_no_data_error:"No data was found",
            actual_rent_cap_put_invalid_param_error:"Unable to save the actual rent cap method",
            actual_rent_cap_save_succ_msg:"Actual rent cap data saved.",
            actual_rent_cap_save_err_msg:"Unable to save Actual rent cap data.",
            cap_header: "Manage Actual Rent Cap",
            cap_popUp_header:"Actual rent get zero out",
            cap_popUp_desc:"Set value is zero for the unit types. It will zero out the budgeted actual rent for the units mapped to the unit types.",
            cap_popUp_confirm:"What do you want to do?",
            cap_popUp_cancel:"Cancel",
            cap_popUp_contnue:"Continue"
           
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
