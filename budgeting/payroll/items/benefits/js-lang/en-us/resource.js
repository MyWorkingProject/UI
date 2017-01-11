(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('payroll.item.benefits')
            .set({
                'header_title': 'Benefits',
                'lbl_add_item': 'Add New Item',
                'lbl_no-benefits-msg': ' No Benefits have been entered.',
                'lbl_total': 'Total Benefits'
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
