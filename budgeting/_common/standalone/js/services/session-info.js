
(function (angular) {
    "use strict";
   
    function factory(session) {
       var propetyID=0,siteID,pmcID;
       var model={};
      

        model.getPropertyID=function(){
            siteID= session.get("siteID");
            pmcID= session.get("pmcid");
            if(siteID==="" || siteID===null || siteID===undefined  ||  (siteID === pmcID)){
                   propetyID = 0;
            }
            else{
                   propetyID=siteID;
            }

            return propetyID;
        };
         return model;
    }

    angular
        .module("budgeting")
        .factory('sessionSvc', [
            'sessionInfo',           
            factory
        ]);
})(angular); 
