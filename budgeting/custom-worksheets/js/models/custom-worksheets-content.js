//  Provides lang content for hourly  Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('custom-worksheets').translate,
            model = {
                headerTitle: translate('header_title'),
                accountType: translate('lbl_account_type'),
                allAccountTypes: translate('lbl_all_account_types'),
                accountCategory: translate('lbl_account_category'),
                allAccountCategories: translate('lbl_all_account_categories'),
                filterGridText: translate('lbl_filter_grid_text'),
                customWorksheetNameText: translate('lbl_custom_worksheet_name'),
                glAccountText: translate('lbl_gl_account')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("customWorksheetsContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
