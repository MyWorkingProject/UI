//  Configure App Language Keys

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
                'bdgt_manageglaccount_pageheadertext',
                 'bdgt_manageglaccount_hideFilters',
                 'bdgt_manageglaccount_showfilters',
                 'bdgt_masterchart_newButtonText',
                 'bdgt_masterchart_newMasterChartText',

                 'bdgt_manageglaccount_formTitle',
                 'bdgt_manageglaccount_updateFormTitle',
                 'bdgt_manageglaccount_assignCategoryformTitle',
                 'bdgt_manageglaccount_print',
                 'bdgt_manageglaccount_importGLAccount',
                 'bdgt_manageglaccount_printParamsFormTitle',
                 'bdgt_manageglaccount_btnNext',
                 'bdgt_manageglaccount_btnBack',


                 //admin keys
                 'bdgt_cmpny_admin_header',
                'bdgt_admin_header',
                'bdgt_admin_masterchart',
                 'bdgt_admin_newmasterchart',
            'bdgt_admin_manageglaccount',

                'bdgt_manageglaccount_fieldLabel_accountNumber',
                'bdgt_manageglaccount_fieldLabel_accountDescription',
                'bdgt_manageglaccount_fieldLabel_useForBudgeting',
                'bdgt_manageglaccount_fieldLabel_accountType',
                'bdgt_manageglaccount_fieldLabel_normalBalance',
                'bdgt_manageglaccount_fieldLabel_accountCategory',
                'bdgt_manageglaccount_fieldLabel_accountNarrative',
                'bdgt_manageglaccount_fieldLabel_restrictPayrollAccess',
                'bdgt_manageglaccount_fieldLabel_saveText',
                'bdgt_manageglaccount_fieldLabel_cancelText',
                'bdgt_manageglaccount_fieldLabel_assignAccountCategory',
                'bdgt_manageglaccount_fieldLabel_assignText',

                'bdgt_manageglaccount_menulist_assignAccountCategory',
                'bdgt_manageglaccount_menulist_markForBudgetingUse',
                'bdgt_manageglaccount_menulist_unmarkForBudgetingUse',
                'bdgt_manageglaccount_menulist_setDebitBalance',
                'bdgt_manageglaccount_menulist_setCreditBalance',
                'bdgt_manageglaccount_menulist_restrictPayrollAccess',
                'bdgt_manageglaccount_menulist_unRestrictPayrollAccess',
                'bdgt_manageglaccount_menulist_del',
                'bdgt_manageglaccount_menulist_moveToMasterChart',

                    //Validation Messages
                'bdgt_manageglaccount_Validation_accountNumber',
                'bdgt_manageglaccount_Validation_accountDescription',
                'bdgt_manageglaccount_Validation_accountType',
                'bdgt_manageglaccount_Validation_accountCategory',
                'bdgt_manageglaccount_Validation_assignAccountCategory',
                'bdgt_manageglaccount_Validation_actionList',


                //dilog info

                'bdgt_manageglaccount_dilog_deletDilogMessage',
                'bdgt_manageglaccount_dilog_unDelete',
                'bdgt_manageglaccount_dilog_msgUsedInProperty',
                'bdgt_manageglaccount_dilog_uGLMessage',
                'bdgt_manageglaccount_dilog_duplicateGL',
                'bdgt_manageglaccount_dilog_selGLAccount',
                'bdgt_manageglaccount_dilog_selGLInfo',
                'bdgt_manageglaccount_dilog_selInfo',
                'bdgt_manageglaccount_dilog_dilogDeleteMsg',
                'bdgt_manageglaccount_dilog_moveMCTittile',
                'bdgt_manageglaccount_dilog_moveMCTittileInfo',
                'bdgt_manageglaccount_dilog_unMoveMCInfo',
                'bdgt_manageglaccount_dilog_defaultMsg',
                'bdgt_manageglaccount_dilog_msgInvalidParam',
                'bdgt_manageglaccount_dilog_dupPropertyInfo',
                'bdgt_manageglaccount_info_no_records_found',
                'bdgt_manageglaccount_desc_accntType_not_found',
                'bdgt_manageglaccount_desc_accntCategory_not_found',
                'bdgt_manageglaccount_title_unKnown_error',
                'bdgt_manageglaccount_error_info_unknown_error',
                'bdgt_manageglaccount_desc_accntCategory_unKnown_error',
                'bdgt_manageglaccount_glById_desc_invalid_param',
                'bdgt_manageglaccount_glById_desc_chart_not_found',
                'bdgt_manageglaccount_actions_desc_invalid_param',

                //printParamLabel
                 'bdgt_manageglaccount_printParamLabel_accountType',
                 'bdgt_manageglaccount_printParamLabel_accountCategory',
                 'bdgt_manageglaccount_printParamLabel_useForBudget',
                 'bdgt_manageglaccount_printParamLabel_payrollAccess',
                 'bdgt_manageglaccount_printParamLabel_masterChartName',
                 'bdgt_manageglaccount_printParamLabel_printText',
                 'bdgt_manageglaccount_printParamLabel_cancelText',
                 'bdgt_glAccounts_save_msg',
                'bdgt_manageglaccount_erroPopText',
                 'bdgt_manageglaccount_chart_not_found',
                'bdgt_manageglaccount_invalid_param',
                'bdgt_manageglaccount_wizAlert',
                'bdgt_manageglaccount_wizAlert_error_desc',
                'bdgt_manageglaccount_wizAlert_info',

				 'bdgt_manageglaccount_glAccountNumber',
             'bdgt_manageglaccount_glAccountDescription',
             'bdgt_manageglaccount_accountCategoryName',
             'bdgt_manageglaccount_accountTypeCode',
             'bdgt_manageglaccount_budgetUseOnly',
             'bdgt_manageglaccount_normalBalance',
             'bdgt_manageglaccount_restrictPayroll',

			     //filter text
              'bdgt_manageglaccount_filter_glAccountNumber',
             'bdgt_manageglaccount_filter_glAccountDescription',
             'bdgt_manageglaccount_filter_accountCategoryName'
            ];

        appLangKeys.app('manageGlAccount').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);

