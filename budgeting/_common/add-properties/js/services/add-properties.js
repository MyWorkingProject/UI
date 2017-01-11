//  gl search service 

(function (angular) {
    'use strict';

    function addPropertiesSvc($resource, $q, $http, eventStream) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;
        function getPropertyList() {
            var url, actions;            
            url = 'api/budgeting/common/budgetinguserproperty/a?datafilter.pages.startRow=0&datafilter.pages.resultsPerPage=100';
            actions = {
                getData: {
                    method: 'GET'                   
                }
            };
            return $resource(url, defaults, actions);
        }
        svc.getPropertyList = getPropertyList().getData;      
        return svc;
    }

    angular
        .module('budgeting')
        .factory('addPropertiesSvc', ['$resource',
           '$q',
            '$http','eventStream',
            addPropertiesSvc]);
})(angular);



