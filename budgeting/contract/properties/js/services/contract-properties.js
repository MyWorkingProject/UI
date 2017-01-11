// Gets GL Account List

(function (angular) {
    "use strict";

    function contractPropertiesSvc($q, $http, $resource, notifSvc) {
        var svc = {};

        svc.url = "/api/budgeting/vendorcontract/contracts/vendorcontract/0/vendorcontractpropertylist";

        svc.abort = function () {
            if (svc.deferred && svc.deferred.resolve) {
                svc.deferred.resolve();
                svc.deferred = null;
            }
            return svc;
        };

        svc.getProperties = function (id, data) {
            svc.deferred = $q.defer();

            return $http({
                data: {},
                method: "GET",
                url: '/api/budgeting/vendorcontract/contracts/vendorcontract/' + id + '/vendorcontractpropertylist' + data,
                timeout: svc.deferred.promise
            });
        };

        svc.getGlList = function (chartID, propID, filterTxt, query) {
            svc.deferred = $q.defer();
            //svc.abort();
            return $http({
                data: {},
                method: "GET",
                url: '/api/budgeting/coa/masterchart/' + chartID + '/property/' + propID + '/glaccountsearch/' + filterTxt + query,
                timeout: svc.deferred.promise
            });
        };

        svc.getCharts = function (chartIDs) {
            svc.deferred = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: '/api/budgeting/coa/masterchart/clonedmasterchartlist/' + chartIDs,
                timeout: svc.deferred.promise
            });
        };

        function getPropertyListSvc(filterdata) {
            var url, defaults = {}, actions = {}, baseUrl;
            baseUrl = '/api/budgeting/common/budgetinguserproperty';
            url = baseUrl + filterdata.dataFilter;
            return $resource(url, defaults, actions);
        }

        function getPropertyList(filterdata) {            
            return getPropertyListSvc(filterdata).get().$promise;
        }

        svc.getPropertyList = getPropertyList; 


        //svc.search = function (searchData, successCallback) {
        //    return svc.abort()
        //                .getGlList(searchData)
        //                .then(successCallback, svc.errorCallback);
        //};

        svc.errorCallback = function (err) {
            notifSvc.error("bdgt_new_contract_get_glacct_fail");
        };

        return svc;
    }

    angular
        .module("budgeting")
        .factory('contractPropertiesSvc', [
            "$q",
            "$http",
            "$resource",
            "contractNotifSvc",
            contractPropertiesSvc
        ]);
})(angular);
