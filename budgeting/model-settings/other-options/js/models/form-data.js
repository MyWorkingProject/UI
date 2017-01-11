(function (angular) {
    "use strict";

    function factory(moment) {
        return {
            budgetModelID: 0,
            propertyID: 0,
            distributedID: 0,
            assetType: "",
            hudid: "",
            owner: "",
            yearBuilt: "",
            propertyCode: "",
            attachedGarages: "",
            storageUnits: "",
            detachedGarages: "",
            carports: "",
            payrollIncreaseDate: "",
            payrollIncreasePercent: 0,
            payrolDate:""

        };
    }

    angular
        .module("budgeting")
        .factory("options-form-data", ['moment',factory]);
})(angular);
