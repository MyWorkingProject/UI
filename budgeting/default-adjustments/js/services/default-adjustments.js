//service
(function (angular) {
    "use strict";

    function commentsSvc($q, $http, $resource) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;
        
        svc.getDashboardComments = function (params) {
            url = '/api/budgeting/coa/budgetmodel/:budgetModelID/property/:propertyID/categoryadjpercent';
            url = url.replace(":budgetModelID", params.budgetModelID);
            url = url.replace(":propertyID", params.propertyID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: url, 
                method: 'GET',
                timeout: deferred.promise
            });
        };

        function saveDefaultAdjustments () {
            var url, actions, defaults;
            url = '/api/budgeting/coa/overwrite/:staus/budgetyear/:budgetYear/categoryadjpercent';
            defaults = {};
            actions = {
                putData: {
                    method: 'PUT',
                    params: {
                        staus: "@staus",
                        budgetYear: "@budgetYear"
                    }
                }

            };
            return $resource(url, defaults, actions);
        }

        svc.saveDefaultAdjustments = saveDefaultAdjustments().putData;

        return svc;
    }

    angular
        .module("budgeting")
        .factory('commentsSvc', [
             '$q',
            '$http','$resource',
            commentsSvc]);
})(angular);
