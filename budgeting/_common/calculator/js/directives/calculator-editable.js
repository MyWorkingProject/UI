(function (angular) {
    "use strict";

    function currencyEditable(calculatorModel, keycode) {
        function link(scope, elem, attr) {
            var onKeyDown = function (evt) {
                var result = keycode.test(evt);
                var isDecimalPoint = (evt.keyCode == 110 || evt.keyCode == 190);
                return (result.numeric && !result.shift) || result.nav || isDecimalPoint;
            };

            var onChange = function (evt) {
                var newVal = evt.target.value;

                //make sure that the number is displayed with 2 decimals
                evt.target.value = Number(newVal).toFixed(calculatorModel.getMaxDecimal());

                //update total
                var rowType = evt.target.dataset.rowType || evt.target.getAttribute("data-row-Type"),
                    period = evt.target.dataset.period || evt.target.getAttribute("data-period");

                calculatorModel.calculateTotal(rowType, period, newVal);
                scope.$apply();
            };

            elem.on("keydown.inputTypeCalculator", onKeyDown);
            elem.on("change.inputTypeCalculator", onChange);
        }

        return {
            link: link,
            restrict: "C"
        };
    }

    angular
        .module("budgeting")
        .directive("rpCalculatorEditable", [
            "calculatorModel", 
            "keycode",
            currencyEditable
        ]);
})(angular);
