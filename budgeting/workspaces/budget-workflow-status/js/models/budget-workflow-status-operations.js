//  Users List Model

(function (angular) {
    'use strict';

    function factory(budgetWorkflowStatusSvc, exception, langTranslate,grid,bwsModel,workflowNotify) {

        var model;
        var translate = langTranslate('budgetWorkflowStatus').translate;
        model = {};

        model.fieldLabel = {
            comments: translate('bdgt_budgetWorkflowStatus_fieldLabel_comments'),
            submitText: translate('bdgt_budgetWorkflowStatus_fieldLabel_submitText'),
            approveText: translate('bdgt_budgetWorkflowStatus_fieldLabel_approveText'),
            rejectText: translate('bdgt_budgetWorkflowStatus_fieldLabel_rejectText'),
            cancelText: translate('bdgt_budgetWorkflowStatus_fieldLabel_cancelText'),
            formSubmitBtnText: translate('bdgt_budgetWorkflowStatus_fieldLabel_formSubmitBtnText'),
            submitWorkflow: translate('bdgt_budgetWorkflowStatus_fieldLabel_submitWorkflow'),
            roleLevelSubmit: translate('bdgt_budgetWorkflowStatus_chk_roleLevelSubmit'),
            roleLevelApprove: translate('bdgt_budgetWorkflowStatus_chk_roleLevelApprove'),
            overWriteHelp: translate('bdgt_budgetWorkflowStatus_hlpText_overWriteHelp')
        };        

        model.placeholder = {
            submitComments: translate('bdgt_budgetWorkflowStatus_placeholder_submitComments')
        };

        model.emptyData = {           
            chkRoleStatus: false,
            comments: "",         
            chkRoleText: "",
            showHelpIcon: true,
            showChkBoxRow: true, 
            slideCommentsForm: {
                state: {
                    open: false
                }
            },
            infoToolTip: false
        };

        model.form = angular.extend({}, model.emptyData);

        model.updateWorkflowFormControls = function (action) {
            if (action === 'Approve') {
                model.approveWorkflowFields();
            }
            else if (action === 'Reject') {
                model.rejectWorkflowFields();
            }
            else if (action === 'Submit') {
                model.updateSubmitWorkflowFields();
            }
        };

        model.approveWorkflowFields = function () {
            model.fieldLabel.submitWorkflow = translate('bdgt_budgetWorkflowStatus_fieldLabel_approveWorkflow');
            model.fieldLabel.formSubmitBtnText = translate('bdgt_budgetWorkflowStatus_fieldLabel_approveText');
            model.fieldLabel.overWriteHelp = translate('bdgt_budgetWorkflowStatus_hlpText_overWriteApproveHelp');
            model.form.chkRoleText = translate('bdgt_budgetWorkflowStatus_chk_roleLevelApprove');
            model.placeholder.submitComments = translate('bdgt_budgetWorkflowStatus_placeholder_approveComments');
            model.form.showChkBoxRow = true;
            model.form.showHelpIcon = false;
        };

        model.rejectWorkflowFields = function () {
            model.fieldLabel.submitWorkflow = translate('bdgt_budgetWorkflowStatus_fieldLabel_rejectWorkflow');
            model.fieldLabel.formSubmitBtnText = translate('bdgt_budgetWorkflowStatus_fieldLabel_rejectText');
            model.placeholder.submitComments = translate('bdgt_budgetWorkflowStatus_placeholder_rejectComments');
            model.form.showChkBoxRow = false;
        };

        model.updateSubmitWorkflowFields = function () {
            model.fieldLabel.submitWorkflow = translate('bdgt_budgetWorkflowStatus_fieldLabel_submitWorkflow');
            model.fieldLabel.formSubmitBtnText = translate('bdgt_budgetWorkflowStatus_fieldLabel_submitText');
            model.fieldLabel.overWriteHelp = translate('bdgt_budgetWorkflowStatus_hlpText_overWriteHelp');
            model.placeholder.submitComments = translate('bdgt_budgetWorkflowStatus_placeholder_submitComments');
            model.form.chkRoleText = translate('bdgt_budgetWorkflowStatus_chk_roleLevelSubmit');
            model.form.showChkBoxRow = true;
            model.form.showHelpIcon = true;
        };

        model.showForm = function (btnText) {
            bwsModel.showHideToolTipAlertlert(false);
            bwsModel.showHideForm(true);
            model.updateWorkflowFormControls(btnText);
        };


        model.updateStatus = function (data) {
            var PostData;
            PostData = model.buildData(data);
            model.updateWorkflowStatus(PostData).then(model.onSuccess, exception.showBgtStatusException);
        };

        model.buildData = function (data) {
            var status = model.returnStatusField();
            var postData = model.buildPostData(data, status);
            return postData;
        };

        model.updateWorkflowStatus = function (data) {
            return budgetWorkflowStatusSvc.updateWorkflowStatus(data).$promise;
        };

        model.onSuccess = function () {
            workflowNotify.showSuccessNotification(model.getSuccMsg(model.returnStatusField()));
            bwsModel.updateSlideCommentsFlag(false);
            bwsModel.reset();
            model.reset();
            grid.load();
        };

        model.returnStatusField = function () {
            var status = "";
            if (model.fieldLabel.formSubmitBtnText === "Submit") {
                status = "Submitted";
            }
            else if (model.fieldLabel.formSubmitBtnText === "Approve") {
                status = "Approved";
            }
            else if (model.fieldLabel.formSubmitBtnText === "Reject") {
                status = "Rejected";
            }
            return status;
        };

        model.getSuccMsg = function(msgType){
            var msg;
            if (msgType === "Submitted") {
                msg = translate('sc_workflow_submitted_msg');
            }
            else if (msgType === "Approved") {
                msg = translate('sc_workflow_approved_msg');
            }
            else if (msgType === "Rejected") {
                msg = translate('sc_workflow_rejected_msg');
            }
            return msg;
       };

        model.buildPostData = function (data, status) {
            var PostData=[];
            angular.forEach(data, function (item) {
                var dataToPost = {
                    "distributedID": item.distributedID,
                    "budgetWorkFlowID": item.budgetWorkFlowID,
                    "comment": model.form.comments,
                    "status": status,
                    "sequenceLevel": item.currentSequence,
                    "approveAll":model.form.chkRoleStatus,
                    "budgetWorkFlowIDs":""
                };
                PostData.push(dataToPost);
            });

            return PostData;
        };


        model.showModelHelpInfo = function () {
            model.setHelpInfo(true);
        };

        model.setHelpInfo = function (flag) {
            model.form.infoToolTip = flag;
        };

        model.getHelpInfoToolTip = function () {
            return model.form.infoToolTip;
        };

        model.reset = function () {
            model.form = angular.extend({}, model.emptyData);
        };

        model.clearControls = function () {
            model.form.chkRoleStatus = false;
            model.form.comments = "";
        };

        return model;
    }

    angular
        .module('budgeting')
        .factory('budgetWorkflowStatusOperations', [               
                'budgetWorkflowStatusSvc',               
                 'budgetWorkflowStatusErrorHandling',
                 'appLangTranslate',
                 'budgetWorkflowStatusGridFactory',
                 'budgetWorkflowStatusModel', 
                 'budgetWorkflowStatusNotifications',
                factory
        ]);
})(angular);
