//ModelSettingsNav

(function (angular) {
    "use strict";

    function payrollBaseModel(eventStream) {
        var model = {
                ready: false,
                events: {
                    onPayrollItemUpdate: eventStream()
                }
            },
            payrollItems = {};

        model.setPayrollItems = function (_payrollItems) {
            model.ready = true;
            payrollItems = _payrollItems;
            model.events.onPayrollItemUpdate.publish();
        };

        model.getPayrollItems = function () {
            return payrollItems;
        };

        model.reset = function () {
            model.onPayrollItemUpdate.destory();
            model = {
                ready: false,
                onPayrollItemUpdate: eventStream()
            };
            payrollItems = {};
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('payrollBaseModel', [
            'eventStream',
            payrollBaseModel]);
})(angular);
