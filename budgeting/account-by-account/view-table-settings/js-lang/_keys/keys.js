

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            'bdget_accByAcc_table_settings',
            'bdget_accByAcc_hideZeroRows',
            'bdget_accByAcc_hasRefData',
            'bdget_accByAcc_smallRows',
            'bdget_accByAcc_largeRows',
            'bdget_accByAcc_colOptions', 
            'bdget_accByAcc_Summary',
            'bdget_accByAcc_quaterly',
            'bdget_accByAcc_monthly',
            'bdget_accByAcc_rowOptions',
            'bdget_accByAcc_refresh',
            'bdget_accByAcc_Apply',
            'bdget_accByAcc_cancel'
     
    
        ];

        appLangKeys.app('account-by-account-table-view').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
