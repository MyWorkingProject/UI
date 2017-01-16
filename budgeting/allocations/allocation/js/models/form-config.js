
(function (angular) {
    "use strict";

    function factory(baseFormConfig, menuConfig, inputConfig, textareaConfig) {
        var model = baseFormConfig();

        model.source = menuConfig({
            nameKey: "text",
            valueKey: "value",
            onChange: model.methods.get("onChangeMethod")
        });

        model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("allocation-config.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
        };

        model.allocation = inputConfig({
            id: "allocationName",
            fieldName: "allocationName",
            placeholder: "New Allocation",
            maxlength: 75,
            required: true
        });

        model.description = textareaConfig({
            id: "description",
            placeholder: "Description",
            maxlength: 255
        });
        return model;
    }

    angular
        .module("budgeting")
        .factory("allocation-view-edit-config", [
            "baseFormConfig",
             "rpFormSelectMenuConfig",
             "rpFormInputTextConfig",
             'rpFormTextareaConfig',
            factory
        ]);
})(angular);
