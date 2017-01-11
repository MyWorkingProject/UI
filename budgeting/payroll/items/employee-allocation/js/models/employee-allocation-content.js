//  Provides lang content for Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.items.employee_allocation').translate,
            model = {
                pageTitle: translate('emp_allocation_view_pageTitle'),
                propertyAllocation: translate('emp_allocation_view_allocation_percent'),
                payType: translate('emp_allocation_view_payType'),
                salary: translate('emp_allocation_view_salary'),
                hourly: translate('emp_allocation_view_hourly'),
                startDate: translate('emp_allocation_view_startDate'),
                endDate: translate('emp_allocation_view_endDate'),
                requiredValidation: translate('emp_allocation_validation_required'),
                numberValidation: translate('emp_allocation_validation_numbers'),
                rangeValidation: translate('emp_allocation_validation_range'),
                payTypeValidation: translate('emp_allocation_validation_pay_type'),
                dateFormat: translate('date_format')
            };

        return model;
    }

    angular
        .module('budgeting')
        .factory('employeeAllocationContentModel', [ 
        	'appLangTranslate',
        	factory]);
})(angular);
