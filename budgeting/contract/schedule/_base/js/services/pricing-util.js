// Pricing Utility functions

(function (angular) {
    "use strict";

    function pricingUtility() {
        var util = {};

        //determines whether the keys of pricingYear is a month or something else
        util.isJsonKeyMonth = function(key) {
            return key == "jan" ||
                   key == "feb" ||
                   key == "mar" ||
                   key == "apr" ||
                   key == "may" ||
                   key == "jun" ||
                   key == "jul" ||
                   key == "aug" ||
                   key == "sep" ||
                   key == "oct" ||
                   key == "nov" ||
                   key == "dec";
        };

        //returns the key equivalent of a month based on pricingYear json
        util.getMonthKey = function (date) {
            return date.format("MMM").toLowerCase();
        };

        //make sure that the number is displayed with 2 decimals
        util.displayAsCurrency = function (val) {
            return Number(val).toFixed(2);
        };

        return util;
    }

    angular
        .module("budgeting")
        .factory("pricingUtility", [
            pricingUtility
        ]);
})(angular);