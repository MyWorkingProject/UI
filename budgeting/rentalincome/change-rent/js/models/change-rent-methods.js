// Calcuation Methods Options

(function (angular) {
    "use strict";

    function changeRentMethodFactory(i18n, dropdownUtils) {
        var optionsData = {
            AVERAGE: {
                value: "average",
                name: i18n.translate("bdgt_change_rent_average"),
                desc: i18n.translate("bdgt_change_rent_average_hint")
            },
            APPLY_MARKETRENT:"",
            APPLY_ACTUALRENT:"",
            COMPOUND_CURRENCY: {
                value: "compound-currency",
                name: i18n.translate("bdgt_change_rent_compund_currency"),
                desc: i18n.translate("bdgt_change_rent_compund_currency_hint")
            },
            COMPOUND_PERCENTAGE: {
                value: "compound-percent",
                name: i18n.translate("bdgt_change_rent_compund_percent"),
                desc: i18n.translate("bdgt_change_rent_compund_percent_hint")
            },
            ID_MONTHLY_CURRENCY: {
                value: "id-monthly-currency",
                name: i18n.translate("bdgt_change_rent_id_monthly_currency"),
                desc: i18n.translate("bdgt_change_rent_id_monthly_currency_hint")
            },
            ID_MONTHLY_PERCENTAGE: {
                value: "id-monthly-percent",
                name: i18n.translate("bdgt_change_rent_id_monthly_percent"),
                desc: i18n.translate("bdgt_change_rent_id_monthly_percent_hint")
            },
            ID_MONTHLY_CURRENCY_EXPIRY: "",
            ID_MONTHLY_PERCENTAGE_EXPIRY: "",
            ID_ANNUALLY_CURRENCY: {
                value: "id-annually-currency",
                name: i18n.translate("bdgt_change_rent_id_annual_currency"),
                desc: i18n.translate("bdgt_change_rent_id_annual_currency_hint")
            },
            ID_ANNUALLY_PERCENTAGE: {
                value: "id-annually-percent",
                name: i18n.translate("bdgt_change_rent_id_annual_percent"),
                desc: i18n.translate("bdgt_change_rent_id_annual_percent_hint")
            },
            MULTIPLICATION: {
                value: "multiplication",
                name: i18n.translate("bdgt_change_rent_multiplication"),
                desc: i18n.translate("bdgt_change_rent_multiplication_hint")
            },
            QUARTERLY: {
                value: "quarterly",
                name: i18n.translate("bdgt_change_rent_quarterly"),
                desc: i18n.translate("bdgt_change_rent_quarterly_hint")
            },
            STRAIGHT_MONTHLY: {
                value: "straight-monthly",
                name: i18n.translate("bdgt_change_rent_straight_monthly"),
                desc: i18n.translate("bdgt_change_rent_straight_monthly_hint")
            },
            STRAIGHT_ANNUALLY: {
                value: "straight-annually",
                name: i18n.translate("bdgt_change_rent_straight_annual"),
                desc: i18n.translate("bdgt_change_rent_straight_annual_hint")
            }/*,
            APPLY_MARKETRENT: {
                value: "applyMR",
                name: i18n.translate("bdgt_change_rent_apply_mr"),
                desc: i18n.translate("bdgt_change_rent_apply_mr_hint")
            },
            APPLY_ACTUALRENT: {
                value: "applyAR",
                name: i18n.translate("bdgt_change_rent__apply_ar"),
                desc: i18n.translate("bdgt_change_rent_apply_ar_hint")
            }*/

        };

        var APPLY_MARKETRENT = { 
                                    value: "applyMR",
                                    name: i18n.translate("bdgt_change_rent_apply_mr"),
                                    desc: i18n.translate("bdgt_change_rent_apply_mr_hint")
                               };
         var APPLY_ACTUALRENT = { 
                                    value: "applyAR",
                                    name: i18n.translate("bdgt_change_rent__apply_ar"),
                                    desc: i18n.translate("bdgt_change_rent_apply_ar_hint")
                               };
         var ID_MONTHLY_CURRENCY_EXPIRY = {
                                    value: "id-monthly-currency-expiry",
                                    name: i18n.translate("bdgt_change_rent_id_monthly_currency_expiry"),
                                    desc: i18n.translate("bdgt_change_rent_id_monthly_currency_expiry_hint")
                                };
         var ID_MONTHLY_PERCENTAGE_EXPIRY =  {
                                    value: "id-monthly-percent-percent-expiry",
                                    name: i18n.translate("bdgt_change_rent_id_monthly_percent_expiry"),
                                    desc: i18n.translate("bdgt_change_rent_id_monthly_percent_expiry_hint")
                                };  


        var options = {}, calculations = angular.copy(optionsData);

        calculations.init = function(){
            options = angular.copy(optionsData);
        };

        calculations.getStrMntVal = function(){
            return calculations.STRAIGHT_MONTHLY.value;
        };

        //returns the options into array
        calculations.getList = function (addRentMethods) {
            if(addRentMethods){
                options.APPLY_MARKETRENT = APPLY_MARKETRENT;
                options.APPLY_ACTUALRENT = APPLY_ACTUALRENT;
                options.ID_MONTHLY_CURRENCY_EXPIRY = ID_MONTHLY_CURRENCY_EXPIRY;
                options.ID_MONTHLY_PERCENTAGE_EXPIRY = ID_MONTHLY_PERCENTAGE_EXPIRY;
            }
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

        calculations.reset = function(){
            options = angular.copy(optionsData);
        };

    

        return calculations;
    }

    angular
        .module("budgeting")
        .factory('changeRentMethods', [
            "changeRentTranslatorSvc",
            "rentDropdownUtilities",
            changeRentMethodFactory
        ]);
})(angular);