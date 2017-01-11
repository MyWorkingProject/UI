
(function (angular) {
    "use strict";

    function factory(baseFormConfig, inputConfig,datetimepickerConfig,textareaConfig,langTranslate,menuConfig) {
        var model = baseFormConfig();
        var translate;
        translate = langTranslate('manageTasks').translate;
    
        model.title = inputConfig({
            id: "title",
            fieldName: "title",
            required:true,
            placeholder: translate('ph_title'),
             errorMsgs: [{
                name: "required",
                text: "title is required"
            }]
        });

         model.startDate = datetimepickerConfig({
            id: "startDate",
            required: true,
            fieldName: "startDate" ,
            errorMsgs: [{
                name: "required",
                text: "start Date is required"
            }]          
           
        });
    
          model.dueDate = datetimepickerConfig({
            id: "dueDate",
            required: true,
            fieldName: "dueDate" ,
            errorMsgs: [{
                name: "required",
                text: "due Date is required"
            }]                     
           
        });

         model.description = textareaConfig({
            id: "description",
            fieldName: "description",
             required: true,
            placeholder:translate('ph_description') ,
            errorMsgs: [{
                name: "required",
                text: "description  is required"
            }]                     
           
        });

        model.status = menuConfig({           
            nameKey: "name",
            valueKey: "value"
        });

         model.priorityOptions = menuConfig({           
            nameKey: "name",
            valueKey: "value"
        });

        
        model.onChange = function (data) {
            logc(data.format("MM/DD/YYYY"));
        };

        
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
        .factory("manage-task-config", [
            "baseFormConfig",
            "rpFormInputTextConfig", 
             "rpDatetimepickerConfig",
            "rpFormTextareaConfig", 
             "appLangTranslate",
             "rpFormSelectMenuConfig",
            factory
        ]);
})(angular);
