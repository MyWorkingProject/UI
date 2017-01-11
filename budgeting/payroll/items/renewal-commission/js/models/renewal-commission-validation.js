//  Salary Validation Model

(function (angular) {
    "use strict";

    function factory() {
        var model = {};

        model.chkEmpty = function(value){
        	return value === "";
        };

        model.chkIsPositiveNumber = function(value){
            return parseFloat(value) > 0;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("renewalCommnValidationModel", [factory]);
})(angular);