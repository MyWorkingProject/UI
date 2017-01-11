//  Sample Grid Model

(function (angular) {
    "use strict";

    function factory(gridConfig, payrollEmployeeModel) {
        var model = gridConfig();
        model.get = function () {
            var cols = [];
            cols = [{
                        key: "propertyName",
                        type: 'custom',
                        templateUrl: 'app/templates/payroll-employee-details.html'
                    },
                    {
                        key: "allocationPercent",
                        type: 'custom',
                        templateUrl: 'app/templates/payroll-employee-allocation.html'
                    },
                    {
                        key: "payrolMethod",
                        type: 'custom',
                        templateUrl: 'app/templates/payroll-employee-payroll-method.html'
                    },
                    {
                        key: "jobPositionName",
                        type: 'custom',
                        templateUrl: 'app/templates/payroll-employee-position.html'
                    },
                     {
                         key: "startDate",
                         type: 'custom',
                         templateUrl: 'app/templates/payroll-employee-start-date.html'
                     },
                     {
                         key: "endDate",
                         type: 'custom',
                         templateUrl: 'app/templates/payroll-employee-end-date.html'
                     },
                      {
                         key: "departmentName",
                         type: 'custom',
                         templateUrl: 'app/templates/payroll-employee-department.html'
                         },
                      {
                          key: "costCenter",
                          type: 'custom',
                          templateUrl: 'app/templates/payroll-employee-cost-center.html'
                      },
                     {
                         key: "deleteRow",
                         type: 'custom',
                         templateUrl: 'app/templates/payroll-employee-row-delete.html'
                     }
                ];

            return cols;
        };
        model.getHeaders = function () {
            var headers = [];
            headers = [{
                key: "propertyName",
                text: "Property",
                isSortable: false,
            },
            {
                key: "allocationPercent",
                text: "Allocation",
                isSortable: false
            },
            {
                key: "payrolMethod",
                text: "Payrol Input Method",
                isSortable: false
            },            
            {
                key: "jobPositionName",
                text: "Position",
                isSortable: false
            },            
            {
                key: "startDate",
                text: "Start Date",
                isSortable: false
            },            
            {
                key: "endDate",
                text: "End Date",
                isSortable: false
            },
            
            {
                key: "departmentName",
                text: "Department",
                isSortable: false
            },
              {
                  key: "costCenter",
                  text: "Cost Center",
                  isSortable: false
              },

             {
                 key: "deleteRow",
                 text: ""
             }
            ];
            return [headers];
        };
        model.getFilters = function () {
            var filters = [];
            filters = [{
                key: "propertyName",
                type: "text",
                filterDelay: 0,
                placeholder: "Filter by name"
            },
            {
                key: "allocationPercent",
                type: "text",
                filterDelay: 0,
                placeholder: "Filter by title"
            }];
            return filters;
        };
        return model;
    }
    angular
        .module("budgeting")
        .factory("payrollGridConfig", ["rpGridConfig", "payrollEmployeeModel", factory]);
})(angular);
