//  Payroll Service

(function (angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function payrollheader() {
            var url = baseUrl + '/expenses/payroll/distribute/:distID/payrollby/:payrollBy/:payrollByID/payrollheader',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function deleteJobResource()
        {
            var url = baseUrl + '/expenses/payroll/:payrollID',
                defaults = {},
                 actions = {
                     'delete': {
                         method: 'DELETE'
                     }
                 };
            return $resource(url, defaults, actions);
        }

        function payrollSaveResource() {
            var url = baseUrl + '/expenses/payrolldata',
                defaults = {},
                actions = {
                    'update': {
                        method: 'PUT'
                    }
                };
            return $resource(url, defaults, actions);

        }

        function payrollCmtResource() {
            var url = baseUrl + '/expenses/payroll/:payrollID/distribute/:distID/payrollnotecount',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function getPayrollHeader(params) {
            return payrollheader().get(params).$promise;
        }

        function savePayrollDetails(payload) {
            return payrollSaveResource().update(payload).$promise;
        }

        function deleteJobPosition(params) {
            return deleteJobResource().delete(params).$promise;
        }

        function getPayrollCommentCount(params) {
            return payrollCmtResource().get(params).$promise;
        }

        svc.getPayrollBasicDetails = getPayrollHeader;
        svc.savePayrollDetails = savePayrollDetails;
        svc.getPayrollCommentCount = getPayrollCommentCount;
        svc.deleteJobPosition = deleteJobPosition;

        return svc;
    }

    angular
        .module("budgeting")
        .factory("payrollByService", ['$resource', factory]);
})(angular);
