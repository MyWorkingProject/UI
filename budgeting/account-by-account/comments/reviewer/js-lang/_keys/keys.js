//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            'reviewer_post',
            'reviewer_save',
            'reviewer_cancel',
            'reviewer_comments_showVisibility',
            'reviewer_comments_hideVisibility',
            'reviewer_who_can_see',
            'reviewer_leave_comment',
            'reviewer_required_field'
        ];

        appLangKeys.app('accountByAccount.reviewer.comments').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
