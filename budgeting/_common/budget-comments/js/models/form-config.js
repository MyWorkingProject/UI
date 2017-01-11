(function (angular) {
    'use strict';
    function factory(langTranslate, baseFormConfig, textareaConfig, commentsContent) {
        var model = baseFormConfig(),
            translate = langTranslate('comments').translate;
        model.commentText = textareaConfig({
            id: 'commentText',
            required: true,
            placeholder: commentsContent.phComment,
            maxlength: 4096,
            errorMsgs: [{
                name: 'required',
                text: commentsContent.txtRequired
            }]
        });
        model.editResponse = textareaConfig({
            id: 'editResponse',
            required: true,
            placeholder: commentsContent.phComment,
            maxlength: 4096, 
            errorMsgs: [{
                name: 'required',
                text: commentsContent.txtRequired
            }]
        });
        return model;

    }
    angular
        .module('budgeting')
        .factory('commentsFormConfig', [
            'appLangTranslate',
            'baseFormConfig',
            'rpFormTextareaConfig',
            'budgetCommentsContent',
            factory
        ]);
})(angular);
