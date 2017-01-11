//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('accountByAccount.general.comments');

        bundle.set({
            general_post : 'Post',
            general_save : 'Save',
            general_cancel: 'Cancel',
            general_leave_comment: 'Leave a comment',
            general_required_field: 'Required field'

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
