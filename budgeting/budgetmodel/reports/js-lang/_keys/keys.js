(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_reports_searchPlaceText',
            'bdgt_reports_searchBtnText',
            'bdgt_reports_packageText',
            'bdgt_reports_narrativeText',
            'bdgt_reports_reportGrpsText',
            'bdgt_reports_portfolioText',
            'bdgt_reports_multiYearText',
            'bdgt_reports_allReportsText',
            'bdgt_reports_reportsAllText',
            'bdgt_reports_reportsText',
            'bdgt_reports_reportsAllText',
            'bdgt_reports_reportsFavText',
            'bdgt_reports_reportsRecText',
            'bdgt_reports_reportsViewsText',    
            'bdgt_reports_reportsCustText',
            'bdgt_reports_reportsStandText',
            'bdgt_reports_grdNameText',
            'bdgt_reports_grdDescText',
            'bdgt_reports_favReportsText',
            'bdgt_reports_recReportsText',
            'ex_getDefRep_err_desc',
            'ex_getDefRep_NotFnd_err_desc',
            'ex_getCustReportData_err_desc',
            'ex_postReportsData_error_desc'
        ];

        appLangKeys.app('budgetReports').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
