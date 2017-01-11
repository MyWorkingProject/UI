//  English Resource Bundle for Model Settings - Lease Options

(function(angular) {
    "use strict";

    function config(appLangBundle) {

        var values = {
            'grid_options_row_option_title': "Row Options",
            'grid_options_hide_zero_row_option_text': "Hide zero rows",
            'grid_options_show_reference_row_option_text': "Show Reference Data",
            'grid_options_show_calculation_row_option_text': "Show Calculation Rows",
            'grid_options_show_small_size_option_text': "Smaller Rows",
            'grid_options_show_large_size_option_text': "Larger Rows",
            'grid_options_column_option_text': "Column Options",
            'grid_empty_message': "No results were found.",
            'gl_account_history_text': "History",
            'gl_account_calculator_text': "Calculator",
            'gl_account_save_button_text': "Save",
            'gl_account_cancel_button_text': "Cancel",
            'gl_account_previous_button_text': 'Go to Summary',
            'gl_account_table_setting_text': 'Table Settings',
            'reference_data_title': 'Reference Data',
            'no_reference_data_title': 'No reference data available.',
            'gl_account_reference_data_dollor_change_text': '$ Change from [name]',
            'gl_account_reference_data_percentage_change_text': '% Change from [name]',
            'gl_account_reference_data_per_unit_text': 'Per Unit',
            'gl_account_default_adjustment_text': 'Default Adjustment',
            'gl_account_grid_total_text': 'Total [name]',
            'gl_account_showing_list_text': 'GL Accounts',
            'gl_account_comment_rule_opertator_percentage':'%',
            'gl_account_comment_rule_opertator_dollor':'$',
            'gl_account_comment_rule_greater_than':'greater',
            'gl_account_comment_rule_less_than':'less',
            'gl_account_required_comment_message': '[type] change from budget [actual] is [condition] than [expected].  Please enter relevant comments.',
            'gl_account_required_comment_title': 'Need Comments',
            'gl_account_alert_close_text': 'Close',
            'gl_account_saved_message_text': 'Changes saved',
            'gl_account_not_found_title_text': 'OOPS!',
            'gl_account_not_found_message_text': 'Sorry! The GL Account you are looking for doesn\'t exist.',
            'gl_account_not_found_back_btn_text': 'Go to Account By Account'
        };

        appLangBundle.lang('en-us').app('edit-account-by-account').set(values);
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);