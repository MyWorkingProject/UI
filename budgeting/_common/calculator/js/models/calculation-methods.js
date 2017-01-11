// Calcuation Methods Options

(function (angular) {
    "use strict";

    function calculationMethodFactory(i18n, dropdownUtils) {
        var options = {
            AVERAGE: {
                value: "average",
                name: i18n.translate("bdgt_calculator_average"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_average_hint")
                }]
            },
            COMPOUND_CURRENCY: {
                value: "compound-currency",
                name: i18n.translate("bdgt_calculator_compund_currency"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_compund_currency_hint_1"),
                }, {
                    msg: i18n.translate("bdgt_calculator_compund_currency_hint_2"),
                }]
            },
            COMPOUND_PERCENTAGE: {
                value: "compound-percent",
                name: i18n.translate("bdgt_calculator_compund_percent"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_compund_percent_hint_1")
                }, {
                    msg: i18n.translate("bdgt_calculator_compund_percent_hint_2")
                }, {
                    msg: i18n.translate("bdgt_calculator_compund_percent_hint_3")
                }]
            },
            ID_ANNUALLY_CURRENCY: {
                value: "id-annually-currency",
                name: i18n.translate("bdgt_calculator_id_annual_currency"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_id_annual_currency_hint_1")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_annual_currency_hint_2")
                }]
            },
            ID_ANNUALLY_PERCENTAGE: {
                value: "id-annually-percent",
                name: i18n.translate("bdgt_calculator_id_annual_percent"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_id_annual_percent_hint_1")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_annual_percent_hint_2")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_annual_percent_hint_3")
                }]
            },
            ID_MONTHLY_CURRENCY: {
                value: "id-monthly-currency",
                name: i18n.translate("bdgt_calculator_id_monthly_currency"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_id_monthly_currency_hint_1"),
                    isHeader: true
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_currency_hint_2")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_currency_hint_3")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_currency_hint_4"),
                    isHeader: true
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_currency_hint_5")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_currency_hint_6")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_currency_hint_7"),
                    isHeader: true
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_currency_hint_8")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_currency_hint_9")
                }]
            },
            ID_MONTHLY_PERCENTAGE: {
                value: "id-monthly-percent",
                name: i18n.translate("bdgt_calculator_id_monthly_percent"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_1"),
                    isHeader: true
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_2")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_3")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_4"),
                    isHeader: true
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_5")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_6")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_7"),
                    isHeader: true
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_8")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_9")
                }, {
                    msg: i18n.translate("bdgt_calculator_id_monthly_percent_hint_10")
                }]
            },
            MULTIPLICATION: {
                value: "multiplication",
                name: i18n.translate("bdgt_calculator_multiplication"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_multiplication_hint")
                }]
            },
            QUARTERLY: {
                value: "quarterly",
                name: i18n.translate("bdgt_calculator_quarterly"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_quarterly_hint_1")
                }, {
                    msg: i18n.translate("bdgt_calculator_quarterly_hint_2")
                }, {
                    msg: i18n.translate("bdgt_calculator_quarterly_hint_3")
                }, {
                    msg: i18n.translate("bdgt_calculator_quarterly_hint_4")
                }]
            },
            STRAIGHT_MONTHLY: {
                value: "straight-monthly",
                name: i18n.translate("bdgt_calculator_straight_monthly"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_straight_monthly_hint_1")
                }, {
                    msg: i18n.translate("bdgt_calculator_straight_monthly_hint_2")
                }]
            },
            STRAIGHT_ANNUALLY: {
                value: "straight-annually",
                name: i18n.translate("bdgt_calculator_straight_annual"),
                desc: [{
                    msg: i18n.translate("bdgt_calculator_straight_annual_hint_1")
                }, {
                    msg: i18n.translate("bdgt_calculator_straight_annual_hint_2")
                }]
            }

        };

        var calculations = angular.copy(options);

        //returns the options into array
        calculations.getList = function () {
            return dropdownUtils.toSelectOptions(options);
        };

        calculations.getMethodObj = function (value) {
            for (var key in options) {
                var obj = options[key];
                if (obj.value === value) {
                    return obj;
                }
            }
        };

        return calculations;
    }

    angular
        .module("budgeting")
        .factory('calculationMethods', [
            "calcuTranslatorSvc",
            "dropdownUtilities",
            calculationMethodFactory
        ]);
})(angular);