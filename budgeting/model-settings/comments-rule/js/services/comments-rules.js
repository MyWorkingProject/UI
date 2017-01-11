
(function (angular) {
    "use strict";

    function commentsRuleSvc( $q, $http,$resource) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

      

        svc.getRuleBaseComments = function (params, data) {           
            url = '/api/budgeting/budgetmodel/propertymodelsetup/distribute/:distributedID/commentrulemodel';
            url = url.replace(":distributedID",params.distributedID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        function updateModelCommentsRules() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/propertymodelsetup/commentrulemodel';
            actions = {
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions).put;
        }
        
       /* svc.getBudgetModelComments = function (params, data) {           
            url = '/api/budgeting/common/comment/modellandingpagecomment/:distributedID';
            url = url.replace(":distributedID",params.distributedID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };*/

        svc.updateModelCommentsRules = updateModelCommentsRules();
        return svc;

    }

    angular
        .module("budgeting")
        .factory('commentsRuleSvc', [
             '$q',
            '$http','$resource',
            commentsRuleSvc]);
})(angular);
