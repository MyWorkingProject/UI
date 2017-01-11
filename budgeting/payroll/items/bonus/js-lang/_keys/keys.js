(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'lbl_calculator',
            'lbl_add_item',
            'lbl_total',
            'lbl_no_item_msg',
            'lbl_selected_row_missing_message'
        ];

        appLangKeys.app('payroll.item.bonus').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
