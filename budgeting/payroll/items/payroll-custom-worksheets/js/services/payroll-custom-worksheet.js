//  Custom worksheets service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';
        function payrollCustomWorksheets() {
            var url = baseUrl + '/expenses/payroll/:payrollId/distribute/:distId/jobposition/:jobPositionId/payrollworksheetbudget',    
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getCustomWorksheets(params) {
            return payrollCustomWorksheets().get(params).$promise;
        }

        svc.getCustomWorksheets = getCustomWorksheets;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("payrollCustomWorksheetService", [
        	"$resource",
        	factory]);
})(angular);
