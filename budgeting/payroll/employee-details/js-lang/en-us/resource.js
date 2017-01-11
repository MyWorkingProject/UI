(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('payrollEmployeeView');

        bundle.set({
            bdgt_payrollEmployee_view_addProperty: '+ Add Property',
            bdgt_payrollEmployee_view_propertyAllocation: 'Property Allocation',                       
            bdgt_payrollEmployee_view_viewPageTitle: 'Employee Detail - ',            
            bdgt_payrollEmployee_view_newPageTitle: 'Employee',    
            bdgt_payrollEmployee_view_firstName:'First Name',
            bdgt_payrollEmployee_view_lastName:'Last Name',
            bdgt_payrollEmployee_view_payType:'Pay Type',
            bdgt_payrollEmployee_view_salary:'Salary',
            bdgt_payrollEmployee_view_hourly: 'Hourly',
            bdgt_payrollEmployee_view_corporateStaff:'Corporate Staff ',
            bdgt_payrollEmployee_view_edit:'Edit',
            bdgt_payrollEmployee_view_save: 'Save',
            bdgt_payrollEmployee_view_delete: 'Delete',
            bdgt_payrollEmployee_view_cancel:'Cancel',
            bdgt_payrollEmployee_view_startDate:'Start Date',
            bdgt_payrollEmployee_view_endDate:'End Date',
            bdgt_payrollEmployee_view_costCenter:'Cost Center',
            bdgt_payrollEmployee_view_position:'Position',
            bdgt_payrollEmployee_view_department:'Department',
            bdgt_payrollEmployee_view_payrolInputMethod: 'Payroll Input Method',
            bdgt_payrollEmployee_view_toolTip: 'This check box is to classify an employee as corporate staff.  Corporate staff salary/hourly rate will not be shown to any user other than BA Corporate',
            bdgt_payrollEmployee_view_yes: 'Yes',
            bdgt_payrollEmployee_view_no:'No',
            bdgt_payrollEmployee_view_ok: 'Ok',
            bdgt_payrollEmployee_view_alert: 'Alert',
            bdgt_payrollEmployee_view_suffix_dollar:'$',
            bdgt_payrollEmployee_view_userConfirmDelete:'Are you sure want to delete ?',
            bdgt_payrollEmployee_view_propertyRequired:'Atleast one property required',
            bdgt_payrollEmployee_view_cantDeleteProperty: 'Cannot Delete Property',            
            bdgt_payrollEmployee_view_firstNameFiled:'First Name field is required',
            bdgt_payrollEmployee_view_lastNameField: 'Last Name field is required',         
            bdgt_payrollEmployee_view_requiredPropertyfield: 'Property allocation field is required',
            bdgt_payrollEmployee_view_numberValidation:'Enter numeric digits only',
            bdgt_payrollEmployee_view_rangeValidation:'Allocation % should be 1 to 100',
            bdgt_payrollEmployee_view_startEndDate:'Start date is required',
            bdgt_payrollEmployee_view_saveSuccess: 'Employee details saved successfully',
            bdgt_payrollEmployee_view_fistnameLabel:'First Name',
            bdgt_payrollEmployee_view_lastnameLabel:'Last Name',
            bdgt_payrollEmployee_view_salaryLabel:'Salary',
            bdgt_payrollEmployee_view_hourlyLabel:'Hourly',
            bdgt_payrollEmployee_view_departmentLabel:'Department',
            bdgt_payrollEmployee_view_costCenterLabel: 'Cost Center',
            bdgt_payrollEmployee_view_allocationPercentLabel: 'Allocation Percent',
            bdgt_payrollEmployee_view_jobPositionLabel: 'Position',
            bdgt_payrollEmployee_view_jobPositionRequired: 'Position is required',
            bdgt_payrollEmployee_view_errorUndefined: 'Payroll employee Error Handling Module: Error not defined',
            bdgt_payrollEmployee_view_dateValidator: 'End Date should be greater than or equal to Start Date',
            bdgt_payrollEmployee_view_duplicate_title: 'Duplicate Employee',
            bdgt_payrollEmployee_view_duplicate_message: 'Cannot create a duplicate employee for the same job position',
            bdgt_payrollEmployee_view_delete_property_title: 'Cannot Delete Property',
            bdgt_payrollEmployee_view_delete_property_message1: 'Employee payroll data is available for ',
            bdgt_payrollEmployee_view_delete_property_message2: ' in other models.  Cannot delete the property allocation for the employee ',
            bdgt_payrollEmployee_view_add_employee_title: 'Cannot Save Employee',
            bdgt_payrollEmployee_view_add_employee_message: 'At least one property should be assigned to save an employee',
            bdgt_payrollEmployee_view_propertyDelete_confirmTitle: 'Confirmation Needed',
            bdgt_payrollEmployee_view_propertyDelete_confirmmMessage1: 'You are about to delete the employee from ',
            bdgt_payrollEmployee_view_propertyDelete_confirmmMessage2: 'What do you want to do?'
            
            
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
