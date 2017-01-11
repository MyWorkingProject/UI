//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('accountByAccount.reviewer.comments');

        bundle.set({
            reviewer_post: 'Post',
            reviewer_save: 'Save',
            reviewer_cancel: 'Cancel',
            reviewer_comments_showVisibility: 'Show Visibility Options',
            reviewer_comments_hideVisibility: 'Hide Visibility Options',
            reviewer_who_can_see: 'Who can see this comments?',
            reviewer_leave_comment: 'Leave a comment',
            reviewer_required_field: 'Required field'
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
