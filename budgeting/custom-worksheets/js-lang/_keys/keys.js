(function(angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'lbl_account_type',
            'lbl_all_account_types',
            'lbl_account_category',
            'lbl_all_account_categories',
            'lbl_filter_grid_text',
            'lbl_custom_worksheet_name',
            'lbl_gl_account'
        ];

        appLangKeys.app('custom-worksheets').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
