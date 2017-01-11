//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function factory($rootScope) {
        var model = {};

        model._data = [{
            href: "#/workspaces/budgetWorkflowStatus",
            className: "",
            isActive: true,
            text: "Workflows"
        }, {
            href: "#/workspaces/contracts",
            className: "",
            isActive: false,
            text: "Contracts"
        }, {
            href: "#/workspaces/budget-tasks",
            className: "",
            isActive: false,
            text: "Tasks"
        }, {
            href: "#/workspaces/budget-comments",
            className: "",
            isActive: false,
            text: "Comments"
        }];

        model.init = function () {
            $rootScope.$on('$locationChangeStart', model.updateState);
            return model;
        };

        model.data = function () {
            return model._data;
        };

        model.updateState = function (ev, next, current) {
            var url = '#' + next.split('#')[1];
            model.setState(url);
        };

        model.setState = function (url) {
            model._data.forEach(function (tab) {
                tab.isActive = tab.href == url;
            });
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('workspaceDetailsNav', ['$rootScope', factory]);
})(angular);
