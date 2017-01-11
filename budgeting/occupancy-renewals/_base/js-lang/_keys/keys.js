(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "oar_main_hd",

            "oar_tab_summary", 
            "oar_tab_lease", 
            "oar_tab_vacancy"

        ];

        appLangKeys.app("occupancyAndRenewals").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
