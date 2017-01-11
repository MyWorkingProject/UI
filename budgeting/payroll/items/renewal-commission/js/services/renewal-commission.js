//  Pay Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';
        function payrollItemRenewalCommn() {
            var url = baseUrl + '/expenses/payroll/:payrollID/distribute/:distID/payrollby/:payrollBy/:payrollByID/payrollmonthlyrenewal',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getRenewalCommnDetails(params){
            return payrollItemRenewalCommn().get(params).$promise;
        }

        svc.getRenewalCommnDetails = getRenewalCommnDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("renewalCommnService", [
        	"$resource",
        	factory]);
})(angular);
