// Occupancy Method Dropdown options

(function (angular) {
    "use strict";

    function occupancyMethodFactory(i18n) {

        var methods = {
            NONE: {
                value: "None",
                name: i18n.translate("none")
            },
            WORKSHEET: {
                value: "Worksheet",
                name: i18n.translate("occm_worksheet")
            },
            WORKSHEET_SG: {
                value: "Worksheet",
                name: i18n.translate("occm_worksheet_sg")
            }
        };
        
        var occupancyMethod = angular.copy(methods);

        occupancyMethod.getList = function (isSeniorLiving) {
            var occMethods = [];

            occMethods.push(angular.copy(methods.NONE));
            if(isSeniorLiving) {
                occMethods.push(angular.copy(methods.WORKSHEET_SG));            
            } else {
                occMethods.push(angular.copy(methods.WORKSHEET));
            }

            return occMethods;
        };

        occupancyMethod.isNone = function(val) {
            if(val === null || val === undefined) {
                return false;
            }

            var testVal = val;
            if(typeof val !== "string") {
                testVal = val.value;
            }
            if(testVal.toLowerCase() == methods.NONE.value.toLowerCase()) {
                return true;
            }

            return false;
        };

        occupancyMethod.setValue = function(val) {
            for(var key in methods) {
                if(methods.hasOwnProperty(key)) {
                    var curr = methods[key];
                    if(curr.value == val) {
                        return angular.copy(curr);
                    }
                }
            }
            return;
        };

        return occupancyMethod;
    }

    angular
        .module("budgeting")
        .factory("occupancyMethod", [
            "occTranslatorSvc",
            occupancyMethodFactory
        ]);
})(angular);