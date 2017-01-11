//  Sample Grid Data Service

(function (angular) {
    "use strict";

    function factory($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        svc.getAnnualizeTaxesData = function (params) {
            var url = '/api/budgeting/expenses/payroll/distribute/:distID/payrollannualizetax';
            var reqUrl = url.replace(':distID', params.distributedID),
                       deferred = $q.defer();

            return $http({
                data: {},
                url: reqUrl ,
                method: 'GET',
                timeout: deferred.promise
            });
        };
        function saveAnnualizeTaxes() {
            var url, actions;
            url = '/api/budgeting/expenses/payroll/payrollannualizetax';
            actions = {
                putData: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }
        svc.saveAnnualizeTaxes = saveAnnualizeTaxes().putData;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("annualizeTaxesSvc", ["$resource", "$q", "$http", factory]);
})(angular);
