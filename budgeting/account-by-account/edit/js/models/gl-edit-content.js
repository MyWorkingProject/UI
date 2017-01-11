//  Provides lang content for gl edit Model

(function(angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('edit-account-by-account').translate,
            model = {
                gridRowOptionText: translate('grid_options_row_option_title'),
                gridShowReferenceRowText: translate('grid_options_show_reference_row_option_text'),
                gridShowCalculatedRowText: translate('grid_options_show_calculation_row_option_text'),
                gridShowSmallSizeText: translate('grid_options_show_small_size_option_text'),
                gridShowLargeSizeTextText: translate('grid_options_show_large_size_option_text'),
                gridShowColumnOptionTextText: translate('grid_options_column_option_text'),

                gridEmptyMessage: translate('grid_empty_message'),
                historyText: translate("gl_account_history_text"),
                calculatorText: translate("gl_account_calculator_text"),
                saveBtnText: translate("gl_account_save_button_text"),
                cancelBtnText: translate("gl_account_cancel_button_text"),
                previousBtnText: translate("gl_account_previous_button_text"),
                tableSettingsText: translate('gl_account_table_setting_text'),

                glReferenceDataText: translate("reference_data_title"),
                glNoReferenceDataText: translate("no_reference_data_title"),
                glReferenceDataDollorText: translate("gl_account_reference_data_dollor_change_text"),
                glReferenceDataPercentageText: translate("gl_account_reference_data_percentage_change_text"),
                glReferenceDataPerUnitText: translate("gl_account_reference_data_per_unit_text"),

                glDefaultAdjustmentText: translate('gl_account_default_adjustment_text'),
                glGridTotalText: translate('gl_account_grid_total_text'),
                showingListText: translate('gl_account_showing_list_text'),
                percentageOperatorText: translate('gl_account_comment_rule_opertator_percentage'),
                dollorOperatorText: translate('gl_account_comment_rule_opertator_dollor'),
                greaterThanText: translate('gl_account_comment_rule_greater_than'),
                lessThanText: translate('gl_account_comment_rule_less_than'),
                requiredCommentTitle: translate('gl_account_required_comment_title'),
                requiredCommentMessage: translate('gl_account_required_comment_message'),
                glAlertCloseText: translate('gl_account_alert_close_text'),
                glAccountSavedMessage: translate('gl_account_saved_message_text'),
                glNotFoundTitleText: translate('gl_account_not_found_title_text'),
                glNotFoundMessageText: translate('gl_account_not_found_message_text'),
                btnBackText: translate('gl_account_not_found_back_btn_text'),
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("glEditContentModel", [
            'appLangTranslate',
            factory
        ]);
})(angular);
