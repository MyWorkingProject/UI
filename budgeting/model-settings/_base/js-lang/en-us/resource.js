//  English Resource Bundle for Budget Model Details

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('ModelSettings');

        bundle.set({
            model_settings_rent_options: 'Rent Options',
            model_settings_occupancy_options: 'Occupancy Options',
            model_settings_lease_options: 'Lease Options',
            model_settings_comments_options: 'Rules Based Comments',
            model_settings_other_options: 'Other Options',

            model_settings_page_title: 'Budget Settings & Assumptions',
            model_settings_page_title_forecast: 'Forecast Settings & Assumptions',
            model_settings_page_title_proforma: 'Proforma Settings & Assumptions'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
