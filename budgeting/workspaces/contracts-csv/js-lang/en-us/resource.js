(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('contracts-csv');

        bundle.set({

            bdgt_contracts_PageHeaderText:'Import Contracts',
            bdgt_contracts_import_PageHeaderText:'Imported Contracts',
            bdgt_contracts_selectCSVText:'Select CSV File',
            bdgt_contracts_vwImportText:'View Import Specifications',
            bdgt_contracts_csvTmpltText:'CSV Template',
            bdgt_contracts_importText:'Import File',
            bdgt_contracts_ldBtnText:'Load',    
            bdgt_contracts_impSaveBtnText:'Import & Save', 
            bdgt_contracts_delBtnText:'Delete', 
            bdgt_contracts_hideFilters:'Hide Filtesr',
            bdgt_contracts_showFilters:'Filters',
            bdgt_contracts_hdrVndrText:'Vendor',
            bdgt_contracts_hdrDescText:'Description',
            bdgt_contracts_hdrFreqText:'Frequency',
            bdgt_contracts_hdrStrtText:'Start Date',
            bdgt_contracts_hdrEndText:'End Date',
            bdgt_contracts_hdrAmntText:'Amount',
            bdgt_contracts_hdrPropIDText:'Property ID',
            bdgt_contracts_importSpecText:'Import Spefications',
            bdgt_contracts_fltrVndrText:'Filter by vendor',
            bdgt_contracts_fltrDescText:'Filter by description',
            bdgt_contracts_fltrPropText:'Filter by property',
            bdgt_contracts_vwSpecColumnText:'Column',
            bdgt_contracts_vwSpecDescText:'Description',
            bdgt_import_error_desc_media_type : 'Unsupported format is uploaded, please check the input file',
            bdgt_import_error_desc_missing_cols : 'Columns are missing in the input file - ',
            bdgt_import_error_desc_vendor_empty : 'Vendor name is empty in the contracts',
            bdgt_import_error_desc_Name_invalid : 'Invalid vendor name ',
            bdgt_import_error_Prop_empty : 'Property column is empty',
            bdgt_import_error_StaDt_empty : 'Start date column is empty',
            bdgt_import_error_desc_StaDt_Invalid : 'Invalid start date ',
            bdgt_import_error_desc_EndDt_Inv : 'Invalid end date ',
            bdgt_import_error_desc_EndDt_empty : 'End date column is empty',
            bdgt_import_error_desc_invalid_amnt : 'Invalid amount ',
            bdgt_import_error_desc_glaccnt_empty : 'G/L accnt column is empty',
            bdgt_import_error_desc_freq_inv : 'Invalid frequency ',
            bdgt_contracts_helpToolText : 'Select at least one contract to delete',
            bdgt_ex_get_csvtemp_desc_unKnown_error: 'Unkown error in csv template download',
            bdgt_ex_get_csvdata_desc_unKnown_error:'Unkown error in csv data downlod',
            bdgt_ex_contract_del_desc_invalid_param:'Unable to delete, invalid data passed',
            bdgt_import_succ_imp_msg:'Contract data imported successfully',
            bdgt_import_error_desc_unknown_error:'Unknown error occurred in csv import',
            bdgt_import_error_desc_dup_msg:'Description column data is duplicated ',
            bdgt_import_error_desc_emp_msg:'Description column data is empty ',
            bdgt_import_error_Prop_inv:'Invalid PropertyID ',
            bdgt_import_error_desc_empty_descr: 'Contract description is empty',
            bdgt_import_error_imp_msg:'Error occurred while saving the contract data'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
