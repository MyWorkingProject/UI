//  Sample Fit Form Config

(function (angular) {
    "use strict";
    function factory(langTranslate, baseFormConfig, inputConfig, menuConfig) {
        var model = baseFormConfig();
        var translate;
        translate = langTranslate('vendorForm').translate;
        model.fieldLabel = {
            number: translate('bdgt_new_contract_vendor_lbl_number'),
            name: translate('bdgt_new_contract_vendor_lbl_name'),
            state: translate('bdgt_new_contract_vendor_lbl_state'),
            status: translate('bdgt_new_contract_vendor_lbl_status'),
            save: translate('bdgt_new_contract_vendor_lbl_save'),
            cancel: translate('bdgt_new_contract_vendor_lbl_cancel'),
        };
        model.setOptions = function (fieldName, fieldOptions) {
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("rpFormSelectMenuConfig.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
        };
        model.vendorCode = inputConfig({
            id: "vendorNumber",
            fieldName: "vendorNumber",
            placeholder: "Enter Number",
            maxlength: 30,
            errorMsgs: [{
                name: "maxlength",
                text: translate('bdgt_contract_new_vendor_vendorNumber_invalid')
            }]

        });
        model.vendorName = inputConfig({
            id: "vendorName",
            fieldName: "vendorName",
            placeholder: "Enter Name",
            maxlength: 255,
            required: true,
            errorMsgs: [{
                name: "required",
                text: translate('bdgt_contract_new_vendor_vendorName_required')
            }, {
                name: "maxlength",
                text: translate('bdgt_contract_new_vendor_vendorName_invalid')
            }]
        });
        model.stateCode = menuConfig({
            id: "vendorState",
            fieldName: "vendorState",
            readonly: false,
            nameKey: "name",
            valueKey: "value"
        });
        model.status = menuConfig({
            id: "vendorStatus",
            fieldName: "vendorStatus",
            nameKey: "name",
            valueKey: "value",
        });
        return model;
    }
    angular
        .module("budgeting")
        .factory("vendorFormConfig", [
            "appLangTranslate",
            "baseFormConfig",
            "rpFormInputTextConfig",
            "rpFormSelectMenuConfig",
            factory
        ]);
})(angular);
