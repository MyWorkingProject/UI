//Occupancy and Renewals > Summary > Grid Constant Model

(function (angular) {
    "use strict";

    function factory(bmGridConstant) {
        var model = angular.merge({}, bmGridConstant);

        model.templateConfig.itemDescription = "app/templates/oar-summary.title.html";

        model.columns.title.text = "";
        model.columns.total.state = {
            active: true,
            locked: false
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("oarSummaryGridConst", [
            "bmGridConstantModel",
            factory
        ]);
})(angular);