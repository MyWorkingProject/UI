//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {

        appLangBundle.lang('en-us').app('common.budget-model-grid').set({
            'full_month_names': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'short_month_names': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
