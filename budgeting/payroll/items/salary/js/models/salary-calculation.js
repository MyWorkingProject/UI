//  Salary Calculation Model

(function (angular) {
    "use strict";

    function factory($filter, bmGridCalculation, salaryConstant) {
        var model = angular.extend({}, bmGridCalculation),
            rowConfig = salaryConstant.getRowConfigs();

        model.getTotalMonthlySalary = function (column, row, rows, allocationPercentage) {
            return Math.round(rows[1][column.key] * allocationPercentage / 100);
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

        model.getDaysBetweenDates = function (date1, date2) {
            var msPerDay = 8.64e7;
            // Copy dates so don't mess them up   
            // Set to noon - avoid DST errors   
            date1.setHours(12, 0, 0);
            date2.setHours(12, 0, 0);
            // Round to remove daylight saving errors
            return Math.round((date2 - date1) / msPerDay);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("salaryCalculationModel", [
            '$filter',
            'bmGridCalculationModel',
            'salaryConstantModel',
            factory]);
})(angular);
