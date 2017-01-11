
(function (angular) {
    "use strict";

    function factory(baseFormConfig, inputConfig, datetimepickerConfig, textareaConfig, langTranslate, menuConfig) {
        var model = baseFormConfig();
        var translate;
        translate = langTranslate('glAccountFind').translate;
        //"bdgt_glFind_searchPlaceHolder",
        //  "bdgt_glFind_selectPlaceHolder",

        model.searchKey = inputConfig({
            id: "searchKey",
            fieldName: "searchKey",
            required: false,
            placeholder: translate('bdgt_glFind_searchPlaceHolder'),
            errorMsgs: [{
                name: "required",
                text: "search key is required"
            }]
        });

        model.glAccount = menuConfig({
            id: "glAccount",
            fieldName: "glAccount",
            nameKey: "name",
            valueKey: "value",
            onChange: model.methods.get("onSelectedGlAccount")        
        });
        //ng-change="page.model.onSelectedGlAccount()"
  

        model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("gl-account-find.setOptions: " + fieldName + " is not a valid field name!");
            }
            return model;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory("find-gl-account-config", [
            "baseFormConfig",
            "rpFormInputTextConfig",
             "rpDatetimepickerConfig",
            "rpFormTextareaConfig",
             "appLangTranslate",
             "rpFormSelectMenuConfig",
            factory
        ]);
})(angular);
