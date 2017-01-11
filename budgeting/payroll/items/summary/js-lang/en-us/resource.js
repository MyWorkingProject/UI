//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {

        appLangBundle
            .lang('en-us')
            .app('payroll.item.summary').set({
                'employee_header_title': 'Employee Payroll Summary',
                'job_position_header_title': 'Job Position Payroll Summary'
            });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
