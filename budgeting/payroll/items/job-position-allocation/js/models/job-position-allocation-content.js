//  Provides lang content for Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.items.job_position_allocation').translate,
            model = {
                pageTitle: translate('job_allocation_view_pageTitle'),
                propertyAllocation: translate('job_allocation_view_allocation_percent'),
                payType: translate('job_allocation_view_payType'),
                salary: translate('job_allocation_view_salary'),
                hourly: translate('job_allocation_view_hourly'),
                startDate: translate('job_allocation_view_startDate'),
                endDate: translate('job_allocation_view_endDate'),
                requiredValidation: translate('job_allocation_validation_required'),
                numberValidation: translate('job_allocation_validation_numbers'),
                rangeValidation: translate('job_allocation_validation_range'),
                payTypeValidation: translate('job_allocation_validation_pay_type'),
                noOfEmployees: translate('job_allocation_no_of_employees'),
                dateFormat: translate('date_format'),
                payrateError: translate('job_allocation_payrate_error')
            };

        return model;
    }

    angular
        .module('budgeting')
        .factory('jobPositionAllocationContentModel', [ 
        	'appLangTranslate',
        	factory]);
})(angular);
