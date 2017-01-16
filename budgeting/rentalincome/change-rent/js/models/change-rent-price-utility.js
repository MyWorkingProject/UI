// Pricing Utility functions

(function (angular) {
    "use strict";

    function rentUtility() {
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
        util.displayAsCurrency = function (val) {
          if(isNaN(val)) {
            return "0";
          }
          return util.roundNumber(val,0);//Number(val);//.toFixed(0);
        };

        util.roundNumber = function(number, places) {
                if (isNaN(number)) {
                    return 0;
                }
                if (Number.POSITIVE_INFINITY == number || Number.NEGATIVE_INFINITY == number) {
                    return 0;
                }
                if (places === null || places === undefined ) {
                    places = 0;
                }
                var value = Math.round(number * Math.pow(10, places)) / Math.pow(10, places);

                return value;
        };

        return util;
    }

    angular
        .module("budgeting")
        .factory("rentPricingUtility", [
            rentUtility
        ]);
})(angular);