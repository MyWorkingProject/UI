//  Provides lang content for Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('accountByAccount.comments').translate,
            model = {
                pageTitle: translate('comments_page_title'),
                generalText: translate('comments_general_text'),
                reviewerText: translate('comments_reviewer_text')
            };

        return model;
    }

    angular
        .module('budgeting')
        .factory('commentsContentModel', [
        	'appLangTranslate',
        	factory]);
})(angular);
