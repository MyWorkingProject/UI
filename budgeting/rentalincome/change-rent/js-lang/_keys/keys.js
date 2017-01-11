(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
         "bdgt_change_rent_hd",
            "bdgt_change_rent_grid_empty",
            "bdgt_results_hd",

            // Buttons
            "bdgt_calculate",
            "bdgt_change_rent_results",
            "bdgt_change_rent_apply_calculations",
            "bdgt_change_rent_cancel",
            "bdgt_change_rent_ok",

            // Pricing Calculator
            "bdgt_change_rent_source",

            // Pricing Calculator Methods
            "bdgt_change_rent_method",
            "bdgt_change_rent_straight_monthly",
            "bdgt_change_rent_straight_annual",
            "bdgt_change_rent_average",
            "bdgt_change_rent_quarterly",
            "bdgt_change_rent_multiplication",
            "bdgt_change_rent_id_monthly_currency",
            "bdgt_change_rent_id_monthly_percent",
            "bdgt_change_rent_id_annual_currency",
            "bdgt_change_rent_id_annual_percent",
            "bdgt_change_rent_compund_currency",
            "bdgt_change_rent_compund_percent",

            // Pricing Calculator Methods - Tooltip
            "bdgt_change_rent_straight_monthly_hint",
            "bdgt_change_rent_straight_annual_hint",
            "bdgt_change_rent_average_hint",
            "bdgt_change_rent_quarterly_hint",
            "bdgt_change_rent_multiplication_hint",
            "bdgt_change_rent_id_monthly_currency_hint",
            "bdgt_change_rent_id_monthly_percent_hint",
            "bdgt_change_rent_id_annual_currency_hint",
            "bdgt_change_rent_id_annual_percent_hint",
            "bdgt_change_rent_compund_currency_hint",
            "bdgt_change_rent_compund_percent_hint",

            // Calculator: No active year
            "bdgt_change_rent_no_active_year_hd",
            "bdgt_change_rent_no_active_year_desc",

            // Calculation Sources
            "bdgt_change_rent_src_curr_row",
            "bdgt_change_rent_src_start_pt",

            //
            "bdgt_change_rent_amount",
            "bdgt_change_rent_percent",
            "bdgt_change_rent_total",
            "bdgt_change_rent_factor",
            "bdgt_change_rent_factor_percent",
            "bdgt_change_rent_quarter",
            "bdgt_change_rent_multipllier",
            "bdgt_change_rent_monthly_amt",

            // Months
            "bdgt_change_rent_jan",
            "bdgt_change_rent_feb",
            "bdgt_change_rent_mar",
            "bdgt_change_rent_apr",
            "bdgt_change_rent_may",
            "bdgt_change_rent_jun",
            "bdgt_change_rent_jul",
            "bdgt_change_rent_aug",
            "bdgt_change_rent_sep",
            "bdgt_change_rent_oct",
            "bdgt_change_rent_nov",
            "bdgt_change_rent_dec",

            "bdgt_change_rent_unavailable",
            "bdgt_change_rent_apply_to",
            "bdgt_change_rent_periods",
            "bdgt_change_rent_unitType_desc",
            "bdgt_change_rent_program_desc",
            "bdgt_change_rent_service_desc",
            "bdgt_change_rent_unit_desc",
            "bdgt_change_rent_bed_type_desc",

            "bdgt_change_rent_selectd_periods",    
            "bdgt_change_rent_all_periods",
            "bdgt_change_rent_expire_periods",
            "bdgt_change_rent_expire_select_periods",

            "bdgt_change_rent_all",
            "bdgt_change_rent_apply_mr",
            "bdgt_change_rent_apply_mr_hint",
            "bdgt_change_rent__apply_ar",
            "bdgt_change_rent_apply_ar_hint",
            "bdgt_change_rent_exp_period",

            "bdgt_change_rent_id_monthly_currency_expiry",
            "bdgt_change_rent_id_monthly_currency_expiry_hint",
            "bdgt_change_rent_id_monthly_percent_expiry",
            "bdgt_change_rent_id_monthly_percent_expiry_hint",
        ];

        appLangKeys.app('change-rent').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
