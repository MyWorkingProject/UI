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
            bdgt_recall_dist_allocations_alert_TemplateUrl: 'app/common/templates/recall-finalize-confirm.html',
            bdgt_recall_dist_allocations_alert_Message: 'Recalling a distributed allocation will affect the properties assigned to the allocation.',
            bdgt_recall_dist_allocations_alert_confirmMessage: 'Are you sure?',
            bdgt_recall_allocations_finalize_alert_Title: 'Cannot Recall Distribution',
            bdgt_recall_allocations_finalize_alert_Message: ' budget(s) for the selected distribution is Finalized.   Distributed allocation will not be recalled for that property.',
            bdgt_recall_allocations_finalize_alert_confirmMessage: 'What do you want to do?',
            bdgt_recall_dist_allocations_alert_Ok: 'Recall',
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
