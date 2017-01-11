//  Configure App Language Keys

(function() {
    "use strict";

    function config(appLangKeys) {
        var keys = [            
            'bdgt_recall_dist_allocations_page_Heading',
            'bdgt_recall_dist_allocations_page_History',
            'bdgt_recall_dist_allocations_btn_Recall',
            'bdgt_recall_dist_allocations_btn_Cancel',
            'bdgt_recall_dist_allocations_alert_Title',
            'bdgt_recall_dist_allocations_alert_Message',
            'bdgt_recall_dist_allocations_alert_Ok',
            'btgt_recall_dist_allocations_col_distributedAs',
            'btgt_recall_dist_allocations_col_totalAmount',
            'btgt_recall_dist_allocations_col_modelDistributedTo',
            'btgt_recall_dist_allocations_col_distributedBy',
            'btgt_recall_dist_allocations_col_distributedOn',
            'btgt_recall_dist_allocations_success_Message',
        ];

        appLangKeys.app('allocations.recall-dist-allocations').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
