// Payroll summary service

(function (angular) {
    "use strict";

    function factory($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        svc.getPayrollData = function (params, data) {
            var url = '/api/budgeting/expenses/payroll/distribute/:distID/employeespayrolldata';
            var reqUrl = url.replace(':distID', params.distributedID),
            deferred = $q.defer();
            return $http({
                data: {},
                url: reqUrl, 
                method: 'GET',
                timeout: deferred.promise
            });
        };
        return svc;
    }

    angular
        .module("budgeting")
        .factory("payrollSvc", ["$resource", "$q", "$http", factory]);
})(angular);
