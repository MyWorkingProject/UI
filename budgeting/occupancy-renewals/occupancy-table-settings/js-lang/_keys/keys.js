

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            'bdget_occupancy_table_settings',         
            'bdget_occupancy_showRefData',
            'bdget_occupancy_smallRows',
            'bdget_occupancy_largeRows',
            'bdget_occupancy_colOptions',          
            'bdget_occupancy_rowOptions',           
            'bdget_occupancy_Apply',
            'bdget_occupancy_cancel'
     
    
        ];

        appLangKeys.app('occupancy-table-settings').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
