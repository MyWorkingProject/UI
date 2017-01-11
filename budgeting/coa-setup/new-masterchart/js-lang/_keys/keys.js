(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_cmpny_admin_header',
            'bdgt_admin_header',
            'bdgt_admin_masterchart',
            'bdgt_admin_newmasterchart',
            'bdgt_newmasterchart_namelabel',
            'bdgt_newmasterchart_namePlace',
            'bdgt_newmasterchart_alternate',
            'bdgt_newmasterchart_custom',
            'bdgt_newmasterchart_prefix',
            'bdgt_newmasterchart_suffix',
            'bdgt_newmasterchart_prefixPlace',
            'bdgt_newmasterchart_suffixPlace',
            'bdgt_newmasterchart_optional',
            'bdgt_newmasterchart_field1',
            'bdgt_newmasterchart_delimiter1',
            'bdgt_newmasterchart_field2',
            'bdgt_newmasterchart_delimiter2',
            'bdgt_newmasterchart_field3',
            'bdgt_newmasterchart_delimiter3',
            'bdgt_newmasterchart_field4',
            'bdgt_newmasterchart_accountStrText',
            'bdgt_newmasterchart_reqmsg',
            'bdgt_newmasterchart_dupmsg',
            'bdgt_newmasterchart_existsmsg',
            'bdgt_newmasterchart_existsdetmsg',
            'bdgt_newmasterchart_altHelpText',
            'bdgt_newmasterchart_custmHelpText',
            'bdgt_newmasterchart_pageHeading',
            'bdgt_newmasterchart_nextBtnText',
            'bdgt_newmasterchart_saveBtnText',
            'bdgt_newmasterchart_cancelBtnText',
            'bdgt_newmasterchart_AlterChartlblText',
            'bdgt_newmasterchart_AlterChartmarkText',
            'bdgt_newmasterchart_chart_not_found',
            'bdgt_newmasterchart_invalid_param',
            'bdgt_newmasterchart_erroPopText',
            'bdgt_newmasterchart_wizard_update_failure',
            'bdgt_newmasterchart_editChartText',
            'bdgt_newmasterchart_customAccntText',
            'bdgt_newmasterchart_filed1msg'
        ];

        appLangKeys.app('newMasterchart').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
