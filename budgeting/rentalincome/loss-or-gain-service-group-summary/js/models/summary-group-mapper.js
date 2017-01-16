//  hourly mapper Model

(function(angular) {
    "use strict";

    angular
        .module("budgeting")
        .factory("summayMapperModel", [
            'summaryConstantModel',
            function(Constant) {
                var model = {},
                    columns = Constant.getColumns(),
                    rowConfig = Constant.getRowConfigs();



                /**
                 * Create's Complex grid rows for the response data & apply row Config
                 * @param  {object} default row that will extended
                 * @param  {array} response data from service
                 * @return {object} this
                 */
                model.buildGridData = function(defaultRow, data) {
                    var dataRows = [];
                    var mappers = [
                        'marketRent',
                        'scheduleRent',
                        'lossOrGainLeaseDiff',
                        'avgLossOrGain',
                        'avgMarketRent',
                        'adjustmentsHeader',
                        'moveins',
                        'adjustmentFromMoveIn',
                        'moveOuts',
                        'adjustmentFromMoveOut',
                        'totalAdjustments',
                        'capExIncreaseActualRent',
                        'otherAdjustments',
                        'totalLossOrGain'
                    ];

                    mappers.forEach(function(key) {
                        var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                        data.forEach(function(item) {
                            dataRow[columns.period.key + item.periodNumber] = item[key] || 0;
                        });
                        dataRows.push(dataRow);
                    });

                    return dataRows;
                };


                /**
                 * Sets response data to zero if column is not editable(i.e if the user has join in between model)
                 * @param  {rows}
                 * @param  {columnModel}
                 * @param  {number}
                 * @return {object} this
                 */



                return model;
            }


        ]);
})(angular);