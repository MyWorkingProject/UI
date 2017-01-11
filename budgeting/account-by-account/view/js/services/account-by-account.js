//  SampleCg Service

(function (angular) {
    'use strict';
  
    function accountByAccountSVC($resource) {
        var svc = {}, url, deferred, actions, defaults = {},prefix;

         function getAccTypes() {
            url = '/api/budgeting/coa/accounttype/accounttypecombo';
            actions = {
                getAccountTypeList: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }

        function getAccCategory() {

            var url = '/api/budgeting/coa/masterchart/:masterChartID/accounttype/:accountTypeID/accountcategorycombo';

            actions = {
                getAccCategoryList: {
                    method: 'GET',
                    params: {
                        masterChartID: 1,
                        accountTypeID: 1
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        function getMonthlyViewData(data) {
            var url, actions, defaults;
            url = "/api/budgeting/coa/accountbyaccount" + svc.getQuery(data);
            defaults = {};   
            actions = {
                getData: {
                    method: 'GET'                    
                }
            };
            return $resource(url, defaults, actions);
        }
        
         svc.getQuery = function(json) {
            var query = [];
            angular.forEach(json, function(value, key) {
                query.push("accountbyaccountPref." + key + "=" + value);
            });

            return "?" + query.join("&");

            // var str = $window.JSON.stringify(json);
            // return "?request=" + $window.btoa(str);
        }; 

        svc.getAccTypes = getAccTypes().getAccountTypeList;
        svc.getAccCategory = getAccCategory().getAccCategoryList;
        svc.getMonthlyViewData = function(data){
            return getMonthlyViewData(data).getData();
        };

        return svc;
    }

    angular
        .module('budgeting')
        .factory('accountByAccountSVC', ['$resource', accountByAccountSVC]);
})(angular);



