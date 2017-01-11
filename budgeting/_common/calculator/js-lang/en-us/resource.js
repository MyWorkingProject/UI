(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("calculator");

        bundle.set({

            bdgt_calculator_hd: "Calculator",
            bdgt_calculator_grid_empty: "No results were found.",
            bdgt_results_hd: "Results",

            // Buttons
            bdgt_calculate: "Calculate",
            bdgt_calculator_results: "Results",
            bdgt_calculator_apply_calculations: "Apply Calculations",
            bdgt_calculator_cancel: "Cancel",
            bdgt_calculator_ok: "OK",

            // Pricing Calculator
            bdgt_calculator_source: "Source",

            // Pricing Calculator Methods
            bdgt_calculator_method: "Method",
            bdgt_calculator_straight_monthly: "Straight Line - Monthly",
            bdgt_calculator_straight_annual: "Straight Line - Annual",
            bdgt_calculator_average: "Average",
            bdgt_calculator_quarterly: "Quarterly",
            bdgt_calculator_multiplication: "Multiplication",
            bdgt_calculator_id_monthly_currency: "Increase/Decrease - Monthly $",
            bdgt_calculator_id_monthly_percent: "Increase/Decrease - Monthly %",
            bdgt_calculator_id_annual_currency: "Increase/Decrease - Annual $",
            bdgt_calculator_id_annual_percent: "Increase/Decrease - Annual %",
            bdgt_calculator_compund_currency: "Compound $",
            bdgt_calculator_compund_percent: "Compound %",

            // Pricing Calculator Methods - Tooltip
            bdgt_calculator_straight_monthly_hint_1: "Enter a number in the \"Amount\" field and click on calculate button.",
            bdgt_calculator_straight_monthly_hint_2: "The number entered will be input in to each selected period of results table.",
            
            bdgt_calculator_straight_annual_hint_1: "Enter a number in the \"Amount\" field and click on calculate button.",
            bdgt_calculator_straight_annual_hint_2: "The number entered in to \"Amount\" field will be divided by the number of selected periods and the result will be input in to each selected period of results table.",
            
            bdgt_calculator_average_hint: "The average of the source row (current or reference row) for the selected periods will be input in to each selected period of results section.",
            
            bdgt_calculator_quarterly_hint_1: "Enter a number in the \"Amount\" field, enter the number 1, 2 or 3 in the \"Beginning Quarter\" field and click calculate.",
            bdgt_calculator_quarterly_hint_2: "Entering \"1\" will input the amount in to periods 1, 4, 7 and 10 periods.",
            bdgt_calculator_quarterly_hint_3: "Entering \"2\" will input the amount in to periods 2, 5, 8 and 11 periods.",
            bdgt_calculator_quarterly_hint_4: "Entering \"3\" will input the amount in to periods 3, 6, 9 and 12 periods.",
            
            bdgt_calculator_multiplication_hint: "Enter a number in the \"Amount\" field, enter another number in the \"Multiplier\" field and click calculate. Then result will be input into each selected period.",
            
            bdgt_calculator_id_monthly_currency_hint_1: "If source data is Current Row:",
            bdgt_calculator_id_monthly_currency_hint_2: "Enter amount in to each period in monthly input fields and click on calculate button.",
            bdgt_calculator_id_monthly_currency_hint_3: "The number entered will be added to the amount in the current row and input in to each selected period of results table.",
            bdgt_calculator_id_monthly_currency_hint_4: "If source data is Reference Row:",
            bdgt_calculator_id_monthly_currency_hint_5: "Enter amount in to each period in monthly input fields and click on calculate button.",
            bdgt_calculator_id_monthly_currency_hint_6: "The number entered will be added to the selected reference row values and for the selected period of results table.",
            bdgt_calculator_id_monthly_currency_hint_7: "If source data is Starting Amount:",
            bdgt_calculator_id_monthly_currency_hint_8: "Enter amount in to each period in monthly input fields, enter number in to \"Starting Amount\" field and click on calculate button.",
            bdgt_calculator_id_monthly_currency_hint_9: "The number entered will be added to the starting amount and input in to each selected period of results table.",
            
            bdgt_calculator_id_monthly_percent_hint_1: "If source data is Current Row:",
            bdgt_calculator_id_monthly_percent_hint_2: "Enter percent number in to each period in monthly input fields and click on calculate button.",
            bdgt_calculator_id_monthly_percent_hint_3: "The percent entered will be applied on the amounts in current row and added to the amount in the source row for the selected period of results table.",
            bdgt_calculator_id_monthly_percent_hint_4: "If source data is Reference Row:",
            bdgt_calculator_id_monthly_percent_hint_5: "Enter percent number in to each period in monthly input fields and click on calculate button.",
            bdgt_calculator_id_monthly_percent_hint_6: "The percent entered will be applied on the amounts in source row i.e., the selected reference row is added to the amount in the source row for the selected period of results table.",
            bdgt_calculator_id_monthly_percent_hint_7: "If source data is Starting Amount:",
            bdgt_calculator_id_monthly_percent_hint_8: "Enter percent number in to each period in monthly input fields, enter number in to \"Starting Amount\" field and click on calculate button.",
            bdgt_calculator_id_monthly_percent_hint_9: "The percent entered will be applied on the starting amount and added to the starting amount in the source row for the selected period of results table.",
            bdgt_calculator_id_monthly_percent_hint_10: "Note: Always enter percentage of increase or decrease in the amount filed with appropriate sign. If you want to increase the value by 10%, then enter 10. If you want to decrease the value by 10%, then enter -10.",
            
            bdgt_calculator_id_annual_currency_hint_1: "Enter a number in the \"Amount\" field and click on calculate button.",
            bdgt_calculator_id_annual_currency_hint_2: "The number entered in to \"Amount\" field will be divided by the number of selected periods and it will be added to the source row (current or reference row) values for all the selected periods.",
            
            bdgt_calculator_id_annual_percent_hint_1: "Enter percentage number in the \"Amount\" field and click on calculate button.",
            bdgt_calculator_id_annual_percent_hint_2: "The percent entered will be applied on the amounts in source row (current or reference row) and added to the amount in the source row (current or reference row) for the selected period of results table.",
            bdgt_calculator_id_annual_percent_hint_3: "Note: Always enter percentage of increase or decrease in the amount filed with appropriate sign. If you want to increase the value by 10%, then enter 10. If you want to decrease the value by 10%, then enter -10.",
            
            bdgt_calculator_compund_currency_hint_1: "Enter a beginning number in the \"Amount\" field, enter a compounding number in the \"Factor\" field and click calculate.",
            bdgt_calculator_compund_currency_hint_2: "The number entered in the \"Amount\" field will be input in to the first selected period. Each subsequent selected period will be adjusted by the factor entered and will include the prior selected period's value.",
            
            bdgt_calculator_compund_percent_hint_1: "Enter a beginning number in the \"Amount\" field, enter a compounding percent (as a decimal) in the \"Factor\" field and click calculate.",
            bdgt_calculator_compund_percent_hint_2: "The number entered in the \"Amount\" field will be input in to the first selected period.  Each subsequent selected period will be adjusted by the factor entered and will include the prior selected period's value.",
            bdgt_calculator_compund_percent_hint_3: "Note: Always enter percentage of increase or decrease in the amount filed with appropriate sign. If you want to increase the value by 10%, then enter 10. If you want to decrease the value by 10%, then enter -10.",

            // Calculator: No active year
            bdgt_calculator_no_active_year_hd: "No active year",
            bdgt_calculator_no_active_year_desc: "The calculator is only available if there is an active year. Please select one of the input fields and try again.",

            // Calculation Sources
            bdgt_calculator_src_curr_row: "Current Row",
            bdgt_calculator_src_start_pt: "Starting Amount",

            //
            bdgt_calculator_amount: "Amount",
            bdgt_calculator_percent: "Percent",            
            bdgt_calculator_total: "Total",
            bdgt_calculator_factor: "Factor",
            bdgt_calculator_factor_percent: "Factor %",
            bdgt_calculator_quarter: "Beginning Quarter",
            bdgt_calculator_multipllier: "Multiplier",
            bdgt_calculator_monthly_amt: "Monthly Amount",
            bdgt_calculator_monthly_percentage: "Monthly Percentage",

            // Months
            bdgt_calculator_jan: "Jan",
            bdgt_calculator_feb: "Feb",
            bdgt_calculator_mar: "Mar",
            bdgt_calculator_apr: "Apr",
            bdgt_calculator_may: "May",
            bdgt_calculator_jun: "Jun",
            bdgt_calculator_jul: "Jul",
            bdgt_calculator_aug: "Aug",
            bdgt_calculator_sep: "Sep",
            bdgt_calculator_oct: "Oct",
            bdgt_calculator_nov: "Nov",
            bdgt_calculator_dec: "Dec",

            bdgt_calculator_unavailable: "You missed some of the required fields! Please fill it up and try again.",

            bdgt_calculator_ave_for: "Average for " // # || ....
        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();