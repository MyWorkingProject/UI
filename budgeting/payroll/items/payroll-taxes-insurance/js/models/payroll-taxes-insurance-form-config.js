//  salary form config Model

(function (angular) {
    "use strict";

    function factory(baseFormConfig,
        inputConfig,
        taxesInsuranceContent
        ) {
        return function (src) {
            var model = baseFormConfig();

            model.init = function () {
                model.setMethodsSrc(src);
               
                model.cumCom = inputConfig({
                    id: "cumCom",
                    fieldName: "cumCom",
                    suffix: taxesInsuranceContent.preSuffixCurrency,
                    placeholder: taxesInsuranceContent.increaseText,
                    dataType: "text",
                    required: true,                    
                    onChange: model.methods.get("cumelativeCompensationChanged")
                });

                return model;
            };
     
            model.destroy = function () {
                model = undefined;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("taxInsuranceFormConfigModel", [
            "baseFormConfig",
            "rpFormInputTextConfig",          
            "taxInsuranceContentModel",
           
             factory]);
})(angular);
