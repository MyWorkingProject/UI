//  Sample Grid Data Service

(function (angular) {
    "use strict";

    function factory($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        function getPayrollHeaders() {
            url = '/api/budgeting/expenses/payroll/property/:propertyID/budgetmodel/:budgetModelID/payrollitembudget';
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        propertyID: 0,
                        budgetModelID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        svc.getPayrollglData = function (params, data) {
            var url = '/api/budgeting/expenses/payroll/distribute/:distID/payrollglaccountspayrolldata';            
            var reqUrl = url.replace(':distID', params.distributedID),
            deferred = $q.defer();

            return $http({
                data: {},
                url: reqUrl, //+data
                method: 'GET',
                timeout: deferred.promise
            });
        };
        svc.getPayrollHeaders = getPayrollHeaders().getData;
        return svc;
    }
   
    angular
        .module("budgeting")
        .factory("payrollglSvc", ["$resource","$q","$http", factory]);
})(angular);
