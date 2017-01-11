(function (angular) {
    "use strict";

    function defAdjParamsFatory() {

        var defAdj = {
            year: null, //budgetModelDetails.budgetYear
            type: null, //budgetModelDetails.budgetType

            adjustments: [],
            applyChanges: angular.noop
        };

        return defAdj;
    }

    angular
        .module("budgeting")
        .factory("defAdjustmentParams", [
            defAdjParamsFatory
        ]);

})(angular);

/*
var mockData = {
    year: 2014,
    type: "Forecast",
    adjustments: [
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
        { "amount": 1000, "percentage": 100 },
    ],
};

    defAdj.applyChanges - function that is triggered when the user clicks on the "Apply" button.
        This receives 1 parameter - updated data formatted like defAdj.adjustments
            applyChanges = function(updatedData) {
                //use updated data here    
            };
*/
