//  ha form config Model

(function (angular) {
    "use strict";

    function factory(baseFormConfig,
        inputConfig,
        menuConfig,
        haContent) {

        return function (src) {
            var model = baseFormConfig();
            model.setMethodsSrc(src);

            model.rateOptions = menuConfig({
                nameKey: "housingMarketRentValue",
                valueKey: "housingMarketRentID",
                onChange: model.methods.get("onRateChanged")

            });

            model.criteriaOptions = menuConfig({
                nameKey: "name",
                valueKey: "value",
                onChange: model.methods.get("onCriteriaChanged")

            }).setOptions([{
                    name: haContent.preSuffixCurrency,
                    value: "Dollor"
                }, {
                    name: haContent.preSuffixPercentage,
                    value: "Percentage"
                }]);

            model.allowanceCurrency = inputConfig({
                id: "allowanceCriteria",
                fieldName: "allowanceCriteria",
                prefix: haContent.preSuffixCurrency,
                required: true,
                dataType: "text",
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("allowanceChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber")
                },
                errorMsgs: [{
                    name: "required",
                    text: haContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: haContent.shouldBeNumberErrorText
                }]
            });

            model.allowancePercentage = inputConfig({
                id: "allowanceCriteria",
                fieldName: "allowanceCriteria",
                suffix: haContent.preSuffixPercentage,
                required: true,
                dataType: "text",
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("allowanceChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber")
                },
                errorMsgs: [{
                    name: "required",
                    text: haContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: haContent.shouldBeNumberErrorText
                }]
            });

            model.destroy = function () {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("haFormConfigModel", [
            "baseFormConfig",
            "rpFormInputTextConfig",
            "rpFormSelectMenuConfig",
            "haContentModel",
             factory]);
})(angular);
