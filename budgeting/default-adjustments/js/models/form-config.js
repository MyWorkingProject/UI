// Form Config

(function (angular) {
    "use strict";
    function factory(langTranslate, baseFormConfig, textareaConfig, datetimepickerConfig, inputConfig) {
        var model = baseFormConfig();
        var translate, text;
        translate = langTranslate('defaultsAdjustments').translate;
        text = {
            leaveComment: translate('bdgt_defaultAdjustments_modelTxtBoxPlaceHolder'),
            defaultRequired: translate('bdgt_defaultAdjustments_defaultRequired')
        };
        model.adjPercent = inputConfig({
            id: "adjPercent",
            required: true,
            pattern: /^[0-9]+\.?[0-9]*$/,
            placeholder: text.leaveComment,         
            errorMsgs: [{
                name: "required",
                text: text.defaultRequired
            }]
        });

        return model;
    }
    angular
        .module("budgeting")
        .factory("defaultAdjustmentsConfig", [
            "appLangTranslate",
            "baseFormConfig",            
            "rpFormTextareaConfig",
            "rpDatetimepickerConfig",
            "rpFormInputTextConfig",            
            factory
        ]);
})(angular);
