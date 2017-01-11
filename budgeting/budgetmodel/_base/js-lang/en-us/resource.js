//  English Resource Bundle for Budget Model Details

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('BdgtModelDetails');

        bundle.set({
            bdgt_model_details_units_txt: 'Units',
            bdgt_model_details_sqft_txt: 'Sq.Ft.',
            bdgt_model_details_workflow_status_txt: 'Workflow Status',

            bdgt_model_tabs_categories_txt: 'Categories',
            bdgt_model_tabs_tasks_txt: 'Tasks',
            bdgt_model_tabs_budget_view_txt: 'Budget View',
            bdgt_model_tabs_workflow_txt: 'Workflow',
            bdgt_model_tabs_docs_txt: 'Documents',
            bdgt_model_tabs_activities_txt: 'Activities',
            bdgt_model_tabs_reports_txt: 'Reports',
            bdgt_model_tabs_budget_comments_txt: 'Comments',
            bdgt_model_tabs_budget_budget_categories_header: 'Budget Categories',

            bdgt_model_msgs_inv_param_txt: 'Invalid Parameter',
            bdgt_model_msgs_unknwn_err_txt: 'Unknown Error',
            bdgt_model_msgs_unknwn_err_desc: 'Unable to show information becasue of unknown error'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
