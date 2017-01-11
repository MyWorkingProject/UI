//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'general_post',
            'general_save',
            'general_cancel',
            'general_leave_comment',
            'general_required_field'
        ];

        appLangKeys.app('accountByAccount.general.comments').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
