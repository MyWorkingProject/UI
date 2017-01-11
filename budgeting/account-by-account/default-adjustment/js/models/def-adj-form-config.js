
(function () {
    'use strict';

    function factory(rpBaseFormConfig, rpInputTextConfig, i18n) {
        var defAdjFormConfig = rpBaseFormConfig();

        /*
        defAdjFormConfig.adjPercent = rpInputTextConfig({
            type: "number",
            modelOptions: {
                updateOn: "blur"
            },
            onChange: defAdjFormConfig.methods.get("updateAdjAmount"),
            validators: {
                numOnly: defAdjFormConfig.methods.get("validateNumbers")
            },
            errorMsgs: [{
                name: "numOnly", 
                text: i18n.translate("def_adj_num_only")
            }]
        });
        */

        defAdjFormConfig.adjustmentForAll = rpInputTextConfig({
            type: "number",
            modelOptions: {
                updateOn: "blur"
            },
            onChange: defAdjFormConfig.methods.get("adjustAllPercentages"),
            validators: {
                numOnly: defAdjFormConfig.methods.get("validateNumbers")
            },
            errorMsgs: [{
                name: "numOnly", 
                text: i18n.translate("def_adj_num_only")
            }]
        });

        return defAdjFormConfig;
    }

    angular
        .module("budgeting")
        .factory("defaultAdjFormConfig", [
            "baseFormConfig",
            "rpFormInputTextConfig",
            "defaultAdjTranslatorSvc",
            factory
        ]);
})();

