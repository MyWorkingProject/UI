//  Configure App Language Keys

(function() {
    "use strict";

    function config(appLangKeys) {
        var keys = [            
            //'action',
            //'Name',
            //'LastModified',
            'page_Headings',
        ];

        appLangKeys.app('allocations').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
