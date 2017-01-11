//  Provides lang content for Model

(function (angular) {
    'use strict';

    function factory(langTranslate) {
        var translate = langTranslate('accountByAccount.reviewer.comments').translate,
            model = {
                postText: translate('reviewer_post'),
                saveText: translate('reviewer_save'),
                cancelText: translate('reviewer_cancel'),
                showVisibility: translate('reviewer_comments_showVisibility'),
                hideVisibility: translate('reviewer_comments_hideVisibility'),
                whocanseeText: translate('reviewer_who_can_see'),
                leaveCommentText: translate('reviewer_leave_comment'),
                requiredField: translate('reviewer_required_field')
            };

        return model;
    }

    angular
        .module('budgeting')
        .factory('reiviwerCommentsContentModel', [
        	'appLangTranslate',
        	factory]);
})(angular);
