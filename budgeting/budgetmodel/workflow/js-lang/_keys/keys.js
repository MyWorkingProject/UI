//  Configure App Language Keys for Budget Model Details

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_model_workflow_header',
            'bdgt_model_workflow_due',
            'bdgt_model_workflow_date',
            'bdgt_model_workflow_by',
            'bdgt_model_workflow_sections',
            'bdgt_model_workflow_users',
            'bdgt_model_workflow_show_details',
            'bdgt_model_workflow_hide_details'
        ];

        appLangKeys.app('BdgtModelWorkflow').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
