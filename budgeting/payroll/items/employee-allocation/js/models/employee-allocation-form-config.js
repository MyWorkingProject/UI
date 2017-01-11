//  Sample Fit Form Config

(function (angular) {
    'use strict';
    function factory(
        employeeAllocationContent,
        baseFormConfig,
        inputConfig
         ) {
        var model = baseFormConfig();
        model.errorMessage = employeeAllocationContent;
        model.propertyAllocation = inputConfig({
            id: 'propertyAllocation',
            required: true,
            placeholder: model.errorMessage.allocationPercent,
            pattern: /^([1-9]|[1-9]\d|100)$/,  
            errorMsgs: [{
                name: 'required',
                text: model.errorMessage.requiredValidation
            }]
        });
        model.payType = inputConfig({
            id: 'payType',
            required: true,
            placeholder: 'Pay Type',
            errorMsgs: [{
                name: 'required',
                text: model.errorMessage.payTypeValidation
            }]
        });

        return model;
    }
    angular
        .module('budgeting')
        .factory('employeeAllocationConfig', [
            'employeeAllocationContentModel',
            'baseFormConfig',            
            'rpFormInputTextConfig',
            factory
        ]);
})(angular);
