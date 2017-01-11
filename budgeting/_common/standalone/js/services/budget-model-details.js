//  Budget Property Model service

(function (angular) {
    "use strict";

    function budgetModelSvc($resource) {
        var svc = {};

        function budgetModelResource() {
            var url = '/api/budgeting/dashboard/distribute/:distID/propertymodelworkflowinfo';
            return $resource(url);
        }

        function driverAccessResource(){
            var url = '/api/budgeting/budgetmodel/workflow/distribute/:distID/userworkflowdriveraccess';
            return $resource(url);
        }

        function getPropertyModelDetails(params){
            return budgetModelResource().get(params).$promise;
        }

        function getUserDriverAccess(params){
            return driverAccessResource().get(params).$promise;
        }

        svc.getPropertyModelDetails = getPropertyModelDetails;
        svc.getUserDriverAccess = getUserDriverAccess;

        return svc;
    }

    angular.module("budgeting")
        .factory('budgetModelSvc', [
            '$resource',
            budgetModelSvc]);
})(angular);
