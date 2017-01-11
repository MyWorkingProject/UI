
(function (angular) {
    "use strict";

    function factory(baseFormConfig, inputConfig, datetimepickerConfig, textareaConfig, langTranslate, menuConfig) {
        var model = baseFormConfig();
        var translate;
        translate = langTranslate('addProperties').translate;

        model.searchKey = inputConfig({
            id: "searchKey",
            fieldName: "searchKey",
            required: false,
            placeholder: translate('bdgt_addProperties_searchPlaceHolder'),
            errorMsgs: [{
                name: "required",
                text: "search key is required"
            }]
        });

        return model;
    }

    angular
        .module("budgeting")
        .factory("addPropertiesConfig", [
            "baseFormConfig",
            "rpFormInputTextConfig",
             "rpDatetimepickerConfig",
            "rpFormTextareaConfig",
             "appLangTranslate",
             "rpFormSelectMenuConfig",
            factory
        ]);
})(angular);
