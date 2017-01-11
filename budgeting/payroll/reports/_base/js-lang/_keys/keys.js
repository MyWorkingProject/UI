
(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
           'bdgt_payroll_pageTitle',
           'bdgt_payroll_payrollItemView',
           'bdgt_payroll_payrollglAccountView',
          
        ];

        appLangKeys.app('payroll.reports').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
