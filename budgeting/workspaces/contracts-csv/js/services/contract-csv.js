//  Mastercharts Service

(function (angular) {
    'use strict';

    function contractCSVSVC($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        
        function saveCSVData() {
            var url, actions;
            url = '/api/budgeting/expenses/vendorcontract/csv';
            actions = {
                putData: {
                    method: 'POST',
                    transformRequest: angular.identity,
                    headers: {
                        'content-type': undefined
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        function saveImportedData() {
            var url, actions;
            url = '/api/budgeting/expense/vendorcontract/vendorcontractstaging';
            actions = {
                postData: {
                    method: 'POST',
                }
            };
            return $resource(url, defaults, actions);
        }

         svc.getCSVTemplate = function(params) {
            var url, actions;
            deferred = $q.defer();
            url = '/api/budgeting/common/csvtemplate/:importType';
            url = url.replace(':importType',params.importType);
            //return $resource(url, defaults, actions);
            return $http({
                data: {},
                url: url ,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        function deleteAllVendorContracts() {
            url = '/api/budgeting/expense/vendorcontract/vendorcontractstaging';


            actions = {
                del: {
                    method: 'DELETE'
                }
            };
            return $resource(url, defaults, actions);
        }

        svc.getContractsList = function (data) {          
            url = '/api/budgeting/expense/vendorcontract/vendorcontractstaging';
            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        function deleteContract() {
            url = '/api/budgeting/expense/vendorcontract/vendorcontractstaging/delete';


            actions = {
                del: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }
        
        svc.deleteContract = deleteContract().del;
        svc.saveCSVData = saveCSVData().putData;
        svc.saveImportedData = saveImportedData().postData;
        //svc.getCSVTemplate = getCSVTemplate().get;
        svc.deleteAllVendorContracts = deleteAllVendorContracts().del;
        return svc;
    }

    angular
        .module('budgeting')
        .factory('contractCSVSVC', ['$resource',
           '$q',
            '$http',
            contractCSVSVC]);
})(angular);
