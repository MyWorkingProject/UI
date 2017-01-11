(function (angular) {
    "use strict";

    function factory(baseFormConfig, menuConfig, inputConfig) {
        var model = baseFormConfig();

         model.source = menuConfig({                    
            nameKey: "method", //description
            valueKey: "method",
            onChange: model.methods.get("getCapMethod") 
        });

        model.amount = inputConfig({
            id: "capAmount",
            fieldName: "capAmount",           
            placeholder:"",
          errorMsgs: [{
                name: "capAmount",
                text: ""
            }],
            validators: {
                capAmount: model.methods.get("capAmount")
            },
            modelOptions: {               
                allowInvalid: true
            },
        });

        model.setData = function(){
            var data = [{"method":"None"},{"method":"Market rent"},{"method":"Set value"}];
            model.setOptions("source", data);
        };
        
        model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("actual-rent-cap-config.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory("actual-rent-cap-config", [
            "baseFormConfig",          
             "rpFormSelectMenuConfig",
             "rpFormInputTextConfig",
            factory
        ]);
})(angular);
