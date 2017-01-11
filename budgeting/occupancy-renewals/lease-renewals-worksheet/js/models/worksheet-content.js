

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('lease-renewals-worksheet').translate,
            model = {
                headerTitle: translate('header_title'),
                subTitle: translate('header_sub_title'),

                //worksheet summary data content
                totalNumberOfUnits: translate('total_no_of_units'),
                averageLeaseTerm: translate('avg_lease_term'),
                leaseExpiring: translate('lease_exp'),
                actualLeasesExpiring: translate('actual_lease_exp'),
                renewedLeasesExpiring: translate('renewed_lease_exp'),
                budgetedMoveInsExpiring: translate('bud_movins_exp'),
                moveins: translate('occ_moveins'),
                additionalLeasesExpiring: translate('add_lease_exp'),
                totalLeaseExpiring: translate('tot_lease_exp'),
                moveouts: translate('move_outs'),
                previousLeaseExpiring: translate('lease_exp_pr_month'),
                leaseRenewalsPercentage: translate('lease_renewal_percentage'),
                leaseRenewals: translate('lease_renewals'),
                leaseRenewalsMTMPercentage: translate('lease_renewal_mtm_percentage'),
                leaseRenewalsMTM: translate('lease_renewals_mtm'),
                moveoutsNonRenewal: translate('moveouts_non_renewals'),
                turnOverPercent: translate('turnover_percentage'),
                retentionPercent: translate('retention_percentage'),

                //reference data content
                hdrReferenceData: translate('hdr_hdrReferenceData'),
                hdrSubReferenceData: translate('hdr_subReferenceData'),
                refAverageLeaseTerm: translate('avg_lease_term'),
                refActualLeasesExpiring: translate('lease_expiring'),
                refLeaseRenewals: translate('lease_renewals'),
                refLeaseRenewalsPercentage: translate('lease_renewal_percentage'),
                refLeaseRenewalsMTM: translate('lease_renewals_mtm'),
                refLeaseRenewalsMTMPercentage: translate('lease_renewal_mtm_percentage'),
                refMoveoutsNonRenewal: translate('non_renewing_moveouts'),

                //revenue forecaster data content
                hdrRevForecast: translate('revenue_forecast'),
                revForecastOccupancy: translate('revenue_forecast_occupancy'),

                //general input content
                commentCount: 4,
                calculatorText: translate('calculator_text'),
                saveText: translate('save_text'),
                cancelText: translate('cancel_text'),
                renewalsPercentage: translate('input_ren_percentage'),
                renewalsUnits: translate('input_ren_noofunit'),
                input_renewals_by: translate('input_renewals_by'),
                gridRowOptionText: translate('grid_options_row_option_title'),
                gridShowReferenceRowText: translate('grid_options_show_reference_row_option_text'),
                gridShowSmallSizeText: translate('grid_options_show_small_size_option_text'),
                gridShowLargeSizeTextText: translate('grid_options_show_large_size_option_text'),
                gridShowColumnOptionTextText: translate('grid_options_column_option_text')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("leaseWorksheetContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
