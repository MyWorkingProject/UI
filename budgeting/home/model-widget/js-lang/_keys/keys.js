//  Configure App Language Keys

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'actions_view',
            'actions_SummaryReport',
            'actions_detailReport',
            'actions_workflowStatus'


        ];

        appLangKeys.app('modelWidget').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
