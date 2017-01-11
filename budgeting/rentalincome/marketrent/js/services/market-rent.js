(function (angular) {
    'use strict';

    function marketRentSvc($q, $http, nav, $resource) { //, model
        var defaults = {};
        var svc= {};
        function getmarketRentModifiedDates() {
            var actions, url;

            url = '/api/budgeting/leasingrents/distribute/:distributedID/marketrentlastmodifieddates';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        distributedID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

       function getScheduleRentModifiedDates() {
            var actions, url;
              url = '/api/budgeting/leasingrents/distribute/:distributedID/schedulerentlastmodifieddates';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        distributedID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        } 


        svc.abortGetMRData = function () {
                 if (svc.getData) {
                     svc.getData.resolve();
                     svc.getData = undefined;
                 }
                 return svc;

             };

        svc.getMRData = function (params) {
                var url =  nav.getURL();
                url = url.replace(':distributedID', params.distID);
                url = url.replace(':noOfPeriods', params.noOfPeriods);
                url = url.replace(':islatestrent', params.islatestrent);   
                svc.getData = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: url,
                timeout: svc.getData.promise
            });
        };

        svc.getMRCapData = function (url,params) {
                url = url.replace(':distributedID', params.distID);
                url = url.replace(':noOfPeriods', params.noOfPeriods);
                url = url.replace(':islatestrent', params.islatestrent);   
                svc.getData = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: url,
                timeout: svc.getData.promise
            });
        };

        function getUnitTypes() {
            var url, actions;
            url = '/api/budgeting/leasingrents/budgetmodel/:budgetModelID/property/:propertyID/unittype';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        budgetModelID: 0,
                        propertyID: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        svc.saveMRData = function(params,data) {
            var url, actions;
            url = nav.getSaveURL();
            url = url.replace(':distributedID', params.distributedID);
            if(params.updateAllMarketRent !== undefined){
                url = url.replace(':updateAllMarketRent', params.updateAllMarketRent);
            }
            if(params.updateAllScheduleRent !== undefined){
                url = url.replace(':updateAllScheduleRent', params.updateAllScheduleRent);
            }
            svc.putData = $q.defer();

            return $http({
                data: data,
                method: 'PUT',
                url: url,
                timeout: svc.putData.promise
            });
        };
        
        svc.getUnitTypes = getUnitTypes().get;
        svc.getmarketRentModifiedDates = getmarketRentModifiedDates().get;
        svc.getScheduleRentModifiedDates = getScheduleRentModifiedDates().get;
        return svc;
    }

    angular
        .module('budgeting')
        .factory('MarketRentSvc', ['$q','$http','BdgtRentalIncomeModelNav','$resource', marketRentSvc]);
})(angular);



//  hapVoucher List Service

//(function (angular) {
//    'use strict';

//    function factory($q, $http) {
//        var svc = {},
//            prefix = '/Json/marketRent.json';


//        svc.getList = function () {
//            var url = prefix;
//            // var listUrl = svc.getUrl(url, params);
//            svc.getReq = $q.defer();

//            return $http({
//                data: {},
//                method: 'GET',
//                url: url,
//                timeout: svc.getReq.promise
//            });
//        };

//        svc.abortList = function () {
//            if (svc.getReq) {
//                svc.getReq.resolve();
//                svc.getReq = undefined;
//            }
//            return svc;
//        };

//        return svc;
//    }

//    angular
//        .module("budgeting")
//        .factory('MarketRentSvc', ['$q', '$http', factory]);
//})(angular);

