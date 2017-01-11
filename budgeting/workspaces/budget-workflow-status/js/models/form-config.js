(function (angular) {
    'use strict';
    function factory(langTranslate, baseFormConfig, textareaConfig, commentsContent) {
        var model = baseFormConfig(),
            translate = langTranslate('budgetWorkflowStatus').translate;
        model.commentText = textareaConfig({
            id: 'subComments',
            required: true,
            placeholder: translate('bdgt_budgetWorkflowStatus_placeholder_submitComments'),
            errorMsgs: [{
                name: 'required',
                text: 'commnets are required'
            }]
        });

        model.updateText = function(btnText){
            if(btnText === "Approve"){
               /* model.commentText = textareaConfig({
                    id: 'subComments',
                    required: true,
                    placeholder: translate('bdgt_budgetWorkflowStatus_placeholder_approveComments'),
                    errorMsgs: [{
                        name: 'required',
                        text: 'commnets are required'
                    }]
                });*/
                model.commentText.placeholder = translate('bdgt_budgetWorkflowStatus_placeholder_approveComments');
            }
            else if(btnText === "Reject"){
               /* model.commentText = textareaConfig({
                    id: 'subComments',
                    required: true,
                    placeholder: translate('bdgt_budgetWorkflowStatus_placeholder_rejectComments'),
                    errorMsgs: [{
                        name: 'required',
                        text: 'commnets are required'
                    }]
                });*/
                model.commentText.placeholder = translate('bdgt_budgetWorkflowStatus_placeholder_rejectComments');
            }
            else{
                /*model.commentText = textareaConfig({
                    id: 'subComments',
                    required: true,
                    placeholder: translate('bdgt_budgetWorkflowStatus_placeholder_submitComments'),
                    errorMsgs: [{
                        name: 'required',
                        text: 'commnets are required'
                    }]
                });*/
                model.commentText.placeholder = translate('bdgt_budgetWorkflowStatus_placeholder_submitComments');
            }
        };

       
        return model;

    }
    angular
        .module('budgeting')
        .factory('budgetWorkflowStatusFormConfig', [
            'appLangTranslate',
            'baseFormConfig',
            'rpFormTextareaConfig',
            factory
        ]);
})(angular);