(function (angular) {
    "use strict";

    function factory(baseFormConfig, menuConfig) {
        return function (src) {
            var model = baseFormConfig();
                model.setMethodsSrc(src);
                
            model.benefitOptions = menuConfig({
                nameKey: "text",
                valueKey: "value",
                onChange: model.methods.get("onBenefitChange")

            });

            model.setOptions = function (fieldName, fieldOptions) {
                if (model[fieldName]) {
                    model[fieldName].setOptions(fieldOptions);
                }
                else {
                    logc("benefit-config.setOptions: " + fieldName + " is not a valid field name!");
                }
                return model;
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("benefitsFormConfig", [
            "baseFormConfig",
             "rpFormSelectMenuConfig",
            factory
        ]);
})(angular);
