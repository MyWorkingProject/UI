//  Configure App Language Keys for import gl accounts

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_base_backBtn',
            'bdgt_base_nextBtn',
            'bdgt_base_step1',
            'bdgt_base_step2',
            'bdgt_base_step3',
            'bdgt_base_step4',
            'bdgt_base_step5'
        ];

        appLangKeys.app('base').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
