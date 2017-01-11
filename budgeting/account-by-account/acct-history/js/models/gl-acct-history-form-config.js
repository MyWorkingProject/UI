
(function () {
    'use strict';

    function factory(rpBaseFormConfig, rpSelectConfig) {
        var historyFormConfig = rpBaseFormConfig();

        historyFormConfig.bookType = rpSelectConfig({
            nameKey: "name",
            valueKey: "value",
            onChange: historyFormConfig.methods.get("updateGrids")
        });

        historyFormConfig.setOptions = function(fieldName, options) {
            if(historyFormConfig[fieldName]) {
                historyFormConfig[fieldName].setOptions(options);
            } else {
                console.debug("glAcctHistForm.setOptions: %s is not a valid field name!", fieldName);
            }

            return historyFormConfig;
        };

        return historyFormConfig;
    }

    angular
        .module("budgeting")
        .factory("glHistoryFormConfig", [
            "baseFormConfig",
            "rpFormSelectMenuConfig",
            factory
        ]);
})();

