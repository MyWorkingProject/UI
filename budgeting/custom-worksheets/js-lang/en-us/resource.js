(function(angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('custom-worksheets');

        bundle.set({
            'header_title': 'Custom Worksheets',
            'lbl_account_types': 'Type',
            'lbl_all_account_types': 'All Types',
            'lbl_account_group': 'Group',
            'lbl_all_account_categories': 'All Groups',
            'lbl_filter_grid_text': 'Worksheet / GL account name',
            'lbl_custom_worksheet_name': 'Custom Worksheet Name',
            'lbl_gl_account': 'GL Account'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
