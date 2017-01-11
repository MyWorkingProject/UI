// Payment Terms Service
// Gets available payment terms

(function (angular) {
    "use strict";
    
    function paymentTermsSvc($q, $http, $resource, notifSvc) {
        var svc = {};

        svc.url = {
            getAllPaymentTerms: "/api/budgeting/vendorcontract/contracts/contractactivitylist/", // + vendorContractID
            paymentTermDetails: "/api/budgeting/vendorcontract/contracts/contractactivity/" // + contractActivityId
        };

        svc.abort = function () {
            if (svc.deferred && svc.deferred.resolve) {
                svc.deferred.resolve();
                svc.deferred = null;
            }
            return svc;
        };

        svc.get = function (data) {
            svc.deferred = $q.defer();

            return $http({
                data: {},
                method: "GET",
                url: svc.url.getAllPaymentTerms + data,
                timeout: svc.deferred.promise
            });
        };

        svc.getAll = function (vendorContractId, successCallback) {
            return svc.abort()
                        .get(vendorContractId)
                        .then(successCallback, svc.errorCallback);
        };

        svc.updatePaymentTerm = function (contractActivityId, paramData) {
            var actions = {
                put: { method: "PUT" }
            },
            url = svc.url.paymentTerm;

            return $resource(url, {}, actions).put(paramData).$promise;
        };

        svc.getPaymentTermDetails = function (contractActivityId) {
            var actions = {
                get: { method: "GET" }
            },
            url = svc.url.paymentTermDetails + contractActivityId;

            return $resource(url, {}, actions).get().$promise;
        };

        svc.errorCallback = function (err) {
            notifSvc.error("bdgt_new_contract_get_sched_fail");
        };

        svc.delPaymentTerm = function (pt) {
            var actions = {
                del: { method: "DELETE" }
            },
            url = svc.url.paymentTerm + "/" + pt;

            return $resource(url, {}, actions).del().$promise;
        };

        return svc;
    }
    
    angular
        .module("budgeting")
        .factory("paymentTermsSvc", [
            "$q",
            "$http",
            "$resource",
            "contractNotifSvc",
            paymentTermsSvc
        ]);
})(angular);