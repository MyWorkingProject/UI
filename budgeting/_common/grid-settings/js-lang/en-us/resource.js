//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {

        appLangBundle.lang('en-us').app('grid-settings').set({
            'lbl_page_title': "Table Settings",
            'lbl_apply_btn_text': "Apply",
            'lbl_cancel_btn_text': "Cancel"
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
