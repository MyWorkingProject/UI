//  Sample Grid Model

(function (angular) {
    "use strict";

    function factory(gridConfig) {
        var model = gridConfig();
        model.get = function () {
            var cols = [
            {
                key: "selector",
                type: "button",
                method: model.getMethod("changeEmployee"),
                getButtonClassNames: function () {
                    return 'btn rounded btn-outline b-primary text-primary';
                },
                getButtonText: function () {
                    return 'Select';
                }
            },
            {
                key: "employeeName",
            },
            {
                key: "jobTitle",
            },
            {
                key: "payrate"
            },
            {
                key: "payrateType"
            },
            {
                key: "departmentName"
            },
            {
                key: "costCenter"
            }];
            return cols;
        };
        model.getHeaders = function () {
            var headers = [
              {
                  key: "selector",
                  text: "Action",
                  isSortable: false
              },
             {
                 key: "employeeName",
                 text: "Employee Name",
                 isSortable: false
             },
            {
                key: "jobTitle",
                text: "Position",
                isSortable: false
            },
            {
                key: "payrate",
                text: "Salary",
                isSortable: false
            },
            {
                key: "payrateType",
                text: "Pay Type",
                isSortable: false
            },
            {
                key: "departmentName",
                text: "Department Name",
                isSortable: false
            },
            {
                key: "costCenter",
                text: "Cost Center",
                isSortable: false
            }];
            return [headers];
        };
        model.getFilters = function () {
            var filters = [];
            filters = [
            {
                key: "selector"
            },
            {
                key: "employeeName",
                type: "text",
                filterDelay: 0,
                placeholder: "Filter by Name"
            },
            {
                key: "jobTitle",
                type: "text",
                filterDelay: 0,
                placeholder: "Filter by Position"
            },
            {
                key: "payrate"
            },
            {
                key: "payrateType"
            },
            {
                key: "departmentName"
            },
            {
                key: "costCenter"
            }];
            return filters;
        };

        return model;
    }
    angular
        .module("budgeting")
        .factory("employeeSelectorGridConfig", ["rpGridConfig", factory]);
})(angular);
