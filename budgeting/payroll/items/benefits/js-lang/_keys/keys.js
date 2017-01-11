(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'lbl_calculator',
            'lbl_add_item',
            'lbl_no-bonus-msg',
            'lbl_total'
        ];

        appLangKeys.app('payroll.item.benefits').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
