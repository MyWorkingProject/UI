//  English Resource Bundle for Admin Home Page

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('admin');

        bundle.set({
            bdgt_cmpny_admin_header: 'All Settings',
            bdgt_admin_header: 'Budgeting',
            bdgt_admin_masterchart: 'Manage Chart Of Accounts',
            bdgt_admin_newmasterchart: 'New Chart',
            bdgt_admin_manageglaccount: 'Manage GL Accounts',

            bdgt_admin_catname_core_setup: 'Core Setup',

            bdgt_admin_links_link_name_manage_charts: 'Manage Chart Of Accounts',
            bdgt_admin_links_link_name_expense_tools: 'Expense Tools',
            bdgt_admin_links_link_name_data_import: 'Data Import',
            bdgt_admin_links_link_name_custom_worksheet: 'Custom Worksheets',
            bdgt_admin_links_link_name_model_builder: 'Model Builder',
            bdgt_admin_links_link_name_manage_units: 'Manage Units & Sub-Properties',

            bdgt_admin_links_link_desc_manage_charts: 'Define and manage Master chart of accounts,reporting structure and GL mappings.',
            bdgt_admin_links_link_desc_expense_tools: 'Define or manage payroll, debt services, or central allocations.',
            bdgt_admin_links_link_desc_data_import: 'Import financial and operating data directly from OneSite, MRI, Yardi or CSV file.',
            bdgt_admin_links_link_desc_custom_worksheet: 'Build or edit custom worksheets and assumptions.',
            bdgt_admin_links_link_desc_model_builder: 'Define or Manage models and workflow, create versions and export model data.',
            bdgt_admin_links_link_desc_manage_units: 'Manage unit types and unit details imported. Manage sub-properties and unit mappings.',

            bdgt_admin_catname_optional_tools: 'Optional Tools',

            bdgt_admin_links_link_name_senior_living: 'Senior Living',
            bdgt_admin_links_link_name_reporting_tools: 'Reporting Tools',
            bdgt_admin_links_link_name_rural_housing: 'Rural Housing',
            bdgt_admin_links_link_name_corporate_budget: 'Corporate Budget Builder',

            bdgt_admin_links_link_desc_senior_living: 'Define and manage services and service groups for Senior Living assets.',
            bdgt_admin_links_link_desc_reporting_tools: 'Customize and manage the reports for properties, reporting groups, portfolio groups and model narratives.',
            bdgt_admin_links_link_desc_rural_housing: 'Setup unit types, rent schedules and map budget items to generate MINC files for budget and balance sheet forms.',
            bdgt_admin_links_link_desc_corporate_budget: 'Create corporate entities and manage property wise management fee GLs, map them for corporate budgets.'
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
