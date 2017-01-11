//  Provides lang content for salary  Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.payroll-by').translate,
            model = {
                pageIndicator: translate('title_indicator'),
                saveBtnText: translate('btn_save_text'),
                cancelBtnText: translate('btn_cancel_text'),
                editBtnText: translate('btn_edit_text'),
                changeModalTitle: translate('new_employee_change_tab_modal_title'),
                changeModalMessage: translate('new_employee_change_tab_modal_message'),
                saveSuccessMessage: translate('save_success_message_text'),
                preSuffixYear: translate('pre_suf_fix_year'),
                preSuffixHourly: translate('pre_suf_fix_hourly'),
                preSuffixCurrency: translate('pre_suf_fix_currency'),
                newEmployeeText: translate('new_employee'),
                newJobPositionText: translate('new_job_position'),
                saveErrorMessage: translate('save_error_message_text'),
                someThingErrorMessage: translate('some_thing_error_message'),
                warningNavBtnOkText: translate('modal_nav_btn_ok_text'),
                warningNavTitleText: translate('modal_nav_title_text'),
                warningNavMessageText: translate('modal_nav_message_text'),
                viewEmployeeDetails: translate('view_emploee_details'),
                viewJobPositionDetails: translate('view_job_position_details'),
                deletePayRateMsg: translate('delete_payrate_message'),
                employeeText: translate('lbl_employee'),
                departmentText: translate('lbl_department'),
                workersCompClassText: translate('lbl_workers_comp_class'),
                payRatesText: translate('pay_rates_text'),
                confirmDeleteTitleText: translate('confirm_delete_title_text'),
                confirmDeleteMessageText: translate('confirm_delete_message_text'),
                confirmDeleteYesText: translate('confirm_delete_yes_text'),
                confirmDeleteNoText: translate('confirm_delete_no_text'),
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("payrollByContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
