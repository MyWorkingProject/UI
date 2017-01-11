// New Contract Services

(function () {
    "use strict";

    function contractSvc($q, $http, $resource, $window) {
        var svc = {};

        svc.url = {
            contractDetails: "/api/budgeting/vendorcontract/contracts/vendorcontractdetails/{:contractId}",
            vendorContract: "/api/budgeting/vendorcontract/contracts/vendorcontract"
        };

        svc.createContractDetails = function (paramData) {
            var url = svc.url.vendorContract,
                actions = {
                    post: { method: "POST" }
                };
            return $resource(url, {}, actions).post(paramData).$promise;
        };

        svc.updateContractDetails = function (paramData) {
            var url = svc.url.vendorContract,
                actions = {
                    post: { method: "PUT" }
                };
            return $resource(url, {}, actions).post(paramData).$promise;
        };

        svc.abort = function () {
            if (svc.deferred && svc.deferred.resolve) {
                svc.deferred.resolve();
                svc.deferred = null;
            }
            return svc;
        };

        svc.get = function (url) {
            svc.deferred = $q.defer();

            return $http({
                data: {},
                method: "GET",
                url: url,
                timeout: svc.deferred.promise
            });
        };

        svc.getContractDetails = function(contractId, successCallback, errorCallback) {
            var url = svc.url.contractDetails;
                url = url.replace("{:contractId}", contractId);
           
            return svc.abort()
                        .get(url)
                        .then(successCallback, errorCallback);
        };

        svc.getQuery = function(data) {
            var str = $window.JSON.stringify(data);
            return "?datafilter=" + $window.btoa(str);
        };
        
        return svc;
    }

    angular
        .module("budgeting")
        .factory("contractSvc", [
            "$q",
            "$http",
            "$resource",
            "$window",
            contractSvc
        ]);
})();
