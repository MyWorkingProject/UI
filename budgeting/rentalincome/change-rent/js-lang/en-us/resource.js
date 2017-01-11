//  English Resource Bundle for Budget Model Overview

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('change-rent');

        bundle.set({
            bdgt_change_rent_hd: "Change ",
            bdgt_change_rent_grid_empty: "No results were found.",
            bdgt_results_hd: "Results",

            // Buttons
            bdgt_calculate: "Calculate",
            bdgt_change_rent_results: "Results",
            bdgt_change_rent_apply_calculations: "Apply Changes",
            bdgt_change_rent_cancel: "Cancel",
            bdgt_change_rent_ok: "OK",

            // Pricing Calculator
            bdgt_change_rent_source: "Source",

            // Pricing Calculator Methods
            bdgt_change_rent_method: "Method",
            bdgt_change_rent_straight_monthly: "Straight Line - Monthly",
            bdgt_change_rent_straight_annual: "Straight Line - Annual",
            bdgt_change_rent_average: "Average",
            bdgt_change_rent_quarterly: "Quarterly",
            bdgt_change_rent_multiplication: "Multiplication",
            bdgt_change_rent_id_monthly_currency: "Increase/Decrease: Monthly $",
            bdgt_change_rent_id_monthly_percent: "Increase/Decrease: Monthly %",
            bdgt_change_rent_id_annual_currency: "Increase/Decrease: Annual $",
            bdgt_change_rent_id_annual_percent: "Increase/Decrease: Annual %",
            bdgt_change_rent_compund_currency: "Compound $",
            bdgt_change_rent_compund_percent: "Compound %",

            // Pricing Calculator Methods - Tooltip
            bdgt_change_rent_straight_monthly_hint: "Enter a number in the \"Amount\" field and click on calculate button. The number entered will be input in to each selected period of results table.",
            bdgt_change_rent_straight_annual_hint: "Enter a number in the \"Amount\" field and click on calculate button. The number entered in to \"Amount\" field will be divided by the number of selected periods and the result will be input in to each selected period of results table.",
            bdgt_change_rent_average_hint: "The average of the source row for the selected periods will be input in to each selected period of results section.",
            bdgt_change_rent_quarterly_hint: "Enter a number in the \"Amount\" field, enter the number 1, 2 or 3 in the \"Beginning Quarter\" field and click calculate. Entering \"1\" will input the amount in to periods 1, 4, 7 and 10 periods. Entering \"2\" will input the amount in to periods 2, 5, 8 and 11 periods. Entering \"3\" will input the amount in to periods 3, 6, 9 and 12 periods.",
            bdgt_change_rent_multiplication_hint: "Enter a number in the \"Amount\" field, enter another number in the \"Multiplier\" field and click calculate. Then result will be input into each selected period.",
            bdgt_change_rent_id_monthly_currency_hint: "If source data is Current Row, enter amount in to the each period in monthly input fields and click on calculate button. The number entered will be added to the amount in the source row and input in to each selected period of results table. If source data is Starting Amount, enter amount in to the each period in monthly input fields, enter number in to \"Starting Amount\" field and click on calculate button.  The number entered will be added to the starting amount and input in to each selected period of results table.",
            bdgt_change_rent_id_monthly_percent_hint: "If source data is Current Row, enter percent number in to the each period in monthly input fields and click on calculate button.  The percent entered will be applied on the amounts in source row and added to the amount in the source row for the selected period of results table. If source data is Starting Amountm, enter percent number in to the each period in monthly input fields, enter number in to \"Starting Amount\" field and click on calculate button.  The percent entered will be applied on the starting amount and added to the starting amount in the source row for the selected period of results table. Note: Always enter percentage of increase or decrease in the amount filed with appropriate sign.  If you want to increase the value by 10%, then enter 10.  If you want to decrease the value by 10%, then enter -10.",
            bdgt_change_rent_id_annual_currency_hint: "Enter a number in the \"Amount\" field and click on calculate button. The number entered in to \"Amount\" field will be divided by the number of selected periods and it will be added to the source row values for all the selected periods.",
            bdgt_change_rent_id_annual_percent_hint: "Enter percentage number in the \"Amount\" field and click on calculate button. The percent entered will be applied on the amounts in source row and added to the amount in the source row for the selected period of results table. Note: Always enter percentage of increase or decrease in the amount filed with appropriate sign.  If you want to increase the value by 10%, then enter 10.  If you want to decrease the value by 10%, then enter -10.",
            bdgt_change_rent_compund_currency_hint: "Enter a beginning number in the \"Amount\" field, enter a compounding number in the \"Factor\" field and click calculate. The number entered in the \"Amount\" field will be input in to the first selected period.  Each subsequent selected period will be adjusted by the factor entered and will include the prior selected period's value.",
            bdgt_change_rent_compund_percent_hint: "Enter a beginning number in the \"Amount\" field, enter a compounding percent (as a decimal) in the \"Factor\" field and click calculate. The number entered in the \"Amount\" field will be input in to the first selected period.  Each subsequent selected period will be adjusted by the factor entered and will include the prior selected period's value. Note: Always enter percentage of increase or decrease in the amount filed with appropriate sign.  If you want to increase the value by 10%, then enter 10.  If you want to decrease the value by 10%, then enter -10.",

            // Calculator: No active year
            bdgt_change_rent_no_active_year_hd: "No active year",
            bdgt_change_rent_no_active_year_desc: "The calculator is only available if there is an active year. Please select one of the input fields and try again.",

            // Calculation Sources
            bdgt_change_rent_src_curr_row: "Current Row",
            bdgt_change_rent_src_start_pt: "Starting Amount",

            //
            bdgt_change_rent_amount: "Amount",
            bdgt_change_rent_percent: "Percent",            
            bdgt_change_rent_total: "Total",
            bdgt_change_rent_factor: "Factor",
            bdgt_change_rent_factor_percent: "Factor %",
            bdgt_change_rent_quarter: "Beginning Quarter",
            bdgt_change_rent_multipllier: "Multiplier",
            bdgt_change_rent_monthly_amt: "Monthly Amount",

            // Months
            bdgt_change_rent_jan: "Jan",
            bdgt_change_rent_feb: "Feb",
            bdgt_change_rent_mar: "Mar",
            bdgt_change_rent_apr: "Apr",
            bdgt_change_rent_may: "May",
            bdgt_change_rent_jun: "Jun",
            bdgt_change_rent_jul: "Jul",
            bdgt_change_rent_aug: "Aug",
            bdgt_change_rent_sep: "Sep",
            bdgt_change_rent_oct: "Oct",
            bdgt_change_rent_nov: "Nov",
            bdgt_change_rent_dec: "Dec",

            bdgt_change_rent_unavailable: "You missed some of the required fields! Please fill it up and try again.",
            bdgt_change_rent_apply_to: "Apply To",
            bdgt_change_rent_periods: "Periods",
            bdgt_change_rent_unitType_desc: "Unit Type",
            bdgt_change_rent_program_desc: "Program",
            bdgt_change_rent_service_desc: "Service Group",
            bdgt_change_rent_unit_desc: "Unit Number",
            bdgt_change_rent_bed_type_desc: "Bed Type",

            bdgt_change_rent_selectd_periods: "Selected Periods",
            bdgt_change_rent_all_periods: "All Periods",
            bdgt_change_rent_expire_periods: "After Lease Expiration Periods",
            bdgt_change_rent_expire_select_periods: "After Lease Expiration Periods with Selection",

            bdgt_change_rent_all: "All",
            bdgt_change_rent_apply_mr:"Apply Market Rent",
            bdgt_change_rent_apply_mr_hint:"All the periods after the lease expiration will be updated with the actual rent budgeted for the unit or unit type.",
            bdgt_change_rent__apply_ar:"Apply Actual Rent",
            bdgt_change_rent_apply_ar_hint:"Each selected period will be updated with the Actual rent budgeted for the unit or unit type.",
            bdgt_change_rent_exp_period: "Expire Period",

            bdgt_change_rent_id_monthly_currency_expiry:"Increase/Decrease - Monthly $ - By Lease Expiration Period",
            bdgt_change_rent_id_monthly_currency_expiry_hint:"Enter amount in to the period in monthly amount fields and click on calculate button. The amount entered in a period will be applicable for those units which are expiring on that particular period by adding the amount in that period to the amount in the source row of the units for all the periods after lease expiration. Example: if the amount $ 100 is entered in the month of Feb, then the increase of $ 100 should applicable to the units which are expiring on the month of Feb and the increase in actual rent should be calculated for the periods after Feb, i.e. March on wards.",
            bdgt_change_rent_id_monthly_percent_expiry:"Increase/Decrease - Monthly % - By Lease Expiration Period",
            bdgt_change_rent_id_monthly_percent_expiry_hint:"Enter percentage in to the period in monthly amount fields and click on calculate button. The % entered in a period will be applicable for those units which are expiring on that particular period by adding the percentage of increment/decrease  in that period to the amount in the source row of the units for all the periods after lease expiration. Example: if the amount 10% is entered in the month of Feb, then the increase of 10% should applicable to the units which are expiring on the month of Feb and the increase in actual rent should be calculated for the periods after Feb, i.e. March on wards. Note: Always enter percentage of increase or decrease in the amount filed with appropriate sign.  If you want to increase the value by 10%, then enter 10.  If you want to decrease the value by 10%, then enter -10."
           
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
