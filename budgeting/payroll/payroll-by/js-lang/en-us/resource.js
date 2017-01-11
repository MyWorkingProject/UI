//  English Resource Bundle for Model Settings - Lease Options

(function (angular) {
    "use strict";

    function config(appLangBundle) {

        appLangBundle.lang('en-us').app('payroll.payroll-by').set({
            'title_indicator': 'EMPLOYEE / POSITION',
            'new_employee': 'New Employee',
            'btn_save_text': 'Save',
            'btn_cancel_text': 'Cancel',
            'btn_edit_text': 'Edit',
            'pre_suf_fix_currency': '$',
            'pre_suf_fix_hourly': '/ hour',
            'pre_suf_fix_year': '/ year',
            'new_employee_change_tab_modal_title': 'Employee',
            'new_employee_change_tab_modal_message': 'Employee doesnot exists.',
            'save_success_message_text': 'Changes saved.',
            'new_job_position': 'New Job Position',
            'save_error_message_text': 'Could not Save',
            'some_thing_error_message': 'Could not find Employee/Job Position.',
            'modal_nav_btn_ok_text': "OK",
            'modal_nav_title_text': 'Payroll',
            'modal_nav_message_text': 'Please save model details.',
            'view_emploee_details': 'View Employee Details',
            'view_job_position_details': 'View Position Details',
            'delete_payrate_message': 'Pay Rate Deleted Successfully',
            'lbl_employee': 'employee(s)',
            'lbl_department': 'Department',
            'lbl_workers_comp_class': 'Worker\'s Comp Class',
            'pay_rates_text': 'Pay Rates',
            'confirm_delete_title_text':'Delete Pay Rate',
            'confirm_delete_message_text': 'Are you sure want to delete the Pay Rate?',
            'confirm_delete_yes_text':'Yes',
            'confirm_delete_no_text':'No'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
