//  payroll dynamic items Model

(function (angular) {
    "use strict";

    function factory() {
        return function () {
            var model = {};

            model.save = angular.noop;
            model.validate = angular.noop;

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("payrollItemModel", [factory]);
})(angular);
