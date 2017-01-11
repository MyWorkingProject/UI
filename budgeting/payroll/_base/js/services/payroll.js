//  Payroll Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function payrollItems() {
            var url = baseUrl + '/expenses/payroll/property/:propertyID/budgetmodel/:budgetModelID/payrollitembudget',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getPayrollItems(params) {
            return payrollItems().get(params).$promise;
        }
        
        svc.getPayrollItems = getPayrollItems;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("payrollService", ['$resource', factory]);
})(angular);
