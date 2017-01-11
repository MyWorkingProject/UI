//  SampleCg Service

(function (angular) {
    'use strict';

    
    function marketRentRefSvc($resource, model) {
        var defaults = {};
        function getmarketRentReferenceDetails() {
            var url, actions;
            url = '/api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/marketrentferencedata';
           
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        distributedID: 0,
                        noOfPeriods: 0
                    }
                }
            };
            return $resource(url, defaults, actions).get;
        }

        function getScheduleRentReferenceDetails() {
            var url, actions;
            url = '/api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/schedulerentferencedata';  
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        distributedID: 0,
                        noOfPeriods: 0
                    }
                }
            };
            return $resource(url, defaults, actions).get;
        }

        return {
            getmarketRentReferenceDetails: getmarketRentReferenceDetails(),
            getScheduleRentReferenceDetails: getScheduleRentReferenceDetails()
        };
    }

    angular
        .module('budgeting')
        .factory('MarketRentRefSvc', ['$resource', 'BdgtRentalIncomeModelNav', marketRentRefSvc]);
})(angular);