// Occupancy Goal %

(function (angular) {
    "use strict";

    function occGoalTypeFactory(i18n, selectUtils) {

        var methods = {
            MONTHLY: {
                value: "Monthly",
                name: i18n.translate("og_monthly")
            },
            ANNUALLY: {
                value: "Annual",
                name: i18n.translate("og_annual")
            },
            USE_REF_DATA: {
                value: "Use reference data",
                name: i18n.translate("og_ref_data")
            }
        };
        
        var occupancyGoalType = angular.copy(methods);

        occupancyGoalType.isMonthly = function(val) {
            if(val.toLowerCase() == methods.MONTHLY.value.toLowerCase()) {
                return true;
            }
            return false;
        };

        occupancyGoalType.isAnnual = function(val) {
            if(val.toLowerCase() == methods.ANNUALLY.value.toLowerCase()) {
                return true;
            }
            return false;
        };
      
        return occupancyGoalType;
    }

    angular
        .module("budgeting")
        .factory("occupancyGoalType", [
            "occTranslatorSvc",
            occGoalTypeFactory
        ]);
})(angular);