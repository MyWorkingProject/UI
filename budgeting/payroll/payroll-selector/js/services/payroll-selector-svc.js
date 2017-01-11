//  Sample Grid Data Service

(function (angular) {
    "use strict";

    function factory($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        svc.getPayrollEmployeeList = function (params) {
            var url = '/api/budgeting/expenses/payroll/distribute/:distID/payrollemployee';
            var reqUrl = url.replace(':distID', params.distributedID),
                         deferred = $q.defer();

            return $http({
                data: {},
                url: reqUrl ,
                method: 'GET',
                timeout: deferred.promise
            });
        };
        return svc;
    }

    angular
        .module("budgeting")
        .factory("employeeSelectorSvc", ["$resource", "$q", "$http", factory]);
})(angular);
