(function(angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function occupancyDetails() {
            var url = baseUrl + '/leasingrents/distribute/:distributedID/OccupancyServiceGroupSummary',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getOccupancyDetails(params) {
            return occupancyDetails().get(params).$promise;
        }

        svc.getServiceGroupDetails = getOccupancyDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("occupancyDetailsService", [
            "$resource",
            factory
        ]);
})(angular);