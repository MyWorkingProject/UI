
(function (angular) {
    "use strict";
   
    function factory(eventStream) {
       var propetyID=0,siteID,pmcID;
       var svc={};
        
        svc.init=function(){
            svc.modelDetails = {};

            svc.ready=false;

            svc.events = {
                update: eventStream()
            };

            return svc;
        };
      

        svc.setModelDetails=function(data){
             angular.extend(svc.modelDetails, data);
             svc.publish(data);
             svc.ready = true;
            return svc; 
        };

        svc.getModelDetails=function(){
            return svc.modelDetails;
        };

       svc.publish = function (data) {
            svc.events.update.publish(data);
            return svc;
        };

        return svc.init();

         
    }

    angular
        .module("budgeting")
        .factory('budgetDetails', ['eventStream', 
            factory
        ]);
})(angular); 
