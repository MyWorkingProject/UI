//  English Resource Bundle for MoveinsNotReady

(function() {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('allocations.recall-dist-allocations');

        bundle.set({
            bdgt_recall_dist_allocations_page_Heading: 'Recall Distributed Allocation',
            bdgt_recall_dist_allocations_page_History: 'Allocation Distribution History',
            bdgt_recall_dist_allocations_btn_Recall: 'Recall',
            bdgt_recall_dist_allocations_btn_Cancel: 'Cancel',
            bdgt_recall_dist_allocations_alert_Title: 'Recall Distribution',
            bdgt_recall_dist_allocations_alert_Message: 'Recalling a distributed allocation will affect the properties assigned to the allocation. Are you sure?',
            bdgt_recall_dist_allocations_alert_Ok: 'OK',
            btgt_recall_dist_allocations_col_distributedAs: 'Distributed As',
            btgt_recall_dist_allocations_col_totalAmount: 'Total Amount',
            btgt_recall_dist_allocations_col_modelDistributedTo: 'Model Distributed To',
            btgt_recall_dist_allocations_col_distributedBy: 'Distributed By',
            btgt_recall_dist_allocations_col_distributedOn: 'Distributed On',
            btgt_recall_dist_allocations_success_Message: 'Alloction recalled successfully',
        });

        bundle.test();
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
