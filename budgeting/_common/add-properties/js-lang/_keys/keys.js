(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [

            "bdgt_addProperties_header",
            "bdgt_addProperties_selectBtn",
            "bdgt_addProperties_cancelBtn",
            "bdgt_addProperties_filter_label",
            "bdgt_addProperties_searchPlaceHolder",
            "bdgt_addProperties_selectPlaceHolder",
            "bdgt_addProperties_filter",
            "bdgt_addProperties_erroPopText",
            "bdgt_addProperties_get_invalid_param",
            "bdgt_addProperties_get_noDataFound"
            
        ];

        appLangKeys.app("addProperties").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
