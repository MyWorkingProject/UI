//  hourly form config Model

(function (angular) {
    "use strict";

    function factory(baseFormConfig,
        inputConfig,
        datetimepickerConfig,
        hourlyContent) {

        return function (src) {
            var model = baseFormConfig();

            model.setMethodsSrc(src);

            model.beginningHourlyRate = inputConfig({
                id: "beginningHourlyRate",
                fieldName: "beginningHourlyRate",
                prefix: hourlyContent.preSuffixCurrency,
                suffix: hourlyContent.preSuffixHour,
                placeholder: hourlyContent.beginningHourlyRateText,
                required: true,
                dataType: "text",
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("beginningHourlyRateChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber"),
                    chkNumberHasFourDecimals: model.methods.get("chkNumberHasFourDecimals")
                },
                errorMsgs: [{
                    name: "required",
                    text: hourlyContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: hourlyContent.shouldBeNumberErrorText
                }, {
                    name: "chkNumberHasFourDecimals",
                    text: hourlyContent.shouldBeFourDecimalErrorText
                }]
            });

            model.dateOfIncrease = datetimepickerConfig({
                id: "dateOfIncrease",
                fieldName: "dateOfIncrease",
                placeholder: hourlyContent.dateOfIncreaseText,
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("dateOfIncreaseChanged")
            });

            model.increasePercentage = inputConfig({
                id: "increasePercentage",
                fieldName: "increasePercentage",
                suffix: hourlyContent.preSuffixPercentage,
                placeholder: hourlyContent.increaseText,
                dataType: "text",
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("increasePercentageChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber"),
                    chkNumberHasFourDecimals: model.methods.get("chkNumberHasFourDecimals")
                },
                errorMsgs: [{
                    name: "required",
                    text: hourlyContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: hourlyContent.shouldBeNumberErrorText
                }, {
                    name: "chkNumberHasFourDecimals",
                    text: hourlyContent.shouldBeFourDecimalErrorText
                }]
            });

            model.increaseCurrency = inputConfig({
                id: "increaseCurrency",
                fieldName: "increaseCurrency",
                prefix: hourlyContent.preSuffixCurrency,
                placeholder: hourlyContent.increaseText,
                dataType: "text",
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("increaseCurrencyChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber"),
                    chkNumberHasFourDecimals: model.methods.get("chkNumberHasFourDecimals")
                },
                errorMsgs: [{
                    name: "required",
                    text: hourlyContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: hourlyContent.shouldBeNumberErrorText
                }, {
                    name: "chkNumberHasFourDecimals",
                    text: hourlyContent.shouldBeFourDecimalErrorText
                }]
            });

            model.endingHourlyRate = inputConfig({
                id: "endingHourlyRate",
                fieldName: "endingHourlyRate",
                prefix: hourlyContent.preSuffixCurrency,
                suffix: hourlyContent.preSuffixHour,
                placeholder: hourlyContent.endingHourlyRateText,
                dataType: "text",
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("endingHourlyRateChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber"),
                    chkNumberHasFourDecimals: model.methods.get("chkNumberHasFourDecimals")
                },
                errorMsgs: [{
                    name: "required",
                    text: hourlyContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: hourlyContent.shouldBeNumberErrorText
                }, {
                    name: "chkNumberHasFourDecimals",
                    text: hourlyContent.shouldBeFourDecimalErrorText
                }]
            });

            model.regularHoursPerWeek = inputConfig({
                id: "regularHoursPerWeek",
                fieldName: "regularHoursPerWeek",
                placeholder: hourlyContent.regularHoursPerWeekText,
                dataType: "text",
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("regularHoursPerWeekChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber"),
                    chkIsNumberBeween: model.methods.get("chkIsNumberBeween")
                },
                errorMsgs: [{
                    name: "required",
                    text: hourlyContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: hourlyContent.shouldBeNumberErrorText
                }, {
                    name: "chkIsNumberBeween",
                    text: hourlyContent.shouldBeBetweenErrorText
                }]
            });

            model.overtimeHoursPerWeek = inputConfig({
                id: "overtimeHoursPerWeek",
                fieldName: "overtimeHoursPerWeek",
                placeholder: hourlyContent.overtimeHoursPerWeekText,
                dataType: "text",
                required: true,
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: false
                },
                onChange: model.methods.get("overtimeHoursPerWeekChanged"),
                validators: {
                    chkIsNumber: model.methods.get("chkIsNumber"),
                    chkIsNumberBeween: model.methods.get("chkIsNumberBeween")
                },
                errorMsgs: [{
                    name: "required",
                    text: hourlyContent.requiredErrorText
                }, {
                    name: "chkIsNumber",
                    text: hourlyContent.shouldBeNumberErrorText
                }, {
                    name: "chkIsNumberBeween",
                    text: hourlyContent.shouldBeBetweenErrorText
                }]
            });

            model.setDateOfIncrease = function (date) {
                model.dateOfIncrease.setOption("defaultDate", new Date(date));
            };

            model.destroy = function () {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("hourlyFormConfigModel", [
            "baseFormConfig",
            "rpFormInputTextConfig",
            "rpDatetimepickerConfig",
            "hourlyContentModel",
             factory]);
})(angular);
