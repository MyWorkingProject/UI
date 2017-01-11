(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('cloneMasterchart');

        bundle.set({
            bdgt_cmpny_admin_header: 'OneSite Settings',
            bdgt_admin_header: 'Budgeting Administration',
            bdgt_admin_masterchart: 'Manage Chart Of Accounts',
            bdgt_admin_newmasterchart: 'New Chart',
            bdgt_clonemasterchart_pageHeading: 'Properties',
            bdgt_clonemasterchart_grdPropertyText: 'Name',
            bdgt_clonemasterchart_grdChartText: 'Current Chart',
            bdgt_clonemasterchart_grdDateText: "Date Cloned",
            bdgt_clonemasterchart_saveBtnText: 'Clone & Finish',
            bdgt_clonemasterchart_showfilterText: 'Show Filters',
            bdgt_clonemasterchart_hidefilterText: 'Hide Filters',
            bdgt_clonemasterchart_filterPropertyText: 'Property Name',
            bdgt_clonemasterchart_filterChartText: 'Master Chart Name',
            bdgt_clonemasterchart_clonePopText: 'Clone master chart',
            bdgt_clonemasterchart_overRBodyPopText: 'Current master chart(s) will be overriden',
            bdgt_clonemasterchart_overRidePopText: 'Are you sure you want to override the master chart(s)?',
            bdgt_clonemasterchart_confmPopText: 'Are you sure you want to clone the master chart(s)?',
            bdgt_clonemasterchart_erroPopText: 'Error',
            bdgt_clonemasterchart_cloneBtnText: 'Clone',
            bdgt_clonemasterchart_grdByText: 'Cloned By',
            bdgt_clonemasterchart_badReq: 'Invalid Params, Bad Request',
            bdgt_clonemasterchart_unAuth: 'Unauthorized to access this service, please contact Admin',
            bdgt_clonemasterchart_servError: 'Internal server error',
            bdgt_clonemasterchart_unknown_error: 'Unable to get the property chart clone list',
            bdgt_clonemasterchart_invalid_param: 'Cloned chart request is invalid',
            bdgt_clonemasterchart_wizard_update_failure: 'Error occurred while updating wizard status'

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
