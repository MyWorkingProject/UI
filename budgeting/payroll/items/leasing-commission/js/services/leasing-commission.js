//  Pay Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = "/api/budgeting";
        function payrollItemLeasingComm() {
            var url = baseUrl + "/expenses/payroll/:payrollID/distribute/:distID/payrollby/:payrollBy/:payrollByID/payrollmonthlyleasing",
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getLeasingCommDetails(params){
            return payrollItemLeasingComm().get(params).$promise;
        }

        svc.getLeasingCommDetails = getLeasingCommDetails;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("leasingCommService", [
        	"$resource",
        	factory]);
})(angular);
