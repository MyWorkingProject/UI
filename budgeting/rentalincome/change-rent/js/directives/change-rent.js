
(function (angular) {
    "use strict";

    function pricingEditable(keycode, calculatorModel, priceUtil) {
        function link(scope, elem, attr) {
            var onChange = function (evt) {
                evt.target.value = priceUtil.displayAsCurrency(evt.target.value);
                calculatorModel.setMonthlyGridData(evt.target.value);
                scope.$apply();
            };

            elem.on("change.inputTypeCurrency", onChange);
        }

        return {
            link: link,
            restrict: "C"
        };
    }

    angular
        .module("budgeting")
        .directive("rentCalculatorAmt", [
            "keycode",
            "changeRentModel",
            "rentPricingUtility",
            pricingEditable
        ]);
})(angular);
