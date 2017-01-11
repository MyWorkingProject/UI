//  English Resource Bundle for BASE

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('base');

        bundle.set({
            bdgt_base_backBtn: '< Back',
            bdgt_base_nextBtn: 'Next >',
            bdgt_base_step1: 'Define',
            bdgt_base_step2: 'GL Accounts',
            bdgt_base_step3: 'Categories',
            bdgt_base_step4: 'Assign & Review',
            bdgt_base_step5: 'Properties',
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
