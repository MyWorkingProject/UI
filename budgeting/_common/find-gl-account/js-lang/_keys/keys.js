(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "bdgt_glFind_header",
            "bdgt_glFind_selectBtn",
            "bdgt_glFind_cancelBtn",
            "bdgt_glFind_searchPlaceHolder",
            "bdgt_glFind_selectPlaceHolder",
            "bdgt_glFind_erroPopText",
            "bdgt_glFind_get_invalid_param"
            
        ];

        appLangKeys.app("glAccountFind").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
