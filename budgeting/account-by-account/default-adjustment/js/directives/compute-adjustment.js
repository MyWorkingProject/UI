(function (angular) {
    "use strict";

    function amountAdjustmentDir(keycode, defaultAdjModel) {
        function link(scope, elem, attr) {
            var onKeyDown = function (evt) {
                var result = keycode.test(evt);
                var isDash = (evt.keyCode == 189 || evt.keyCode == 109); //negative number is allowed
                //var isDecimalPoint = (evt.keyCode == 110 || evt.keyCode == 190);
                return (result.numeric && !result.shift) || result.nav || isDash; // || isDecimalPoint;
            };


            var validateNumbers = function(val) {
                if(val === undefined || val === null) {
                    return true; //not required, so empty is valid
                }

                if(isNaN(val)) {
                    return false;
                }
                return true; 
            };

            var onChange = function (evt) {
                var val = evt.target.value,
                    colId = evt.target.dataset.colId;

                //update adjusted ammount
                if(validateNumbers(val)) {
                    defaultAdjModel.computeAdjustedValue(colId, val);
                }

                //TODO indicate an error in the input
            };

            elem.on("keydown.inputTypeAdjPercent", onKeyDown);
            elem.on("change.inputTypeAdjPercent", onChange);
        }

        return {
            link: link,
            restrict: "C"
        };
    }

    angular
        .module("budgeting")
        .directive("rpAmountAdjustment", [
            "keycode",
            "defaultAdjModel",
            amountAdjustmentDir
        ]);
})(angular);
