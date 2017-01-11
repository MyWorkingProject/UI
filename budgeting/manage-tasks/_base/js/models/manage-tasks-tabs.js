//  Users List Model

(function (angular) {
    'use strict';

    function factory(langTranslate/*, session*/) {
        var text, state, model;
        var translate;
        translate = langTranslate('manageTasks').translate;
        model = {};
       

        model.modelsTab = {
            href: "",
            className: "",
            isActive: true,          
            text: translate('tabs_models')
        };

        model.propTab = {
            href: "",
            className: "",
            isActive: false,
            text: translate('tabs_properties')
        };

        model.usersTab = {
            href: "",
            className: "",
            isActive: false,
            text: translate('tabs_users')
        };


        model.includePage = "workspaces/budget-models/index.html";
        model.defMenu = angular.extend({}, [model.modelsTab, model.propTab, model.usersTab]);
        model.tabsMenu = [model.modelsTab, model.propTab, model.usersTab];

     

        model.resetTab = function () {            
            angular.extend(model.tabsMenu, model.defMenu);
            model.modelsTab.isActive = true;
            model.propTab.isActive = false;
            model.usersTab.isActive = false;
            model.includePage = "";
            return model;
        };

        model.getModelsTabActive = function () {
            return model.modelsTab.isActive;
        };

        model.getPropTabActive = function () {
            return model.propTab.isActive;
        };

        model.getUsersTabActive = function () {
            return model.usersTab.isActive;
        };

        model.showModels = function () {
            if (model.getModelsTabActive()) {
                model.showTab();
            }
        };

        model.showProperties = function () {
            if (model.getPropTabActive()) {
                model.showTab();
            }
        };

        model.showUsers = function () {
            if (model.getUsersTabActive()) {
                model.showTab();
            }
        };

        model.showTab = function () {
            if (model.modelsTab.isActive) {
                model.includePage = "workspaces/budget-models/index.html";
            }
            if (model.propTab.isActive) {
                model.includePage = "workspaces/properties/index.html";
            }
            if (model.usersTab.isActive) {
                model.includePage = "workspaces/users/index.html";
            }
        };



        return model;
    }

    angular
        .module('budgeting')
        .factory('manageTasksTabModel', [
                'appLangTranslate',
                /* 'session',*/
                factory
        ]);
})(angular);
