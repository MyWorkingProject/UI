(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_cmpny_admin_header',
            'bdgt_admin_header',
            'bdgt_admin_masterchart',
            'bdgt_admin_newmasterchart',
            'bdgt_clonemasterchart_pageHeading',
            'bdgt_clonemasterchart_grdPropertyText',
            'bdgt_clonemasterchart_grdChartText',
            'bdgt_clonemasterchart_grdDateText',
            'bdgt_clonemasterchart_saveBtnText',
            'bdgt_clonemasterchart_showfilterText',
            'bdgt_clonemasterchart_hidefilterText',
            'bdgt_clonemasterchart_filterPropertyText',
            'bdgt_clonemasterchart_filterChartText',
            'bdgt_clonemasterchart_clonePopText',
            'bdgt_clonemasterchart_overRBodyPopText',
            'bdgt_clonemasterchart_overRidePopText',
            'bdgt_clonemasterchart_confmPopText',
            'bdgt_clonemasterchart_erroPopText',
            'bdgt_clonemasterchart_cloneBtnText',
            'bdgt_clonemasterchart_grdByText',
            'bdgt_clonemasterchart_badReq',
            'bdgt_clonemasterchart_unAuth',
            'bdgt_clonemasterchart_servError',
            'bdgt_clonemasterchart_invalid_param',
            'bdgt_clonemasterchart_unknown_error',
            'bdgt_clonemasterchart_wizard_update_failure'
        ];

        appLangKeys.app('cloneMasterchart').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
