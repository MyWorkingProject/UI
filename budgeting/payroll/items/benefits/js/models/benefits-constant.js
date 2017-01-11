//  Salary Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant,
        benefitsContent) {
        var model = angular.merge({}, bmGridConstant);

        model.templateConfig.itemDescriptionUrl = "payroll/items/benefits/templates/benefit-name.html";

        model.methodConfig.validateBenefit = "chkUniqueBenefit";
        model.methodConfig.addBenefitsItem = "addBenefitsItem";
        model.methodConfig.deleteBenefitsItem = "deleteBenefitsItem";
        model.methodConfig.getBenefitsOptions = "getBenefitsOptions";
        model.methodConfig.onBenefitChange = "onBenefitChange";

        model.rowConfig = {
            benefits: {
                benefitName: '',
                rowType: model.rowTypeConfig.editable,
                groupID: 1,
                level: 1,
                applyValidation: true
            },
            total: {
                benefitName: benefitsContent.totalText,
                rowType: model.rowTypeConfig.total,
                groupID: 2,
                level: 1
            }
        };
        model.columns.title.key = "benefitName";

        model.getColumns = function () {
            return model.columns;
        };

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
        .factory("benefitsConstantModel", [
            'bmGridConstantModel',
            'benefitsContentModel',
             factory]);
})(angular);
