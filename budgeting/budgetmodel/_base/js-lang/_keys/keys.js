//  Configure App Language Keys for Budget Model Details

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
           'bdgt_model_details_units_txt',
           'bdgt_model_details_sqft_txt',
           'bdgt_model_details_workflow_status_txt',

           'bdgt_model_tabs_categories_txt',
           'bdgt_model_tabs_tasks_txt',
           'bdgt_model_tabs_budget_view_txt',
           'bdgt_model_tabs_workflow_txt',
           'bdgt_model_tabs_docs_txt',
           'bdgt_model_tabs_activities_txt',
           'bdgt_model_tabs_reports_txt',
           'bdgt_model_tabs_budget_comments_txt',
           'bdgt_model_tabs_budget_budget_categories_header',

           'bdgt_model_msgs_inv_param_txt',
           'bdgt_model_msgs_unknwn_err_txt',
           'bdgt_model_msgs_unknwn_err_desc'
        ];

        appLangKeys.app('BdgtModelDetails').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
