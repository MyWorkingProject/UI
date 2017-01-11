//  Configure App Language Keys

(function() {
    "use strict";

    function config(appLangKeys) {
        var keys = [            
            'bdgt_allocation_page_Headings',
            'bdgt_allocation_Model_Type',
            'bdgt_allocation_Model_Year',
            'bdgt_allocation_Comment',
            'bdgt_allocation_Save',
            'bdgt_allocation_Cancel',
            'bdgt_allocation_Distribute'
        ];

        appLangKeys.app('allocations.distributed-allocations').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
