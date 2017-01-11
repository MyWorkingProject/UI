(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("payroll.annualize-taxes");

        bundle.set({});
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();