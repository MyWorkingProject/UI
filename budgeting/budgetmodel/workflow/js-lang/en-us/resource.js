//  English Resource Bundle for Budget Model Workflow

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('BdgtModelWorkflow');

        bundle.set({
            bdgt_model_workflow_header: 'Workflow Status',
            bdgt_model_workflow_due: 'Due',
            bdgt_model_workflow_date: 'Date',
            bdgt_model_workflow_by: 'By',
            bdgt_model_workflow_sections: 'Sections',
            bdgt_model_workflow_users: 'Users',
            bdgt_model_workflow_show_details: 'View details',
            bdgt_model_workflow_hide_details: 'Hide details'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
