(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

	        "aga_header",

            "aga_grid_master_chart",
            "aga_grid_gl_acct",

            "aga_overwrite",

            "aga_btn_assign",
            "aga_btn_cancel"

        ];

        appLangKeys.app("assignGLAccounts").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
