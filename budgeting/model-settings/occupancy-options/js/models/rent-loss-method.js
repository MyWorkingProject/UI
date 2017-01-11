// Basis for Vacancy/Non-Revenue Units Rent dropdown options

(function (angular) {
    "use strict";

    function rentLossFactory($filter, i18n) {

        var methods = {
            MARKET_RENT: {
                value: "Market Rent",
                name: i18n.translate("nr_market_rent")
            },
            ACTUAL_RENT: {
                value: "Actual Rent",
                name: i18n.translate("nr_actual_rent")
            }
        };
        
        var rentLoss = angular.copy(methods);

        rentLoss.getList = function (marketRentMethod, actualRentMethod) {
            var options = [];

            if(!rentLoss.isNone(marketRentMethod)) {
                options.push(angular.copy(methods.MARKET_RENT));
            }
            if(!rentLoss.isNone(actualRentMethod)) {
                options.push(angular.copy(methods.ACTUAL_RENT));
            }

            return options;
        };

        rentLoss.isNone = function(val) {
            if(!val) {
                return true;
            }
            var str = val.toLowerCase();
                str = str.trim();
            return val === "none" || val === "";
        };

        return rentLoss;
    }

    angular
        .module("budgeting")
        .factory("rentLossMethod", [
            "$filter",
            "occTranslatorSvc",
            rentLossFactory
        ]);
})(angular);