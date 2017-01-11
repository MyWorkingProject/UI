(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_contracts_PageHeaderText',
            'bdgt_contracts_selectCSVText',
            'bdgt_contracts_vwImportText',
            'bdgt_contracts_csvTmpltText',
            'bdgt_contracts_importText',
            'bdgt_contracts_ldBtnText',    
            'bdgt_contracts_impSaveBtnText', 
            'bdgt_contracts_delBtnText', 
            'bdgt_contracts_hideFilters',
            'bdgt_contracts_showFilters',
            'bdgt_contracts_hdrVndrText',
            'bdgt_contracts_hdrDescText',
            'bdgt_contracts_hdrFreqText',
            'bdgt_contracts_hdrStrtText',
            'bdgt_contracts_hdrEndText',
            'bdgt_contracts_hdrAmntText',
            'bdgt_contracts_hdrPropIDText',
            'bdgt_contracts_importSpecText',
            'bdgt_contracts_fltrVndrText',
            'bdgt_contracts_fltrDescText',
            'bdgt_contracts_fltrPropText',
            'bdgt_contracts_vwSpecColumnText' ,
            'bdgt_contracts_vwSpecDescText',
            'bdgt_import_error_desc_media_type'   ,
            'bdgt_import_error_desc_missing_cols' ,
            'bdgt_import_error_desc_vendor_empty' ,
            'bdgt_import_error_desc_Name_invalid' ,
            'bdgt_import_error_Prop_empty' ,
            'bdgt_import_error_StaDt_empty',
            'bdgt_import_error_desc_StaDt_Invalid',
            'bdgt_import_error_desc_EndDt_Inv' ,
            'bdgt_import_error_desc_EndDt_empty' ,
            'bdgt_import_error_desc_invalid_amnt',
            'bdgt_import_error_desc_glaccnt_empty' ,
            'bdgt_import_error_desc_freq_inv',
            'bdgt_contracts_helpToolText',
            'bdgt_ex_get_csvtemp_desc_unKnown_error',
            'bdgt_ex_get_csvdata_desc_unKnown_error',
            'bdgt_ex_contract_del_desc_invalid_param',
            'bdgt_import_succ_imp_msg',
            'bdgt_import_error_desc_unknown_error',
            'bdgt_import_error_desc_dup_msg',
            'bdgt_import_error_desc_emp_msg',
            'bdgt_import_error_Prop_inv',
            'bdgt_contracts_import_PageHeaderText',
            'bdgt_import_error_desc_empty_descr',
            'bdgt_import_error_imp_msg'
        ];

        appLangKeys.app('contracts-csv').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
