//  Provides lang content for salary  Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.items.renewalCommn').translate,
            model = {
                headerTitle: translate('header_title'),
                calculatorText: translate('lbl_calculator'),
                leaseRenewalText: translate('lbl_lease_renewal'),
                renewalCommissionText: translate('lbl_renewal_commission'),
                mtmRenewalText: translate('lbl_mtm_renewal'),
                mtmCommissionText: translate('lbl_mtm_commission'),
                leaseRenewalsText: translate('lbl_lease_renewals'),
                renewalText: translate('lbl_renewal'),
                commissionAmountText: translate('lbl_commission_amount'),
                leaseRenewalTotalText: translate('lbl_lease_renewal_total'),
                mtmRenewalsText: translate('lbl_mtm_renewals'),
                mtmRenewalTotalText: translate('lbl_mtm_renewal_total'),
                additinalText: translate('lbl_additinal'),
                totalLeasingCommissionText: translate('lbl_total_leasing_commission'),
                preSuffixCurrency: translate('pre_suf_fix_currency'),
                preSuffixPercentage: translate('pre_suf_fix_percentage'),
                leaseRenewalRequiredText: translate('lbl_lease_renewal_required'),
                renewalCommissionRequiredText: translate('lbl_renewal_commission_required'),
                mtmRenewalRequiredText: translate('lbl_mtm_renewal_required'),
                mtmCommissionRequiredText: translate('lbl_mtm_commission_required'),
                leaseRenewalErrorText: translate('lbl_lease_renewal_should_be_number'),
                renewalCommissionErrorText: translate('lbl_renewal_commission_should_be_number'),
                mtmRenewalErrorText: translate('lbl_mtm_renewal_should_be_number'),
                mtmCommissionErrorText: translate('lbl_mtm_commission_should_be_number'),
                calcRequireRowMessage: translate('lbl_selected_row_missing_message')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("renewalCommnContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
