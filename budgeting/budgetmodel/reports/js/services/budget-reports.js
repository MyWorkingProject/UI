

(function (angular) {
    "use strict";

    function commentsSvc( $q, $http,$resource) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

      

        svc.getStandardReports = function (params, data) {           
            url = '/api/budgeting/reports/defaultreportlist/:parentSiteID';
            var reqUrl = url.replace(':parentSiteID', params.parentSiteID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: reqUrl + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        svc.getRecentReports = function (data) {           
            url = '/api/budgeting/reports/recentviewedreport';
            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        svc.getCustomReports = function ( data) {           
            url = '/api/budgeting/reports/reportdefinitionlist';
         
            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };

        function updateFavorite() {
            var url, actions;
            url = '/api/budgeting/reports/reportfavorite';
            actions = {
                post: {
                    method: 'POST'

                }
            };
            return $resource(url, defaults, actions).post;
        }

        function deleteFavorite() {
            var url, actions;
            url = '/api/budgeting/reports/reportfavorite/:reportfavoriteID';
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        reportfavoriteID: 123456
                    }

                }
            };
            return $resource(url, defaults, actions).delete;
        }
    
        svc.updateFavorite = updateFavorite();
        svc.deleteFavorite = deleteFavorite();    

        return svc;

    }

    angular
        .module("budgeting")
        .factory('budgetReportsSvc', [
             '$q',
            '$http','$resource',
            commentsSvc]);
})(angular);
