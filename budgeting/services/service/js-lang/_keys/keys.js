//  Configure App Language Keys for service view/New/Edit

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'service_view_name',
            'service_view_glAccount',
            'service_view_glAccounts',
            'service_view_inactive',
            'service_view_amount',
            'service_view_calculation_method',
            'service_view_per_resident_day',
            'service_view_lock_amount'

        ];

        appLangKeys.app('services.service').set(keys);
    }
    
    angular
       .module("budgeting")
       .config(['appLangKeysProvider', config]);
})(angular);


