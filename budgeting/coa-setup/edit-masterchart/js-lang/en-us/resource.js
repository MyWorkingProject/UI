//  English Resource Bundle for Admin Home Page

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('editMasterchart');

        bundle.set({
            bdgt_editMasterchart_glAccountText: 'GL Accounts',
            bdgt_editMasterchart_categoryText: 'Categories',
            bdgt_editMasterchart_cloneChartText: 'Cloned To'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
