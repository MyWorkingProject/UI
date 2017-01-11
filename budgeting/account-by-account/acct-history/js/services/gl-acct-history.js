(function () {
    "use strict";

    function glHistorySvc(moment, $resource, $window) {
        var svc = {};

        svc.url = {
            bookType: "/api/budgeting/coa/property/:propertyID/year/:year/datatype/Actual/accountingbook",
            glAcctHistory: "/api/budgeting/coa/glhistorymodel",
            glAcctHistoryByPeriod: "/api/budgeting/coa/glperiodhistorymodel",
            glAcctBudgetHistory: "/api/budgeting/coa/glbudgethistory"
        };

        svc.requests = {
            bookType: null,
            history: null
        };

        // GL Account History - Actual Data
        svc.getGLAcctHistoryReq = function(paramData) {
            var params = svc.getQuery({
                    masterChartID: paramData.masterChartID, //2,
                    propertyID: paramData.propertyID, //1140266,
                    glAccountNumber: paramData.glAcctNumber, //40010,
                    bookType: paramData.bookType //"ACCRUAL", 
                });

            var url = svc.url.glAcctHistory + params,
                actions = {
                    get: {
                        method: "GET",
                        cancellable: true
                    }
                };

            return $resource(url, {}, actions).get();
        };
        svc.getGLAcctHistory = function (paramData) {
            svc.requests.history = svc.getGLAcctHistoryReq(paramData);
            return svc.requests.history.$promise;
        };

        // GL Account History by Period - Actual Data
        svc.getGLAcctHistoryByPeriodReq = function(paramData) {
            var params = svc.getQuery({
                    masterChartID: paramData.masterChartID, //2,
                    propertyID: paramData.propertyID, //1140266,
                    glAccountNumber: paramData.glAcctNumber, //40010,
                    year: paramData.year, //2015,
                    bookType: paramData.bookType, //"ACCRUAL", 
                    monthName: paramData.month, //"March", 
                });

            var url = svc.url.glAcctHistoryByPeriod + params,
                actions = {
                    get: {
                        method: "GET",
                        cancellable: true
                    }
                };

            return $resource(url, {}, actions).get();
        };
        svc.getGLAcctHistoryByPeriod = function (paramData) {
            svc.requests.history = svc.getGLAcctHistoryByPeriodReq(paramData);
            return svc.requests.history.$promise;
        };

        // GL Account History - Model Data
        svc.getGLBudgetAcctHistoryReq = function(paramData) {
            var month = moment().month(paramData.month).format("M"), //convert month to number
                params = svc.getQuery({
                    distributedID: paramData.distributedID, //136,
                    glAccountNumber: paramData.glAcctNumber, //"4010.000"
                    selectedMonth: month, //1,
                    selectedYear: paramData.year, //2016,
                    budgetType: paramData.type,
                    propertyID: paramData.propertyID
                }, "glBudgetHistoryParams");

            var url = svc.url.glAcctBudgetHistory + params,
                actions = {
                    get: {
                        method: "GET",
                        cancellable: true
                    }
                };

            return $resource(url, {}, actions).get();
        };
        svc.getGLBudgetAcctHistory = function (paramData) {
            svc.requests.history = svc.getGLBudgetAcctHistoryReq(paramData);
            return svc.requests.history.$promise.then(svc.formatResponse);
        };
        svc.formatResponse = function(response) {
            var totalRecords = response.records.length,
                totalBalance = 0,
                newResponse = {
                    statusCode: response.statusCode,
                    totalRecords: 0,
                    records: []
                };

            if(totalRecords > 0) {
                angular.forEach(response.records, function(currRecord) {
                    totalBalance += parseFloat(currRecord.balance);
                });

                newResponse.totalRecords = 1;
                newResponse.records.push({
                    month: "March",
                    year: 2015,
                    totalRecords: totalRecords,
                    balanceTotal: totalBalance,
                    glHistoryList: angular.copy(response.records)
                });
            }

            return newResponse;
        };

        svc.getBookTypeReq = function(paramData) {
            var params = {
                propertyID: paramData.propertyID, //1140266,
                    year: paramData.year, //2015,
                }, actions = {
                    get: { 
                        method: "GET",
                        cancellable: true
                    }
                };
            return $resource(svc.url.bookType, params, actions).get();
        };

        svc.getBookType = function (paramData) {
            svc.requests.bookType = svc.getBookTypeReq(paramData);
            return svc.requests.bookType.$promise;
        };

        svc.getQuery = function(json, rootParam) {
            var query = [],
                paramRoot = "request";

            if(rootParam) {
                paramRoot = rootParam;
            }

            angular.forEach(json, function(value, key) {
                query.push(paramRoot + "." + key + "=" + value);
            });

            return "?" + query.join("&");

            // var str = $window.JSON.stringify(json);
            // return "?request=" + $window.btoa(str);
        };

        svc.cancelRequests = function() {
            //cancel book type request
            if(svc.requests.bookType !== null) {
                svc.requests.bookType.$cancelRequest();
                svc.requests.bookType = null;
            }

            //cancel gl account history request
            if(svc.requests.history !== null) {
                svc.requests.history.$cancelRequest();
                svc.requests.history = null;
            }
        };
        
        
        return svc;
    }

    angular
        .module("budgeting")
        .factory("glAcctHistorySvc", [
            "moment",
            "$resource",
            "$window",
            glHistorySvc
        ]);
})();
