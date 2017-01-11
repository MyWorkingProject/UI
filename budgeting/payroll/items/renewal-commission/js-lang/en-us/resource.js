//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('payroll.items.renewalCommn')
            .set({
                'header_title': 'Renewal Commission',
                'lbl_calculator': 'Calculator',
                'lbl_lease_renewal': 'Lease Renewal',
                'lbl_renewal_commission': 'Renewal Commission',
                'lbl_mtm_renewal': 'MTM Renewal',
                'lbl_mtm_commission': 'MTM Commission',
                'lbl_lease_renewals':'Lease Renewals',
                'lbl_renewal':'Renewals %',
                'lbl_commission_amount':'Commission Amount',
                'lbl_lease_renewal_total':'Lease Renewal Total',
                'lbl_mtm_renewals':'MTM Renewals',
                'lbl_mtm_renewal_total':'MTM Renewal Total',
                'lbl_additinal':'Additional',
                'lbl_total_leasing_commission':'Total Leasing Commission',
                'pre_suf_fix_currency': '$',
                'pre_suf_fix_percentage': '%',
                'lbl_lease_renewal_required': 'Required',
                'lbl_renewal_commission_required': 'Required',
                'lbl_mtm_renewal_required': 'Required',
                'lbl_mtm_commission_required': 'Required',
                'lbl_lease_renewal_should_be_number': 'Should be a number',
                'lbl_renewal_commission_should_be_number': 'Should be a number',
                'lbl_mtm_renewal_should_be_number': 'Should be a number',
                'lbl_mtm_commission_should_be_number': 'Should be a number',
                'lbl_selected_row_missing_message': 'Please select row in Renewal Commission'
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
