//  Salary Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant,
        bonusContent) {
        var model = angular.merge({}, bmGridConstant);

        model.templateConfig.bonusNameUrl = "payroll/items/bonus/templates/bonus-name.html";

        model.methodConfig.onBonusChange = "onBonusChange";
        model.methodConfig.onBonusBlur = "onBonusBlur";
        model.methodConfig.getTotalBonus = "getTotalBonus";
        model.methodConfig.onAddBonus = "onAddBonus";
        model.methodConfig.onRemoveBonus = "onRemoveBonus";
        model.methodConfig.onBonusNameChange = "onBonusNameChange";
        model.methodConfig.validateBounsName = "chkBonusName";

        model.rowConfig = {
            bonus: {
                bonusName: '',
                rowType: model.rowTypeConfig.editable,
                groupID: 1,
                level: 1,
                applyValidation: true
            },
            total: {
                bonusName: bonusContent.totalFormat,
                rowType: model.rowTypeConfig.total,
                groupID: 2,
                level: 1
            }
        };
        model.columns.title.key = "bonusName";

        model.getTemplateConfigs = function () {
            return model.templateConfig;
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

        return model;
    }

    angular
        .module("budgeting")
        .factory("bonusConstantModel", [
            'bmGridConstantModel',
            'bonusContentModel',
             factory]);
})(angular);
