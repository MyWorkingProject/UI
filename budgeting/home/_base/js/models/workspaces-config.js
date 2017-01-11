//  Workspaces Config Model

(function(angular) {
    "use strict";

    function factory(session,languageTranslate) {
        var base, links, model = {};

        base = '/ui/budgeting/#/workspaces/';

        links = {
            "bcdb6eb8180f41d0b7f320dfb308ec7b": base + "budget-tasks",
            "68888a78123340e1965cedc4bf092456": base + "budget-comments",
            "c14201bf16e04d2aafdaac0f536b7a82": base + "budgetWorkflowStatus",
            "e1ccb3dd71314e269402b4b04fe40be0": base + "contracts"
        };

        model.sessionStatus = {
            isReady: false
        };

        model.load = function() {
            model.links = links;
            model.appName = 'budgeting';
            model.dateSensitive = false;

            var propertyID = session.getPropertyID();         
            
            model.url = '/api/budgeting/common/workspace/property/' + propertyID + '/tasks';          
            model.translator=languageTranslate('workspaces');
            return model;
        };

        model.isSessionReady = function(flag) {
            model.sessionStatus.isReady = flag;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('bdgtWorkspacesConfig', ['sessionInfo','appLangTranslate', factory]);
})(angular);
