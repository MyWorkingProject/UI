(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("occupanyRenewalsSummary");

        bundle.set({

            oar_avg_move_ins: "AVG Move-ins",
            oar_avg_move_outs: "AVG Move-outs",
            oar_lease_renewals: "Lease Renewals",
            oar_move_ins: "Move-ins",
            oar_occ_percent: "Occupancy %",
            oar_occupancy: "Occupancy",
            oar_total_move_outs: "Move-outs",
            oar_turnover: "Turnover",
            oar_vacancy: "Vacancy",


            oar_total: "Total"

        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();