(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('propertyChart');

        bundle.set({
            bdgt_propertychart_manageGL: 'Manage GL Accounts',
            bdgt_propertychart_print: 'Print',
            bdgt_propertychart_filterPropertyText:'Filter by property',
            bdgt_propertychart_filterChartText:'Filter by chart name',
            bdgt_propertychart_filterModifiedText: 'Filter by last edited',
            bdgt_propertychart_column_action: 'Action',
            bdgt_propertychart_column_propertyname: 'Property',
            bdgt_propertychart_column_chartname:"Master Chart Name",
            bdgt_propertychart_column_lastmodifiedBbyname: 'Last Edited By',
            bdgt_propertychart_column_lastModifiedDate: 'Last Edited Date',
            bdgt_propertychart_showfilterText: 'Show Filters',
            bdgt_propertychart_hidefilterText: 'Hide Filters',
            bdgt_propertychart_pageHeading: 'Property Chart of Accounts',
            bdgt_propertychart_badReq:'Invalid Params, Bad Request',
            bdgt_propertychart_unAuth:'Unauthorized to access this service, please contact Admin',
            bdgt_propertychart_unknown_error: 'Unable to get the property chart list',
            bdgt_propertychart_erroPopText: 'Error',
            bdgt_propertychart_getEmptyMsg: 'No results were found.',
            bdgt_propertychart_action_manage_Gl_Text: 'Manage GL Accounts',
            bdgt_propertychart_action_print_Text: 'Print'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);

