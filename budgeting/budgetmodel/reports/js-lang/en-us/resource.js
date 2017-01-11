(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('budgetReports');

        bundle.set({

            bdgt_reports_searchPlaceText:'Report name',
            bdgt_reports_searchBtnText:'Search',
            bdgt_reports_packageText:'Model Package',
            bdgt_reports_narrativeText:'Narrative',
            bdgt_reports_reportGrpsText:'Reporting Groups',
            bdgt_reports_portfolioText:'Portfolio Reporting',
            bdgt_reports_multiYearText:'Multiyear Projections',
            bdgt_reports_allReportsText:'All Reports',
            bdgt_reports_reportsText:'Reports',
            bdgt_reports_reportsAllText:'All',
            bdgt_reports_reportsFavText:'Favorite',
            bdgt_reports_reportsRecText:'Recent',
            bdgt_reports_reportsViewsText:'Model Views',
            bdgt_reports_reportsCustText:'Custom Reports',
            bdgt_reports_reportsStandText:'Standard Reports',
            bdgt_reports_grdNameText:'Name',
            bdgt_reports_grdDescText:'Description',
            bdgt_reports_favReportsText:'Favorite Reports',
            bdgt_reports_recReportsText:'Recent Reports',
            ex_getDefRep_err_desc: 'Invalid Parameters passed',
            ex_getDefRep_NotFnd_err_desc: 'Report data is not found',
            ex_getCustReportData_err_desc: 'Error in getting reports data',
            ex_postReportsData_error_desc: 'Error occurred while saving'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
