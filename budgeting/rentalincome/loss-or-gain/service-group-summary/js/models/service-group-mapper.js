//  hourly mapper Model

(function(angular) {
    "use strict";

    function factory(worksheetConstant, worksheetData, calculations, settings) {
        var model = {},
            columns = worksheetConstant.getColumns(),
            rowConfig = worksheetConstant.getRowConfigs(),
            refData = worksheetData.getOccupancyWorksheetRefData(),
            forecastData = worksheetData.getOccupancyWorksheetRevenueForecast();



        /**
         * Create's Complex grid rows for the response data & apply row Config
         * @param  {object} default row that will extended
         * @param  {array} response data from service
         * @return {object} this
         */
        model.buildGridData = function(defaultRow, data) {
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

            mappers.forEach(function(key) {
                var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                data.forEach(function(item) {
                    dataRow[columns.period.key + item.periodNumber] = item[key] || 0;
                });
                dataRows.push(dataRow);
            });

            return dataRows;
        };



        model.mergeRefRows = function(dataRow, refData, revForecastRows) {
            angular.forEach(refData, function(item) {
                dataRow.push(item);
            });
            angular.forEach(revForecastRows, function(item) {
                dataRow.push(item);
            });
            return dataRow;
        };

        model.prepareOccupancyData = function(gridConfig, form, grid) {
            var defaultRow = gridConfig.getDefaultRow({}, 0),
                dataRows = model.handleOccupancyData(defaultRow, form, grid);
            // refDataRow = model.handleRefData(defaultRow),
            // revForecastRows = model.handleRFData(defaultRow);
            //dataRows = model.mergeRefRows(dataRows, refDataRow, revForecastRows);
            return dataRows;
            // var ForecastData= model.handleRFData(defaultRow);
        };

        model.handleOccupancyData = function(defaultRow, form, grid) {
            var data = worksheetData.getOccupancyWorksheetDetails();
            var dataRows = model.buildGridData(defaultRow, data); //TODO
            // dataRows = settings.handleOccupancySettings(dataRows, form, worksheetData.getOccupancyWorksheetSettings());
            // settings.updateConfigByCondition(grid, form.occupancyType);
            // dataRows = calculations.updateValues(dataRows, form, false);
            return dataRows;
        };

        /**
         * Sets response data to zero if column is not editable(i.e if the user has join in between model)
         * @param  {rows}
         * @param  {columnModel}
         * @param  {number}
         * @return {object} this
         */
        model.resetData = function(dataRows, column, index) {
            if (column.isDataColumn && !column.isEditable) {
                var mappers = [
                    'occupancyNumberOfUnits',
                    'budgetChangesInOccupancy',
                    'beginingOccupiedUnits',
                    'occupancyGoal',
                    'moveins',
                    'moveoutsNonRenewal',
                    'moveoutsSkipEviction',
                    'totalMoveouts',
                    'netOccupancyChange',
                    'endingOccupiedUnits',
                    'occupancy',
                    'turnOverPercentage',
                    'occupancyTurnOverPercent',
                    'previousTurnOverPercent',
                    'nonRevenueUnits',
                    'modelUnits',
                    'adminUnits',
                    'employeeUnits',
                    'downUnits',
                    'totalNonRevenueUnits',
                    'vacantUnits',
                    'vacany'
                ];
                mappers.forEach(function(key) {
                    dataRows.forEach(function(dataRow) {
                        if (dataRow.periodNumber === column.period) {
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
        .factory("sgworksheetMapperModel", [
            'sgworksheetConstantModel',
            'sgworksheetData',
            'sgworksheetCalculations',
            'sgworksheetSettings', factory
        ]);
})(angular);