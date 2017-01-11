(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('payroll.item.bonus')
            .set({
                'header_title': '[name]',
                'lbl_calculator': 'Calculator',
                'lbl_add_item': 'Add an item',
                'lbl_total': '[name] Total',
                'lbl_no_item_msg': ' No [name] have been entered.',
                'lbl_selected_row_missing_message': 'Please select row in [name]'
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
