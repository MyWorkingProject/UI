(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('taskBudgetModel');

        bundle.set({
            bdgt_cmpny_taskBudgetModel_header: 'OneSite Settings',
            bdgt_taskBudgetModel_workspace: 'Manage Chart Of Accounts',
            bdgt_taskBudgetModel_task: 'New Chart',
            bdgt_taskBudgetModel_pageHeading: 'Select Models',
            bdgt_taskBudgetModel_grdBudgetYearText: 'Year',
            bdgt_taskBudgetModel_grdModelTypeText: 'Model Type',
            bdgt_taskBudgetModel_grdAssetTypeText: "Asset Type",
            bdgt_taskBudgetModel_grdNameText: "Name",
            bdgt_taskBudgetModel_saveBtnText: 'Save',
            bdgt_taskBudgetModel_showfilterText: 'Show filters',
            bdgt_taskBudgetModel_hidefilterText: 'Hide filters',
            bdgt_taskBudgetModel_filterBudgetYearText: 'Budget year',
            bdgt_taskBudgetModel_filterModelTypeText: 'Model type',
            bdgt_taskBudgetModel_filterAssetTypeText: 'Asset type',
            bdgt_taskBudgetModel_filternameText: 'name',
            bdgt_taskBudgetModel_assignAllChkText: 'Assign All Models for the Task'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
