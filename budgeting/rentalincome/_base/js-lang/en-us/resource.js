//  English Resource Bundle for Budget Model Overview

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('rental-income');

        bundle.set({
            bdgt_rental_mr_lable:'Market Rent',
            bdgt_rental_ar_lable:'Actual Rent',
            bdgt_rental_lable:'Rental Income',
            bdgt_rental_by_lable:'by',
            bdgt_rental_mr_changes_header:"Changes will be lost",
            bdgt_rental_mr_changes_desc:"Click 'Close' to discard any changes, Click 'Cancel' to continue the working in the ",
            bdgt_rental_mr_changes_ok:"Close",
            bdgt_rental_mr_refresh_cancel : "Cancel"   
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
