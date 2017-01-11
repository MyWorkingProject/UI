//  Sample Fit Form Config

(function (angular) {
    "use strict";
    function factory(moment,
                    baseFormConfig,                 
                    textareaConfig,
                    datetimepickerConfig,
                    inputConfig,
                    menuConfig,
                    fieldLabels,
                    validations) {
        var model = baseFormConfig();

        model.firstName = inputConfig({
            id: "firstName",
            required: true,
            placeholder: fieldLabels.firstnameLabel,
            errorMsgs: [{
                name: "required",
                text: fieldLabels.firstnameRequired
            }]
        });

        model.lastName = inputConfig({
            id: "lastName",
            required: true,
            placeholder: fieldLabels.lastnameLabel,
            errorMsgs: [{
                name: "required",
                text: fieldLabels.lastnameRequired
            }]
        });

        model.salary = inputConfig({
            id: "salary",
            required: false,
            suffix: "$",
            pattern: /^[0-9]+\.?[0-9]*$/,
            placeholder: fieldLabels.salaryLabel,
            errorMsgs: [{
                name: "required",
                text: "Salary field is required"
            }]
        });

        model.hourly = inputConfig({
            id: "hourly",
            required: false,
            suffix: fieldLabels.suffix_dollar,
            pattern: /^[0-9]+\.?[0-9]*$/,
            placeholder: fieldLabels.hourlyLabel,
            errorMsgs: [{
                name: "required",
                text: "Hourly field is required"
            }]
        });

        model.department = inputConfig({
            id: "department",
            required: false,
            placeholder: fieldLabels.departmentLabel,
            errorMsgs: [{
                name: "required",
                text: "Department field is required"
            }]
        });
        model.jobPositionName = menuConfig({
            nameKey: "name",
            valueKey: "value",
            required: true,
            placeholder: fieldLabels.jobPositionRequired,
            errorMsgs: [{
                name: "required",
                text: fieldLabels.jobPositionRequired
            }]
        });
        model.position = inputConfig({
            id: "position",
            required: true,
            placeholder: "Position",
            errorMsgs: [{
                name: "required",
                text: "Position field is required"
            }]
        });

        model.costCenter = inputConfig({
            id: "costCenter",
            required: false,            
            placeholder: fieldLabels.costCenterLabel,
            errorMsgs: [{
                name: "required",
                text: "Cost Center field is required"
            }]
        });

        model.propertyAllocation = inputConfig({
            id: "propertyAllocation",
            required: true,
            pattern: /^([1-9]|[1-9]\d|100)$/,         
            placeholder: fieldLabels.allocationLabel,
            errorMsgs: [{
                name: "required",
                text: fieldLabels.requiredPropertyText
            }]
        });

        model.startDate = datetimepickerConfig({
            id: "startDate",
            //required: true,
            format:"MM/DD/YYYY",
            fieldName: "startDate",
            onChange:  model.methods.get("onChangeStartDate")        
        });

        model.endDate = datetimepickerConfig({
            minDate:model.startDate,
            id: "endDate",
            //required: false,
            format:"MM/DD/YYYY",
            fieldName: "endDate",
            errorMsgs: [{
                name: "required",
                text: "End Date is required"
            }]
        });

        model.source = menuConfig({
            nameKey: "text",
            valueKey: "value"
        });

        model.payrolMethod = menuConfig({
            nameKey: "name",
            valueKey: "value"

        });
        model.setOptions = function (fieldName, fieldOptions) {
            model[fieldName].flushOptions();
            model.flushKeys(fieldName);
            if (model[fieldName]) {
                model[fieldName].setOptions(fieldOptions);
            }
            else {
                logc("manage-task-config.setOptions: " + fieldName + " is not a valid field name!");
            }

            return model;
        };

        model.flushKeys = function (fieldName) {
            if (model[fieldName].keys) {
                model[fieldName].keys = [];
            }
        };
        return model;
    }
    angular
        .module("budgeting")
        .factory("payrollEmployeeConfig", [
            "moment",
            "baseFormConfig",            
            "rpFormTextareaConfig",
            "rpDatetimepickerConfig",
            "rpFormInputTextConfig",
            "rpFormSelectMenuConfig",
            "employeePayrollContent",
            "propertyAllocationValidation",
            factory
        ]);
})(angular);


