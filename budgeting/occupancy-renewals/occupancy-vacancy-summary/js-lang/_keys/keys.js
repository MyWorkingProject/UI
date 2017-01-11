

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'header_title'          
        ];

        appLangKeys.app('occupancy-vacancy-details').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
