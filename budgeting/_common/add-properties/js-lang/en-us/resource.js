(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("addProperties");
        bundle.set({
            bdgt_addProperties_header: 'Properties',
            bdgt_addProperties_selectBtn: 'Save',
            bdgt_addProperties_cancelBtn: 'Cancel',
            bdgt_addProperties_filter_label: 'Filter by Property',
            bdgt_addProperties_filter: 'Filter',
            bdgt_addProperties_searchPlaceHolder: 'Search',
            bdgt_addProperties_selectPlaceHolder: 'Select a option',
            bdgt_addProperties_erroPopText: 'Error',
            bdgt_addProperties_get_invalid_param: 'Add Properties Invalid Param',
            bdgt_addProperties_get_noDataFound: 'No results were found'
        });
    }
    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();