//  Configure App Language Keys for Budget Model overview

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
           'bdgt_model_overview_heading',
           'bdgt_model_overview_submit_txt',
           'bdgt_model_overview_approve_txt',
           'bdgt_model_overview_reject_txt',
           'bdgt_model_overview_workflow_txt',
           'bdgt_model_overview_comments_txt',
           'bdgt_model_overview_cancel_txt',
           'bdgt_model_overview_add_submit_comments_txt',
           'bdgt_model_overview_add_approve_comments_txt',
           'bdgt_model_overview_add_reject_comments_txt',
           'bdgt_model_overview_settings_text',
           'bdgt_model_overview_Forecast_heading',
           'bdgt_model_overview_Proforma_heading',
           'bdgt_model_overview_Forecast_settings_text',
           'bdgt_model_overview_Proforma_settings_text',
           'currency_symbol'

        ];

        appLangKeys.app('BdgtModelOverview').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
