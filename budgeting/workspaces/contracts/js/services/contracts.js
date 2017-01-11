//  Mastercharts Service

(function (angular) {
    "use strict";

    function contractsSvc($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        svc.getContractsList = function (params, data) {          
            url = '/api/budgeting/vendorcontract/contracts/property/:propertyID/contractlist';
            var reqUrl = url.replace(':propertyID', params.propertyID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: reqUrl + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };


        svc.getExpiredContractsList = function (params, data) {
            url = '/api/budgeting/vendorcontract/contracts/property/:propertyID/expired/contractlist';

            var reqUrl = url.replace(':propertyID', params.propertyID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: reqUrl + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        function removeContract() {
            url = '/api/budgeting/vendorcontract/contracts/contractactivity/archive';
            actions = {
                remove: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        svc.deleteSelectedContract = function(paramData) {
            var url = '/api/budgeting/vendorcontract/contracts/vendorcontract/delete',
                actions = {
                    put: { method: "PUT" }
                };
            return $resource(url, defaults, actions).put(paramData).$promise;
        };

        svc.deleteAllContracts = function(paramData, dataFilter) {
            var url = '/api/budgeting/vendorcontract/contracts/bulkdelete/all' + dataFilter,
                actions = {
                    del: { method: "DELETE" }
                };
            return $resource(url, defaults, actions).del(paramData).$promise;
        };

        svc.removeAllContracts = function(paramData, dataFilter) {
            var url = '/api/budgeting/vendorcontract/contracts/bulkdelete/expired' + dataFilter,
                actions = {
                    del: { method: "DELETE" }
                };
            return $resource(url, defaults, actions).del(paramData).$promise;
        };

        return svc;

    }

    angular
        .module("budgeting")
        .factory('contractsSvc', [
               '$resource',
             '$q',
            '$http',
            
            contractsSvc]);
})(angular);
