(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("assignGLAccounts");

        bundle.set({
            aga_header: "Assign GL Acounts",

            aga_grid_master_chart: "Master Chart",
            aga_grid_gl_acct: "GL Account",

            aga_overwrite: "Overwrite property GL Account assignments?",

            aga_btn_assign: "Assign",
            aga_btn_cancel: "Cancel",

            aga_err_no_properties: "Unable to retrieve the master charts. Please select at least one property.",
            aga_err_no_master_charts: "Unable to retrieve selected master charts data."
        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();