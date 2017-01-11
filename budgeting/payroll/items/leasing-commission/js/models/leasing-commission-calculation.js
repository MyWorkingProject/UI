// Payroll Leasing Commissions Calculation Model

(function (angular) {
    "use strict";

    function factory($filter, bmGridCalculation) {
        var model = angular.extend({}, bmGridCalculation);

        model.getCommissionTotal = function (column, rows) {
            var total = 0;
            if (!column.isEditable) {
                return total;
            }
            total = 1;
            rows.forEach(function (row) {
                total *= parseFloat(row.getData()[column.key], 10);
            });

            return total / 100;
        };


        /**
         * @param  {number} for fraction digits 
         * @param  {number} to apply fractions
         * @return {number} by rounding the decimals
         */
        model.getRoundedValue = function (value, fractionDigits) {
            return parseFloat(parseFloat(value).toFixed(fractionDigits));
        };

        model.getRoundedString = function(value, fractionDigits) {
            var temp = Number(value) || 0;
            return temp.toFixed(fractionDigits);
        };

        /**
         * @param  {number} 
         * @param  {number}
         * @return {number} percentage
         */
        model.getPercentage = function (val1, val2) {
            return parseFloat(val1) / parseFloat(val2) * 100;
        };

        /**
         * @param  {number} percentage
         * @param  {number} 
         * @return {number} after applying percentage
         */
        model.applyPercentage = function (percentage, value) {
            return parseFloat(value) * parseFloat(percentage) / 100;
        };
        /**
         * @param  {number}
         * @param  {number}
         * @return {number} sum of two numbers
         */
        model.sum = function (val1, val2) {
            return parseFloat(val1) + parseFloat(val2);
        };

        /**
         * @param  {number}
         * @param  {number}
         * @return {number} substract val1  from val2
         */
        model.substract = function (val1, val2) {
            return parseFloat(val1) - parseFloat(val2);
        };

        /**
         * @param  {number}
         * @param  {number}
         * @return {number} divide val1 by val2
         */
        model.divide = function (val1, val2) {
            return parseFloat(val1) / parseFloat(val2);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("leasingCommCalculationModel", [
            "$filter",
            "bmGridCalculationModel",
            factory]);
})(angular);
