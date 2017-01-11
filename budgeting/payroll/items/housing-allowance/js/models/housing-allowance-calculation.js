//  HA Calculation Model

(function (angular) {
    "use strict";

    function factory($filter, bmGridCalculation, haConstant) {
        var model = angular.extend({}, bmGridCalculation),
            rowConfig = haConstant.getRowConfigs();
   
        model.getTotalMonthlyHA = function (column, row, rows, applyType) {
            return applyType ? rows[1][column.key] : model.applyPercentage(rows[1][column.key], rows[0][column.key]);
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

        return model;
    }

    angular
        .module("budgeting")
        .factory("haCalculationModel", [
            '$filter',
            'bmGridCalculationModel',
            'haConstantModel',
            factory]);
})(angular);
