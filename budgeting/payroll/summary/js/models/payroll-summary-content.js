// Payroll summary content
(function (angular) {
    'use strict';
    function factory(langTranslate) {
        var translate = langTranslate('payroll.summary').translate,
         model = {
             newEmployee: translate('bdgt_payroll_summary_new_employee'),
             newPosition: translate('bdgt_payroll_summary_new_position'),
             reportViews: translate('bdgt_payroll_summary_report_views'),
             annualizeTaxes: translate('bdgt_payroll_summary_annualize_taxes'),
             gridAction: translate('bdgt_payroll_summary_grid_action'),
             filterTxt: translate('bdgt_payroll_summary_grid_filter'),
             employee: translate('bdgt_payroll_summary_employee'),
             position: translate('bdgt_payroll_summary_position'),
             total: translate('bdgt_payroll_summary_total'),
             propertyAllocation: translate('bdgt_payroll_summary_property_allocation'),
             filterByName: translate('bdgt_payroll_summary_filter_by_name'),
             filterByTitle: translate('bdgt_payroll_summary_filter_by_title'),
             noResults: translate('bdgt_payroll_summary_no_results'),
             viewEmployeeDetails: translate('bdgt_payroll_summary_view_employee_details'),
             viewJobDetails: translate('bdgt_payroll_summary_view_job_details'),
             txtView: translate('bdgt_payroll_summary_view'),
             txtEdit: translate('bdgt_payroll_summary_Edit'),
             payrollTotal: translate('bdgt_payroll_summary_payroll_total')
         };
        return model;
    }
    angular.module('budgeting').
            factory('payrollSummaryContent', ['appLangTranslate', factory]);
})(angular);