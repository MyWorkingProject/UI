(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('payroll.items.custom_worksheet')
            .set({
                header_title: 'Custom Worksheets',
                lbl_total: 'Custom Worksheet Total',
            });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);


