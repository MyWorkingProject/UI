//  English Resource Bundle for Import Gl Accounts

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('defaultAdjustment');

        bundle.set({
            bdgt_defadj_page_title: 'Default Adjustment %',
            bdgt_defadj_page_heading: 'GL Categories',
            bdgt_defadj_apply_txt: 'Apply',
            bdgt_defadj_assgn_default_per_txt: 'Define Default %',
            bdgt_defadj_default_per_txt: 'Default %',
            bdgt_defadj_assign_txt: 'Assign',
            bdgt_defadj_cancel_txt: 'Cancel',
            bdgt_defadj_apply_default_per_txt: 'Apply Default %',
            bdgt_defadj_year_txt: 'Year',
            bdgt_defadj_model_type_txt: 'Model Type',
            bdgt_defadj_model_name_txt: 'Model Name',
            bdgt_defadj_save_txt: 'Save',
            bdgt_defadj_show_filters: 'Show Filters',
            bdgt_defadj_hide_filters: 'Hide Filters',

            bdgt_defadj_overwrite_apply_model: 'Overwrite model level changes',

            bdgt_defadj_all_txt: 'All',
            bdgt_defadj_budget_txt: 'Budget',
            bdgt_defadj_forecast_txt: 'Forecast',
            bdgt_defadj_proforma_txt: 'Proforma',

            bdgt_defadj_over_write_help_text: 'Selecting this option will help you to overwrite the default adjustment percentages saved at model or GL account level for all the properties this master chart is cloned to.',

            bdgt_defadj_error_title_invalid_param: 'Invalid Parameter',
            bdgt_defadj_error_desc_invalid_param: 'Unable to perform operation due to invalid parameter passed',
            bdgt_defadj_error_info_invalid_param: 'Invalid Parameter Passed',

            bdgt_defadj_error_title_chart_not_found: 'Chart Not Found',
            bdgt_defadj_error_desc_chart_not_found: 'Requested master chart with the specified MasterChartID not found',
            bdgt_defadj_error_info_chart_not_found: 'Master chart not found',

            bdgt_defadj_error_title_unknown_error: 'Unknown Error',
            bdgt_defadj_error_desc_unknown_error: 'Unable to perform operation due to unknown error',
            bdgt_defadj_error_info_unknown_error: 'Unknown Error Occurred',

            bdgt_defadj_bdgt_model_success_appled: 'Budget Model(s) Successfully Applied'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
