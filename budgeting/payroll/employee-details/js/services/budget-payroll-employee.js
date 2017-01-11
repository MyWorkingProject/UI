//  Sample Grid Data Service

(function (angular) {
    "use strict";

 
    function factory($q, $http, $resource) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;
        // Getting Job Posion Names
        function loadPayrollEmployeeJobPositions() {
            var url, actions;
            url = '/api/budgeting/expenses/payroll/jobpositioncombo';
            actions = {
                getData: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }
        // Getting Employee Payroll details
        function getEmployeePayRollData() {
            var url, actions;
            url = '/api/budgeting/expenses/payroll/employee/:payRollId';
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        payRollId:0                        
                    }
                }
            };
            return $resource(url, defaults, actions);
        }
        // Getting Employee Payroll Rights details
        function getEmpPayRollRights() {
            var url, actions;
            url = '/api/budgeting/common/rightnames/:rights/userright';
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        rights: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        // Getting Employee Payroll Properties details
        function getEmployeePropertiesDetails() {
            var url, actions;
            url = '/api/budgeting/expenses/payroll/employee/:payRollId/employeeproperty';
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        payRollId:0                        
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        function deleteEmployeeProperty() {
            var url, actions;
            
            url = '/api/budgeting/expenses/employeeproperty/:employeePropertyID/deleteemployeepropertycheck';
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        employeePropertyID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }
        
        function saveEmployeePayrollData() {
            var url, actions;
            url = '/api/budgeting/expenses/employeemodel';
            actions = {               
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function saveNewEmployeePayrollData() {
            var url, actions;
            url = '/api/budgeting/expenses/employeemodel';
            actions = {
                post: {
                    method: 'POST'
                }
            };
            return $resource(url, defaults, actions);
        }

        function getPropertyListSvc(filterdata) {
            var url, defaults = {}, actions = {}, baseUrl;
            baseUrl = '/api/budgeting/common/budgetinguserproperty';
            url = baseUrl + filterdata.dataFilter;
            return $resource(url, defaults, actions);
        }

        function getPropertyList(filterdata) {            
            return getPropertyListSvc(filterdata).get().$promise;
        }

        svc.getPropertyList = getPropertyList;
        svc.loadPayrollEmployeeJobPositions = loadPayrollEmployeeJobPositions().getData;
        svc.getEmployeePayRollData = getEmployeePayRollData().getData;
        svc.getEmpPayRollRights = getEmpPayRollRights().getData;
        svc.getEmployeePropertiesDetails = getEmployeePropertiesDetails().getData;
        svc.deleteEmployeeProperty = deleteEmployeeProperty().delete;
        svc.saveEmployeePayrollData = saveEmployeePayrollData().put;
        svc.saveNewEmployeePayrollData = saveNewEmployeePayrollData().post;

        return svc;
    }

    angular
        .module("budgeting")
        .factory("payrollEmployeeSvc", ["$q", "$http", "$resource", factory]);
})(angular);

