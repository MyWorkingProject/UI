(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("occupancyOptions");

        bundle.set({

            edit: "Edit",
            save: "Save",
            cancel: "Cancel",
            none: "None",

            assumptions_title: "Assumptions",
            gl_accounts_title: "GL Accounts",
            option_title: "Occupancy Options",

            occupancy_method: "Occupancy Method",
            occupancy_goal: "Occupancy Goal %",

            // GL Accounts
            gl_admin_units_rent: "Administration Units Rent GL",
            gl_down_units_rent: "Down Units Rent GL",
            gl_employee_units_rent: "Employee Units Rent GL",
            gl_model_units_rent: "Model Units Rent GL",
            gl_vacancy_loss: "Vacancy Loss GL",
            gl_vl_memory_care: "Vacancy Loss GL for ", // + service group name

            // Assumptions
            early_termination: "Skips / Evictions / Early Terminations",
            employee_discount: "Employee Discount",
            employee_units: "Employee Units",
            model_units_loss_type: "Model Units Loss Unit Type",
            none_revenue_units_rent: "Basis for Vacancy / Non-Revenue Units Rent",
            basis_for_vacancy: "Basis for Vacancy Loss", //if Senior Living
            show_reference_data: "Show reference data",
            open_reference_data: "Open Period Reference Data",
            open_reference_data_tooltip: "",

            // Occupancy Goal %
            og_annual: "Annualized %",
            og_monthly: "Monthly",
            og_ref_data: "Use Reference Data",
            og_tooltip: "Define occupancy goal percentage and it will be used as default % in worksheet. If the user reference data option is selected then previous year actuals will be directly inserted.",

            // Occupancy Method
            occm_worksheet: "Worksheet",
            occm_worksheet_sg: "Worksheet - Service Group",

            // Basis for Vacancy/Non-Revenue Units Rent
            nr_market_rent: "Market Rent",
            nr_actual_rent: "Actual Rent",
            nr_tooltip: "Select basis for calculating rent for Non-Revenue units such as Vacant, Admin, Employee and Down units.",
            nr_tooltip_sl: "Select basis for calculating rent for Vacant Units.",

            // Open Period Reference Data
            oprd_actuals: "Actuals",
            oprd_budgets: "Budgets",
            oprd_forecast: "Forecast",
            oprd_proforma: "Proforma",
            oprd_tooltip: "Selected data will be loaded in to the open periods if any on Occupancy/Vacancy worksheet.",

            save_success: "Occupancy options saved successfully.",
            save_error: "Unable to save occupancy option changes.",
            
            err_unit_loss_type: "Unable to retrieve model units loss type. Try refreshing page.",
            err_positive_num: "Expecting a positive integer",
            err_positive_percent: "Expecting a positive percent value",
            err_final: "The model is already final, no other changes allowed."
           
        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();