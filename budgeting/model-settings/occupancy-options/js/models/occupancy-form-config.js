// Occupancy Form Config

(function (angular) {
    "use strict";

    function occFormConfigFactory(baseFormConfig, menuConfig, inputConfig, i18n) {
        var config = baseFormConfig();

        var errMsgs = {
            positiveNumber: i18n.translate("err_positive_num"),
            positiveFloat: i18n.translate("err_positive_percent")
        };

        config.occupancyMethod = menuConfig({
            fieldName: "occupancyMethod",
            nameKey: "name",
            valueKey: "value",
            onChange: config.methods.get("changedView")
        });
        
        config.occGoalAnnualVal = inputConfig({
            id: "occGoalAnnualVal",
            fieldName: "occGoalAnnualVal",
            suffix: "%",
            errorMsgs: [{
                name: "positiveFloat",
                text: errMsgs.positiveFloat
            }],
            validators: {
                positiveFloat: config.methods.get("validatePositiveFloat")
            },
            onChange: config.methods.get("changedOccVal"),
            modelOptions: {
                updateOn: "blur"
            }
        });

        config.occGoalMonthlyVal = inputConfig({
            fieldName: "occGoalMonthlyVal",
            errorMsgs: [{
                name: "positiveFloat",
                text: errMsgs.positiveFloat
            }],
            validators: {
                positiveFloat: config.methods.get("validatePositiveFloat")
            }
        });

        config.modelUnitsLossType = menuConfig({
            nameKey: "description",
            valueKey: "unitTypeID",
            onChange: config.methods.get("updateModelUnitLossTypeLabel")
        });

        config.noneRevenueRents = menuConfig({
            nameKey: "name",
            valueKey: "value",
            onChange: config.methods.get("updateNoneRevenueRentsLabel")
        });

        config.openPeriodRefData = menuConfig({
            nameKey: "name",
            valueKey: "value",
            onChange: config.methods.get("updateOpenPeriodRefDataLabel")
        });

        config.earlyTermination = inputConfig({
            id: "earlyTermination",
            fieldName: "earlyTermination",
            errorMsgs: [{
                name: "positiveNumber",
                text: errMsgs.positiveNumber
            }],
            validators: {
                positiveNumber: config.methods.get("validatePositiveInt")
            }
        });
        
        config.employeeUnits = inputConfig({
            id: "employeeUnits",
            fieldName: "employeeUnits",
            errorMsgs: [{
                name: "positiveNumber",
                text: errMsgs.positiveNumber
            }],
            validators: {
                positiveNumber: config.methods.get("validatePositiveInt")
            }
        });

        config.employeeDiscount = inputConfig({
            id: "employeeDiscount",
            fieldName: "employeeDiscount",
            errorMsgs: [{
                name: "positiveFloat",
                text: errMsgs.positiveFloat
            }],
            validators: {
                positiveFloat: config.methods.get("validatePositiveFloat")
            }
        });

        config.setOptions = function (fieldName, fieldOptions) {
            if (config[fieldName]) {
                config[fieldName].setOptions(fieldOptions);
            }
            else {
                console.debug("occupancyFormConfig.setOptions: " + fieldName + " is not a valid field name!");
            }

            return config;
        };

        config.clearOptions = function(fieldName) {
            if (config[fieldName]) {
                config[fieldName].flushOptions();
                config[fieldName].keys = [];
            }
            else {
                console.debug("occupancyFormConfig.clearOptions: " + fieldName + " is not a valid field name!");
            }

            return config;
        };

        return config;
    }

    angular
        .module("budgeting")
        .factory("occupancyFormConfig", [
            "baseFormConfig",
            "rpFormSelectMenuConfig",
            "rpFormInputTextConfig",
            "occTranslatorSvc",
            occFormConfigFactory
        ]);
})(angular);