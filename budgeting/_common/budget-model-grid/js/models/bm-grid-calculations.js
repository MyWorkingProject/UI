//  Budget Grid Calculation Model

(function (angular) {
    "use strict";

    function factory() {
        var model = {};

        /**
         * Round number based on fraction digits
         * @param  {number} for fraction digits 
         * @param  {number} to apply fractions
         * @return {number} by rounding the decimals
         */
        model.round = function (value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        };

        model.getRowTotal = function (column, row, rows) {
            var total = 0;
            var dataRow = row.getData();

            for (var key in dataRow) {
                if (!dataRow.hasOwnProperty(key)) {
                    continue;
                }

                if (key.lastIndexOf("period", 0) === 0) {
                    total += parseFloat(dataRow[key], 10) || 0;
                }
            }

            return total;
        };

        model.getTotalByColumn = function (column, row, rows) {
            var total = 0;
            rows.forEach(function (row, index) {
                total += parseFloat(row[column.key], 10) || 0;
            });

            return total;
        };

        model.getTotalByGroup = function (column, row, rows, groupID) {
            var total = 0;
            rows.forEach(function (row, index) {
                if (row.groupID === groupID) {
                    total += parseFloat(row[column.key], 10) || 0;
                }
            });

            return total;
        };

        model.getCustomTotal = function (column, row, rows, customHandler) {
            var total = 0;
            rows.forEach(function (row, index) {
                if (customHandler(column, row)) {
                    total += parseFloat(row[column.key], 10) || 0;
                }
            });

            return total;
        };

        // model.getRoundedValue = function (value, fractionDigits) {
        //     return parseFloat(parseFloat(value).toFixed(fractionDigits));
        // };

        /**
         * Gets percentage from two numbers
         * @param  {number} 
         * @param  {number}
         * @return {number} percentage
         */
        model.getPercentage = function (val1, val2) {
            return parseFloat(val1) / parseFloat(val2) * 100;
        };

        model.multiply = function(val1, val2) {
            return val1 * val2;
        };

        /**
         * Apply percentage on the number
         * @param  {number} percentage
         * @param  {number} 
         * @return {number} after applying percentage
         */
        model.applyPercentage = function (percentage, value) {
            return parseFloat(value) * parseFloat(percentage) / 100;
        };
        /**
         * Sum two numbers
         * @param  {number}
         * @param  {number}
         * @return {number} sum of two numbers
         */
        model.sum = function (val1, val2) {
            return parseFloat(val1) + parseFloat(val2);
        };

        /**
         * Substracts two numbers
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
        .factory("bmGridCalculationModel", [factory]);
})(angular);
