

(function (angular) {
    "use strict";
    //TODO: Service Implementation
    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function workSheetDetails() {
            var url = baseUrl + '/expenses/payroll/:payrollID/distribute/:distID/payrollby/:payrollBy/:payrollByID/payrollhourlypay',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getWorksheetDetails(params) {
            return workSheetDetails().get(params).$promise;
        }

        svc.getWorksheetDetails = getWorksheetDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("leaseWorksheetService", [
            "$resource",
            factory]);
})(angular);
