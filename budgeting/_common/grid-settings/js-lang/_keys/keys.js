//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
        'lbl_page_title',
        'lbl_apply_btn_text',
        'lbl_cancel_btn_text'
        ];

        appLangKeys.app('grid-settings').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
