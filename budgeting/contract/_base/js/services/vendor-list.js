// Gets vendor list

(function () {
    "use strict";

    function vendorListSvc($q, $http, notifSvc) {
        var svc = {};

        svc.url = "/api/budgeting/expenses/vendor/vendorlist";

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
                url: svc.url + data,
                timeout: svc.deferred.promise
            });
        };

        svc.search = function (searchData, successCallback) {
            return svc.abort()
                        .get(searchData)
                        .then(successCallback, svc.errorCallback);
        };

        svc.errorCallback = function (err) {
            notifSvc.error("bdgt_contract_vendor_fail");
        };

        return svc;
    }

    angular
        .module("budgeting")
        .factory("vendorListSvc", [
            "$q",
            "$http",
            "contractNotifSvc",
            vendorListSvc
        ]);
})();
