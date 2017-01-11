//  hourly mapper Model

(function (angular) {
    "use strict";

    function factory(serviceGroupConstant) {
        var model = {},
            columns = serviceGroupConstant.getColumns(),
            rowConfig = serviceGroupConstant.getRowConfigs();

       

        /**
         * Create's Complex grid rows for the response data & apply row Config
         * @param  {object} default row that will extended
         * @param  {array} response data from service
         * @return {object} this
         */
        model.buildGridData = function (defaultRow, data) {
            var dataRows = [];
            var mappers = [
                    'occupancyNumberOfUnits',
                    'budgetChangesInOccupancy',
                    'beginingOccupiedUnits',
                    'occupancyGoal',
                    'moveins',
                    'totalMoveouts',
                    'netOccupancyChange',
                    'endingOccupiedUnits',
                    'occupancy',
                    'turnOverPercentage',
                    'occupancyTurnOverPercent',
                    'previousTurnOverPercent',
                    'vacantUnits',
                    'vacany'
                ];

            mappers.forEach(function (key) {
                var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                data.forEach(function (item) {
                    if (item.periodNo !== "total"){
                        dataRow[columns.period.key + item.periodNo] = item[key] || 0;
                    }
                    else if (item.periodNo === "total") {
                        dataRow[columns.total.key] = item[key] || 0;
                    }
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
        model.resetData = function (dataRows, column, index) {
            if (column.isDataColumn && !column.isEditable) {
                var mappers = [
                   'occupancyNumberOfUnits',
                    'budgetChangesInOccupancy',
                    'beginingOccupiedUnits',
                    'occupancyGoal',
                    'moveins',
                    'totalMoveouts',
                    'netOccupancyChange',
                    'endingOccupiedUnits',
                    'occupancy',
                    'turnOverPercentage',
                    'occupancyTurnOverPercent',
                    'previousTurnOverPercent',
                    'vacantUnits',
                    'vacany'
                ];
                mappers.forEach(function (key) {
                    dataRows.forEach(function (dataRow) {
                        if (dataRow.periodNo === column.period) {
                            dataRow[key] = 0;
                        }
                    });
                });
            }
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("lrMapperModel", ['lrConstantModel', factory]);
})(angular);
