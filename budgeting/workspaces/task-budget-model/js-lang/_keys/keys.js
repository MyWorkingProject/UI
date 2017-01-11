(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_cmpny_taskBudgetModel_header',
            'bdgt_taskBudgetModel_workspace',
            'bdgt_taskBudgetModel_task',
            'bdgt_taskBudgetModel_pageHeading',

            //Headers

            'bdgt_taskBudgetModel_grdBudgetYearText',
            'bdgt_taskBudgetModel_grdModelTypeText',
            'bdgt_taskBudgetModel_grdAssetTypeText',
            'bdgt_taskBudgetModel_grdNameText',
            'bdgt_taskBudgetModel_saveBtnText',

            //Filters

            'bdgt_taskBudgetModel_showfilterText',
            'bdgt_taskBudgetModel_hidefilterText',
            'bdgt_taskBudgetModel_filterBudgetYearText',
            'bdgt_taskBudgetModel_filterModelTypeText',
            'bdgt_taskBudgetModel_filterAssetTypeText',
            'bdgt_taskBudgetModel_filternameText',
            'bdgt_taskBudgetModel_assignAllChkText'
        ];

        appLangKeys.app('taskBudgetModel').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
