//  gl search service 

(function (angular) {
    'use strict';

    function glSearchSvc($resource, $q, $http,eventStream) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

      

       /* svc.abortGetGLs =
             function () {
                 if (svc.getGLs) {
                     svc.getGLs.resolve();
                     svc.getGLs = undefined;
                 }
                 return svc;

             };

        svc.getGLList = function (params) {
             var url =  '/api/budgeting/coa/masterchart/:masterchartID/property/:propertyID/glaccountsearch/:searchText';
             url = url.replace(':masterchartID', params.masterchartID);
             url = url.replace(':propertyID', params.propertyID);
             url = url.replace(':searchText', params.searchText);   
            svc.getGLs = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: url,
                timeout: svc.getGLs.promise
            });
        };*/

        svc.events = {
                update: eventStream()
            };

        svc.update = function (data) {
            svc.events.update.publish(data);
        };

        svc.subscribe = function (eventName, callback) {
            if (svc.events[eventName]) {
                return svc.events[eventName].subscribe(callback);
            }
            else {
                logc("G/L Search: " + eventName + " is not a valid event name");
            }
        }; 

        
     //return {svc:angular.extend(svc)};

    return svc;

    }

    angular
        .module('budgeting')
        .factory('glSearchSvc', ['$resource',
           '$q',
            '$http','eventStream',
            glSearchSvc]);
})(angular);



