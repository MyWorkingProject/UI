
(function (angular) {
    "use strict";

    function config(appLangBundle) {
        appLangBundle
            .lang('en-us')
            .app('occupancy-vacancy-details')
            .set({
                'header_title': 'Occupancy Vacancy Details'              
               
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
