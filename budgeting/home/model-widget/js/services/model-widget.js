//  Mastercharts Service

(function (angular) {
    'use strict';

    function modelWidgetSVC($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

       svc.getbudgetModelList = function (params, data) {
            url = '/api/budgeting/dashboard/property/:propertyID/dashboardbudgets';
            var reqUrl = url.replace(':propertyID', params.propertyID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: reqUrl + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };  

          function updateBudgetModelFilters() {
            var url = '/api/budgeting/common/preference';
 
            actions = {
                updateFilter: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function getBudgetModelFilters() {
            url = '/api/budgeting/common/preference/:screenName';
            actions = {
                getFilterList: {
                    method: 'GET',
                     params: {
                        screenName: "dashBoardModels",
                       
                    }
                }
            };
            return $resource(url, defaults, actions);
        }
      
       svc.updateBudgetModelFilters = updateBudgetModelFilters().updateFilter;
       svc.getBudgetModelFilters = getBudgetModelFilters().getFilterList;
        return svc;
    }

    angular
        .module('budgeting')
        .factory('modelWidgetSVC', ['$resource',
           '$q',
            '$http',
            modelWidgetSVC]);
})(angular);
