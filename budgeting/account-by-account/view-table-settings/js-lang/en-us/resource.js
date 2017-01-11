//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('account-by-account-table-view');

        bundle.set({
          
            bdget_accByAcc_table_settings:"Table Settings",
            bdget_accByAcc_hideZeroRows:"Hide zero rows",
            bdget_accByAcc_hasRefData:"Has Referace Data",
            bdget_accByAcc_smallRows:"Smaller Rows",
            bdget_accByAcc_largeRows:"Larger Rows",
            bdget_accByAcc_colOptions:"Column Options", 
            bdget_accByAcc_Summary:"Summary View",
            bdget_accByAcc_quaterly:"Quarterly View",
            bdget_accByAcc_monthly:"Monthly View",
            bdget_accByAcc_rowOptions:"Row Options",
            bdget_accByAcc_refresh:"Refresh",
            bdget_accByAcc_Apply:"Apply",
            bdget_accByAcc_cancel:"Cancel"
            
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
