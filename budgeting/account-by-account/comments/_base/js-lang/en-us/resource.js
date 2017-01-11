//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('accountByAccount.comments');

        bundle.set({
            comments_page_title: 'Comments',
            comments_general_text: 'General',
            comments_reviewer_text: 'Reviewer'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
