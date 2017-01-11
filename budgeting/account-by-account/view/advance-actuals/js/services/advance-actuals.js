//Advance Actuals Service
(function (angular) {
    'use strict';
    function advanceActualsSvc($resource) {
        var svc = {}, defaults = {};
        function saveAdvanceActuals() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/propertyactualthrough';
            actions = {
                putData: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }
        svc.saveAdvanceActuals = saveAdvanceActuals().putData;
        return svc;
    }

    angular
            .module('budgeting')
            .factory('advanceActualsSvc', ['$resource', advanceActualsSvc]);
})(angular);

