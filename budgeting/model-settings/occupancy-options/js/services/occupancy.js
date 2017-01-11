(function () {
    "use strict";
    
    function occupancySvc($resource) {
        var svc = {};

        svc.url = {
            occupancyOptions: "/api/budgeting/budgetmodel/propertymodelsetup/distribute/:distributedID/occupancyoptionmodel",
            updateOccOptions: "/api/budgeting/budgetmodel/propertymodelsetup/occupancyoptionmodel",
            unitLossTypeList: "/api/budgeting/leasingrents/budgetmodel/:budgetModelID/property/:propertyID/unittype"
        };     

        svc.getOccupancyOptions = function (distributedID) {
            var actions = {
                put: { method: "GET" }
            },
            params = {
                distributedID: distributedID
            };

            return $resource(svc.url.occupancyOptions, params, actions).get().$promise;
        };

        svc.getList = function (budgetModelID, propertyID) {
            var actions = {
                put: { method: "GET" }
            },
            params = {
                budgetModelID: budgetModelID,
                propertyID: propertyID
            };

            return $resource(svc.url.unitLossTypeList, params, actions).get().$promise;
        };

        svc.updateOccupancyOptions = function(paramData) {
            var actions = {
                put: { method: "PUT" }
            },
            url = svc.url.updateOccOptions;

            return $resource(url, {}, actions).put(paramData).$promise;
        };

        return svc;
    }
    
    angular
        .module("budgeting")
        .factory("occupancySvc", [
            "$resource",
            occupancySvc
        ]);
})();