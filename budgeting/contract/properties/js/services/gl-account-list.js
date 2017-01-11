// Gets GL Account List

(function (angular) {
    "use strict";

    function vendorListSvc($q, $http, notifSvc) {
        var svc = {};

        svc.url = "/api/budgeting/common/contracts/vendorlist";

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
            notifSvc.error("bdgt_new_contract_get_glacct_fail");
        };

        return svc;
    }

    angular
        .module("budgeting")
        .factory('glAccountListSvc', [
            "$q",
            "$http",
            "contractNotifSvc",
            vendorListSvc
        ]);
})(angular);
