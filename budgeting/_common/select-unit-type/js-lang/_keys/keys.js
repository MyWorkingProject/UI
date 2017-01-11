(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            "bdgt_selectUnitType_header",
            "bdgt_selectUnitType_selectBtn",
            "bdgt_selectUnitType_cancelBtn",
            "bdgt_selectUnitType_filter_label",
            "bdgt_selectUnitType_searchPlaceHolder",
            "bdgt_selectUnitType_selectPlaceHolder",
            "bdgt_selectUnitType_filter",
            "bdgt_selectUnitType_filter_noOfUnits",
            "bdgt_selectUnitType_erroPopText",
            "bdgt_selectUnitType_get_invalid_param",
            "bdgt_selectUnitType_get_noDataFound"            
        ];
        appLangKeys.app("selectUnitType").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();
