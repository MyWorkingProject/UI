//Distribute Allocations Service

(function (angular) {
    "use strict";

    function factory($resource, $q, $http) {
        var svc = {}, actions;

        //Distributing Allocation


        svc.distributeAllocation = function (params) {
            var url = '/api/budgeting/tools/allocation/allocationdistribution/siteleveldistribution';
            actions = {
                post: { method: "PUT" }
            };
            return $resource(url, {}, actions).post(params).$promise;
        };


        return svc;
    }

    angular
        .module("budgeting")
        .factory("DistributeAllocSvc", ["$resource", "$q", "$http", factory]);
})(angular);
