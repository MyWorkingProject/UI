//  Pay Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function payrollItemHourly() {
            var url = baseUrl + '/expenses/payroll/:payrollID/distribute/:distID/payrollby/:payrollBy/:payrollByID/payrollhourlypay',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getHourlyDetails(params) {
            return payrollItemHourly().get(params).$promise;
        }

        svc.getHourlyDetails = getHourlyDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("hourlyService", [
            "$resource",
            factory]);
})(angular);
