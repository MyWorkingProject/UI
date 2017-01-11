//  Pay Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function payrollTaxResource() {
            var url = baseUrl + '/expenses/payroll/:payrollID/distribute/:distID/cumulativecomp/:calValue/payrolltaxes',
                actions = {},
                defaults = {};

            return $resource(url, defaults, actions);
        }

        function getPayrollTaxDetails(params) {
            return payrollTaxResource().get(params).$promise;
        }

        svc.getPayrollTaxDetails = getPayrollTaxDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("taxInsuranceService", [
        	"$resource",
        	factory]);
})(angular);
