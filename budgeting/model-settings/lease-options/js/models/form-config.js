
(function (angular) {
    "use strict";

    function factory(baseFormConfig,menuConfig) {
        var model = baseFormConfig();

         model.leaseRenewalMethod = menuConfig({                    
            nameKey: "text",
            valueKey: "value"
        });

         model.openPeriodData = menuConfig({                    
            nameKey: "text",
            valueKey: "value"
        });
        
         model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("lease-option-config.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory("lease-option-config", [
            "baseFormConfig",          
             "rpFormSelectMenuConfig",
            factory
        ]);
})(angular);
