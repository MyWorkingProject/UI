//  Provides lang content for custom worksheets

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.items.custom_worksheet').translate,
            model = {
                headerTitle: translate('header_title'),
                lblTotal: translate('lbl_total')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("payrollCustomWorksheetsContentModel", [
            'appLangTranslate',
            factory]);
})(angular);