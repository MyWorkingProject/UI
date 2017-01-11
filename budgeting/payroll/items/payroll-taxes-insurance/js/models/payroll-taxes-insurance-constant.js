//  Salary Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant,
        taxesInsuranceContent) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.onAddPayrollTaxInsurance = "onAddPayrollTaxInsurance";
        model.methodConfig.onRemovePayrollTaxInsurance = "onRemovePayrollTaxInsurance";
        model.methodConfig.getNonExemptedItems = "getNonExemptedItems";

        model.rowConfig = {
            taxExempted: {
                dataTypeDisplay: '',
                rowType: model.rowTypeConfig.editable,
                groupID: 1,
                level: 1
            },
            total: {
                dataTypeDisplay: taxesInsuranceContent.totalMonthlySalaryText,
                rowType: model.rowTypeConfig.total,
                groupID: 2,
                level: 1,
                taxExempt: false
            }
        };

        model.templateConfig.payrollTaxInsuranceType = 'payroll/items/templates/payroll-tax-insurance-type.html';
        model.columns.title.key = 'dataTypeDisplay';

        model.getColumns = function () {
            return model.columns;
        };

        model.getRowConfigs = function () {
            return model.rowConfig;
        };

        model.getMethodConfigs = function () {
            return model.methodConfig;
        };

        model.getTemplateConfigs = function () {
            return model.templateConfig;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("taxInsuranceConstantModel", [
            'bmGridConstantModel',
            'taxInsuranceContentModel',
             factory]);
})(angular);
