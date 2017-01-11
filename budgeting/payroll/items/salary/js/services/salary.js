//  Pay Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';
        function payrollItemSalary() {
            var url = baseUrl + '/expenses/payroll/:payrollID/distribute/:distID/payrollby/:payrollBy/:payrollByID/payrollsalary',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getSalaryDetails(params){
            return payrollItemSalary().get(params).$promise;
        }

        svc.getSalaryDetails = getSalaryDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("salaryService", [
        	"$resource",
        	factory]);
})(angular);
