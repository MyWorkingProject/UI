//  HA Validation Model

(function (angular) {
    "use strict";

    function factory() {
        var model = {};

        model.chkEmpty = function(value){
        	return value === "";
        };

        model.chkIsNumber = function(value){
            return isFinite(value);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("haValidationModel", [
            factory]);
})(angular);