(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var model = {}, translate;
        translate = langTranslate('payrollEmployeeView').translate;
        model = {
            addProperty: translate('bdgt_payrollEmployee_view_addProperty'),
            propertyAllocation: translate('bdgt_payrollEmployee_view_propertyAllocation'),
            viewPageTitle: translate('bdgt_payrollEmployee_view_viewPageTitle'),
            newPageTitle: translate('bdgt_payrollEmployee_view_newPageTitle'),
            bdgt_payrollEmployee_view_viewPageTitle: 'New Employee',
            firstName: translate('bdgt_payrollEmployee_view_firstName'),
            lastName: translate('bdgt_payrollEmployee_view_lastName'),
            payType: translate('bdgt_payrollEmployee_view_payType'),
            salary: translate('bdgt_payrollEmployee_view_salary'),
            hourly: translate('bdgt_payrollEmployee_view_hourly'),
            corporateStaff: translate('bdgt_payrollEmployee_view_corporateStaff'),
            editBtn: translate('bdgt_payrollEmployee_view_edit'),
            saveBtn: translate('bdgt_payrollEmployee_view_save'),
            deleteBtn: translate('bdgt_payrollEmployee_view_delete'),
            cancelBtn: translate('bdgt_payrollEmployee_view_cancel'),
            startDate: translate('bdgt_payrollEmployee_view_startDate'),
            endDate: translate('bdgt_payrollEmployee_view_endDate'),
            costCenter: translate('bdgt_payrollEmployee_view_costCenter'),
            position: translate('bdgt_payrollEmployee_view_position'),
            department: translate('bdgt_payrollEmployee_view_department'),
            payrolInputMethod: translate('bdgt_payrollEmployee_view_payrolInputMethod'),
            toolTip: translate('bdgt_payrollEmployee_view_toolTip'),
            yes: translate('bdgt_payrollEmployee_view_yes'),
            no: translate('bdgt_payrollEmployee_view_no'),
            ok: translate('bdgt_payrollEmployee_view_ok'),
            alert: translate('bdgt_payrollEmployee_view_alert'),
            suffix_dollar: translate('bdgt_payrollEmployee_view_suffix_dollar'),
            userConfirmDelete: translate('bdgt_payrollEmployee_view_userConfirmDelete'),
            propertyRequired: translate('bdgt_payrollEmployee_view_propertyRequired'),
            cantDelete: translate('bdgt_payrollEmployee_view_cantDeleteProperty'),
            firstnameRequired: translate('bdgt_payrollEmployee_view_firstNameFiled'),
            lastnameRequired: translate('bdgt_payrollEmployee_view_lastNameField'),
            requiredPropertyText: translate('bdgt_payrollEmployee_view_requiredPropertyfield'),
            numberValidation: translate('bdgt_payrollEmployee_view_numberValidation'),
            rangeValidation: translate('bdgt_payrollEmployee_view_rangeValidation'),
            startEndDate: translate('bdgt_payrollEmployee_view_startEndDate'),
            firstnameLabel: translate('bdgt_payrollEmployee_view_fistnameLabel'),
            lastnameLabel: translate('bdgt_payrollEmployee_view_lastnameLabel'),
            salaryLabel: translate('bdgt_payrollEmployee_view_salaryLabel'),
            hourlyLabel: translate('bdgt_payrollEmployee_view_hourlyLabel'),
            departmentLabel: translate('bdgt_payrollEmployee_view_departmentLabel'),
            costCenterLabel: translate('bdgt_payrollEmployee_view_costCenterLabel'),
            successMessage: translate('bdgt_payrollEmployee_view_saveSuccess'),
            allocationLabel: translate('bdgt_payrollEmployee_view_allocationPercentLabel'),
            jobPositionLabel: translate('bdgt_payrollEmployee_view_jobPositionLabel'),
            jobPositionRequired: translate('bdgt_payrollEmployee_view_jobPositionRequired'),
            errorUndefined: translate('bdgt_payrollEmployee_view_errorUndefined'),
            dateValidator: translate('bdgt_payrollEmployee_view_dateValidator'),
            duplicate_title: translate('bdgt_payrollEmployee_view_duplicate_title'),
            duplicate_message: translate('bdgt_payrollEmployee_view_duplicate_message'),
            property_title: translate('bdgt_payrollEmployee_view_delete_property_title'),
            property_message1: translate('bdgt_payrollEmployee_view_delete_property_message1'),
            property_message2: translate('bdgt_payrollEmployee_view_delete_property_message2'),
            confirmTitle: translate('bdgt_payrollEmployee_view_propertyDelete_confirmTitle'),
            confirmmMessage1: translate('bdgt_payrollEmployee_view_propertyDelete_confirmmMessage1'),
            confirmmMessage2: translate('bdgt_payrollEmployee_view_propertyDelete_confirmmMessage2'),
            add_employee_title: translate('bdgt_payrollEmployee_view_add_employee_title'),
            add_employee_message: translate('bdgt_payrollEmployee_view_add_employee_message')            
        };
        return model;
    }
    angular
        .module("budgeting")
        .factory("employeePayrollContent", ["appLangTranslate", factory]);
})(angular);