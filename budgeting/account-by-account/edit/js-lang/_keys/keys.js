//  Configure App Language Keys for Model Settings - lease options

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'grid_options_row_option_title',
            'grid_options_hide_zero_row_option_text',
            'grid_options_show_reference_row_option_text',
            'grid_options_show_calculation_row_option_text',
            'grid_options_show_small_size_option_text',
            'grid_options_show_large_size_option_text',
            'grid_options_column_option_text',
            'grid_empty_message',
            'gl_account_history_text',
            'gl_account_calculator_text',
            'gl_account_save_button_text',
            'gl_account_cancel_button_text',
            'gl_account_previous_button_text',
            'gl_account_table_setting_text',
            'reference_data_title',
            'no_reference_data_title',
            'gl_account_reference_data_dollor_change_text',
            'gl_account_reference_data_percentage_change_text',
            'gl_account_reference_data_per_unit_text',
            'gl_account_default_adjustment_text',
            'gl_account_grid_total_text',
            'gl_account_showing_list_text',
            'gl_account_comment_rule_opertator_percentage',
            'gl_account_comment_rule_opertator_dollor',
            'gl_account_comment_rule_greater_than',
            'gl_account_comment_rule_less_than',
            'gl_account_alert_close_text',
            'gl_account_required_comment_title',
            'gl_account_required_comment_message',
            'gl_account_saved_message_text',
            'gl_account_not_found_title_text',
            'gl_account_not_found_message_text',
            'gl_account_not_found_back_btn_text'
        ];

        appLangKeys.app('edit-account-by-account').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
