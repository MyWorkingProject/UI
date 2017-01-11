//  salary form config Model

(function (angular) {
    "use strict";

    function factory(baseFormConfig,
        inputConfig,
        datetimepickerConfig,
        salaryContent) {

        return function (src) {
            var model = baseFormConfig();

            model.setMethodsSrc(src);

            model.beginningSalaryRate = inputConfig({
                id: "beginningSalaryRate",
                fieldName: "beginningSalaryRate",
                prefix: salaryContent.preSuffixCurrency,
                suffix: salaryContent.preSuffixYear,
                placeholder: salaryContent.beginningSalaryRateText,
                required: true,
                dataType: "text",
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("beginningSalaryRateChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber")
                },
                errorMsgs: [{
                    name: "required",
                    text: salaryContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: salaryContent.shouldBeNumberErrorText
                }]
            });

            model.dateOfIncrease = datetimepickerConfig({
                id: "dateOfIncrease",
                fieldName: "dateOfIncrease",
                placeholder: salaryContent.dateOfIncreaseText,
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("dateOfIncreaseChanged"),
                validators: {
                    chkIsDate: model.methods.get("chkIsDate")
                }
            });

            model.increasePercentage = inputConfig({
                id: "increasePercentage",
                fieldName: "increasePercentage",
                suffix: salaryContent.preSuffixPercentage,
                placeholder: salaryContent.increaseText,
                dataType: "text",
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("increasePercentageChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber")
                },
                errorMsgs: [{
                    name: "required",
                    text: salaryContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: salaryContent.shouldBeNumberErrorText
                }]
            });

            model.increaseCurrency = inputConfig({
                id: "increaseCurrency",
                fieldName: "increaseCurrency",
                prefix: salaryContent.preSuffixCurrency,
                placeholder: salaryContent.increaseText,
                dataType: "text",
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("increaseCurrencyChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber")
                },
                errorMsgs: [{
                    name: "required",
                    text: salaryContent.v
                }, {
                    name: "chkIsNumber",
                    text: salaryContent.shouldBeNumberErrorText
                }]
            });

            model.endingSalaryRate = inputConfig({
                id: "endingSalaryRate",
                fieldName: "endingSalaryRate",
                prefix: salaryContent.preSuffixCurrency,
                suffix: salaryContent.preSuffixYear,
                placeholder: salaryContent.endingSalaryRateText,
                dataType: "text",
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("endingSalaryRateChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber")
                },
                errorMsgs: [{
                    name: "required",
                    text: salaryContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: salaryContent.shouldBeNumberErrorText
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
        .factory("salaryFormConfigModel", [
            "baseFormConfig",
            "rpFormInputTextConfig",
            "rpDatetimepickerConfig",
            "salaryContentModel",
             factory]);
})(angular);
