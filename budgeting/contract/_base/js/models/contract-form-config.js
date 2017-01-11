// Occupancy Form Config

(function (angular) {
    "use strict";

    function contractFormConfig(baseFormConfig, inputConfig, textareaConfig, i18n) {
        var config = baseFormConfig();

        config.description = inputConfig({
            fieldName: "desc",
            placeholder: i18n.translate("bdgt_new_contract_desc_placeholder"),
            required: true,
            errorMsgs: [{
                name: "required",
                text: i18n.translate("bdgt_contract_desc_required")
            }]
        });

        config.notes = textareaConfig({
            fiedlName: "notes",
            placeholder: i18n.translate("bdgt_new_contract_notes_placeholder")
        });

        return config;
    }

    angular
        .module("budgeting")
        .factory("contractFormConfig", [
            "baseFormConfig",
            "rpFormInputTextConfig",
            "rpFormTextareaConfig",
            "contractTranslatorSvc",            
            contractFormConfig
        ]);
})(angular);