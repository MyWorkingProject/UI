//  Bonus Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';
        function payrollItemBonus() {
            var url = baseUrl + '/expenses/payroll/:payrollID/distribute/:distID/payrollitem/:payrollItemID/payrollbonus',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getBonusDetails(params) {
            return payrollItemBonus().get(params).$promise;
        }

        svc.getBonusDetails = getBonusDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("bonusService", [
        	"$resource",
        	factory]);
})(angular);
