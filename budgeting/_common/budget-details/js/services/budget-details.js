//  Budget Model service

(function (angular) {
    "use strict";

    function budgetModelSVC($resource) {
        var defaults = {};
        function getPropertyModelDetails() {
            var url, actions;
           // url = '/api/budgeting/dashboard/distribute/:distID/propertymodelinfo';
              url='/api/budgeting/dashboard/distribute/:distID/propertymodelworkflowinfo';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        distID: 0
                    }
                }
            };
            return $resource(url, defaults, actions).get;
        }     

        return {
            getPropertyModelDetails: getPropertyModelDetails()
          
        };
    }

    angular.module("budgeting")
        .factory('budgetModelSVC', [
            '$resource',
            budgetModelSVC]);
})(angular);