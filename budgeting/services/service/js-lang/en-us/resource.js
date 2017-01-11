//  English Resource Bundle for service view/New/Edit

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
           .lang('en-us')
           .app('services.service')
        .set({

            'service_view_name':'Name',
            'service_view_glAccount':'GL Account',
            'service_view_glAccounts':'GL Accounts',
            'service_view_inactive':'Inactive',
            'service_view_amount':'Amount',
            'service_view_calculation_method':'Calculation Method',
            'service_view_per_resident_day':'Per Resident Day',
            'service_view_lock_amount': 'Lock amount'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);