(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "edit",
            "save",
            "cancel",
            "none",

            "assumptions_title",
            "gl_accounts_title",
            "option_title",

            "occupancy_method",
            "occupancy_goal",

            // GL Accounts
            "gl_admin_units_rent",
            "gl_down_units_rent",
            "gl_employee_units_rent",
            "gl_model_units_rent",
            "gl_vacancy_loss",
            "gl_vl_memory_care",

            // Assumptions
            "early_termination",
            "employee_discount",
            "employee_units",
            "model_units_loss_type",
            "none_revenue_units_rent",
            "basis_for_vacancy",
            "show_reference_data",
            "open_reference_data",
            "open_reference_data_tooltip",

            // Occupancy Goal %
            "og_annual",
            "og_monthly",
            "og_ref_data",
            "og_tooltip",

            // Occupancy Method
            "occm_worksheet",
            "occm_worksheet_sg",

            // Basis for Vacancy/Non-Revenue Units Rent
            "nr_market_rent",
            "nr_actual_rent",
            "nr_tooltip",
            "nr_tooltip_sl",

            // Open Period Reference Data
            "oprd_actuals",
            "oprd_budgets",
            "oprd_forecast",
            "oprd_proforma",
            "oprd_tooltip",

            "save_success", 
            "save_error", 

            "err_unit_loss_type", 
            "err_positive_num", 
            "err_positive_percent",
            "err_final"

        ];

        appLangKeys.app("occupancyOptions").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
