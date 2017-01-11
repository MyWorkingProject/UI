//  Budget Model service

(function (angular) {
    "use strict";

    function LeaseOptionsSVC($resource) {
        var defaults = {};
        function getModelLeaseOptionsDetails() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/propertymodelsetup/distribute/:distID/leaseoptions';
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

       function updateModelLeaseOptionsDetails() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/propertymodelsetup/leaseoptions';
            actions = {
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions).put;
        } 

        return {
            getModelLeaseOptionsDetails: getModelLeaseOptionsDetails(),
            updateModelLeaseOptionsDetails: updateModelLeaseOptionsDetails()
        };
    }

    angular.module("budgeting")
        .factory('LeaseOptionsSVC', [
            '$resource',
            LeaseOptionsSVC]);
})(angular);