
(function (angular) {
    "use strict";

    function validatorSvc() {
        var vld = {};

        vld.checkPositiveNumber = function(val) {
            var convertedVal = Number(val);
            if(isNaN(convertedVal)) {
                return false;
            } else if(convertedVal < 0) {
                return false;
            } else if(convertedVal % 1 !== 0) {
                return false; //float
            }
            return true;
        };

        vld.checkPositiveFloat = function(val) {
            var convertedVal = Number(val);
            if(isNaN(convertedVal)) {
                return false;
            } else if(convertedVal < 0) {
                return false;
            }
            return true;
        };

      
        return vld;
    }

    angular
        .module("budgeting")
        .factory("occupancyFormValidator", [
            validatorSvc
        ]);
})(angular);