(function(angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('occupancy-worksheet').translate,
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
                moveoutsNonRenewal: translate('non_renewal'),
                moveoutsSkipEviction: translate('moveouts_skip_eviction'),
                hdrNonRevenueUnits: translate('hdr_non_revenue_units'),
                modelUnits: translate('model_units'),
                adminUnits: translate('admin_units'),
                employeeUnits: translate('employee_units'),
                downUnits: translate('down_units'),
                totalNonRevenueUnits: translate('total_non_revenue_units'),

                hdrReferenceData: translate('hdr_hdrReferenceData'),
                refMoveIns: translate('refMoveIns'),
                refMoveOuts: translate('refMoveOuts'),
                refTurnoverPercent: translate('refTurnoverPercent'),
                refVacancyPercent: translate('refVacancyPercent'),
                refOccupancyPercent: translate('refOccupancyPercent'),
                hdrRevForecast: translate('hdrRevForecast'),
                revForecastOccupancy: translate('revForecastOccupancy'),

                commentCount: 4,
                calculatorText: translate('calculator_text'),
                saveText: translate('save_text'),
                cancelText: translate('cancel_text'),
                goalPercentageText: translate('goal_percentage'),
                moveInText: translate('move_inn_text'),
                input_occ_by: translate('input_occ_by'),
                bou_helptext: translate('bou_helptext'),
                bou_title: translate('bou_title'),
                bou_message: translate('bou_message'),
                bou_btnUpdate: translate('bou_btnUpdate'),
                bou_cancel: translate('bou_cancel'),
                ogp_title: translate('ogp_title'),
                ogp_message: translate('ogp_message'),
                ogp_btnUpdate: translate('ogp_btnUpdate'),
                ogp_cancel: translate('ogp_cancel'),
                worksheetsavedmsg: translate('worksheetsavedmsg'),
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
        .factory("sgworksheetContentModel", [
            'appLangTranslate',
            factory
        ]);
})(angular);