(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("glSearch");

        bundle.set({

            bdgt_glSrch_text: "Select G/L account"
           
        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();