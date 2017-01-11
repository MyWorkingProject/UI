//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'comments_page_title',
            'comments_general_text',
            'comments_reviewer_text'
        ];

        appLangKeys.app('accountByAccount.comments').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
