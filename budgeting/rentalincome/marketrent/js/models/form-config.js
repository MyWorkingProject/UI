(function (angular) {
    "use strict";

    function factory(baseFormConfig,menuConfig) {
        var model = baseFormConfig();

         model.source = menuConfig({                    
            nameKey: "description", //description
            valueKey: "name",
            onChange: model.methods.get("getUnitTypeName") 
        });

        model.setData = function(response){
            model["source"].flushOptions();
            var data = [{"description":"All","name":"All"}];
            data = data.concat(response.records);
            model.setOptions("source", data);
        };
        
        model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("market-rent-config.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory("market-rent-config", [
            "baseFormConfig",          
             "rpFormSelectMenuConfig",
            factory
        ]);
})(angular);
