//  Schedule Data

(function (angular) {
    "use strict";

    function pricingYearFactory(dateUtils, pricingUtil) { 
        return function(json) {
            var py = this;

            py.year = "2016";
            py.jan = null; 
            py.feb = null; 
            py.mar = null;
            py.apr = null;
            py.may = null; 
            py.jun = null; 
            py.jul = null; 
            py.aug = null; 
            py.sep = null; 
            py.oct = null; 
            py.nov = null; 
            py.dec = null; 
            py.total = null;

            py.init = function() {
                py.year = dateUtils.today().year(); //set to current year

                if(json !== undefined && json !== null) {
                    var total = 0;
                    angular.forEach(json, function(value, key) {
                        if(key === "year") {
                            py.year = value;
                            return;                            
                        } else if(key === "contractActivityID") {
                            return;
                        }

                        var month = dateUtils.today().month(key).format("MMM").toLowerCase();
                        py[month] = value;
                        total += parseFloat(value);
                    });
                    py.total = total;
                }

                return py;
            };

            py.getParameterMonth = function(monthKey) {
                var month = dateUtils.createDate(py.year, monthKey, 1);
                return month.format("MMMM");
            };

            py.getParameterData = function(scheduleId) {
                var paramData = [],
                    year = parseInt(py.year); //API requires integer

                if(scheduleId < 0) {
                    scheduleId = 0;
                }

                angular.forEach(py, function(value, key) {
                    if(pricingUtil.isJsonKeyMonth(key)) {
                        var month = py.getParameterMonth(key);
                        var json = {
                            contractActivityID: scheduleId,
                            year: year,
                            month: month,
                            amount: value || "0.00"
                        };
                        paramData.push(json);
                    }
                });

                return paramData;
            };

            return py.init();
        };

    }

    angular
        .module("budgeting")
        .factory("pricingYear", [
            "dateUtility",
            "pricingUtility",
            pricingYearFactory
        ]);
})(angular);

