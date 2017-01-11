//  Sample Fit Form Config

(function (angular) {
    'use strict';
    function factory(
        jobAllocationContent,
        jobAllocationValidation,
        baseFormConfig,
        inputConfig,
        datetimepickerConfig
         ) {

        var model = baseFormConfig();
        model.errorMessage = jobAllocationContent;

        model.propertyAllocation = inputConfig({
            id: 'propertyAllocation',
            required: true,
            placeholder: model.errorMessage.propertyAllocation,
            pattern: /^([1-9]|[1-9]\d|100)$/,  
            errorMsgs: [{
                name: 'required',
                text: model.errorMessage.requiredValidation
            }]

        });

        model.startDate = datetimepickerConfig({
            id: "startDate",
            modelOptions: {
                allowInvalid: true
            },
            name: 'startDate',
            required: false,
            fieldName: "startDate",
            onChange: model.methods.get("onChangeStartDate")
        });

        model.endDate = datetimepickerConfig({
            minDate: model.startDate,
            name: 'endDate',
            required: false,
            id: "endDate",
            fieldName: "endDate",
            onChange: model.methods.get("onChangeEndDate")
        });

        model.noOfEmployees = inputConfig({
            id: 'noOfEmployees',
            required: true,
            placeholder: model.errorMessage.noOfEmployees,
            validators: {
                chkPayroll: model.methods.get("chkPayrateCount"),
            },
            errorMsgs: [{
                name: 'chkPayrateCount',
                text: model.errorMessage.payrateError
            }]
        });
        model.payType = inputConfig({
            id: 'payType',
            required: true,
            errorMsgs: [{
                name: 'required',
                text: model.errorMessage.payTypeValidation
            }]
        });

        return model;
    }
    angular
        .module('budgeting')
        .factory('jobPositionAllocationConfig', [
            'jobPositionAllocationContentModel',
            'jobPositionAllocationValidation',
            'baseFormConfig',            
            'rpFormInputTextConfig',
            'rpDatetimepickerConfig',
            factory
        ]);
})(angular);
