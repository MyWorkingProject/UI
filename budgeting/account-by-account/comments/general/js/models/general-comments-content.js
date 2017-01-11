//  Provides lang content for Model

(function (angular) {
    'use strict';

    function factory(langTranslate) {
        var translate = langTranslate('accountByAccount.general.comments').translate,
            model = {
                postText: translate('general_post'),
                saveText: translate('general_save'),
                cancelText: translate('general_cancel'),
                leaveCommentText: translate('general_leave_comment'),
                requiredField: translate('general_required_field')
            };

        return model;
    }

    angular
        .module('budgeting')
        .factory('generalCommentsContentModel', [
        	'appLangTranslate',
        	factory]);
})(angular);
