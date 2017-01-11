(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_cmpny_taskBudgetUser_header',
            'bdgt_taskBudgetUser_workspace',
            'bdgt_taskBudgetUser_task',
            'bdgt_taskBudgetUser_pageHeading',

            //Headers

            'bdgt_taskBudgetUser_grdUserNameText',
            'bdgt_taskBudgetUser_grdRoleText',
            'bdgt_taskBudgetUser_grdEmailAddrsText',
            'bdgt_taskBudgetUser_grdPhoneText',
            'bdgt_taskBudgetUser_saveBtnText',

            //Filters

            'bdgt_taskBudgetUser_showfilterText',
            'bdgt_taskBudgetUser_hidefilterText',
            'bdgt_taskBudgetUser_filterUserNameText',
            'bdgt_taskBudgetUser_filterUserRoleText',
            'bdgt_taskBudgetUser_assignAllChkText'
        ];

        appLangKeys.app('taskBudgetUser').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
