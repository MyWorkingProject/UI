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

                averageLeaseTerm: translate('averageLeaseTerm'),
                actualLeasesExpiring: translate('actualLeasesExpiring'),
                renewedLeasesExpiring: translate('renewedLeasesExpiring'),
                budgetedMoveinsExpiring: translate('budgetedMoveinsExpiring'),
                additionalLeasesExpiring: translate('additionalLeasesExpiring'),
                totalLeasesExpiring: translate('totalLeasesExpiring'),
                moveouts: translate('moveouts'),
                leasesExpiredPreviousMonth: translate('leasesExpiredPreviousMonth'),
                leaseRenewalPer: translate('leaseRenewalPer'),
                leaseRenewals: translate('leaseRenewals'),
                leaseRenewalMTMPer: translate('leaseRenewalMTMPer'),
                leaseRenewalMTM: translate('leaseRenewalMTM'),
                moveoutsfromNonRenewals: translate('moveoutsfromNonRenewals'),
                turnoverPer: translate('turnoverPer'),
                retention: translate('retention'),
                leaseExpiringhdr: translate('leaseExpiringhdr'),

                refavgLeaseTerm: translate('refavgLeaseTerm'),
                refleaseExpiring: translate('refleaseExpiring'),
                refLeaseRenewal: translate('refLeaseRenewal'),
                refLeaseRenewalper: translate('refLeaseRenewalper'),
                refLeaseRenewalsMtm: translate('refLeaseRenewalsMtm'),
                refLeaseRenewalsMtmper: translate('refLeaseRenewalsMtmper'),
                refNonRenewingMoveouts: translate('refNonRenewingMoveouts'),

                commentCount: 4,
                calculatorText: translate('calculator_text'),

                gridRowOptionText: translate('grid_options_row_option_title'),
                gridShowReferenceRowText: translate('grid_options_show_reference_row_option_text'),
                gridShowCalculatedRowText: translate('grid_options_show_calculation_row_option_text'),
                gridShowSmallSizeText: translate('grid_options_show_small_size_option_text'),
                gridShowLargeSizeTextText: translate('grid_options_show_large_size_option_text'),
                gridShowColumnOptionTextText: translate('grid_options_column_option_text'),

                gridEmptyMessage: translate('grid_empty_message'),


            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("lrSummaryContentModel", [
            'appLangTranslate',
            factory
        ]);
})(angular);