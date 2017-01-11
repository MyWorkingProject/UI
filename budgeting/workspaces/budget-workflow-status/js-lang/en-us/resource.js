(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('budgetWorkflowStatus');

        bundle.set({

            bdgt_budgetWorkflowStatus_PageHeaderText: 'WorkFlow Status',
            bdgt_budgetWorkflowStatus_hideFilters: 'Hide Filters',
            bdgt_budgetWorkflowStatus_showFilters: 'Show Filters',
            bdgt_budgetWorkflowStatus_moduleTitle: 'Workflows',
            bdgt_budgetWorkflowStatus_selectText: 'Select at least one model to submit the workflow',
            bdgt_budgetWorkflowStatus_selectApprvText: 'Select at least one model to approve the workflow',
            bdgt_budgetWorkflowStatus_selectRejectText: 'Select at least one model to reject the workflow',

            bdgt_budgetWorkflowStatus_fieldLabel_comments: 'Comments',
            bdgt_budgetWorkflowStatus_fieldLabel_submitText: 'Submit',
            bdgt_budgetWorkflowStatus_fieldLabel_approveText: 'Approve',
            bdgt_budgetWorkflowStatus_fieldLabel_rejectText: 'Reject',
            bdgt_budgetWorkflowStatus_fieldLabel_cancelText: 'Cancel',
            bdgt_budgetWorkflowStatus_fieldLabel_formSubmitBtnText: 'Submit',
            bdgt_budgetWorkflowStatus_fieldLabel_submitWorkflow: 'Submit Workflow',
            bdgt_budgetWorkflowStatus_fieldLabel_approveWorkflow: 'Approve Workflow',
            bdgt_budgetWorkflowStatus_fieldLabel_rejectWorkflow: 'Reject Workflow',

            bdgt_budgetWorkflowStatus_placeholder_submitComments: "Add submit comments",
            bdgt_budgetWorkflowStatus_placeholder_approveComments: "Add approve comments",
            bdgt_budgetWorkflowStatus_placeholder_rejectComments: "Add reject comments",

            bdgt_budgetWorkflowStatus_title_unknown_error: 'Unknown Error',
            bdgt_budgetWorkflowStatus_desc_unknown_error: 'Unable to perform operation due to unknown error',
            bdgt_budgetWorkflowStatus_info_unknown_error: 'Unknown Error Occurred',
            bdgt_budgetWorkflowStatus_tabLabels_inProgress: 'In Progress',
            bdgt_budgetWorkflowStatus_tabLabels_needApproval: 'Approval Needed',
            bdgt_budgetWorkflowStatus_chk_roleLevelSubmit: "Submit for all roles in this level",
            bdgt_budgetWorkflowStatus_chk_roleLevelApprove: "Approve for all roles in this level",
            bdgt_budgetWorkflowStatus_hlpText_overWriteHelp: "This will allow the users with force submit right to submit all the  in-complete workflow sequences in  the level on behalf of the users assigned to  that particular sequence.",
            bdgt_budgetWorkflowStatus_hlpText_overWriteApproveHelp: "This will allow the users with force approve right to approve all the  in-complete workflow sequences in  the level on behalf of the users assigned to  that particular sequence.",
            property:"Property",
            model:"Model",
            modelType:"Type",
            year:"Year",
            status:"Status",
            filterProperty : "Filter By Property",
            filterModelName: "Filter By Name",
            ex_getData_invalidParams_title:"Invalid Params",
            ex_getData_desc: "sequence is invalid",
            ex_getData_info:'Invalid Parameter Passed',
            ex_getData_title_unKnown_error:"Unknown Error",
            ex_getData_desc_unKnown_error:"Unable to return budget workflow status becasue of unknown error",
            ex_getData_info_unknown_error: "No records not found",
            ex_status_title_invalid_param: "Invalid Params",
            ex_status_desc_msgInvalidParam:"when BudgetStatus object is invalid",
            ex_status_info_invalid_param:'Invalid Parameter Passed',
            ex_bdgtModel_title_invalid_param:"Not Found",
            ex_bdgtModel_invalid_param:"Unable to return Budget model years becasue of no records found",
            ex_bdgtModel_info_invalid_param:"No Records Found",
            sc_workflow_submitted_msg:"Workflow sumbitted",
            sc_workflow_approved_msg:"Workflow approved",
            sc_workflow_rejected_msg:"Workflow rejected"
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
