//  Sample Grid Model

(function (angular) {
    "use strict";

    function factory(gridConfig) {
        var model = gridConfig();
        model.get = function () {
            var cols = [
            {
                key: "annualizeTax",
                idKey: 'payrollAnnualizeTaxID',
                type: 'select'
            },
            {
                key: "payrollType",
            },
            {
                key: "dataType"
            }];
            return cols;
        };
        model.getHeaders = function () {
            var headers = [
            {
                value: false,
                key: 'isSelected',
                type: 'select',
                text: ''
            },
            {
                key: "payrollType",
                text: "Payroll Type",
                isSortable: false,
            },
            {
                key: "dataType",
                text: "Tax Description",
                isSortable: false
            }];
            return [headers];
        };
        return model;
    }
    angular
        .module("budgeting")
        .factory("annualizeTaxGridConfig", ["rpGridConfig", factory]);
})(angular);
