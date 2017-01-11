(function (angular) {
    "use strict";

    function factory(budgetModelDetails) {
        var model = {};

        

        return model;

    }

    angular
        .module("budgeting")
        .factory('budgetDetails', [
            'budgetModelDetailsModel',
            factory
        ]);
})(angular);
