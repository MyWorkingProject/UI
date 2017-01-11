//  Manage Allocations Services

(function (angular) {
    "use strict";

    function factory($resource, $q, $http) {
        var svc = {}, defaults = {}, actions = {};

        svc.getManageAllocationList = function (params) {
            var deferred = $q.defer();
            $http.get('/api/budgeting/tools/allocation/budgetmodel/' + params.budgetModelID + '/property/' + params.propertyID + '/modelallocationlist')
                .then(function (response) {
                    deferred.resolve(response);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };

        //Delete Allocation
        function deleteAllocationRow() {
            var url = '/api/budgeting/tools/allocation/:allocationID';
            actions = {
                'delete': {
                    method: 'DELETE'
                }
            };
            return $resource(url, defaults, actions);
        }

        function deleteAllocation(allocationID) {
            return deleteAllocationRow().delete(allocationID).$promise;
        }


        svc.deleteAllocation = deleteAllocation;

        return svc;
    }


    angular
        .module("budgeting")
        .factory('bdgtModelAllocationSvc', ["$resource", "$q", "$http", factory]);
})(angular);


