//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            "header_title",
            "lbl_calculator",
            "lbl_move_ins_percent",
            "lbl_commission_amt",

            "grid_move_ins_amt",
            "grid_move_ins_percent",
            "grid_commission_amt",
            "grid_commission_total",
            "grid_additional_amt",
            "grid_total_amt",

            "affix_percent", 
            "affix_currency",

            "err_positive_num",
            'lbl_selected_row_missing_message'

        ];

        appLangKeys.app("payroll.items.leasingCommission").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})(angular);
