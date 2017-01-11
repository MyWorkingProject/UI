//  Pay Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';
        function payrollItemBenefits() {           
            var url = baseUrl + '/expenses/payroll/:payrollId/distribute/:distId/payrollbenefitdata',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getBenefitsDetails(params) {
            return payrollItemBenefits().get(params).$promise;
        }

        svc.getBenefitsDetails = getBenefitsDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("benefitsService", [
        	"$resource",
        	factory]);
})(angular);
