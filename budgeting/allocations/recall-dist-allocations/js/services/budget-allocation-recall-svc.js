//Recall Distributed Allocations Service

(function (angular) {
    "use strict";

    function factory($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        svc.getRecallDistAllocations = function (allocationID) {
            var dfd = $q.defer();
            $http.get('/api/budgeting/tools/allocation/' + allocationID + '/allocationhistory')
                .then(function (response) {
                    dfd.resolve(response);
                }).catch(function (response) {
                    dfd.reject(response);
                });
            return dfd.promise;
        };

        svc.recallDistAllocations = function (objectbody) {
            return $http.put('api/budgeting/tools/allocation/allocationdistribution/recalldistribution', objectbody);
        };
        return svc;
    }

    angular
        .module("budgeting")
        .factory("recallDistAllocationSvc", ["$resource", "$q", "$http", factory]);
})(angular);
