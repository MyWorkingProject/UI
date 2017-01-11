(function(angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('occupancy-worksheet')
            .set({
                'header_title': 'OCCUPANCY / VACANCY',
                'header_sub_title': 'by Worksheet - Service Group',
                'total_no_of_units': 'Total Number of Units',
                'budget_changes_in_occupancy': 'Changes in Occupancy',
                'beginning_occupied_units': 'Beginning Occupied Units',
                'occupancy_goal_percentage': 'Occupancy Goal %',
                'move_ins': 'Move-ins',
                'move_outs': 'Move-outs',
                'net_changes_in_occupancy': 'Net Changes in Occupancy',
                'ending_occupied_units': 'Ending Occupied Units',
                'occupancy_percentage': 'Occupancy %',
                'turn_over_percentage': 'Turn Over %',
                'current_year': 'Current Year',
                'previous_year': 'Previous Year',
                'vacant_units': 'Vacant Units',
                'vacant_percentage': 'Vacant %',
                'non_renewal': 'Non-renewal',
                'moveouts_skip_eviction': 'Moveouts-skip-eviction',
                'hdr_non_revenue_units': 'Non Revenue Units',
                'model_units': 'Model Units',
                'admin_units': "Admin Units",
                'employee_units': "Employee Units",
                'down_units': "Down Units",
                'total_non_revenue_units': "Total Non Revenue Units",

                'hdr_hdrReferenceData': "Reference Data",
                'refMoveIns': "Move-ins",
                'refMoveOuts': "Move-outs",
                'refTurnoverPercent': "Turnover %",
                'refVacancyPercent': "Vacancy %",
                'refOccupancyPercent': "Occupancy %",
                'hdrRevForecast': "Revenue Forecaster",
                'revForecastOccupancy': "Revenue Forecaster occupancy %",

                "calculator_text": "Calculator",
                "save_text": "Save",
                "cancel_text": "Cancel",
                "goal_percentage": "Goal %",
                "move_inn_text": "Move-inns",
                "input_occ_by": "Input Occupancy by",
                'bou_title': "Update beginning occupied Units",
                'bou_message': "The current number of occupied units is ",
                'bou_helptext': "The 'Beginning occupied units' for the first period is considered to be the 'Ending' occupied number of units for the year before this budget year. This gives us a starting point to calculate the 'Ending occupied units' after adjusting for move-ins and move-outs.",
                'bou_btnUpdate': "Change",
                'bou_cancel': "Cancel",
                'ogp_title': "Confirmation Needed",
                'ogp_message': "Changing the average Occupancy goal % will change the monthly occupancy goals.  It also recalculates monthly move-in values and override any move-in numbers entered by you",
                'ogp_btnUpdate': "Change",
                'ogp_cancel': "Cancel",
                'worksheetsavedmsg': 'Changes saved',
                'grid_options_row_option_title': "Row Options",
                'grid_options_hide_zero_row_option_text': "Hide zero rows",
                'grid_options_show_reference_row_option_text': "Show Reference Data",
                'grid_options_show_calculation_row_option_text': "Show Calculation Rows",
                'grid_options_show_small_size_option_text': "Smaller Rows",
                'grid_options_show_large_size_option_text': "Larger Rows",
                'grid_options_column_option_text': "Column Options",

            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);