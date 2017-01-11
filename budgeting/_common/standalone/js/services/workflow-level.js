//  Body Service

(function (angular) {
    "use strict";

    function workflowCommonSVC(eventStream) {
        var svc = {};
        svc.distributedID=0;                
        svc.calledFromGrid=false; 
        svc.ready = false;               
        
        
        svc.setDistributedID = function (distributedID) {
            svc.distributedID = distributedID;
            svc.update();
        };

        svc.setCalledFromGrid = function (calledFromGrid) {
            svc.calledFromGrid = calledFromGrid;
        };

        svc.isCalledFromGrid = function () {
            return svc.calledFromGrid;
        };

        svc.getDistributeID = function () {
            return svc.distributedID;
        };

        svc.resetData = function () {
            svc.distributedID = 0;
            svc.calledFromGrid = false;
        };

        svc.events = {
            update: eventStream()
        };

        svc.update = function () {
            svc.ready = true;
            svc.events.update.publish(svc.distributedID);
        };

        svc.subscribe = function (eventName, callback) {
            if (svc.events[eventName]) {
                return svc.events[eventName].subscribe(callback);
            }
            else {
                logc("work flow service: " + eventName + " is not a valid event name");
            }
        };



        return svc;
    }

    angular
        .module("budgeting")
        .factory('workflowCommonSVC', ['eventStream',
                    workflowCommonSVC
        ]);
})(angular);
