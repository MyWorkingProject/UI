//  English Resource Bundle for MoveinsNotReady

(function() {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('allocations.distributed-allocations');

        bundle.set({
            bdgt_allocation_page_Headings: 'Distributed Allocations',
            bdgt_allocation_Model_Type: 'Model Type',
            bdgt_allocation_Model_Year: 'Model Year',
            bdgt_allocation_Comment: 'Comment',
            bdgt_allocation_Save: 'Save',
            bdgt_allocation_Cancel: 'Cancel',
            bdgt_allocation_Distribute: 'Distribute'
          
        });

        bundle.test();
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
