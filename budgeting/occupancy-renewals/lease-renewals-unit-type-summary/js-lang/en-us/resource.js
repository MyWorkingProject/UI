(function(angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('occupancy-service-group')
            .set({
                'header_title': 'Lease Renewals',
                'header_sub_title': 'by Unit type',
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
                'tableSettings': 'Table Settings',
                'hdr_hdrReferenceData': "Reference Data",
                'refMoveIns': "Move-ins",
                'refMoveOuts': "Move-outs",
                'refTurnoverPercent': "Turnover %",
                'refVacancyPercent': "Vacancy %",
                'refOccupancyPercent': "Occupancy %",

                'averageLeaseTerm': ' Average Lease Term',
                'actualLeasesExpiring': 'Actual Leases Expiring',
                'renewedLeasesExpiring': 'Renewed Leases Expiring',
                'budgetedMoveinsExpiring': 'Budgeted Move-ins Expiring',
                'additionalLeasesExpiring': 'Additional Leases Expiring',
                'totalLeasesExpiring': 'Total Leases Expiring',
                'moveouts': 'Move-outs',
                'leasesExpiredPreviousMonth': 'Leases Expired Previous Month',
                'leaseRenewalPer': 'Lease Renewals %',
                'leaseRenewals': 'Lease Renewals',
                'leaseRenewalMTMPer': 'Lease Renewal MTM %',
                'leaseRenewalMTM': 'Lease Renewal MTM',
                'moveoutsfromNonRenewals': 'Move-outs from Non-Renewals',
                'turnoverPer': 'Turnover %',
                'retention': 'Retention',
                'leaseExpiringhdr': 'Lease Expiring',

                'refavgLeaseTerm': 'Average Lease Term',
                'refleaseExpiring': 'Leases Expiring',
                'refLeaseRenewal': 'Lease Renewal',
                'refLeaseRenewalper': 'Leases Renewal %',
                'refLeaseRenewalsMtm': 'Lease Renewals MTM',
                'refLeaseRenewalsMtmper': 'Lease Renewals MTM %',
                'refNonRenewingMoveouts': 'Non Renewing Move-outs',
                "calculator_text": "Calculator",
                'grid_options_row_option_title': "Row Options",
                'grid_options_hide_zero_row_option_text': "Hide zero rows",
                'grid_options_show_reference_row_option_text': "Show Reference Data",
                'grid_options_show_calculation_row_option_text': "Show Calculation Rows",
                'grid_options_show_small_size_option_text': "Smaller Rows",
                'grid_options_show_large_size_option_text': "Larger Rows",
                'grid_options_column_option_text': "Column Options",
                'grid_empty_message': "No results were found.",

            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);