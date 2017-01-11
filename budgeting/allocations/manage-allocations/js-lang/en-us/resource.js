//  English Resource Bundle for MoveinsNotReady

(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('allocations.manage-allocations');

        bundle.set({

            //--> Translating Manage Allocations HEADER
            bdgt_allocation_new_allocation: 'New Allocation',
            bdgt_allocation_page_Headings: 'Allocations',
            // Translating Manage Allocations header <--


            //--> Translating Manage Allocations GRID Menu Actions
            rpView: 'View',
            rpEdit: 'Edit',
            rpRecall: 'Recall',
            rpDistribute: 'Distribute',
            rpCopy: 'Copy',
            rpDelete: 'Delete',
            rpViewHistory: 'View History',
            //Translating Manage Allocations GRID Menu Actions <--

            //Grid Filters
            action: '',
            plName: 'Filter By Name',
            pllastDistributedBy: 'Filter By Modifier',
            plDescription: 'Comments',

            //Alert Popup Messages
            bdgt_allocation_alertpopupTitleInfo: 'Cannot Delete Allocation',
            bdgt_allocation_alertpopupMessageInfo: 'You cannot delete an allocation already distributed to the properties.',
            bdgt_allocation_alertpopupBtnInfo: 'Cancel'
        });

        bundle.test();
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
