(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "oar_avg_move_ins",
            "oar_avg_move_outs",
	        "oar_lease_renewals",
            "oar_move_ins",
            "oar_occ_percent",
	        "oar_occupancy",
            "oar_total_move_outs",
            "oar_turnover",
	        "oar_vacancy",

            "oar_total"

        ];

        appLangKeys.app("occupanyRenewalsSummary").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
