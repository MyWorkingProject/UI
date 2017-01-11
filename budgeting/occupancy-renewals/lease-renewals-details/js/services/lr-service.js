

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function occupancyDetails() {
            var url = baseUrl + '/expenses/payroll/:payrollID/distribute/:distID/payrollby/:payrollBy/:payrollByID/payrollhourlypay',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getOccupancyDetails(params) {
            return occupancyDetails().get(params).$promise;
        }

        svc.getOccupancyDetails = getOccupancyDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("lrDetailsService", [
            "$resource",
            factory]);
})(angular);
