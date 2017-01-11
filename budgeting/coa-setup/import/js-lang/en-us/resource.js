//  English Resource Bundle for Import Gl Accounts

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('import');

        bundle.set({
            bdgt_import_heading: 'Import GL Accounts',
            bdgt_import_next: 'Next',
            bdgt_import_back: 'Back',
            bdgt_import_src: 'Source',
            bdgt_import_select_src: '-- Select Source --',
            bdgt_import_select_accounting: 'OneSite Accounting',
            bdgt_import_select_lrc: 'OneSite Leasing & Rents',
            bdgt_import_select_mri: 'MRI',
            bdgt_import_select_yardi: 'Yardi',
            bdgt_import_select_csv: 'CSV File',
            bdgt_import_load: 'Load',
            bdgt_import_section_heading: 'Imported GL Accounts',
            bdgt_import_delete: 'Delete',
            bdgt_import_save: 'Save',
            bdgt_import_show_filter: 'Show Filters',
            bdgt_import_hide_filter: 'Hide Filters',
            bdgt_import_grid_filter_accNumber: 'Filter by account number',
            bdgt_import_grid_filter_desc: 'Filter by description',
            bdgt_import_grid_filter_category: 'Filter by category',
            bdgt_import_grid_filter_level: 'Filter by level',
            bdgt_import_grid_filter_name: 'Filter by name',
            bdgt_import_grid_filter_message: 'Filter by message',
            bdgt_import_select_assgn_type: '-- Select Assign Type --',
            bdgt_import_asset: 'Asset',
            bdgt_import_liability: 'Liability',
            bdgt_import_income: 'Income',
            bdgt_import_expense: 'Expense',
            bdgt_import_lrc_section_heading: 'Properties Using Master Chart of Accounts',
            bdgt_import_imprtSave_btn: 'Import & Save',
            bdgt_import_refresh: 'Refresh',
            bdgt_import_chkLbl_impCashAcc: 'Import Cash Accounts',
            bdgt_import_chkLbl_impBalAcc: 'Import Balance Sheet Accounts',
            bdgt_import_chkLbl_retLedgCode: 'Retain Ledger Code Prefix in Account Number',
            bdgt_import_assgn_type: 'Assign Type',
            bdgt_import_assgn_accnt_type: 'Assign Account Type',
            bdgt_import_accnt_type: 'Account Type',
            bdgt_import_assign: 'Assign',
            bdgt_import_cancel: 'Cancel',
            bdgt_import_browse: 'Browse',
            bdgt_import_view_spec: 'View Import Specification',
            bdgt_import_import_spec: 'GL Account Import Specifications',
            bdgt_import_csv_template: 'CSV Template',
            bdgt_import_import_file: 'Import File',
            bdgt_import_import_property: 'Select Property',
            bdgt_import_selectChart: 'Select a Chart',
            bdgt_import_select_MRI_chart: 'Select MRI Chart to Import',
            bdgt_import_select_csv_src: 'Select CSV file',
            bdgt_import_select_gl_to_del: 'Select at least a one GL to delete',
            bdgt_import_select_prop_to_save: 'Select at least a property to import GL Accounts',

            bdgt_import_error_title_invalid_param: 'Invalid Parameter',
            bdgt_import_error_desc_invalid_param: 'Unable to perform operation due to invalid parameter passed',
            bdgt_import_error_info_invalid_param: 'Invalid Parameter Passed',

            bdgt_import_error_title_chart_not_found: 'Chart Not Found',
            bdgt_import_error_desc_chart_not_found: 'Requested master chart with the specified MasterChartID not found',
            bdgt_import_error_info_chart_not_found: 'Master chart not found',

            bdgt_import_error_title_osa_error: 'Can not import G/L accounts',
            bdgt_import_error_desc_osa_error: 'Accounting Entity and Location Ids are not mapped for the selected property.',
            bdgt_import_error_info_osa_error: 'Please map Entity and Location Ids before attempting to import.',

            bdgt_import_error_title_no_osa_gls: 'No G/L Accounts Found',
            bdgt_import_error_desc_no_osa_gls: 'No G/L accounts found for selected property.',
            bdgt_import_error_info_no_osa_gls: '',

            bdgt_import_error_title_unknown_error: 'Unknown Error',
            bdgt_import_error_desc_unknown_error: 'Unable to perform operation due to unknown error',
            bdgt_import_error_info_unknown_error: 'Unknown Error Occurred',

            bdgt_import_error_title_csv_temp_not_found: 'CSV Template Error',
            bdgt_import_error_desc_csv_temp_not_found: 'Requested CSV template file not found.',
            bdgt_import_error_info_csv_temp_not_found: 'CSV Template not found',

            bdgt_import_error_title_media_type: 'Media Type Error',
            bdgt_import_error_desc_media_type: 'Unable to perform operation due to unsupported media type.',
            bdgt_import_error_info_media_type: 'Unsupported media type',

            bdgt_import_error_title_missing_cols: 'Missing Columns',
            bdgt_import_error_desc_missing_cols: 'Unable to perform operation due to missing coulumns in the file uploaded',
            bdgt_import_error_info_missing_cols: 'Columns missing in the uploaded file',

            bdgt_import_error_title_dup_gl_accnt: 'Duplicate G/L Account',
            bdgt_import_error_desc_dup_gl_accnt: 'Unable to perform operation due to duplicate G/L Account(s)',
            bdgt_import_error_info_dup_gl_accnt: 'Duplicate G/L Account(s) found',

            bdgt_import_error_title_invalid_acc_type: 'Invalid Account Type',
            bdgt_import_error_desc_invalid_acc_type: 'Unable to perform operation due to invalid account type.',
            bdgt_import_error_info_invalid_acc_type: 'Invalid Account Type',

            bdgt_import_error_title_invalid_acc_level: 'Invalid Account Level',
            bdgt_import_error_desc_invalid_acc_level: 'Unable to perform operation due to invalid account level',
            bdgt_import_error_info_invalid_acc_level: '',

            bdgt_import_error_title_invalid_normal_bal: 'Invalid Normal Balance',
            bdgt_import_error_desc_invalid_normal_bal: 'Unable to perform operation due to invalid normal balance',
            bdgt_import_error_info_invalid_normal_bal: '',

            bdgt_import_error_title_rpx_error: 'Yardi/MRI Exception',
            bdgt_import_error_desc_rpx_error: 'Unable to perform operation due to exception occurred while importing from Yardi/MRI servers',
            bdgt_import_error_info_rpx_error: '',

            bdgt_import_error_title_rpx_prov_error: 'Can not import G/L accounts',
            bdgt_import_error_desc_rpx_prov_error: 'Yardi/MRI Entity is not mapped to the selected property.',
            bdgt_import_error_info_rpx_prov_error: 'Please map the Entity Ids before attempting to import.',

            bdgt_import_error_title_no_property_found: 'No Properties',
            bdgt_import_error_desc_no_property_found: 'No properties found',
            bdgt_import_error_info_no_property_found: '',

            bdgt_import_error_title_no_yardi_gls: 'No G/L Accounts Found',
            bdgt_import_error_desc_no_yardi_gls: 'No G/L accounts found for selected Property.',
            bdgt_import_error_info_no_yardi_gls: '',

            bdgt_import_success_text: 'Success',
            bdgt_import_gls_imported_success_text: 'GL Accounts got imported successfully',
            bdgt_import_gls_updated_success_text: 'GL Accounts got updated successfully',
            bdgt_import_gls_deleted_success_text: 'GL Accounts got deleted successfully'

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
