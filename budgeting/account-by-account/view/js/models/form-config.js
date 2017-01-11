
(function (angular) {
    "use strict";

    function factory(baseFormConfig,menuConfig,inputConfig) {
        var model = baseFormConfig();

         model.allCategories = menuConfig({                    
            nameKey: "name",
            valueKey: "value"
        });

        model.searchFieldCfg = inputConfig({
                fieldName: "search",
                iconClass: "rp-icon-search2",
                placeholder: "GL account name"
        });

         model.allTypes = menuConfig({                    
            nameKey: "name",
            valueKey: "value",
            onChange: model.methods.get("updateAccCategories")          
        });
        
         model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("account-by-account.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory("account-by-account-config", [
            "baseFormConfig",          
             "rpFormSelectMenuConfig",
                  "rpFormInputTextConfig",
            factory
        ]);
})(angular);
