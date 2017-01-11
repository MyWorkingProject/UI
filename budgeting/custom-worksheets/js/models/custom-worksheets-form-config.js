(function(angular) {
    "use strict";

    function factory(
        baseFormConfig,
        menuConfig,
        inputConfig,
        customWorksheetsContent) {
        var model = baseFormConfig();

        model.accountTypes = menuConfig({
            nameKey: "name",
            valueKey: "value",
            onChange: model.methods.get("accountTypeChanged")
        });

        model.accountCategories = menuConfig({
            nameKey: "name",
            valueKey: "value",
            onChange: model.methods.get("accountCategoryChanged")
        });

        model.filterGrid = inputConfig({
            iconClass: "rp-icon-search2",
            modelOptions: {
                debounce : '500'
            },
            placeholder: customWorksheetsContent.filterGridText,
            onChange: model.methods.get("filterGridChanged")
        });

        model.setAccountTypes = function(accountTypes) {
            accountTypes.insertAt(0, {
                name: customWorksheetsContent.allAccountTypes,
                value: 0
            });
            model.accountTypes.setOptions(accountTypes);

            return model;
        };

        model.setAccountCategories = function(accountCategories) {
            accountCategories.insertAt(0, {
                name: customWorksheetsContent.allAccountCategories,
                value: 0
            });
            model.accountCategories.setOptions(accountCategories);

            return model;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("customWorksheetFormConfigModel", [
            "baseFormConfig",
            "rpFormSelectMenuConfig",
            "rpFormInputTextConfig",
            "customWorksheetsContentModel",
            factory
        ]);
})(angular);
