// Job Position Details Form Config formConfig

(function (angular) {
    "use strict";

    function factory(baseFormConfig, inputConfig, selectConfig, i18n) {

        return function (src) {
            var formConfig = baseFormConfig();

            formConfig.setMethodsSrc(src);

            // formConfig.department = inputConfig({
            //     id: "department",
            //     fieldName: "department",
            //     placeholder: i18n.translate("job_pos_dept_placeholder"),
            //     dataType: "text"
            // });

            // formConfig.workerClass = inputConfig({
            //     id: "compensationClass",
            //     fieldName: "compensationClass",
            //     placeholder: i18n.translate("job_pos_comp_class_placeholder"),
            //     dataType: "text"
            // });

            formConfig.employeesCount = inputConfig({
                id: "employeesCount",
                fieldName: "employeesCount",
                placeholder: i18n.translate("job_pos_employees_count_placeholder"),
                dataType: "number",
                required: true,
                errorMsgs: [{
                    name: "required",
                    text: i18n.translate("job_pos_employees_count_required")
                }]
            });

            formConfig.jobTitle = selectConfig({
                id: "jobTitle",
                fieldName: "jobTitle",
                nameKey: "title",
                valueKey: "jobPositionID",
                required: true,
                errorMsgs: [{
                    name: "required",
                    text: i18n.translate("job_pos_title_required")
                }],
                onChange: formConfig.methods.get("updateJobPositionDetails")
            });


            formConfig.destroy = function () {
                formConfig = undefined;
            };

            formConfig.setOptions = function(fieldName, options) {
                if(formConfig[fieldName]) {
                    formConfig[fieldName].setOptions(options);
                } else {
                    console.debug("jobPosDetailsForm.setOptions: %s is not a valid field name!", fieldName);
                }

                return formConfig;
            };

            return formConfig;
        };
    }

    angular
        .module("budgeting")
        .factory("jobPosDetailsFormConfig", [
            "baseFormConfig",
            "rpFormInputTextConfig",
            "rpFormSelectMenuConfig",
            "jobPosDetailsTranslatorSvc",
             factory]);
})(angular);
