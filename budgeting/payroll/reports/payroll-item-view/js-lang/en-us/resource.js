//  English Resource Bundle for Budget Model Details

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('payrollReportViewTabs');

        bundle.set({
            bdgt_payroll_pageTitle:"Payroll Report Veiws",
            bdgt_payroll_payrollItemView:"Payroll Item View",
            bdgt_payroll_payrollglAccountView:"GL Account View",
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
