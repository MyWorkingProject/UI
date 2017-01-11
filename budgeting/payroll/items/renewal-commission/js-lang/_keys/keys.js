//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title',
            'lbl_calculator',
            'lbl_lease_renewal',
            'lbl_renewal_commission',
            'lbl_mtm_renewal',
            'lbl_mtm_commission',
            'lbl_lease_renewals',
            'lbl_renewal',
            'lbl_commission_amount',
            'lbl_lease_renewal_total',
            'lbl_mtm_renewals',
            'lbl_mtm_renewal_total',
            'lbl_additinal',
            'lbl_total_leasing_commission',
            'pre_suf_fix_currency',
            'pre_suf_fix_percentage',
            'lbl_lease_renewal_required',
            'lbl_renewal_commission_required',
            'lbl_mtm_renewal_required',
            'lbl_mtm_commission_required',
            'lbl_lease_renewal_should_be_number',
            'lbl_renewal_commission_should_be_number',
            'lbl_mtm_renewal_should_be_number',
            'lbl_mtm_commission_should_be_number',
            'lbl_selected_row_missing_message'
        ];

        appLangKeys.app('payroll.items.renewalCommn').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
