(function () {
    "use strict";

    function oarSummarySvc($resource, $window, $q, oarSummaryGridMockData) {
        var svc = {};

        svc.url = {
            summaryStats: "/api/budgeting/leasingrents/distribute/:distID/occupancyleaserenwalsummary",
        };

        svc.getSummary = function(distributeID) {
            var actions = {
                    get: { method: "GET" }
                }, 
                paramData = {
                    distID: distributeID
                };

            return $resource(svc.url.summaryStats, paramData, actions).get().$promise;
        };

        // svc.getSummary = function() {
        //     return $q(function(resolve) {
        //         resolve(oarSummaryGridMockData);
        //     });
        // };

        return svc;
    }

    angular
        .module("budgeting")
        .factory("oarSummarySvc", [
            "$resource",
            "$window",
            "$q",
            "oarSummaryGridMockData",
            oarSummarySvc
        ]);
})();
