(function (angular) {
    "use strict";

    function currencyEditable(keycode) {
        function link(scope, elem, attr) {
            var onKeyDown = function (evt) {
                var result = keycode.test(evt);
                var isDecimalPoint = (evt.keyCode == 110 || evt.keyCode == 190);
                return (result.numeric && !result.shift) || result.nav || isDecimalPoint;
            };

            var onChange = function (evt) {
                //make sure that the number is displayed with 2 decimals
                evt.target.value = Number(evt.target.value).toFixed(2);
            };

            elem.on("keydown.inputTypeCurrency", onKeyDown);
            elem.on("change.inputTypeCurrency", onChange);
        }

        return {
            link: link,
            restrict: "C"
        };
    }

    angular
        .module("budgeting")
        .directive("rpCurrencyEditable", [
            "keycode",
            currencyEditable
        ]);
})(angular);
