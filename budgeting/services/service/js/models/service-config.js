//  Sample Fit Form Config

(function (angular) {
    "use strict";
    
    function factory(inputConfig) {
        var model = {};
        model.serviceName = inputConfig({
            id: 'serviceName'
        });

        model.glAccount = inputConfig({
            id: 'glAccount'
        });

        model.amount = inputConfig({
            id: 'amount'
        });


        return model;
    }

    angular
        .module("budgeting")
        .factory('serviceConfig', [
            'rpFormInputTextConfig',
        factory]);
})(angular);