(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "bdgt_calculator_hd",
            "bdgt_calculator_grid_empty",
            "bdgt_results_hd",

            // Buttons
            "bdgt_calculate",
            "bdgt_calculator_results",
            "bdgt_calculator_apply_calculations",
            "bdgt_calculator_cancel",
            "bdgt_calculator_ok",

            // Pricing Calculator
            "bdgt_calculator_source",

            // Pricing Calculator Methods
            "bdgt_calculator_method",
            "bdgt_calculator_straight_monthly",
            "bdgt_calculator_straight_annual",
            "bdgt_calculator_average",
            "bdgt_calculator_quarterly",
            "bdgt_calculator_multiplication",
            "bdgt_calculator_id_monthly_currency",
            "bdgt_calculator_id_monthly_percent",
            "bdgt_calculator_id_annual_currency",
            "bdgt_calculator_id_annual_percent",
            "bdgt_calculator_compund_currency",
            "bdgt_calculator_compund_percent",

            // Pricing Calculator Methods - Tooltip
            "bdgt_calculator_straight_monthly_hint_1",
            "bdgt_calculator_straight_monthly_hint_2",
            
            "bdgt_calculator_straight_annual_hint_1",
            "bdgt_calculator_straight_annual_hint_2",
            
            "bdgt_calculator_average_hint",
            
            "bdgt_calculator_quarterly_hint_1",
            "bdgt_calculator_quarterly_hint_2",
            "bdgt_calculator_quarterly_hint_3",
            "bdgt_calculator_quarterly_hint_4",
            
            "bdgt_calculator_multiplication_hint",
            
            "bdgt_calculator_id_monthly_currency_hint_1",
            "bdgt_calculator_id_monthly_currency_hint_2",
            "bdgt_calculator_id_monthly_currency_hint_3",
            "bdgt_calculator_id_monthly_currency_hint_4",
            "bdgt_calculator_id_monthly_currency_hint_5",
            "bdgt_calculator_id_monthly_currency_hint_6",
            
            "bdgt_calculator_id_monthly_percent_hint_1",
            "bdgt_calculator_id_monthly_percent_hint_2",
            "bdgt_calculator_id_monthly_percent_hint_3",
            "bdgt_calculator_id_monthly_percent_hint_4",
            "bdgt_calculator_id_monthly_percent_hint_5",
            "bdgt_calculator_id_monthly_percent_hint_6",
            "bdgt_calculator_id_monthly_percent_hint_7",
            
            "bdgt_calculator_id_annual_currency_hint_1",
            "bdgt_calculator_id_annual_currency_hint_2",
            
            "bdgt_calculator_id_annual_percent_hint_1",
            "bdgt_calculator_id_annual_percent_hint_2",
            "bdgt_calculator_id_annual_percent_hint_3",
            
            "bdgt_calculator_compund_currency_hint_1",
            "bdgt_calculator_compund_currency_hint_2",
            
            "bdgt_calculator_compund_percent_hint_1",
            "bdgt_calculator_compund_percent_hint_2",
            "bdgt_calculator_compund_percent_hint_3",

            // Calculator: No active year
            "bdgt_calculator_no_active_year_hd",
            "bdgt_calculator_no_active_year_desc",

            // Calculation Sources
            "bdgt_calculator_src_curr_row",
            "bdgt_calculator_src_start_pt",

            //
            "bdgt_calculator_amount",
            "bdgt_calculator_percent",
            "bdgt_calculator_total",
            "bdgt_calculator_factor",
            "bdgt_calculator_factor_percent",
            "bdgt_calculator_quarter",
            "bdgt_calculator_multipllier",
            "bdgt_calculator_monthly_amt",
            "bdgt_calculator_monthly_percentage", 

            // Months
            "bdgt_calculator_jan",
            "bdgt_calculator_feb",
            "bdgt_calculator_mar",
            "bdgt_calculator_apr",
            "bdgt_calculator_may",
            "bdgt_calculator_jun",
            "bdgt_calculator_jul",
            "bdgt_calculator_aug",
            "bdgt_calculator_sep",
            "bdgt_calculator_oct",
            "bdgt_calculator_nov",
            "bdgt_calculator_dec",

            "bdgt_calculator_unavailable",
            "bdgt_calculator_ave_for"
        ];

        appLangKeys.app("calculator").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
