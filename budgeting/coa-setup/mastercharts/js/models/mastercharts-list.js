//  Users List Model

(function (angular) {
    "use strict";

    function factory( langTranslate) {
        var text, state, model, actionMenuList, options;
        var translate=langTranslate('mastercharts').translate;
        model = {};

        model.text = {
            PageHeaderText: translate('bdgt_masterchart_pageheadertext'),
            moduleText: translate('bdgt_masterchart_moduleText'),
            hideFilters: translate('bdgt_masterchart_hidefilters'),
            showFilters: translate('bdgt_masterchart_showfilters'),
            newButtonText: translate('bdgt_masterchart_newbuttontext'),
            newMasterChartText: translate('bdgt_masterchart_newmastercharttext'),

        };

        model.state = {
            tableFilter: {
                filter: false
            }
        };

        model.defaultPageProps = {
            showMasterchartList: true,
            propertyChartPage: "",
            accountMappingPage: "",
            isMenuOn: false,
            mastercharts: {
                href: "",
                className: "",
                isActive: true,
                text: translate('bdgt_masterchart_tabs_masterChart')
            },
            propertychart: {
                href: "",
                className: "",
                isActive: false,
                text: translate('bdgt_masterchart_tabs_propertyTab')
            },
            accountmapping: {
                href: "",
                className: "",
                isActive: false,
                text: translate('bdgt_masterchart_tabs_accountMapping')
            }

        };

        model.includePage = "";

        model.form = {};

        angular.copy(model.defaultPageProps, model.form);

        model.tabsMenu = [model.form.mastercharts, model.form.propertychart, model.form.accountmapping];

        model.reset = function () {
            angular.copy(model.defaultPageProps, model.form);
            model.tabsMenu = [model.form.mastercharts, model.form.propertychart, model.form.accountmapping];
        };

        model.updateMenuFlag = function (menuFlag) {
            model.form.isMenuOn = menuFlag;
        };

        model.actionMenuList = {
            masterchart: translate('bdgt_cmpny_admin_menu_masterchart'),
            altMasterChart: translate('bdgt_cmpny_admin_menu_altMasterChart')
        };


        model.showTab = function () {
            if (model.isMasterCharts()) {
                model.includePage = "";
            }
            if (model.isPropertyChart()) {
                model.includePage = "coa-setup/property-chart/index.html";
            }
            if (model.isAccountMapping()) {
                model.includePage = "coa-setup/accountMapping.html";
            }
        };

        model.showPropertyTab = function () {
            if (model.isPropertyChart()) {
                model.showTab();
            }
        };

        model.showMasterChartTab = function () {
            if (model.isMasterCharts()) {
                model.showTab();
            }
        };

        model.showAccountmappingTab = function () {
            if (model.isAccountMapping()) {
                model.showTab();
            }
        };

        model.isPropertyChart = function () {
            return model.form.propertychart.isActive;
        };

        model.isMasterCharts = function () {
            return model.form.mastercharts.isActive;
        };


        model.isAccountMapping = function () {
            return model.form.accountmapping.isActive;
        };

        model.isMenuOn = function () {
            return model.form.isMenuOn;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('masterChartsListModel', [
                 'appLangTranslate',
                factory
        ]);
})(angular);

