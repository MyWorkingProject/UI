(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            'bdgt_payrollEmployee_view_addProperty',
            'bdgt_payrollEmployee_view_propertyAllocation',
            'bdgt_payrollEmployee_view_addProperty',
            'bdgt_payrollEmployee_view_propertyAllocation',
            'bdgt_payrollEmployee_view_newPageTitle',            
            'bdgt_payrollEmployee_view_viewPageTitle',    
            'bdgt_payrollEmployee_view_firstName',            
            'bdgt_payrollEmployee_view_lastName',            
            'bdgt_payrollEmployee_view_payType',  
            'bdgt_payrollEmployee_view_salary',  
            'bdgt_payrollEmployee_view_hourly',
            'bdgt_payrollEmployee_view_corporateStaff',
            'bdgt_payrollEmployee_view_edit',            
            'bdgt_payrollEmployee_view_save',
            'bdgt_payrollEmployee_view_delete',
            'bdgt_payrollEmployee_view_cancel',            
            'bdgt_payrollEmployee_view_startDate',            
            'bdgt_payrollEmployee_view_endDate',            
            'bdgt_payrollEmployee_view_costCenter',            
            'bdgt_payrollEmployee_view_position',            
            'bdgt_payrollEmployee_view_department',            
            'bdgt_payrollEmployee_view_payrolInputMethod',
            'bdgt_payrollEmployee_view_toolTip',
            'bdgt_payrollEmployee_view_yes',
            'bdgt_payrollEmployee_view_no',
            'bdgt_payrollEmployee_view_ok',
            'bdgt_payrollEmployee_view_suffix_dollar',
            'bdgt_payrollEmployee_view_alert',
            'bdgt_payrollEmployee_view_userConfirmDelete',
            'bdgt_payrollEmployee_view_propertyRequired',
            'bdgt_payrollEmployee_view_cantDeleteProperty',
            'bdgt_payrollEmployee_view_firstNameFiled',
            'bdgt_payrollEmployee_view_lastNameField',
            'bdgt_payrollEmployee_view_allocationPercent',
            'bdgt_payrollEmployee_view_requiredPropertyfield',
            'bdgt_payrollEmployee_view_numberValidation',
            'bdgt_payrollEmployee_view_rangeValidation',
            'bdgt_payrollEmployee_view_startEndDate',
            'bdgt_payrollEmployee_view_saveSuccess',
            'bdgt_payrollEmployee_view_fistnameLabel',
            'bdgt_payrollEmployee_view_lastnameLabel',
            'bdgt_payrollEmployee_view_salaryLabel',
            'bdgt_payrollEmployee_view_hourlyLabel',
            'bdgt_payrollEmployee_view_departmentLabel',
            'bdgt_payrollEmployee_view_costCenterLabel',
            'bdgt_payrollEmployee_view_allocationPercentLabel',
            'bdgt_payrollEmployee_view_jobPositionLabel',
            'bdgt_payrollEmployee_view_jobPositionRequired',            
            'bdgt_payrollEmployee_view_errorUndefined',
            'bdgt_payrollEmployee_view_dateValidator',            
            'bdgt_payrollEmployee_view_duplicate_title',
            'bdgt_payrollEmployee_view_duplicate_message',
            'bdgt_payrollEmployee_view_delete_property_title',
            'bdgt_payrollEmployee_view_delete_property_message1',
            'bdgt_payrollEmployee_view_delete_property_message2',
            'bdgt_payrollEmployee_view_add_employee_title',
            'bdgt_payrollEmployee_view_add_employee_message',
            'bdgt_payrollEmployee_view_propertyDelete_confirmTitle',
            'bdgt_payrollEmployee_view_propertyDelete_confirmmMessage1',
            'bdgt_payrollEmployee_view_propertyDelete_confirmmMessage2'
            

            //'bdgt_payrollEmployee_view_'
        ];

        appLangKeys.app('payrollEmployeeView').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);



