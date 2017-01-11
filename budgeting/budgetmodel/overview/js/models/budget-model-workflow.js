//  Budgeting Overview Workflow model

(function (angular) {
    "use strict";

    function BdgtOverviewWorkflowModel(modelDetails, langTranslate, $filter, svc,budgetDetails,BdgtOverviewListModel) {
        var translate;
        translate = langTranslate('BdgtModelOverview').translate;

        var model = {};
        model.emptyData = {
            distID: 0,
            bdgtWorkflowID: 0,
            isSubmitLevel: false,
            isApproveLevel: false,
            slideSubmitCommentsForm: {
                state: {
                    open: false
                }
            },
            slideApproveCommentsForm: {
                state: {
                    open: false
                }
            },
            slideRejectCommentsForm: {
                state: {
                    open: false
                }
            },
            submitComments: "",
            approveComments: "",
            rejectComments: "",
            errorMsgs: {
                submitComments: "",
                approveComments: "",
                rejectComments: ""
            },
            placeholder: {
                submitComments: translate('bdgt_model_overview_add_submit_comments_txt'),
                approveComments: translate('bdgt_model_overview_add_approve_comments_txt'),
                rejectComments: translate('bdgt_model_overview_add_reject_comments_txt')
            },
            rejectSequences: [],
            submitBtnDisable: false,
            approveBtnDisable: false,
            rejectBtnDisable: false
        };

        model.form = {};

        angular.copy(model.emptyData, model.form);

        model.setDistID = function (id) {
            model.form.distID = id;
        };

        model.setLevelOperations = function (resp) {

            BdgtOverviewListModel.setLabelText(budgetDetails.getModelDetails());
            if (resp.records.budgetWorkFlowID === 0) {
                return;
            }
            else {
                if (modelDetails.form.modelDetails.currentSequence === 1) {
                    model.form.isSubmitLevel = true;
                    model.form.isApproveLevel = false;
                    model.form.bdgtWorkflowID = resp.records.budgetWorkFlowID;
                }
                else {
                    model.form.isApproveLevel = true;
                    model.getRejectSequences();
                    model.form.bdgtWorkflowID = resp.records.budgetWorkFlowID;
                }
            }
        };

        model.toggleSubmitWorkflow = function () {
            model.form.slideSubmitCommentsForm.state.open = !model.form.slideSubmitCommentsForm.state.open;
        };

        model.toggleApproveWorkflow = function () {
            model.form.slideApproveCommentsForm.state.open = !model.form.slideApproveCommentsForm.state.open;
        };

        model.hideApproveWorkflow = function () {
            model.form.slideApproveCommentsForm.state.open = false;
        };

        model.toggleRejectWorkflow = function () {
            model.form.slideRejectCommentsForm.state.open = !model.form.slideRejectCommentsForm.state.open;
        };

        model.hideRejectWorkflow = function () {
            model.form.slideRejectCommentsForm.state.open = false;
        };

        model.getCurrSeqWorkflow = function () {
            var params = {
                distID: model.form.distID,
                seq: modelDetails.form.modelDetails.currentSequence
            };
            return svc.getCurrSeqWorkflow(params).$promise;
        };

        model.getRejectSequences = function () {
            //service call to get reject sequences
            var params = {
                distID: model.form.distID,
                seq: modelDetails.form.modelDetails.currentSequence
            };
            svc.getRejectSequences(params).$promise.then(model.updateRejectSequences);
            //var resp = {
            //    records: [{
            //        name: 'Budget Approver',
            //        checked: false
            //    }, {
            //        name: 'Property Accountant',
            //        checked: false
            //    }, {
            //        name: 'Property Manager',
            //        checked: false
            //    }]
            //};
            //model.updateRejectSequences(resp);
        };

        model.updateRejectSequences = function (resp) {
            model.form.rejectSequences = resp.records;
        };

        model.submitWorkflow = function () {
            if (model.form.submitComments !== "") {
                //service call to submit comments and workflow, disable submit button.
                var params = [
                              {
                                  "distributedID": model.form.distID,
                                  "budgetWorkFlowID": model.form.bdgtWorkflowID,
                                  "comment": model.form.submitComments,
                                  "status": 'Submitted',
                                  "sequenceLevel": modelDetails.form.modelDetails.currentSequence,
                                  "approveAll": false,
                                  "budgetWorkFlowIDs": ""
                              }
                ];
                return svc.updateWorkflowStatus(params).$promise;
            }
        };

        model.approveWorkflow = function (status) {
            if (model.form.approveComments !== "") {
                //service call to approve comments and workflow, disable approve and reject buttons.
                var params = [
                              {
                                  "distributedID": model.form.distID,
                                  "budgetWorkFlowID": model.form.bdgtWorkflowID,
                                  "comment": model.form.approveComments,
                                  "status": 'Approved',
                                  "sequenceLevel": modelDetails.form.modelDetails.currentSequence,
                                  "approveAll": false,
                                  "budgetWorkFlowIDs": ""
                              }
                ];
                return svc.updateWorkflowStatus(params).$promise;
            }
        };

        model.rejectWorkflow = function (status) {
            var seqSelections = $filter('filter')(model.form.rejectSequences, { checked: true }, false);
            if (model.form.rejectComments !== "" && seqSelections.length > 0) {
                //service call to reject comments and workflow, moving the level back to 1 and make submit operation enable.
                var workFlowIDs = '';
                seqSelections.forEach(function (item) {
                    workFlowIDs = workFlowIDs + item.budgetWorkflowID + ',';
                });
                workFlowIDs = workFlowIDs.slice(',', -1);
                var params = [
                              {
                                  "distributedID": model.form.distID,
                                  "budgetWorkFlowID": model.form.bdgtWorkflowID,
                                  "comment": model.form.rejectComments,
                                  "status": 'Rejected',
                                  "sequenceLevel": modelDetails.form.modelDetails.currentSequence,
                                  "approveAll": false,
                                  "budgetWorkFlowIDs": workFlowIDs
                              }
                            ];
                return svc.updateWorkflowStatus(params).$promise;
            }
        };

        model.onSuccessRejection = function (resp) {
            modelDetails.setWorkflowLevel(1);
            model.setLevelOperations();
        };

        model.disableSubmit = function () {
            model.form.submitBtnDisable = true;
        };

        model.disableApprove = function () {
            model.form.approveBtnDisable = true;
            model.disableReject();
        };

        model.disableReject = function () {
            model.form.rejectBtnDisable = true;
            model.disableApprove();
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('BdgtOverviewWorkflowModel', [
            'BdgtModelDetails',
            'appLangTranslate',
            '$filter',
            'BdgtModelOverviewSvc',
            'budgetDetails',
            'BdgtOverviewListModel',
            BdgtOverviewWorkflowModel
        ]);
})(angular);
