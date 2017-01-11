//  SampleCg Service

(function (angular) {
    'use strict';

    function sampleCgSvc($resource, $q, $http) {
        var getPropertyListSvc = function (params) {
               var url, defaults = {}, actions = {}, baseUrl;
                  url = '/api/budgeting/common/budgetmodel/' + params.budgetModelID + '/properyallocation' + params.dataFilter;              
                return $resource(url, defaults, actions);
                };

        return {

            getResetAmounts: function () {
                return {
                    records: [{
                       "itemDescription": "Monthly Amounts", 
                        period1: 0, 
                        period2: 0,
                        period3: 0, 
                        period4: 0, 
                        period5: 0, 
                        period6: 0, 
                        period7: 0, 
                        period8: 0, 
                        period9: 0, 
                        period10: 0, 
                        period11: 0, 
                        period12: 0, 
                        total: 0,
                        rowType:'editable'

                    }]
                };
            },
            getProperties: function () {
                return {
                    "totalRecords": 2,
                    records: [{
                        propertyName: "Aspend Park", 
                        propertyID: 1, 
                        masterChartID: 18, 
                        masterChartName:"Meadow Bay 2012 COA", 
                        glAccountNumber: "6130.000", 
                        glAccountDescription: "Employer SUTA", 
                        glaccount: "6100.011-ADP contract exprense",
                        method: "Method", 
                        units: 25, 
                        noofEmp: "NoofEmp", 
                        squareFootage: 42068, 
                        percentage: "100", 
                        amount: 21000, 
                        "totalRecords": 4

                    }, {
                        propertyName: "Avena", propertyID: 2, masterChartID: 36,masterChartName:"2013 Fairhaven  Senior", glAccountNumber: "7100.000", glAccountDescription: "HVAC", glaccount: "6100.011-ADP contract exprense",
                        method: "Method", units: 50, noofEmp: "NoofEmp", squareFootage: 42068, percentage: "100", amount: 21000, "totalRecords": 4

                    }, {
                        propertyName: "Aztex Springs", propertyID: 3, masterChartID: 36,masterChartName:"2013 Fairhaven  Senior", glAccountNumber: "7100.000", glAccountDescription: "HVAC", glaccount: "4231.000-Contract exprense",
                        method: "Method", units: 75, noofEmp: "NoofEmp", squareFootage: 39068, percentage: "100", amount: 21000, "totalRecords": 4

                    }, {
                        propertyName: "Remington", propertyID: 4, masterChartID: 18, masterChartName:"Meadow Bay 2012 COA",  glAccountNumber: "6130.000", glAccountDescription: "Employer SUTA", glaccount: "4231.000-Contract exprense",
                        method: "Method", units: 100, noofEmp: "NoofEmp", squareFootage: 30068, percentage: "100", amount: 21000, "totalRecords": 4

                    }]
                };              
            },
            getAllocationDetails: function () {
                return {
                    records: {
                        "allocationID": 1,
                        "name": "New Allocation",
                        "description": "",
                        "method": "Equally",
                        "methodName":"Equally",
                        "amount": 0,
                        "alignCalenderMonths": true,
                        "isSiteLevel": true,
                        "budgetModelID": 1,
                        "siteID": 1
                    }
                };
            },

            getAllocationModel: function(params) {
                return $http.get('api/budgeting/tools/allocation/'+params.allocationID+'/budgetmodel/'+params.budgetModelID+'/property/'+params.propertyID+'/sitelevel/'+params.isSiteLevel+'/allocationmodel');
            },

            putAllocationModel: function(objectbody) {
               return $http.put('api/budgeting/tools/allocationdata', objectbody);
            },

            getPropertyList: function(filterdata) {            
                return getPropertyListSvc(filterdata).get().$promise;
            }

                 //.getPropertyList = getPropertyList;
           /* getPropertyList: function (params) {
                var url = '/api/budgeting/common/budgetmodel/' + params.budgetModelID + '/properyallocation' + params.dataFilter;
                var deferred = $q.defer();

                return $http({
                    data: {},
                    url: url,
                    method: 'GET',
                    timeout: deferred.promise
                });
            }*/

        };
    }
    angular
        .module('budgeting')
        .factory('allocationAmountSvc', ["$resource", "$q", "$http", sampleCgSvc]);
})(angular);
