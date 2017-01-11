(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            'bdgt_budgetWorkflowStatus_PageHeaderText',
            'bdgt_budgetWorkflowStatus_hideFilters',
            'bdgt_budgetWorkflowStatus_showFilters',
            'bdgt_budgetWorkflowStatus_fieldLabel_comments',
            'bdgt_budgetWorkflowStatus_fieldLabel_submitText',
            'bdgt_budgetWorkflowStatus_fieldLabel_approveText',
            'bdgt_budgetWorkflowStatus_fieldLabel_rejectText',
            'bdgt_budgetWorkflowStatus_fieldLabel_cancelText',
            'bdgt_budgetWorkflowStatus_fieldLabel_formSubmitBtnText',
            'bdgt_budgetWorkflowStatus_fieldLabel_submitWorkflow',
            'bdgt_budgetWorkflowStatus_hlpText_overWriteApproveHelp',

            //Placeholders

            'bdgt_budgetWorkflowStatus_placeholder_submitComments',
            'bdgt_budgetWorkflowStatus_title_unknown_error',
            'bdgt_budgetWorkflowStatus_desc_unknown_error',
            'bdgt_budgetWorkflowStatus_info_unknown_error',
            'bdgt_budgetWorkflowStatus_tabLabels_inProgress',
            'bdgt_budgetWorkflowStatus_tabLabels_needApproval',

            'bdgt_budgetWorkflowStatus_chk_roleLevelSubmit',
            'bdgt_budgetWorkflowStatus_chk_roleLevelApprove',
            'bdgt_budgetWorkflowStatus_hlpText_overWriteHelp',

            'bdgt_budgetWorkflowStatus_fieldLabel_approveWorkflow',
            'bdgt_budgetWorkflowStatus_fieldLabel_rejectWorkflow',
            'bdgt_budgetWorkflowStatus_placeholder_approveComments',
            'bdgt_budgetWorkflowStatus_placeholder_rejectComments',
            'bdgt_budgetWorkflowStatus_moduleTitle',
            'bdgt_budgetWorkflowStatus_selectText',
            'property',
            'model',
            'modelType',
            'year',
            'status',
            'filterProperty',
            'filterModelName',
            'ex_getData_invalidParams_title',
            'ex_getData_desc',
            'ex_getData_info',
            'ex_getData_title_unKnown_error',
            'ex_getData_desc_unKnown_error',
            'ex_getData_info_unknown_error',
            'ex_status_title_invalid_param',
            'ex_status_desc_msgInvalidParam',
            'ex_status_info_invalid_param',
            'ex_bdgtModel_title_invalid_param',
            'ex_bdgtModel_invalid_param',
            'ex_bdgtModel_info_invalid_param',

            'bdgt_budgetWorkflowStatus_selectApprvText',
            'bdgt_budgetWorkflowStatus_selectRejectText',

            'sc_workflow_submitted_msg',
            'sc_workflow_approved_msg',
            'sc_workflow_rejected_msg'

        ];

        appLangKeys.app('contracts').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
