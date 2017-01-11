//  import gl accounts List Data Service

(function (angular) {
    "use strict";

    /*   function propertyChartSvc($resource) {
           var defaults = {};

           function getPropertyChartList() {
               var url, actions;
               url = '/api/budgeting/coa/propertychart/propertymasterchartclonedlist';///:datafilter';
               actions = {
                   get: {
                       method: 'GET',

                   }
               };

               return $resource(url, defaults, actions);
           }
           return {
               getPropertyChartList: getPropertyChartList()
           };

           return $resource(url);
       } */
    function propertyChartSvc($q, $http) {
        var svc, url;
        svc = {};
        url = '/api/budgeting/coa/propertychart/propertymasterchartclonedlist';
        svc.abort =
             function () {
                 if (svc.deferred) {
                     svc.deferred.resolve();
                     svc.deferred = undefined;
                 }
                 return svc;

             };

        svc.get = function (data) {
            svc.deferred = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: url + data,
                timeout: svc.deferred.promise
            });
        };


        return svc;
    }

    angular
        .module("budgeting")
        .factory('propertyChartSvc', ['$q', '$http', propertyChartSvc]);
})(angular);
