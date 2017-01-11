//  Mastercharts Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function payrollItemDataResource(data) {
            var url, actions, defaults;
            url = baseUrl + "/expenses/payroll/payrollitemspayrolldata";
            return $resource(url, defaults, actions);
        }

        svc.getSummaryBy = function (data) {
            var extendedParams = {};
            angular.forEach(data, function (value, key) {
                extendedParams["payrollParams." + key] = value;
            });

            return payrollItemDataResource().get(data).$promise;
        };

        return svc;

    }

    angular
        .module("budgeting")
        .factory('payrollItemSummaryService', [
            '$resource',
            factory]);
})(angular);
