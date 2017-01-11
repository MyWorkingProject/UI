//  Responsible for mapping the i18n keys to actual readable texts

(function (angular) {
    'use strict';
    function factory(langTranslate) {
        var translate = langTranslate('budgeting.common.comments').translate,
        model = {
             pageTitle: translate('bdgt_comments_title'),
             btnPost: translate('bdgt_comments_post'),
             btnEdit: translate('bdgt_comments_edit'),
             btnSave: translate('bdgt_comments_save'),
             btnCancel: translate('bdgt_comments_cancel'),
             btnDelete: translate('bdgt_comments_delete'),
             phComment: translate('bdgt_comments_comment_placeholder'),
             txtRequired: translate('bdgt_comments_text_required')
         };
        return model;
    }
    angular.module('budgeting').
            factory('budgetCommentsContent', ['appLangTranslate', factory]);
})(angular);