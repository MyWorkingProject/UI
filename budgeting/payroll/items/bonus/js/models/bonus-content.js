//  Provides lang content for bonus  Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.item.bonus').translate,
            model = {
                headerTitle: translate('header_title'),
                calculatorText: translate('lbl_calculator'),
                addItemText: translate('lbl_add_item'),
                totalFormat: translate('lbl_total'),
                noItemsMessage: translate('lbl_no_item_msg'),
                calcRequireRowMessage: translate('lbl_selected_row_missing_message')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("bonusContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
