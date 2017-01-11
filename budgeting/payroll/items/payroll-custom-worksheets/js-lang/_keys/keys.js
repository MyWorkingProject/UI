(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'lbl_total'
        ];

        appLangKeys.app('payroll.items.custom_worksheet').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);


