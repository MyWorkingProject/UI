(function () {
    "use strict";

    function coaSvc($resource) {
        var svc = {},
            rootUrl = "/api/budgeting";

        svc.url = {
            coa: rootUrl + "/coa/masterchart/clonedmasterchartlist/:chartIds"
        };

        svc.requests = {
            coa: null
        };

        svc.getChartOfAcctsReq = function(chartIds) {
            var params = {
                    chartIds: chartIds
                },
                actions = {
                    get: {
                        method: "GET",
                        cancellable: true
                    }
                };

            return $resource(svc.url.coa, params, actions).get();
        };
        svc.getChartOfAccts = function (chartIds) {
            svc.requests.coa = svc.getChartOfAcctsReq(chartIds);
            return svc.requests.coa.$promise;
        };

        svc.cancelRequests = function() {
            //cancel chart of accounts request
            if(svc.requests.coa !== null) {
                svc.requests.coa.$cancelRequest();
                svc.requests.coa = null;
            }
        };
        
        
        return svc;
    }

    angular
        .module("budgeting")
        .factory("assignGLAcctsSvc", [
            "$resource",
            coaSvc
        ]);
})();
