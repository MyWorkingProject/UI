
(function (angular) {
    "use strict";

    function actualRentCapSvc( $q, $http,$resource) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        svc.getActualCapMethod = function (params, data) {           
            url = '/api/budgeting/leasingrents/distribute/:distributedID/property/:propertyID/budgetmodelID/:budgetModelID/marketrentdatatype/:mrDataType/actualrentcap';
            url = url.replace(":distributedID",params.distributedID);
            url = url.replace(":propertyID",params.propertyID);
            url = url.replace(":budgetModelID",params.budgetModelID);
            url = url.replace(":mrDataType",params.mrDataType);
            deferred = $q.defer();

            return $http({
                data: {},
                url: url ,//+ data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        svc.getMarketRentForActualCap = function (params, data) {  
            url = '/api/budgeting/leasingrents/distribute/:distributedID/noofPeriods/:noofPeriods/marketrentactualrentcap';
            url = url.replace(":distributedID",params.distributedID);
            url = url.replace(":noofPeriods",params.noOfPeriods);
            
            deferred = $q.defer();

            return $http({
                data: {},
                url: url ,//+ data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        function updateActualCapMethod() {
            var url, actions;
            url = '/api/budgeting/leasingrents/distribute/:distributedID/assettype/:assettype/saveactualrentcap';
            actions = {
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions).put;
        }

         function autoUpdateActualRent() {
            var url, actions;
            url = '/api/budgeting/leasingrents/distribute/:distributedID/autoupdateactualrent';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions).get;
        }

        svc.updateActualCapMethod = updateActualCapMethod();
        svc.autoUpdateActualRent = autoUpdateActualRent();    
        return svc;

    }

    angular
        .module("budgeting")
        .factory('actualRentCapSvc', [
             '$q',
            '$http','$resource',
            actualRentCapSvc]);
})(angular);
