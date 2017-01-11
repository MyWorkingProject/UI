//  English Resource Bundle for Import Gl Accounts

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('importCategory');

        bundle.set({
            bdgt_importCat_pageHeadingText: 'Import Account Categories',
            bdgt_importCat_sourceText: 'Source ',
            bdgt_importCat_srcOptionsDefText: '-- Select --',
            bdgt_importCat_srcOptionsAccText: 'OneSite Accounting',
            bdgt_importCat_srcOptionsCsvText: 'CSV File',
            bdgt_importCat_selectPropertyText: 'Select Property ',
            bdgt_importCat_selectCSVText: 'Select CSV File ',
            bdgt_importCat_viewSpecText: 'View Import Specification',
            bdgt_importCat_csvTempText: 'CSV Template',
            bdgt_importCat_importFileText: 'Import File',
            bdgt_importCat_loadBtnText: 'Load',
            bdgt_importCat_deleteBtnText: 'Delete',
            bdgt_importCat_ImportSaveBtnText: 'Save',
            bdgt_importCat_ShowFiltersText: 'Show Filters',
            bdgt_importCat_HideFiltersText: 'Hide Filters',
            bdgt_importCat_BrowseText: 'Browse',

            bdgt_importCat_title_invalid_param: 'Invalid Parameter',
            bdgt_importCat_desc_invalid_param: 'Unable to perform operation due to invalid parameter passed.',
            bdgt_importCat_info_invalid_param: 'Invalid Parameter Passed',

            bdgt_importCat_title_osa_error: 'Accounting Setup Error',
            bdgt_importCat_desc_osa_error: 'Unable to perform operation due to accounting setup error.',
            bdgt_importCat_info_osa_error: 'Accounting Setup Error',

            bdgt_importCat_title_no_osa_cat: 'No Accounting Properties',
            bdgt_importCat_desc_no_osa_cat: 'No properties found under the accounting center.',
            bdgt_importCat_info_no_osa_cat: 'No Accounting Properties Found',

            bdgt_importCat_title_unknown_error: 'Unknown Error',
            bdgt_importCat_desc_unknown_error: 'Unable to perform operation due to unknown error.',
            bdgt_importCat_info_unknown_error: 'Unknown Error Occurred',

            bdgt_importCat_title_media_type: 'Media Type Error',
            bdgt_importCat_desc_media_type: 'Unable to perform operation due to unsupported media type.',
            bdgt_importCat_info_media_type: 'Unsupported media type',

            bdgt_importCat_title_missing_col: 'Missing Columns',
            bdgt_importCat_desc_missing_col: 'Unable to perform operation due to missing coulumns in the file uploaded',
            bdgt_importCat_info_missing_col: 'Columns missing in the uploaded file',

            bdgt_importCat_title_dup_act_cat: 'Duplicate Account Category',
            bdgt_importCat_desc_dup_act_cat: 'Unable to perform operation due to duplicate account category.',
            bdgt_importCat_info_dup_act_cat: 'Duplicate Account Category',

            bdgt_importCat_title_inv_act_type: 'Invalid Account Type',
            bdgt_importCat_desc_inv_act_type: 'Unable to perform operation due to invalid account type.',
            bdgt_importCat_info_inv_act_type: 'Invalid Account Type',

            bdgt_importCat_title_csv_template_error: 'CSV Template Error',
            bdgt_importCat_desc_csv_template_error: 'Requested CSV template file not found.',
            bdgt_importCat_info_csv_template_error: 'CSV Template not found',

            bdgt_importCat_title_chart_not_found: 'Chart Not Found',
            bdgt_importCat_desc_chart_not_found: 'Requested master chart with the specified MasterChartID not found.',
            bdgt_importCat_info_chart_not_found: 'Master chart not found',

            bdgt_importCat_success_categories_imported_msg: 'Account categories got imported successfully'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
