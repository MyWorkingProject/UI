(function(angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('occupancy-service-group').translate,
            model = {
                headerTitle: translate('header_title'),
                subTitle: translate('header_sub_title'),
                occupancyNumberOfUnits: translate('total_no_of_units'),
                hdrBudgetChangesInOccupancy: translate('budget_changes_in_occupancy'),
                beginingOccupiedUnits: translate('beginning_occupied_units'),
                occupancyGoal: translate('occupancy_goal_percentage'),
                moveins: translate('move_ins'),
                totalMoveouts: translate('move_outs'),
                netOccupancyChange: translate('net_changes_in_occupancy'),
                endingOccupiedUnits: translate('ending_occupied_units'),
                occupancy: translate('occupancy_percentage'),
                hdrTurnOverPercentage: translate('turn_over_percentage'),
                occupancyTurnOverPercent: translate('current_year'),
                previousTurnOverPercent: translate('previous_year'),
                vacantUnits: translate('vacant_units'),
                vacany: translate('vacant_percentage'),
                tableSettings: translate('tableSettings'),
                hdrReferenceData: translate('hdr_hdrReferenceData'),
                refMoveIns: translate('refMoveIns'),
                refMoveOuts: translate('refMoveOuts'),
                refTurnoverPercent: translate('refTurnoverPercent'),
                refVacancyPercent: translate('refVacancyPercent'),
                refOccupancyPercent: translate('refOccupancyPercent'),
                hdrRevForecast: translate('hdrRevForecast'),
                revForecastOccupancy: translate('revForecastOccupancy'),
                gridRowOptionText: translate('grid_options_row_option_title'),
                gridShowReferenceRowText: translate('grid_options_show_reference_row_option_text'),
                gridShowCalculatedRowText: translate('grid_options_show_calculation_row_option_text'),
                gridShowSmallSizeText: translate('grid_options_show_small_size_option_text'),
                gridShowLargeSizeTextText: translate('grid_options_show_large_size_option_text'),
                gridShowColumnOptionTextText: translate('grid_options_column_option_text'),

            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("serviceGroupContentModel", [
            'appLangTranslate',
            factory
        ]);
})(angular);