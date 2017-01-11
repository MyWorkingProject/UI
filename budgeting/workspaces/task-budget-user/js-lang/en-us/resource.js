(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('taskBudgetUser');

        bundle.set({
            bdgt_cmpny_taskBudgetUser_header: 'OneSite Settings',
            bdgt_taskBudgetUser_workspace: 'Manage Chart Of Accounts',
            bdgt_taskBudgetUser_task: 'New Chart',
            bdgt_taskBudgetUser_pageHeading: 'Select Users',
            bdgt_taskBudgetUser_grdUserNameText: 'Name',
            bdgt_taskBudgetUser_grdRoleText: 'Role',
            bdgt_taskBudgetUser_grdEmailAddrsText: "Email Address",
            bdgt_taskBudgetUser_grdPhoneText: "Phone",
            bdgt_taskBudgetUser_saveBtnText: 'Save',
            bdgt_taskBudgetUser_showfilterText: 'Show filters',
            bdgt_taskBudgetUser_hidefilterText: 'Hide filters',
            bdgt_taskBudgetUser_filterUserNameText: 'Name',
            bdgt_taskBudgetUser_filterUserRoleText: 'Role',
            bdgt_taskBudgetUser_assignAllChkText: 'Assign All Users for the Task'

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
