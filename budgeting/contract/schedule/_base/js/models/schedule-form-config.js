(function (angular) {
    "use strict";

    function schedFormConfigFactory(rpBaseForm, inputTextConfig, selectMenuConfig, dateTimePickerConfig, schedValidator, i18n) {
        var schedFormConfig = rpBaseForm();

        schedFormConfig.email = inputTextConfig({
            fieldName: "email",
            pattern: "([\\w+\\-.%]+@[\\w\\-.]+\\.[A-Za-z]{2,4}\\s*,*\\s*)+",
            placeholder: i18n.translate("bdgt_new_contract_email_placeholder"),
            modelOptions: {
                updateOn: "blur"
            },
            validators: {
                // checkIfRequired: schedValidator.isReminderRequired //TODO not yet supported: conditional required
            },
            errorMsgs: [{
                name: "required",
                text:  i18n.translate("bdgt_schedule_email_req") 
            }]
        });

        schedFormConfig.amount = inputTextConfig({
            fieldName: "amount",
            prefix: "$", 
            modelOptions: {
                updateOn: "blur"
            },
            // onChange: schedFormConfig.methods.get("updateGrid"),
            required: true,
            validators: {
                validateCurrency: schedValidator.validateFloat
            },
            errorMsgs: [{
                name: "required",
                text: i18n.translate("bdgt_schedule_amt_req")
            }, {
                name: "validateCurrency",
                text: i18n.translate("bdgt_schedule_invalid_float")
            }]
        });

        schedFormConfig.increaseValue = inputTextConfig({
            fieldName: "increaseValue",
            modelOptions: {
                updateOn: "blur"
            },
            // onChange: schedFormConfig.methods.get("updateGrid"),
            validators: {
                // checkIfRequired: schedValidator.isIncreaseRequired, //TODO not yet supported: conditional required
                validateFloat: schedValidator.validateFloat
            },
            errorMsgs: [{
                name: "required",
                text: i18n.translate("bdgt_schedule_increase_val_req")
            }, {
                name: "validateFloat",
                text: i18n.translate("bdgt_schedule_invalid_float")
            }]
        });

        schedFormConfig.startDate = dateTimePickerConfig({
            format: "MM/DD/YYYY",
            fieldName: "startDate",
            iconClass: "ic-calendar",
            required: true,
            errorMsgs: [{
                name: "required",
                text: i18n.translate("bdgt_schedule_start_date_req")
            }, {
                name: "validateDate",
                text: i18n.translate("bdgt_schedule_invalid_dates")
            }],
            validators: {
                validateDate: schedValidator.validateDate
            },
            onChange: schedFormConfig.methods.get("onStartDateChange")
        });

        schedFormConfig.endDate = dateTimePickerConfig({
            format: "MM/DD/YYYY",
            fieldName: "endDate",
            iconClass: "ic-calendar",
            required: true,
            errorMsgs: [{
                name: "required",
                text: i18n.translate("bdgt_schedule_end_date_req")
            }],
            onChange: schedFormConfig.methods.get("onEndDateChange")
        });

        schedFormConfig.reminderCountDown = selectMenuConfig({
            fieldName: "reminderCountdown", 
            nameKey: "name",
            valueKey: "value",
            validators: {
                // checkIfRequired: schedValidator.isReminderRequired //TODO not yet supported
            },
            errorMsgs: [{
                name: "required",
                text: i18n.translate("bdgt_schedule_countdown_req")
            }]
        });

        schedFormConfig.frequency = selectMenuConfig({
            fieldName: "frequency", 
            nameKey: "name",
            valueKey: "value",
            required: true,
            errorMsgs: [{
                name: "required",
                text: i18n.translate("bdgt_schedule_frequency_req")
            }],
            // onChange: schedFormConfig.methods.get("updateGrid")
        });

        schedFormConfig.increaseType = selectMenuConfig({
            fieldName: "increaseType", 
            nameKey: "name",
            valueKey: "value",
            validators: {
                // checkIfRequired: schedValidator.isIncreaseRequired //TODO not yet supported
            },
            errorMsgs: [{
                name: "required",
                text: i18n.translate("bdgt_schedule_increase_type_req")
            }],
            // onChange: schedFormConfig.methods.get("updateGrid")
        });

        schedFormConfig.increaseBasis = selectMenuConfig({
            fieldName: "increaseBasis", 
            nameKey: "name",
            valueKey: "value",
            validators: {
                // checkIfRequired: schedValidator.isIncreaseRequired //TODO not yet supported
            },
            errorMsgs: [{
                name: "required",
                text: i18n.translate("bdgt_schedule_increase_basis_req")
            }],
            // onChange: schedFormConfig.methods.get("updateGrid")
        });

        schedFormConfig.setOptions = function (fieldName, fieldOptions) {
            if (schedFormConfig[fieldName]) {
                schedFormConfig[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("scheduleFormConfig.setOptions: " + fieldName + " is not a valid field name!");
            }

            return schedFormConfig;
        };

        return schedFormConfig;
    }

    angular
        .module("budgeting")
        .factory("scheduleFormConfig", [
            "baseFormConfig",
            "rpFormInputTextConfig",
            "rpFormSelectMenuConfig",            
            "rpDatetimepickerConfig",
            "schedValidationSvc",
            "contractTranslatorSvc",
            schedFormConfigFactory
        ]);
})(angular);
