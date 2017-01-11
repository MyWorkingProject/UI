// Employee Allocation validation

(function (angular) {
    "use strict";

    function factory() {
        var model = {};

        model.chkValue = function (value) {
            if (value !== '' && value !== undefined) {
                return true;
            }
            return false;
        };

        model.chkIsNumber = function (value) {
            return isFinite(value);
        };

        model.chkRange = function (value) {
            if (isFinite(value) && value !== '') {
                if (parseFloat(value) > 0 && parseFloat(value) <= 100) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };

        return model;
    }


    angular
        .module("budgeting")
        .factory("jobPositionAllocationValidation",
            factory);
})(angular);