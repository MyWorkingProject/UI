//  Configure App Language Keys for import gl accounts

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_importCat_pageHeadingText',
            'bdgt_importCat_sourceText',
            'bdgt_importCat_srcOptionsDefText',
            'bdgt_importCat_srcOptionsAccText',
            'bdgt_importCat_srcOptionsCsvText',
            'bdgt_importCat_selectPropertyText',
            'bdgt_importCat_selectCSVText',
            'bdgt_importCat_viewSpecText',
            'bdgt_importCat_csvTempText',
            'bdgt_importCat_importFileText',
            'bdgt_importCat_loadBtnText',
            'bdgt_importCat_deleteBtnText',
            'bdgt_importCat_ImportSaveBtnText',
            'bdgt_importCat_ShowFiltersText',
            'bdgt_importCat_HideFiltersText',
            'bdgt_importCat_title_invalid_param',
            'bdgt_importCat_desc_invalid_param',
            'bdgt_importCat_info_invalid_param',
            'bdgt_importCat_BrowseText',

            'bdgt_importCat_title_osa_error',
            'bdgt_importCat_desc_osa_error',
            'bdgt_importCat_info_osa_error',

            'bdgt_importCat_title_no_osa_cat',
            'bdgt_importCat_desc_no_osa_cat',
            'bdgt_importCat_info_no_osa_cat',

            'bdgt_importCat_title_unknown_error',
            'bdgt_importCat_desc_unknown_error',
            'bdgt_importCat_info_unknown_error',

            'bdgt_importCat_title_media_type',
            'bdgt_importCat_desc_media_type',
            'bdgt_importCat_info_media_type',

            'bdgt_importCat_title_missing_col',
            'bdgt_importCat_desc_missing_col',
            'bdgt_importCat_info_missing_col',

            'bdgt_importCat_title_dup_act_cat',
            'bdgt_importCat_desc_dup_act_cat',
            'bdgt_importCat_info_dup_act_cat',

            'bdgt_importCat_title_inv_act_type',
            'bdgt_importCat_desc_inv_act_type',
            'bdgt_importCat_info_inv_act_type',

            'bdgt_importCat_title_csv_template_error',
            'bdgt_importCat_desc_csv_template_error',
            'bdgt_importCat_info_csv_template_error',

            'bdgt_importCat_title_chart_not_found',
            'bdgt_importCat_desc_chart_not_found',
            'bdgt_importCat_info_chart_not_found',

            'bdgt_importCat_success_categories_imported_msg'
        ];

        appLangKeys.app('importCategory').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
