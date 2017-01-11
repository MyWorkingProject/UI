//  English Resource Bundle for Admin Home Page

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('mastercharts');

        bundle.set({

            bdgt_masterchart_pageheadertext: 'Manage Chart of Accounts',
            bdgt_masterchart_moduleText: 'Master Chart of Accounts',
            bdgt_masterchart_hidefilters: 'Hide Filters',
            bdgt_masterchart_showfilters: 'Show Filters',
            bdgt_masterchart_newbuttontext: 'New',
            bdgt_masterchart_newmastercharttext: 'New Chart',

            //Header Column list

            bdgt_masterchart_column_action: 'Action',
            bdgt_masterchart_column_name: 'Name',
            bdgt_masterchart_column_isalternativecoa: 'Is Alternate?',
            bdgt_masterchart_column_mappedchartnames: 'Mapped to',
            bdgt_masterchart_column_lastmodifiedBbyname: 'Last Edited By',
            bdgt_masterchart_column_lastmodifieddate: 'Last Edited Date',

            //action Menu list
            bdgt_masterchart_actions_view: 'View',
            bdgt_masterchart_actions_edit: 'Edit',
            bdgt_masterchart_actions_defaultAdjustment: 'Default Adjustment %',
            bdgt_masterchart_actions_copy: 'Copy',
            bdgt_masterchart_actions_print: 'Print',
            bdgt_masterchart_actions_delete: 'Delete',
            bdgt_masterchart_actions_copyAsMasterChart: 'Copy As Master Chart',
            bdgt_masterchart_actions_copyAsAlternateChart: 'Copy As Alternate Chart',

            //filter text
            bdgt_masterchart_filter_name: 'Filter by chart name',
            bdgt_masterchart_filter_isalternativecoa: 'is-alternative-coa',
            bdgt_masterchart_filter_mappedchartnames: 'Filter by MappedTo',
            bdgt_masterchart_filter_lastmodifiedBbyname: 'Filter by Last edited by',
            bdgt_masterchart_filter_lastmodifieddate: 'Filter by LastEditedDate',

            //admin keys
            bdgt_cmpny_admin_header: 'All Settings',
            bdgt_admin_header: 'Budgeting',
            bdgt_admin_masterchart: 'Manage Chart Of Accounts',
            bdgt_admin_newmasterchart: 'New Chart',
            bdgt_admin_manageglaccount: 'Manage GL Accounts',

            //menu links

            bdgt_cmpny_admin_menu_masterchart: "Master Chart",
            bdgt_cmpny_admin_menu_altMasterChart: "Alternate Chart",

            bdgt_masterchart_dilog_deletDilogMessage: "Delete Chart?",
            bdgt_masterchart_dilog_responseDilogMessage: "Unable to Delete Master Chart",
            bdgt_masterchart_dilog_deletDilogMessageInfo: "",
            bdgt_masterchart_dilog_unDeleteReason: "Cannot delete master chart that has been cloned to properties",
            bdgt_masterchart_dilog_deletDilogQuestion: "Do you wish to delete the chart?",
            bdgt_masterchart_dilog_copyMasterChartTitle: 'Copy Mastechart',
            bdgt_masterchart_dilog_copyMasterChartInfo: 'Unable to copy masterchart',
            bdgt_masterchart_dilog_msgInvalidParam: "GLAccount list object is invalid",

            bdgt_masterchart_dilog_msgNotFound: 'NOT_FOUND',
            bdgt_masterchart_dilog_msgNoRecFound: 'Unable to return master chart list becasue of no records found',
            bdgt_masterchart_dilog_msgCopyMasterChart: 'Successfully copied',

            //scroll Tab
            bdgt_masterchart_tabs_masterChart: 'Master Charts',
            bdgt_masterchart_tabs_propertyTab: 'Property Charts',
            bdgt_masterchart_tabs_accountMapping: 'Account Mapping'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
