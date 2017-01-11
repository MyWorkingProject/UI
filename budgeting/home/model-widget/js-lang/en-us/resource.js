

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('modelWidget');

        bundle.set({

            actions_view:"View",
            actions_SummaryReport:"Summary Report",
            actions_detailReport:"Detail Report",
            actions_workflowStatus:"Workflow Status"

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
