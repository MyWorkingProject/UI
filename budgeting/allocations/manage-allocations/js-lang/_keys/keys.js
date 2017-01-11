//  Configure App Language Keys

(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_allocation_new_allocation',
            'bdgt_allocation_page_Headings',

            //grid actions

            'rpView',
            'rpEdit',
            'rpRecall',
            'rpDistribute',
            'rpCopy',
            'rpDelete',
            'rpViewHistory',

            //Grid Filters
            'action',
            'plName',
            'pllastDistributedBy',
            'plDescription',

            //Alert Popup Messages
            'bdgt_allocation_alertpopupTitleInfo',
            'bdgt_allocation_alertpopupMessageInfo',
            'bdgt_allocation_alertpopupBtnInfo'

        ];

        appLangKeys.app('allocations.manage-allocations').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
