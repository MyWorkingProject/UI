//  HA Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function payrollItemHA() {
            var url = baseUrl + '/expenses/payroll/payrollmonthlyhousing',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function marketRentResource() {
            var url = baseUrl + '/expenses/budgetmodel/distribute/:distID/housingmarketrent/:housingMarketRentID/payrollhousingmarketrent',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getMarketRentBy(params) {
            return marketRentResource().get(params).$promise;
        }

        function getHADetails(params) {
            var extendedParmas = {
                "payrollParams.payrollID": params.payrollID,
                "payrollParams.budgetModelID": params.budgetModelID,
                "payrollParams.propertyID": params.propertyID,
                "payrollParams.distributedID": params.distID,
                "payrollParams.payrollBy": params.payrollBy,
                "payrollParams.payrollByID": params.payrollByID,
                "payrollParams.incomeModel": params.incomeModel
            };
            return payrollItemHA().get(extendedParmas).$promise;
        }

        svc.getHADetails = getHADetails;
        svc.getMarketRentBy = getMarketRentBy;
        
        return svc;
    }

    angular
        .module("budgeting")
        .factory("haService", [
            "$resource",
            factory]);
})(angular);
