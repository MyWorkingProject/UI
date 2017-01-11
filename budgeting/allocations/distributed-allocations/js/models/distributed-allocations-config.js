// Occupancy Form Config

(function (angular) {
    "use strict";

    function distributedFormConfig(
        baseFormConfig, 
        textareaConfig, 
        langTranslate) {
        var config = baseFormConfig();
        var translate;
        translate = langTranslate('allocations.distributed-allocations').translate;

        config.comment = textareaConfig({
            fieldName: "comment",
            required: true,
            placeholder: translate("bdgt_allocation_Comment")
        });

        return config;
    }

    angular
        .module("budgeting")
        .factory("distributedFormConfig", [
            "baseFormConfig",
            "rpFormTextareaConfig",
            "appLangTranslate",            
            distributedFormConfig
        ]);
})(angular);