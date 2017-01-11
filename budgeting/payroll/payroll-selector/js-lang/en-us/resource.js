(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("payrollEmpSelector");

        bundle.set({});
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();