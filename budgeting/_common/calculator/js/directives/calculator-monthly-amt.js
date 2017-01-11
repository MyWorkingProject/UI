
(function (angular) {
    "use strict";

    function pricingEditable(keycode, calculatorModel) {
        function link(scope, elem, attr) {
            var onChange = function (evt) {
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
        .directive("rpCalculatorAmt", [
            "keycode",
            "calculatorModel",
            pricingEditable
        ]);
})(angular);
