//  Provides lang content for Leasing Commission Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate("payroll.items.leasingCommission").translate,
            model = {
                headerTitle: translate("header_title"),
                calculatorText: translate("lbl_calculator"),
                moveInsPercentText: translate("lbl_move_ins_percent"),
                commissionAmtText: translate("lbl_commission_amt"),

                colMoveIns: translate("grid_move_ins_amt"),
                colMoveInsPercent: translate("grid_move_ins_percent"),
                colCommissionAmt: translate("grid_commission_amt"),
                colCommissionTotal: translate("grid_commission_total"),
                colAdditionalAmt: translate("grid_additional_amt"),
                colTotal: translate("grid_total_amt"),

                affixPercent: translate("affix_percent"),
                affixCurrency: translate("affix_currency"),

                errPositiveNum: translate("err_positive_num"),
                calcRequireRowMessage: translate('lbl_selected_row_missing_message')

            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("leasingComContentModel", [
            "appLangTranslate",
            factory]);
})(angular);
