//  Budgeting Overview Workflow MODEL

(function (angular) {
    "use strict";

    function factory(svc) {
       
        var model = {};

       
        
        return model;
 
    }

    angular
        .module("budgeting")
        .factory('BdgtOverviewWorkflowModel', [
            'BdgtModelOverviewSvc',
            factory
        ]);
})(angular);
