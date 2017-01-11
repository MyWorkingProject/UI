(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("glAccountFind");

        bundle.set({

            bdgt_glFind_header:'Find GL Account',
            bdgt_glFind_selectBtn : 'Select',
            bdgt_glFind_cancelBtn :'Cancel',
            bdgt_glFind_searchPlaceHolder : 'GL Account',
            bdgt_glFind_selectPlaceHolder:'Select a option',
            bdgt_glFind_erroPopText :'Error',
            bdgt_glFind_get_invalid_param:'GL Acount Find Invalid Param'
           
        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();