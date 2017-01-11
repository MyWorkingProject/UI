

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'header_sub_title',
            'total_no_of_units',
            'avg_lease_term',
            'lease_exp',
            'actual_lease_exp',
            'renewed_lease_exp',
            'bud_movins_exp',
            'occ_moveins',
            'add_lease_exp',
            'tot_lease_exp',
            'move_outs',
            'lease_exp_pr_month',
            'lease_renewal_percentage',
            'lease_renewals',
            'lease_renewal_mtm_percentage',
            'lease_renewals_mtm',
            'moveouts_non_renewals',
            'turnover_percentage',
            'retention_percentage',

            'hdr_hdrReferenceData',
            'hdr_subReferenceData',
            'lease_expiring',
            'non_renewing_moveouts',
            'revenue_forecast',
            'revenue_forecast_occupancy',

            'calculator_text',
            'save_text',
            'cancel_text',
            'input_ren_percentage',
            'input_ren_noofunit',
            'input_renewals_by',
            'grid_options_row_option_title',
            'grid_options_show_reference_row_option_text',
            'grid_options_show_small_size_option_text',
            'grid_options_show_large_size_option_text',
            'grid_options_column_option_text',
        ];

        appLangKeys.app('lease-renewals-unittype').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
