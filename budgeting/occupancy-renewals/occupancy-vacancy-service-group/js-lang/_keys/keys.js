(function(angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'header_sub_title',
            'total_no_of_units',
            'budget_changes_in_occupancy',
            'beginning_occupied_units',
            'occupancy_goal_percentage',
            'move_ins',
            'move_outs',
            'net_changes_in_occupancy',
            'ending_occupied_units',
            'occupancy_percentage',
            'turn_over_percentage',
            'current_year',
            'previous_year',
            'vacant_units',
            'vacant_percentage',
            'non_renewal',
            'moveouts_skip_eviction',
            'model_units',

            'admin_units',
            'employee_units',
            'down_units',
            'total_non_revenue_units',

            'hdr_hdrReferenceData',
            'refMoveIns',
            'refMoveOuts',
            'refTurnoverPercent',
            'refVacancyPercent',
            'refOccupancyPercent',
            'hdrRevForecast',
            'revForecastOccupancy',

            'calculator_text',
            'save_text',
            'cancel_text',
            'input_occ_by',
            'bou_title',
            'bou_message',
            'bou_helptext',
            'bou_btnUpdate',
            'bou_cancel',
            'ogp_title',
            'ogp_message',
            'ogp_btnUpdate',
            'ogp_cancel', 'worksheetsavedmsg',
            'grid_options_row_option_title',
            'grid_options_hide_zero_row_option_text',
            'grid_options_show_reference_row_option_text',
            'grid_options_show_calculation_row_option_text',
            'grid_options_show_small_size_option_text',
            'grid_options_show_large_size_option_text',
            'grid_options_column_option_text',
        ];

        appLangKeys.app('occupancy-worksheet').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);