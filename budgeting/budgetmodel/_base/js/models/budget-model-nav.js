//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function BdgtModelNav($rootScope, langTranslate,modelSVC,$filter) {
        var translate;
        translate = langTranslate('BdgtModelDetails').translate;

        var model = {};
        model.emptyData = {
            distID: 0,
            _data: [{
                href: "#/budgetmodel/:distID/overview",
                className: "",
                isActive: true,
                text: translate('bdgt_model_tabs_categories_txt')
            }, {
                href: "#/budgetmodel/:distID/tasks",
                className: "",
                isActive: false,
                text: translate('bdgt_model_tabs_tasks_txt')
            }, {
                href: "#/budgetmodel/:distID/comments",
                className: "",
                isActive: false,
                text: translate('bdgt_model_tabs_budget_comments_txt')
            }, {
                href: "#/budgetmodel/:distID/workflow",
                className: "",
                isActive: false,
                text: translate('bdgt_model_tabs_workflow_txt')
            }, {
                href:"",
                //href: "javascript:void(0);",//"#/budgetmodel/:distID/activities",
                className: "",
                isActive: false,
                text: translate('bdgt_model_tabs_activities_txt')
            }, {
                href:"",
                //href:"javascript:void(0);", //"#/budgetmodel/:distID/documents",
                className: "",
                isActive: false,
                text: translate('bdgt_model_tabs_docs_txt')
            }, {
                href: "#/budgetmodel/:distID/reports",
                className: "",
                isActive: false,
                text: translate('bdgt_model_tabs_reports_txt')
            }]
        };

        model.form = {};

        angular.copy(model.emptyData, model.form);


        model.init = function () {
            $rootScope.$on('$locationChangeStart', model.updateState);
            return model;
        };

        model.data = function () {
            return model.form._data;
        };

        model.updateState = function (ev, next, current) {
            var url = '#' + next.split('#')[1];
            model.setState(url);
        };

        model.setState = function (url) {
            model.form._data.forEach(function (tab) {
                tab.isActive = tab.href == url;
            });
        };

        model.setDistID = function (id) {
            model.form.distID = id;
        };

        model.setNavUrls = function () {
            model.form._data.forEach(function (item) {
                item.href = item.href.replace(":distID", model.form.distID);
            });
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        model.getTabDataCount = function(){
            var param= {
                        distributedID:model.form.distID
                       };
           return modelSVC.getPropertyModelTaskCommnetCount(param).$promise;
        };

        model.updateTabData = function(response){
                var pendingCnt = $filter('filter')(response.records,{ description: 'Pending' });
                var unReadCnt = $filter('filter')(response.records,{ description: 'Unread' });
                var taskRecord = $filter('filter')(model.form._data,{ href: '/tasks' });
                var commnetRecord = $filter('filter')(model.form._data,{ href: '/comments' });
                if(unReadCnt.length > 0){
                    commnetRecord[0].text = commnetRecord[0].text + " (" + unReadCnt[0].metric + ")";
                }
                else{
                    commnetRecord[0].text = commnetRecord[0].text + " (0)";
                }

                if(pendingCnt.length > 0){
                    taskRecord[0].text = taskRecord[0].text + " (" + pendingCnt[0].metric + ")";
                }
                else{
                    taskRecord[0].text = taskRecord[0].text + " (0)";
                }
    
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('BdgtModelNav', [
            '$rootScope',
            'appLangTranslate','BdgtModelSvc','$filter',
            BdgtModelNav]);
})(angular);
