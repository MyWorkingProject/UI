//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
        'title_indicator',
        'new_employee',
        'btn_save_text',
        'btn_cancel_text',
        'btn_edit_text',
        'pre_suf_fix_currency',
        'pre_suf_fix_hourly',
        'pre_suf_fix_year',
        'new_employee_change_tab_modal_title',
        'new_employee_change_tab_modal_message',
        'save_success_message_text',
        'new_job_position',
        'save_error_message_text',
        'some_thing_error_message',
        'modal_nav_btn_ok_text',
        'modal_nav_title_text',
        'modal_nav_message_text',
        'view_emploee_details',
        'view_job_position_details',
        'delete_payrate_message',
        'lbl_employee',
        'lbl_department',
        'lbl_workers_comp_class',
        'pay_rates_text',
        'confirm_delete_title_text',
        'confirm_delete_message_text',
        'confirm_delete_yes_text',
        'confirm_delete_no_text'
        ];

        appLangKeys.app('payroll.payroll-by').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
