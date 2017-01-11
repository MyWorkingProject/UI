//  English Resource Bundle for Admin Home Page

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('manageGlAccount');
        bundle.set({

            bdgt_manageglaccount_pageheadertext: 'Manage GL Accounts',
             bdgt_manageglaccount_hidefilters:'Hide Filters',
             bdgt_manageglaccount_showfilters:'Show Filters',
             bdgt_manageglaccount_newbuttontext:'New',
             bdgt_manageglaccount_newAccount:'New Account',
             bdgt_manageglaccount_actions: 'Actions',



             bdgt_manageglaccount_formTitle: 'New GL Account',
             bdgt_manageglaccount_updateFormTitle: 'Edit GL Account',
             bdgt_manageglaccount_assignCategoryformTitle: "Assign Account Category",
            bdgt_manageglaccount_print: "Print",
            bdgt_manageglaccount_importGLAccount: "Import GL Accounts",
            bdgt_manageglaccount_printParamsFormTitle: "Print Parameters- Master Chart",
            bdgt_manageglaccount_btnNext: "Next",
            bdgt_manageglaccount_btnBack:"Back",


             //Header Column list
             bdgt_manageglaccount_glAccountNumber: 'Account Number',
             bdgt_manageglaccount_glAccountDescription: 'Account Description',
             bdgt_manageglaccount_accountCategoryName: 'Account Category',
             bdgt_manageglaccount_accountTypeCode: 'Account Type',
             bdgt_manageglaccount_budgetUseOnly: 'Use For Budgets',
             bdgt_manageglaccount_normalBalance: 'Normal Balance',
             bdgt_manageglaccount_restrictPayroll: 'Payroll Access',


             //filter text
              bdgt_manageglaccount_filter_glAccountNumber: 'Filter by GL',
             bdgt_manageglaccount_filter_glAccountDescription: 'Filter by description',
             bdgt_manageglaccount_filter_accountCategoryName: 'Filter by Category',

             //admin keys
             bdgt_cmpny_admin_header: 'All Settings',
             bdgt_admin_header: 'Budgeting',
             bdgt_admin_masterchart:'Manage Chart Of Accounts',
             bdgt_admin_newmasterchart:'New Chart' ,
             bdgt_admin_manageglaccount:'Manage GL Accounts' ,


             //form lables
            bdgt_manageglaccount_fieldLabel_accountNumber: "GL Account Number",
            bdgt_manageglaccount_fieldLabel_accountDescription: "Account Description",
            bdgt_manageglaccount_fieldLabel_useForBudgeting: "Use for budgeting",
            bdgt_manageglaccount_fieldLabel_accountType:"Account Type",
            bdgt_manageglaccount_fieldLabel_normalBalance:"Normal Balance",
            bdgt_manageglaccount_fieldLabel_accountCategory:"Account Category",
            bdgt_manageglaccount_fieldLabel_accountNarrative:"Account Narrative",
            bdgt_manageglaccount_fieldLabel_restrictPayrollAccess:"Restrict payroll access",
            bdgt_manageglaccount_fieldLabel_saveText:"Save",
            bdgt_manageglaccount_fieldLabel_cancelText:"Cancel",
            bdgt_manageglaccount_fieldLabel_assignAccountCategory:"Account category",
            bdgt_manageglaccount_fieldLabel_assignText:"Assign",

            //Action menu list

            bdgt_manageglaccount_menulist_assignAccountCategory:"Assign account category",
            bdgt_manageglaccount_menulist_markForBudgetingUse:"Mark for budgeting use",
            bdgt_manageglaccount_menulist_unmarkForBudgetingUse:"Unmark for budgeting use",
            bdgt_manageglaccount_menulist_setDebitBalance:"Set normal balance to Debit",
            bdgt_manageglaccount_menulist_setCreditBalance:"Set normal balance to Credit",
            bdgt_manageglaccount_menulist_restrictPayrollAccess:"Restrict access to payroll",
            bdgt_manageglaccount_menulist_unRestrictPayrollAccess:"Unrestrict access to payroll",
            bdgt_manageglaccount_menulist_del:"Delete",
            bdgt_manageglaccount_menulist_moveToMasterChart:"Move to master chart",

            bdgt_manageglaccount_new_Placeholder_accountNumber: "GL Account Number",
            bdgt_manageglaccount_new_Placeholder_accountDescription: "Account Description",
            bdgt_manageglaccount_new_Placeholder_accountNarrative:" Add account narrative" ,

            //Validation Messages
            bdgt_manageglaccount_Validation_accountNumber: "GL Account Number is Required",
            bdgt_manageglaccount_Validation_accountDescription: "Account Description is Required",
            bdgt_manageglaccount_Validation_accountType:"Account Type   Selection is Required",
             bdgt_manageglaccount_Validation_accountCategory: "Account Category Selection is Required",
             bdgt_manageglaccount_Validation_assignAccountCategory: "Account Category Selection is Required",
             bdgt_manageglaccount_Validation_actionList: "Select atleast one G/L Account",


            //dilog messages

            bdgt_manageglaccount_dilog_deletDilogMessage:"The selected G/L accounts will be deleted.",
            bdgt_manageglaccount_dilog_unDelete:"Cannot delete",
            bdgt_manageglaccount_dilog_msgUsedInProperty: "The following G/L accounts canot be deleted because they used in other property",
            bdgt_manageglaccount_dilog_uGLMessage:"Unable to save G/L account",
            bdgt_manageglaccount_dilog_duplicateGL:"Duplicate G/L account number exists",
            bdgt_manageglaccount_dilog_selGLAccount:"Select G/L accounts",
            bdgt_manageglaccount_dilog_selGLInfo:"Cannot assign category to items of different account types",
            bdgt_manageglaccount_dilog_selInfo: "At least one G/L account should be selected",
            bdgt_manageglaccount_dilog_dilogDeleteMsg: "GL Delete",
            bdgt_manageglaccount_dilog_moveMCTittile: "The following G/L accounts are moved to Master charts",
            bdgt_manageglaccount_dilog_moveMCTittileInfo: "Selected GL's are Moved to Master Charts",
            bdgt_manageglaccount_dilog_unMoveMCInfo: "The following G/L accounts are already exists in Master charts",
            bdgt_manageglaccount_dilog_defaultMsg: "Something went wrong.",
            bdgt_manageglaccount_dilog_msgInvalidParam: "GLAccount list object is invalid",
            bdgt_manageglaccount_dilog_dupPropertyInfo: "G/L Account numer is already added to property chart",

            bdgt_manageglaccount_title_invalid_param: 'Invalid Parameter',
            bdgt_manageglaccount_desc_invalid_param: 'Unable to perform operation due to invalid masterchart ID',
            bdgt_manageglaccount_info_invalid_param: 'Invalid Parameter Passed',

            bdgt_manageglaccount_dilog_chart_not_found: 'NOT_FOUND',
            bdgt_manageglaccount_desc_chart_not_found: 'Unable to return gl accounts becasue of no records found',
            bdgt_manageglaccount_info_no_records_found: 'No records not found',
            bdgt_manageglaccount_desc_accntType_not_found:'Unable to return Account types becasue of no records found',
            bdgt_manageglaccount_desc_accntCategory_not_found: 'Master Chart ID/Account type ID is invalid ',
            bdgt_manageglaccount_title_unKnown_error: 'Unknown Error',
            bdgt_manageglaccount_error_info_unknown_error: 'Unknown Error Occurred',
            bdgt_manageglaccount_desc_accntCategory_unKnown_error: 'Unable to return account categories becasue of unknown error',
            bdgt_manageglaccount_glById_desc_invalid_param: 'Master Chart ID/glaccount id is invalid',
            bdgt_manageglaccount_glById_desc_chart_not_found: 'Unable to return gl account becasue of no records found',
            bdgt_manageglaccount_actions_desc_invalid_param: 'GLAccount object is invalid',
             //printParamLabel

            bdgt_manageglaccount_printParamLabel_accountType:"Account Type",
            bdgt_manageglaccount_printParamLabel_accountCategory:"Account Category",
            bdgt_manageglaccount_printParamLabel_useForBudget:"Use For Budget",
            bdgt_manageglaccount_printParamLabel_payrollAccess:"Payroll Access",
            bdgt_manageglaccount_printParamLabel_masterChartName:"Master Chart Name",
            bdgt_manageglaccount_printParamLabel_printText:"Print",
            bdgt_manageglaccount_printParamLabel_cancelText: "Cancel",
            bdgt_manageglaccount_erroPopText: 'Error',
            bdgt_manageglaccount_chart_not_found: 'Requested master chart with the specified master chart ID not found',
            bdgt_manageglaccount_invalid_param: 'Master chart ID is invalid',
            bdgt_glAccounts_save_msg: 'Saved successfully',
            bdgt_manageglaccount_wizAlert:"Unable to save/continue",
            bdgt_manageglaccount_wizAlert_error_desc: "No Gl's to save, please add Gl to save/continue",
            bdgt_manageglaccount_wizAlert_info: "No Gl's to save, please add Gl to save/continue"


        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
