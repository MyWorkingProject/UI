(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("occupancyAndRenewals");

        bundle.set({

            oar_main_hd: "Occupancy & Renewals",

            oar_tab_summary: "Summary",
            oar_tab_lease: "Lease Renewals",
            oar_tab_vacancy: "Occupancy/Vacancy"

        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();