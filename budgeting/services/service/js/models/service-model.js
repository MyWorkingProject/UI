// service model

(function (angular) {
    "use strict";
       
    function serviceModel() {
        var model = {};

        model.serviceDetails = {
            name: "Alaram fees",
            inactive: "Active",
            glAccount: "4231.000- Contract Expences",
            amount: "1,000",
            perResidentDay: false,
            lockAmount: false,
            calculationMethod: "units by unit type"

        };

        model.getCurrentGLAccountForSearch = function () {
            return {
                masterchartID: 18,
                propertyID: 1192563,
                glAccountNumber: "",
                glAccountName: "",
                source: "AccountByAccount"
            };
        };

        return model;
    }

    angular
       .module("budgeting")
       .factory('serviceModel', [

       serviceModel]);
})(angular);