
(function (angular) {
    "use strict";

    function factory(baseFormConfig,menuConfig,inputConfig) {
        var model = baseFormConfig();

         model.source = menuConfig({                    
            nameKey: "text",
            valueKey: "value"
        });

         model.crtria = menuConfig({                    
            nameKey: "text",
            valueKey: "value"
        });

        model.type = menuConfig({                    
            nameKey: "text",
            valueKey: "value"
        });

         model.amount = inputConfig({
            id: "amount",
            fieldName: "amount",           
            placeholder:"",
          errorMsgs: [{
                name: "checkAmount",
                text: ""
            }],
            validators: {
                checkAmount: model.methods.get("checkAmount")
            },
            modelOptions: {               
                allowInvalid: true
            },
        });

        model.note = inputConfig({
            id: "note",
            fieldName: "note",           
            placeholder:""
        });
        
         model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("manage-task-config.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory("comments-rule-config", [
            "baseFormConfig",          
             "rpFormSelectMenuConfig",
            "rpFormInputTextConfig",
            factory
        ]);
})(angular);
