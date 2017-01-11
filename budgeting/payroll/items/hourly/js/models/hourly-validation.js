//  Salary Validation Model

(function (angular) {
    "use strict";

    function factory(moment) {
        var model = {};

        model.chkEmpty = function (value) {
            return value === "";
        };

        model.chkIsNumber = function (value) {
            return isFinite(value);
        };

        model.chkIsDate = function (value) {
            return moment.isDate(value);
        };

        model.chkIsNumberBeween = function (value) {
            return value <= 40;
        };

        model.chkNumberHasFourDecimals = function (value) {
            var match = ('' + value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            if (!match || match[0] === 0) {
                return false;
            }
            return match[0].length >= 0 && match[0].length <= 4;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("hourlyValidationModel", [
             'moment',
             factory]);
})(angular);
