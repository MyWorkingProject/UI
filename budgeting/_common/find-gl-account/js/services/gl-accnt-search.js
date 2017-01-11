//  gl search service 

(function (angular) {
    'use strict';

    function findGlAccountSvc($resource, $q, $http, eventStream) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

        svc.abortGetGlAccountDetails =
             function () {
                 if (svc.glAccountDetails) {
                     svc.glAccountDetails.resolve();
                     svc.glAccountDetails = undefined;
                 }
                 return svc;
             };

        svc.getGlAccountDetailsList = function (params) {
            var url = '/api/budgeting/coa/glaccountsearch'+ params;
            svc.glAccountDetails = $q.defer();
            return $http({
                data: {},
                method: 'GET',
                url: url,
                timeout: svc.glAccountDetails.promise
            });
        };

        function getMasterChartList(params) {
            var url, actions;            
            url = '/api/budgeting/coa/masterchartcombo';
            actions = {
                getData: {
                    method: 'GET'                   
                }
            };
            return $resource(url, defaults, actions);
        }

        function getMasterChartListWithPropertyID(params) {
            var url, actions;       
            url = '/api/budgeting/coa/propertychart/property/:propertyID/clonedmasterchart';   
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        propertyID:"@propertyID"
                    }
                }
            };
            return $resource(url, defaults, actions);
        }        
        svc.getMasterChartList = getMasterChartList().getData;
        svc.getMasterChartListWithPropertyID = getMasterChartListWithPropertyID().getData;

        return svc;
    }

    angular
        .module('budgeting')
        .factory('findGlAccountSvc', ['$resource',
           '$q',
            '$http','eventStream',
            findGlAccountSvc]);
})(angular);



