(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
                'bdgt_cmpny_admin_header',
                'bdgt_admin_header',
                'bdgt_categories_rowDescriptionText',
                'bdgt_categories_rowLevelText',
                'bdgt_categories_rowTypeText',
                'bdgt_categories_rowCatOptnText',
                'bdgt_categories_rowGLOptnText',

                'bdgt_categories_PageHeaderText',
                 'bdgt_masterchart_addButtonText',
                 'bdgt_masterchart_categoryFormTitle',
                 'bdgt_masterchart_importCategory',
                 'bdgt_masterchart_print',
                 'bdgt_categories_report',
                 'bdgt_categories_RefCategory_Text',

                 //row menu options

                'bdgt_categories_section',
                'bdgt_categories_subSection',
                'bdgt_categories_category',
                'bdgt_categories_refCategory',
                'bdgt_categories_textOnly',
                'bdgt_categories_blankRow',
                'bdgt_categories_pageBreak',

                'bdgt_categories_type',
                'bdgt_categories_categoryOrheaderDesc',
                'bdgt_section_categoryOrheaderDesc',
                'bdgt_categories_subtotalOrFooterDesc',
                'bdgt_categories_options',
                'bdgt_categories_accountCategory',
                'bdgt_categories_glAccount',
                'bdgt_categories_doNotDisplay',
                'bdgt_categories_addOrSubtract',
                'bdgt_categories_reveseSign',
                'bdgt_categories_excludeFromTotal',
                'bdgt_categories_saveText',
                'bdgt_categories_cancelText',
                'bdgt_categories_createText',

                'bdgt_categories_error_categoryOrheaderDesc',
                'bdgt_categories_error_accountType',
                'bdgt_categories_error_accountCategory',

                'bdgt_categories_placeholder_categoryOrheaderDesc',
                'bdgt_categories_placeholder_accountType',
                'bdgt_categories_Row_Click_msg',
                'bdgt_categories_Row_Use_msg',
                'bdgt_categories_Row_Ref_msg',
                'bdgt_categories_Cannot_Del_msg',
                'bdgt_categories_New_Sec_Text',
                'bdgt_categories_New_SubSec_Text',
                'bdgt_categories_New_Cat_Text',
                'bdgt_categories_New_Text_Text',
                'bdgt_categories_New_RefCat_Text',
                'bdgt_categories_Edit_Sec_Text',
                'bdgt_categories_Edit_SubSec_Text',
                'bdgt_categories_Edit_Cat_Text',
                'bdgt_categories_Edit_Text_Text',
                'bdgt_categories_Edit_RefCat_Text',
                'bdgt_categories_Category_Text',
                'bdgt_categories_CategoryDesc_Text',

                'bdgt_categories_get_invalid_param',
                'bdgt_categories_unknown_error',
                'bdgt_categories_save_invalid_param',
                'bdgt_categories_erroPopText',
                'bdgt_categories_wizard_update_failure',
                'bdgt_categories_save_msg',
                'bdgt_categories_accntType_unknown_error',
                'bdgt_categories_accntCategory_unknown_error',
                'bdgt_categories_accntCategory_invalid_param',
                'bdgt_categories_noData',

                'bdgt_categories_sectionOptionsLable',
                'bdgt_categories_secCatVisblLable',
                'bdgt_categories_catCalLable',
                'bdgt_categories_glOptionsLable',
                'bdgt_categories_glVisblLable',
                'bdgt_categories_glCalLable',
                'bdgt_categories_catVisblLable',
                'bdgt_categories_catOptionsLable',

                'bdgt_categories_next',
                'bdgt_categories_back',

                 'bdgt_categories_row_opt_text',
                 'bdgt_categories_row_add_text',
                 'bdgt_categories_row_sub_text',
                 'bdgt_categories_row_rs_text',
                 'bdgt_categories_row_et_text',
                 'bdgt_categories_row_dnd_text',
                 'bdgt_categories_row_dndh_text',
                 'bdgt_categories_row_dndf_text',
                 'bdgt_categories_row_dndhf_text',
                 'bdgt_categories_row_shf_text'
            ];

        appLangKeys.app('categories').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
