//  Configure App Language Keys for import gl accounts

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_defadj_page_title',
            'bdgt_defadj_page_heading',
            'bdgt_defadj_apply_txt',
            'bdgt_defadj_assgn_default_per_txt',
            'bdgt_defadj_default_per_txt',
            'bdgt_defadj_assign_txt',
            'bdgt_defadj_cancel_txt',
            'bdgt_defadj_apply_default_per_txt',
            'bdgt_defadj_year_txt',
            'bdgt_defadj_model_type_txt',
            'bdgt_defadj_model_name_txt',
            'bdgt_defadj_save_txt',
            'bdgt_defadj_show_filters',
            'bdgt_defadj_hide_filters',
            'bdgt_defadj_overwrite_apply_model',
            'bdgt_defadj_all_txt',
            'bdgt_defadj_budget_txt',
            'bdgt_defadj_forecast_txt',
            'bdgt_defadj_proforma_txt',
            'bdgt_defadj_over_write_help_text',
            'bdgt_defadj_error_title_invalid_param',
            'bdgt_defadj_error_desc_invalid_param',
            'bdgt_defadj_error_info_invalid_param',
            'bdgt_defadj_error_title_chart_not_found',
            'bdgt_defadj_error_desc_chart_not_found',
            'bdgt_defadj_error_info_chart_not_found',
            'bdgt_defadj_error_title_unknown_error',
            'bdgt_defadj_error_desc_unknown_error',
            'bdgt_defadj_error_info_unknown_error',
            'bdgt_defadj_bdgt_model_success_appled'
        ];

        appLangKeys.app('defaultAdjustment').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
