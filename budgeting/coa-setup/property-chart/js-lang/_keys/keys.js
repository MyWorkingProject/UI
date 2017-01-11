(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_propertychart_manageGL',
            'bdgt_propertychart_print',
            'bdgt_propertychart_filterPropertyText',
            'bdgt_propertychart_filterChartText',
            'bdgt_propertychart_filterModifiedText',
            'bdgt_propertychart_column_action',
            'bdgt_propertychart_column_propertyname',
            'bdgt_propertychart_column_chartname',
            'bdgt_propertychart_column_lastmodifiedBbyname',
            'bdgt_propertychart_column_lastModifiedDate',
            'bdgt_propertychart_showfilterText',
            'bdgt_propertychart_hidefilterText',
            'bdgt_propertychart_pageHeading',
            'bdgt_propertychart_badReq',
            'bdgt_propertychart_unAuth',
            'bdgt_propertychart_unknown_error',
            'bdgt_propertychart_erroPopText',
            'bdgt_propertychart_getEmptyMsg',
            'bdgt_propertychart_action_manage_Gl_Text',
            'bdgt_propertychart_action_print_Text'
        ];

        appLangKeys.app('propertyChart').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);

