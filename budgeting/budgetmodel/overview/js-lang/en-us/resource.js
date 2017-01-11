//  English Resource Bundle for Budget Model Overview

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('BdgtModelOverview');

        bundle.set({
            bdgt_model_overview_heading:'Budget Categories',
            bdgt_model_overview_Forecast_heading:'Forecast Categories',
            bdgt_model_overview_Proforma_heading:'Proforma Categories',
            bdgt_model_overview_submit_txt:'Submit',
            bdgt_model_overview_approve_txt:'Approve',
            bdgt_model_overview_reject_txt:'Reject',
            bdgt_model_overview_workflow_txt:'Workflow',
            bdgt_model_overview_comments_txt:'Comment',
            bdgt_model_overview_cancel_txt:'Cancel',
            bdgt_model_overview_add_submit_comments_txt:'Add submit comment',
            bdgt_model_overview_add_approve_comments_txt:'Add approve comment',
            bdgt_model_overview_add_reject_comments_txt: 'Add reject comment',
            bdgt_model_overview_settings_text: 'Budget Settings & Assumptions',
            bdgt_model_overview_Forecast_settings_text: 'Forecast Settings & Assumptions',
            bdgt_model_overview_Proforma_settings_text: 'Proforma Settings & Assumptions',
            currency_symbol: '$'

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
