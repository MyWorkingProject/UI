//  Workflow levels service

(function (angular) {
    "use strict";

    function BdgtWorkflowLevelsSvc($resource) {
        var defaults = {};
        function getWorkflowLevels() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/workflow/distribute/:distID/budgetworkflowlevel';
            
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
            getWorkflowLevels: getWorkflowLevels()
        };
    }

    angular.module("budgeting")
        .factory('BdgtWorkflowLevelsSvc', [
            '$resource',
            BdgtWorkflowLevelsSvc]);
})(angular);
