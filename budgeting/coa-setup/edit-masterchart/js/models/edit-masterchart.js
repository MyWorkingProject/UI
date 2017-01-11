(function (angular) {
    "use strict";

    function factory(newMasterchartSVC, langTranslate) {
        var model = {}, translate;
        translate = langTranslate('editMasterchart').translate;
        model.glAccounts = {
            href: "",
            className: "",
            isActive: true,
            text: "GL Accounts"
            //text: translate('bdgt_editMasterchart_glAccountText')
        };

        model.category = {
            href: "",
            className: "",
            isActive: false,
            text: "Categories"
            //text: translate('bdgt_editMasterchart_categoryText')
        };

        model.cloneChart = {
            href: "",
            className: "",
            isActive: false,
            text: "Cloned To"
           // text: translate('bdgt_editMasterchart_cloneChartText')
        };

        model.srcPage = "coa-setup/new-masterchart/index.html";
        model.includePage = "coa-setup/manage-gl-account/index.html";
        model.defMenu = angular.extend({}, [model.glAccounts, model.category, model.cloneChart]);
        model.tabsMenu = [model.glAccounts, model.category, model.cloneChart];

        model.getSrcPage = function () {
            return model.srcPage;
        };

        model.resetTab = function () {
            //model.tabsMenu = [model.glAccounts, model.category, model.cloneChart];
            angular.extend(model.tabsMenu, model.defMenu);
            model.glAccounts.isActive = true;
            model.category.isActive = false;
            model.cloneChart.isActive = false;
            model.includePage = "";
            return model;
        };

        model.getGlAccountPage = function () {
            return model.glAccountPage;
        };

        model.getDefaultTabMenu = function () {
            model.tabsMenu = [model.glAccounts, model.category, model.cloneChart];
            return model.tabsMenu;
        };

        model.getMasterchartMenuData = function (masterChartID) {
            var params = {
                chartID: masterChartID
            };
            newMasterchartSVC.getMasterChartData(params).$promise.then(model.setTabsMenu);
            return model.tabsMenu;
        };

        model.setTabsMenu = function (data) {
            if (!data.records[0].isAlternativeCOA) {
                model.glAccounts.isActive = true;
                model.category.isActive = false;
                model.cloneChart.isActive = false;
                model.tabsMenu = [model.glAccounts, model.category, model.cloneChart];
            }
            else {
                model.glAccounts.isActive = true;
                model.category.isActive = false;
                model.cloneChart.isActive = false;
                model.tabsMenu = [model.glAccounts, model.category];
            }
            model.showTab();
        };

        model.showTab = function () {
            if (model.glAccounts.isActive) {
                model.includePage = "coa-setup/manage-gl-account/index.html";
            }
            if (model.category.isActive) {
                model.includePage = "coa-setup/categories/index.html";
            }
            if (model.cloneChart.isActive) {
                model.includePage = "coa-setup/clone-masterchart/index.html";
            }
        };

        model.getGLTabActive = function () {
            return model.glAccounts.isActive;
        };

        model.getCategoryTabActive = function () {
            return model.category.isActive;
        };

        model.getCloneChartTabActive = function () {
            return model.cloneChart.isActive;
        };

        model.showGlAccount = function () {
            if (model.getGLTabActive()) {
                model.showTab();
            }
        };

        model.showCategory = function () {
            if (model.getCategoryTabActive()) {
                model.showTab();
            }
        };

        model.showClone = function () {
            if (model.getCloneChartTabActive()) {
                model.showTab();
            }
        };

        return model;
    }
    angular
        .module("budgeting")
        .factory('editMasterChartModel', ['newMasterchartSVC', 'appLangTranslate', factory]);
})(angular);
