//  New User Form Model

(function (angular) {
    "use strict";

    function adminModel(appLangTranslate) {
        var text, translate, model;

        translate = appLangTranslate('admin').translate;
        model = {};

        model.text = {
            adminNav: {
                "category": [{
                    "catname": translate('bdgt_admin_catname_core_setup'),
                    "links": [{
                            "linkName": translate('bdgt_admin_links_link_name_manage_charts'),
                            "linkDesc": translate('bdgt_admin_links_link_desc_manage_charts'),
                            "imgIcon": "",
                            "class": "icon-manage-charts",
                            "href": "/admin/coa"
                    }, {
                            "linkName": translate('bdgt_admin_links_link_name_expense_tools'),
                            "linkDesc": translate('bdgt_admin_links_link_desc_expense_tools'),
                            "imgIcon": "",
                            "class": "icon-expense-tools",
                            "href": "#"
                    }, {
                            "linkName": translate('bdgt_admin_links_link_name_data_import'),
                            "linkDesc": translate('bdgt_admin_links_link_desc_data_import'),
                            "imgIcon": "",
                            "class": "icon-import-data",
                            "href": "#"
                    },
                        {
                            "linkName": translate('bdgt_admin_links_link_name_custom_worksheet'),
                            "linkDesc": translate('bdgt_admin_links_link_desc_custom_worksheet'),
                            "imgIcon": "",
                            "class": "icon-custom-worksheets",
                            "href": "#"
                    },
                        {
                            "linkName": translate('bdgt_admin_links_link_name_model_builder'),
                            "linkDesc": translate('bdgt_admin_links_link_desc_model_builder'),
                            "imgIcon": "",
                            "class": "icon-model-builder",
                            "href": "#"
                    },
                        {
                            "linkName": translate('bdgt_admin_links_link_name_manage_units'),
                            "linkDesc": translate('bdgt_admin_links_link_desc_manage_units'),
                            "imgIcon": "",
                            "class": "icon-manage-units",
                            "href": "#"
                    }]
                }, {
                    "catname": translate('bdgt_admin_catname_optional_tools'),
                    "links": [{
                        "linkName": translate('bdgt_admin_links_link_name_senior_living'),
                        "linkDesc": translate('bdgt_admin_links_link_desc_senior_living'),
                        "imgIcon": "",
                        "class": "icon-senior-budgeting",
                        "href": "#"
                    }, {
                        "linkName": translate('bdgt_admin_links_link_name_reporting_tools'),
                        "linkDesc": translate('bdgt_admin_links_link_desc_reporting_tools'),
                        "imgIcon": "",
                        "class": "icon-reporting-tools",
                        "href": ""
                    }, {
                        "linkName": translate('bdgt_admin_links_link_name_rural_housing'),
                        "linkDesc": translate('bdgt_admin_links_link_desc_rural_housing'),
                        "imgIcon": "",
                        "class": "icon-rural-budgeting",
                        "href": "#"
                    }, {
                        "linkName": translate('bdgt_admin_links_link_name_corporate_budget'),
                        "linkDesc": translate('bdgt_admin_links_link_desc_corporate_budget'),
                        "imgIcon": "",
                        "class": "icon-coporate-budgeting",
                        "href": "#"
                    }]
                }]
            }
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('adminModel', ['appLangTranslate', adminModel]);
})(angular);
