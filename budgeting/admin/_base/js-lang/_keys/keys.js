//  Configure App Language Keys

(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_cmpny_admin_header',
            'bdgt_admin_header',
            'bdgt_admin_masterchart',
            'bdgt_admin_newmasterchart',
            'bdgt_admin_manageglaccount',

            'bdgt_admin_catname_core_setup',

            'bdgt_admin_links_link_name_manage_charts',
            'bdgt_admin_links_link_name_expense_tools',
            'bdgt_admin_links_link_name_data_import',
            'bdgt_admin_links_link_name_custom_worksheet',
            'bdgt_admin_links_link_name_model_builder',
            'bdgt_admin_links_link_name_manage_units',

            'bdgt_admin_links_link_desc_manage_charts',
            'bdgt_admin_links_link_desc_expense_tools',
            'bdgt_admin_links_link_desc_data_import',
            'bdgt_admin_links_link_desc_custom_worksheet',
            'bdgt_admin_links_link_desc_model_builder',
            'bdgt_admin_links_link_desc_manage_units',

            'bdgt_admin_catname_optional_tools',

            'bdgt_admin_links_link_name_senior_living',
            'bdgt_admin_links_link_name_reporting_tools',
            'bdgt_admin_links_link_name_rural_housing',
            'bdgt_admin_links_link_name_corporate_budget',


            'bdgt_admin_links_link_desc_senior_living',
            'bdgt_admin_links_link_desc_reporting_tools',
            'bdgt_admin_links_link_desc_rural_housing',
            'bdgt_admin_links_link_desc_corporate_budget'
        ];

        appLangKeys.app('admin').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
