// Pricing Utility functions

(function (angular) {
    "use strict";

    function pricingUtility() {
        var util = {};

        //determines whether the keys of pricingYear is a month or something else
        util.isJsonKeyMonth = function(val) {
          return val.indexOf("period") != -1;
          // var key = val.split("-")[0];
          //   return key == "jan" || key == "feb" || key == "mar" ||
          //          key == "apr" || key == "may" || key == "jun" ||
          //          key == "jul" || key == "aug" || key == "sep" ||
          //          key == "oct" || key == "nov" || key == "dec";
        };

        util.getMonthKey = function(id) {
          return "period" + id;
        };

        //make sure that the number is displayed with 2 decimals
        util.displayAsCurrency = function (val, decimalCount) {
          decimalCount = decimalCount || 0;
          if(isNaN(val)) {
            val = 0;
          }
          return Number(val).toFixed(decimalCount);
        };

        return util;
    }

    angular
        .module("budgeting")
        .factory("calcPricingUtility", [
            pricingUtility
        ]);
})(angular);