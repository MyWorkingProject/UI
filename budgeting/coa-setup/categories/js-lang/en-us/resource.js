(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('categories');

        bundle.set({
            bdgt_cmpny_admin_header: 'OneSite Settings',
            bdgt_admin_header: 'Budgeting Administration',
            bdgt_categories_rowDescriptionText: 'Description',
            bdgt_categories_rowLevelText: 'Level',
            bdgt_categories_rowTypeText: 'Type',
            bdgt_categories_rowCatOptnText: 'Category options',
            bdgt_categories_rowGLOptnText: 'GL options',

            bdgt_categories_PageHeaderText: "Manage Accounting Categories",
            bdgt_categories_addButtonText: "Add Row",
            bdgt_categories_categoryFormTitle: "New Category",
            bdgt_categories_importCategory: "Import Categories",
            bdgt_categories_print: "Print",

            //rowMenuOptions

            bdgt_categories_section: "Section",
            bdgt_categories_subSection: "Sub-Section",
            bdgt_categories_category: "Category",
            bdgt_categories_refCategory: "Reference Category",
            bdgt_categories_textOnly: "Text Only",
            bdgt_categories_blankRow: "Blank Row",
            bdgt_categories_pageBreak: "Page Break",

            //FieldLabel

            bdgt_categories_type: "Type",
            bdgt_categories_categoryOrheaderDesc: "Category/Header Description",
            bdgt_section_categoryOrheaderDesc: "Section/Header Description",
            bdgt_categories_subtotalOrFooterDesc: "Subtotal/Footer Description",
            bdgt_categories_options: "Options",
            bdgt_categories_accountCategory: "Account Category",
            bdgt_categories_glAccount: "GL Account",
            bdgt_categories_doNotDisplay: "Do Not Display",
            bdgt_categories_addOrSubtract: "Add Or Subtract",
            bdgt_categories_reveseSign: "Reverse sign",
            bdgt_categories_excludeFromTotal: "Exclude from total",
            bdgt_categories_saveText: "Save",
            bdgt_categories_createText: "Create",
            bdgt_categories_cancelText: "Cancel",
            bdgt_categories_sectionOptionsLable: "Section Options",
            bdgt_categories_catOptionsLable: "Category Options",
            bdgt_categories_secCatVisblLable: "Section Visibility",
            bdgt_categories_catVisblLable: "Category Visibility",
            bdgt_categories_catCalLable: "Category Calculations",
            bdgt_categories_glOptionsLable: "GL Account Options",
            bdgt_categories_glVisblLable: "GL Account Visibility",
            bdgt_categories_glCalLable: "GL Account Calculations",
            bdgt_categories_report: "Report",

            //error messages
            bdgt_categories_error_categoryOrheaderDesc: "Description required",
            bdgt_categories_error_accountType: "Account type required",
            bdgt_categories_error_accountCategory: "Account category required",

            bdgt_categories_placeholder_categoryOrheaderDesc: "Add category or Header description",
            bdgt_categories_placeholder_accountType: "AddSubtotal or Footer Description",
            bdgt_categories_Row_Click_msg: "Please click on the row to add",
            bdgt_categories_Row_Use_msg: "The account category is used in accounts",
            bdgt_categories_Row_Ref_msg: "Category can't be deleted. This category is assigned to ref-category",
            bdgt_categories_Cannot_Del_msg: "Can not delete category",
            bdgt_categories_New_Sec_Text: "New Section",
            bdgt_categories_New_SubSec_Text: "New Sub-Section",
            bdgt_categories_New_Cat_Text: "New Category",
            bdgt_categories_New_Text_Text: "New Text",
            bdgt_categories_New_RefCat_Text: "New Reference Category",
            bdgt_categories_Edit_Sec_Text: "Edit Section",
            bdgt_categories_Edit_SubSec_Text: "Edit Sub Section",
            bdgt_categories_Edit_Cat_Text: "Edit Category",
            bdgt_categories_Edit_Text_Text: "Edit Text",
            bdgt_categories_Edit_RefCat_Text: "Edit Reference Category",
            bdgt_categories_Category_Text: "Category",
            bdgt_categories_RefCategory_Text: "Reference Category",
            bdgt_categories_CategoryDesc_Text: "Reference Category Description",

            bdgt_categories_erroPopText: 'Error',
            bdgt_categories_unknown_error: 'Unable to get the category rows list',
            bdgt_categories_save_invalid_param: 'Error occurred while saving the data, invalid request',
            bdgt_categories_get_invalid_param: 'Error occurred while retreiving the category rows data, invalid request',
            bdgt_categories_wizard_update_failure: 'Error occurred while updating wizard status',
            bdgt_categories_save_msg: 'Saved successfully',
            bdgt_categories_accntType_unknown_error: 'Unknown error occurred while retreiving account types',
            bdgt_categories_accntCategory_unknown_error: 'Unknown error occurred while retreiving account category data',
            bdgt_categories_accntCategory_invalid_param: 'Error occurred while retreiving the account category data, invalid request',
            bdgt_categories_noData: 'No categories data to save, please add rows to save/continue.',

            bdgt_categories_next: 'Next',
            bdgt_categories_back: 'Back',

            bdgt_categories_row_opt_text: 'Row Options Legend',
            bdgt_categories_row_add_text: 'Add',
            bdgt_categories_row_sub_text: 'Subtract',
            bdgt_categories_row_rs_text: 'Reverse sign',
            bdgt_categories_row_et_text: 'Exclude from total',
            bdgt_categories_row_dnd_text: 'Do not display',
            bdgt_categories_row_dndh_text: 'Show footer',
            bdgt_categories_row_dndf_text: 'Show header',
            bdgt_categories_row_dndhf_text: 'Do not display header & footer',
            bdgt_categories_row_shf_text: 'Show header & footer'

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
