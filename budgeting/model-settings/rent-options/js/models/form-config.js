
(function (angular) {
    "use strict";

    function factory(baseFormConfig,menuConfig) {
        var model = baseFormConfig();

         model.marketRentOptions = menuConfig({                    
            nameKey: "name",
            valueKey: "value",
             onChange: model.methods.get("updateModelFlagsByCondition")
        });

         model.scheduleRentGLAccounts = menuConfig({                    
            nameKey: "name",
            valueKey: "value",
             onChange: model.methods.get("updateModelFlagsByCondition")
        });


        model.lossGainToLeaseOptions = menuConfig({                    
            nameKey: "name",
            valueKey: "value",
            onChange: model.methods.get("updateLGModelFlagsByCondition")
        });
        
         model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("rent-option-config.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
         };

         model.flushData = function () {
             model["marketRentOptions"].flushOptions();
             model["marketRentOptions"].keys = [];
             model["scheduleRentGLAccounts"].flushOptions();
             model["scheduleRentGLAccounts"].keys = [];

             model["lossGainToLeaseOptions"].flushOptions();
             model["lossGainToLeaseOptions"].keys = [];

         };



        return model;
    }

    angular
        .module("budgeting")
        .factory("rent-option-config", [
            "baseFormConfig",          
             "rpFormSelectMenuConfig",
            factory
        ]);
})(angular);
