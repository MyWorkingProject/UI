//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang("en-us")
            .app("payroll.items.leasingCommission")
            .set({
                "header_title": "Leasing Commission",
                "lbl_calculator": "Calculator",
                "lbl_move_ins_percent": "Move-ins %",
                "lbl_commission_amt": "Commission Amount",

                "grid_move_ins_amt": "Number of move-ins",
                "grid_move_ins_percent": "Percentage of move-ins",
                "grid_commission_amt": "Commission amount",
                "grid_commission_total": "Commission Total",
                "grid_additional_amt": "Additional amount",
                "grid_total_amt": "Total Leasing Commission",

                "affix_percent": "%",
                "affix_currency": "$",

                "err_positive_num": "Enter a positive number",
                'lbl_selected_row_missing_message': 'Please select row in Leasing Commission'
            });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})(angular);
