(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "bdgt_glSrch_text",
            
        ];

        appLangKeys.app("glSearch").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
