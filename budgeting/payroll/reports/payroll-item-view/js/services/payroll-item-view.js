//  Mastercharts Service

(function (angular) {
    "use strict";

    function payrollItemViewSVC( $q, $http,$resource) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

      

        


        svc.getPayrollItemData = function (params, data) {           
            url = '/api/budgeting/expenses/payroll/distribute/:distributedID/payrollitemspayrolldata';
            url = url.replace(':distributedID', params.distributedID);

         
            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };
        
        function getPayrollItemData(data) {
            var url, actions, defaults;
            url = "/api/budgeting/expenses/payroll/payrollitemspayrolldata" + svc.getQuery(data);
            defaults = {};   
            actions = {
                getData: {
                    method: 'GET'                    
                }
            };
            return $resource(url, defaults, actions);
        }
        
         svc.getQuery = function(json) {
            var query = [];
            angular.forEach(json, function(value, key) {
                query.push("payrollParams." + key + "=" + value);
            });

            return "?" + query.join("&");
        }; 

         svc.getPayrollItemData = function(data){
            return getPayrollItemData(data).getData();
        };
       

        return svc;

    }

    angular
        .module("budgeting")
        .factory('payrollItemViewSVC', [
             '$q',
            '$http','$resource',
            payrollItemViewSVC]);
})(angular);
