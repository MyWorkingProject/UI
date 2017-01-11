
(function (angular) {
    "use strict";
   
    function factory(eventStream,preferencesSvc) {      
       var svc={};
        
        svc.init=function(){
            svc.preferenceDetails = {};

            svc.events = {
                update: eventStream()
            };

            return svc;
        };
      

        svc.setPreferencesDetails=function(data){
             svc.preferenceDetails={};
             angular.extend(svc.preferenceDetails, data);
             svc.publish(data);            
             return svc; 
        };

        svc.getPreferencesDetails=function(){
            return svc.preferenceDetails;
        };

       svc.publish = function (data) {
            svc.events.update.publish(data);
            return svc;
        };

      

        svc.savePreferences=function(data){ 
             return preferencesSvc.updatePreferences(data).$promise;
        };

        svc.getPreferences=function(data){
             svc.getPreferencesPromise(data).then(svc.setPreferencesDetails); 
        };

        svc.getPreferencesPromise=function(data){
            return preferencesSvc.getPreferences(data).$promise;
        };

        svc.reset=function(){
            svc.ready=false;
             svc.modelDetails = {};
        };

        return svc.init();

         
    }

    angular
        .module("budgeting")
        .factory('preferences', ['eventStream', 'preferencesSVC',
            factory
        ]);
})(angular); 
