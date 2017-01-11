// General comment form config

(function (angular) {
    'use strict';
    function factory(langTranslate,
        baseFormConfig,
        textareaConfig,
        generalCommentsFormData,
        generalCommentsContent) {
        var model = baseFormConfig(),
            translate = langTranslate('vendorForm').translate;
        model.commentsText = textareaConfig({
            id: 'commentsText',
            required: true,
            placeholder: generalCommentsContent.leaveCommentText,
            errorMsgs: [{
                name: 'required',
                text: generalCommentsContent.requiredField
            }]
        });
        model.editResponse = textareaConfig({
            id: 'editResponse',
            required: true,
            placeholder: 'Leave a comment',
            errorMsgs: [{
                name: 'required',
                text: 'Required field'
            }]
        });

        return model;
    }
    angular
        .module('budgeting')
        .factory('generalCommentsFormConfig', [
            'appLangTranslate',
            'baseFormConfig',
            'rpFormTextareaConfig',
            'generalCommentsFormData',
            'generalCommentsContentModel',
            factory
        ]);
})(angular);
