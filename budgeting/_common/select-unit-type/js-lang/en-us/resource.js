(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("selectUnitType");
        bundle.set({
            bdgt_selectUnitType_header: 'Select Unit Type',
            bdgt_selectUnitType_selectBtn: 'Select Unit Type',
            bdgt_selectUnitType_cancelBtn: 'Cancel',
            bdgt_selectUnitType_filter_label: 'Filter by Unit Type',
            bdgt_selectUnitType_filter_noOfUnits:'Filter by Number of Units',
            bdgt_selectUnitType_filter: 'Filter',
            bdgt_selectUnitType_searchPlaceHolder: 'Search',
            bdgt_selectUnitType_selectPlaceHolder: 'Select a option',
            bdgt_selectUnitType_erroPopText: 'Error',
            bdgt_selectUnitType_get_invalid_param: 'Unit Type Invalid Param',
            bdgt_selectUnitType_get_noDataFound: 'No results were found'
        });
    }
    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();