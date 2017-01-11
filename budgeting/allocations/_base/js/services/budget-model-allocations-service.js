//  Budget Model service

(function (angular) {
    "use strict";

    function BdgtModelOverviewSvc($resource) {
        var defaults = {};
    
        return   defaults;
        
    }

    angular.module("budgeting")
        .factory('BdgtModelOverviewSvc', [
            '$resource',
            BdgtModelOverviewSvc]);
})(angular);