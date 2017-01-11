//  Configure App Language Keys for Budget Model Details

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'model_settings_rent_options',
            'model_settings_occupancy_options',
            'model_settings_lease_options',
            'model_settings_comments_options',
            'model_settings_other_options',
            'model_settings_page_title',
            'model_settings_page_title_forecast',
            'model_settings_page_title_proforma'
        ];

        appLangKeys.app('ModelSettings').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
