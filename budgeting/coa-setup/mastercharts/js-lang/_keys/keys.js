//  Configure App Language Keys

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_masterchart_PageHeaderText',
            'bdgt_masterchart_moduleText',
            'bdgt_masterchart_hideFilters',
            'bdgt_masterchart_showFilters',
            'bdgt_masterchart_newButtonText',
            'bdgt_masterchart_newMasterChartText',

            //Header Column list

            'bdgt_masterchart_Action',
            'bdgt_masterchart_Name',
            'bdgt_masterchart_isAlternativeCOA',
            'bdgt_masterchart_mappedChartNames',
            'bdgt_masterchart_lastModifiedByName',
            'bdgt_masterchart_lastModifiedDate',

            //action Menu list
            'bdgt_masterchart_actions_view',
            'bdgt_masterchart_actions_edit',
            'bdgt_masterchart_actions_defaultAdjustment',
            'bdgt_masterchart_actions_copy',
            'bdgt_masterchart_actions_copyAsMasterChart',
            'bdgt_masterchart_actions_copyAsAlternateChart',
            'bdgt_masterchart_actions_print',
            'bdgt_masterchart_actions_delete',

            //admin keys
            'bdgt_cmpny_admin_header',
            'bdgt_admin_header',
            'bdgt_admin_masterchart',
            'bdgt_admin_newmasterchart',
            'bdgt_admin_manageglaccount',
            'bdgt_cmpny_admin_menu_masterchart',
            'bdgt_cmpny_admin_menu_altMasterChart',

            'bdgt_masterchart_dilog_deletDilogMessage',
            'bdgt_masterchart_dilog_responseDilogMessage',
            'bdgt_masterchart_dilog_deletDilogMessageInfo',
            'bdgt_masterchart_dilog_unDeleteReason',
            'bdgt_masterchart_dilog_deletDilogQuestion',
            'bdgt_masterchart_dilog_copyMasterChartTitle',
            'bdgt_masterchart_dilog_copyMasterChartInfo',
            'bdgt_masterchart_dilog_msgInvalidParam',

            //scroll Tab
            'bdgt_masterchart_tabs_masterChart',
            'bdgt_masterchart_tabs_propertyTab',
            'bdgt_masterchart_tabs_accountMapping',
            'bdgt_masterchart_dilog_msgNotFound',
            'bdgt_masterchart_dilog_msgNoRecFound',
            'bdgt_masterchart_dilog_msgCopyMasterChart',
            'bdgt_masterchart_dilog_msgCopyAlternateChart'
        ];

        appLangKeys.app('mastercharts').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
