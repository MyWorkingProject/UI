

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        
        function serviceGroupDetails() {
            var url = baseUrl + '/leasingrents/distribute/:distID/noofperiods/:noOfPeriods/occupancyleaserenwalservicesummary',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getServiceGroupDetails(params) {
            return serviceGroupDetails().get(params).$promise;
        }

        svc.getServiceGroupDetails = getServiceGroupDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("lrSummaryService", [
            "$resource",
            factory]);
})(angular);
