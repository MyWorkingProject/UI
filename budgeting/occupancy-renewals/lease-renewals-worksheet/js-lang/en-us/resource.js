
(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('lease-renewals-worksheet')
            .set({
                'header_title': 'Lease Renewals',
                'header_sub_title': 'by Summary',
                'total_no_of_units': 'Total Number of Units',
                'avg_lease_term': 'Average Lease Term',
                'lease_exp': 'Lease Expiring',
                'actual_lease_exp': 'Actual Lease Expiring',
                'renewed_lease_exp': 'Renewed Lease Expiring',
                'bud_movins_exp': 'Budgeted Move-ins Expiring',
                'occ_moveins': 'Move-ins',
                'add_lease_exp': 'Additional Lease Expiring',
                'tot_lease_exp': 'Total Lease Expiring',
                'move_outs': 'Move-Outs',
                'lease_exp_pr_month': 'Lease Expired Previous Month',
                'lease_renewal_percentage': 'Lease Renewal%',
                'lease_renewals': 'Lease Renewals',
                'lease_renewal_mtm_percentage': 'Lease Renewal MTM%',
                'lease_renewals_mtm': 'Lease Renewals MTM',
                'moveouts_non_renewals': 'Move-outs from Non-Renewals',
                'turnover_percentage': 'Turnover %',
                'retention_percentage': 'Retention %',

                'hdr_hdrReferenceData': "Reference Data",
                'hdr_subReferenceData': 'Actuals',
                'lease_expiring': "Lease Expiring",
                'non_renewing_moveouts': "Non-Renewing Move-outs",
                'revenue_forecast': "Revenue Forecaster",
                'revenue_forecast_occupancy': "Revenue Forecaster occupancy %",

                "calculator_text": "Calculator",
                "save_text": "Save",
                "cancel_text": "Cancel",
                "input_ren_percentage": "Percentage",
                "input_ren_noofunit": "Number of units",
                "input_renewals_by": "Input Renewals by",
                "grid_options_row_option_title": "Row Options",
                "grid_options_show_reference_row_option_text": "Show Reference Data",
                "grid_options_show_small_size_option_text": "Smaller Rows",
                "grid_options_show_large_size_option_text": "Larger Rows",
                "grid_options_column_option_text": "Column Options"
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
