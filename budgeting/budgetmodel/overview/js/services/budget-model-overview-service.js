//  Budget Model service

(function (angular) {
    "use strict";

    function BdgtModelOverviewSvc($resource) {
        var defaults = {};
        function getSectionDrivers() {
            var url, actions;
            url = '/api/budgeting/distribution/:distID/modelsectionlist';
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

        function updateDriverStatus() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/driverstatus';
            actions = {
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions).put;
        }

        function updateWorkflowStatus() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/workflow/budgetstatus';
            actions = {
                post: {
                    method: 'POST'

                }
            };
            return $resource(url, defaults, actions).post;
        }

        function getRejectSequences() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/workflow/distribute/:distID/sequence/:seq/budgetworkflowroles';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        distID: 0,
                        seq: 0
                    }
                }
            };
            return $resource(url, defaults, actions).get;
        }

        function getCurrSeqWorkflow() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/workflow/distribute/:distID/currentsequence/:seq/userbudgetworkflow';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        distID: 0,
                        seq: 0
                    }
                }
            };

            return $resource(url, defaults, actions).get;
        }

        return {
            getSectionDrivers: getSectionDrivers(),
            updateDriverStatus: updateDriverStatus(),
            updateWorkflowStatus: updateWorkflowStatus(),
            getRejectSequences: getRejectSequences(),
            getCurrSeqWorkflow: getCurrSeqWorkflow()
        };
    }

    angular.module("budgeting")
        .factory('BdgtModelOverviewSvc', [
            '$resource',
            BdgtModelOverviewSvc]);
})(angular);