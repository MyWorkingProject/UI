// Recall Distributed Allocations content
(function (angular) {
    'use strict';
    function factory(langTranslate) {
        var translate = langTranslate('allocations.recall-dist-allocations').translate,
         model = {
             pageHeading: translate('bdgt_recall_dist_allocations_page_Heading'),
             HistoryHeading: translate('bdgt_recall_dist_allocations_page_History'),
             Recall: translate('bdgt_recall_dist_allocations_btn_Recall'), 
             Cancel: translate('bdgt_recall_dist_allocations_btn_Cancel'),
             AlertTemplareUrl: translate('bdgt_recall_dist_allocations_alert_TemplateUrl'),
             AlertTitle: translate('bdgt_recall_dist_allocations_alert_Title'),
             AlertMessage: translate('bdgt_recall_dist_allocations_alert_Message'),
             AlertConfirmMessage: translate('bdgt_recall_dist_allocations_alert_confirmMessage'),
             AlertOK: translate('bdgt_recall_dist_allocations_alert_Ok'),
             FinalizeAlertTitle: translate('bdgt_recall_allocations_finalize_alert_Title'),
             FinalizeAlertMessage: translate('bdgt_recall_allocations_finalize_alert_Message'),
             FinalizeConfirmMessage: translate('bdgt_recall_allocations_finalize_alert_confirmMessage'),
             DistributedAs: translate('btgt_recall_dist_allocations_col_distributedAs'),
             TotalAmount: translate('btgt_recall_dist_allocations_col_totalAmount'),
             ModelDistributedTo: translate('btgt_recall_dist_allocations_col_modelDistributedTo'),
             DistributedBy: translate('btgt_recall_dist_allocations_col_distributedBy'),
             DistributedOn: translate('btgt_recall_dist_allocations_col_distributedOn'),
             SuccessMessage: translate('btgt_recall_dist_allocations_success_Message'),
         };
        return model;
    }
    angular.module('budgeting').
            factory('recallDistAllocationsContent', ['appLangTranslate', factory]);
})(angular);