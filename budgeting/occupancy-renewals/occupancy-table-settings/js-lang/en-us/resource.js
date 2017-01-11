
(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('occupancy-table-settings');

        bundle.set({
          
            bdget_occupancy_table_settings:"Table Settings",            
            bdget_occupancy_showRefData: "Show Referace Data",
            bdget_occupancy_smallRows:"Smaller Rows",
            bdget_occupancy_largeRows:"Larger Rows",
            bdget_occupancy_colOptions:"Column Options",           
            bdget_occupancy_rowOptions:"Row Options",           
            bdget_occupancy_Apply:"Apply",
            bdget_occupancy_cancel:"Cancel"
            
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
