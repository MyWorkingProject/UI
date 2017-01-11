//  Reviewer comments form config

(function (angular) {
    'use strict';
    function factory(
        langTranslate,
        baseFormConfig,
        textareaConfig,
        reiviwerCommentsContent) {
        var model = baseFormConfig();
        model.commentsText = textareaConfig({
            id: 'commentsText',
            required: true,
            placeholder: reiviwerCommentsContent.leaveCommentText,
            errorMsgs: [{
                name: 'required',
                text: reiviwerCommentsContent.requiredField
            }]
        });
        model.editResponse = textareaConfig({
            id: 'editResponse',
            required: true,
            placeholder: reiviwerCommentsContent.leaveCommentText,
            errorMsgs: [{
                name: 'required',
                text: reiviwerCommentsContent.requiredField
            }]
        });
        return model;
    }
    angular
        .module('budgeting')
        .factory('reviewerCommentsFormConfig', [
            'appLangTranslate',
            'baseFormConfig',
            'rpFormTextareaConfig',
            'reiviwerCommentsContentModel',
            factory
        ]);
})(angular);
