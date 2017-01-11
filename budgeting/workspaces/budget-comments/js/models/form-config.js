//  Sample Fit Form Config

(function (angular) {
    "use strict";
    function factory(moment,baseFormConfig, textareaConfig, rpDatetimepickerConfig, inputConfig) {
        var model = baseFormConfig();
        var translate;        

    
        model.chooseProperty = inputConfig({
            id: "chooseProperty",
            required: true,
            placeholder: "Choose a Property",
            errorMsgs: [{
                name: "required",
                text: "Property field is required"
            }]
        });

        model.chooseModel = inputConfig({
            id: "chooseModel",
            required: true,
            placeholder: "Choose a Model",
            errorMsgs: [{
                name: "required",
                text: "Model field is required"
            }]
        });

        model.chooseYear = inputConfig({
            id: "chooseYear",
            required: true,
            placeholder: "Choose a chooseYear",
            errorMsgs: [{
                name: "required",
                text: "Year field is required"
            }]
        }); 

        model.commentsResponse = textareaConfig({
            id: "commentsResponse",
            required: true,
            placeholder: "Leave a Comment",
            maxlength: 255,
            errorMsgs: [{
                name: "required",
                text: "Comment field is required"
            }]
        });

        model.commentsResponses = textareaConfig({
            id: "commentsResponses",
            required: true,
            placeholder: "Leave Your Response",
            maxlength: 255,
            errorMsgs: [{
                name: "required",
                text: "Response field is required"
            }]
        });

        model.editResponse = textareaConfig({
            id: "editResponse",
            required: true,
            placeholder: "Leave a Comment",
            maxlength: 255,
            errorMsgs: [{
                name: "required",
                text: "Comment field is required"
            }]
        });

        model.pinToStart = rpDatetimepickerConfig({            
            minDate:moment()
     });


        return model;
    }
    angular
        .module("budgeting")
        .factory("budgetCommentsResponses", [
            "moment",
            "baseFormConfig",            
            "rpFormTextareaConfig",
            "rpDatetimepickerConfig",
            "rpFormInputTextConfig",
            factory
        ]);
})(angular);
