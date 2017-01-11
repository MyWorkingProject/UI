//  Salary Validation Model

(function (angular) {
    "use strict";

    function factory(moment) {
        var model = {};

        model.chkEmpty = function(value){
        	return value === "";
        };

        model.chkIsNumber = function(value){
            return isFinite(value);
        };

        model.chkIsDate = function(value){
            return moment.isDate(value);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("salaryValidationModel", [
            'moment', 
            factory]);
})(angular);