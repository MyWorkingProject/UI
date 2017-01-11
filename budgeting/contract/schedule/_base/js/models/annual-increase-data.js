// Annual Increase Options

(function (angular) {
    "use strict";

    function annualIncreaseFactory(i18n) {
        // Type of Annual Increase
        var type = {
            CURRENCY: {
                value: "currency",
                name: "$"
            },
            PERCENT: {
                value: "percent",
                name: "%"
            }
        };

        // When is it considered "a year"?
        var basis = {
            ANNIV: {
                value: "anniv",
                name: i18n.translate("bdgt_new_contract_ai_anniv")
            },
            CALENDAR: {
                value: "calendarYear",
                name: i18n.translate("bdgt_new_contract_ai_calendar")
            }
        };

        var annualIncrease = {
            type: angular.copy(type),
            basis: angular.copy(basis)
        };

        annualIncrease.getTypeList = function () {
            var arr = [];
            angular.forEach(type, function (value) {
                arr.push(value);
            });
            return arr;
        };
        annualIncrease.getBasisList = function () {
            var arr = [];
            angular.forEach(basis, function (value) {
                arr.push(value);
            });
            return arr;
        };

        annualIncrease.getTypeDisplay = function(activeAIType) {
            for(var idx in type)  {
                if(type.hasOwnProperty(idx)) {
                    var aiType = type[idx];
                    if(aiType.value === activeAIType) {
                        return aiType.name;
                    }
                }
            }
            return "";
        };

        return annualIncrease;
    }

    angular
        .module("budgeting")
        .factory('annualIncrease', [
            "contractTranslatorSvc",
            annualIncreaseFactory
        ]);
})(angular);