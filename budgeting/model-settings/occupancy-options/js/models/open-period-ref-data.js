// Open Period Reference Data dropdown options
(function (angular) {
    "use strict";

    function openPeriodRefDataFactory(i18n) {

        var methods = {
            // PREV_ACTUALS: {
            //     value: "PrevActual", //"prev-actuals",
            //     name: i18n.translate("oprd_actuals")
            // },
            ACTUALS: {
                value: "Actual", //"actuals",
                name: i18n.translate("oprd_actuals")
            },
            BUDGETS: {
                value: "Budget", //"budgets",
                name: i18n.translate("oprd_budgets")
            },
            FORECAST: {
                value: "Forecast", //"forecast",
                name: i18n.translate("oprd_forecast")
            },
            PROFORMA: {
                value: "Proforma", //"proforma",
                name: i18n.translate("oprd_proforma")
            }
        };
        
        var openPeriodRefData = angular.copy(methods);

        openPeriodRefData.getList = function (priorYear) {
            var options = [];
            angular.forEach(methods, function(refData) {
                var curr = angular.copy(refData);
                if(curr.value == methods.ACTUALS.value) {
                    var currPrior = angular.copy(refData),
                        priorYearTheSecond = priorYear - 1;
                    currPrior.name = priorYearTheSecond + " " + currPrior.name;
                    currPrior.value = currPrior.value + "-" + priorYearTheSecond;
                    options.push(currPrior);
                }
                
                curr.name = priorYear + " " + curr.name;
                curr.value = curr.value + "-" + priorYear;
                options.push(curr);
            });

            return options;
        };


        return openPeriodRefData;
    }

    angular
        .module("budgeting")
        .factory("openPeriodRefData", [
            "occTranslatorSvc",
            openPeriodRefDataFactory
        ]);
})(angular);