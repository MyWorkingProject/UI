//  Budget Model service

(function (angular) {
    "use strict";

    function BdgtModelSvc($resource) {
        var defaults = {};
        function getPropertyModelDetails() {
            var url, actions;
            url = '/api/budgeting/dashboard/distribute/:distID/propertymodelinfo';
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

       function getPropertyModelTaskCommnetCount() {
            var url, actions;
            url = '/api/budgeting/dashboard/distribute/:distributedID/modelcommenttaskcount';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        distributedID: 0
                    }
                }
            };
            return $resource(url, defaults, actions).get;
        } 

        return {
            getPropertyModelDetails: getPropertyModelDetails(),
            getPropertyModelTaskCommnetCount: getPropertyModelTaskCommnetCount()
        };
    }

    angular.module("budgeting")
        .factory('BdgtModelSvc', [
            '$resource',
            BdgtModelSvc]);
})(angular);