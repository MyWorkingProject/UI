//  Provides lang content for bonus  Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.item.benefits').translate,
            model = {
                headerTitle: translate('header_title'),
                calculatorText: translate('lbl_calculator'),
                addItemText: translate('lbl_add_item'),
                totalText: translate('lbl_total'),
                noItemsMessage: translate('lbl_no-benefits-msg')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("benefitsContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
