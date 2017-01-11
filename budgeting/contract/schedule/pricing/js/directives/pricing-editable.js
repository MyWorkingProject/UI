//  Pricing Grid Editable Cells Directive

(function (angular) {
    "use strict";

    function pricingEditable(keycode, pricingModel) {
        function link(scope, elem, attr) {
            var onKeyDown = function (evt) {
                var result = keycode.test(evt);
                var isDecimalPoint = (evt.keyCode == 110 || evt.keyCode == 190);
                return (result.numeric && !result.shift) || result.nav || isDecimalPoint;
            };

            var onChange = function (evt) {
                if (elem.hasClass("ng-invalid")) {
                    return;
                }

                var duration = attr.duration.split("-");
                pricingModel.updateTotal(duration[0], duration[1]);
            };

            var onFocus = function(evt) {                
                var period = attr.duration.split("-");
                pricingModel.assignActivePeriod(period[1]);
            };

            elem.on("keydown.inputTypeCurrency", onKeyDown);
            elem.on("change.pricingValue", onChange);
            elem.on("focus.pricingValue", onFocus);
        }

        return {
            link: link,
            restrict: "C"
        };
    }

    angular
        .module("budgeting")
        .directive("rpPricingEditable", [
            "keycode",
            "pricingModel",
            pricingEditable
        ]);
})(angular);
