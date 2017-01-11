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
                var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                data.forEach(function(item) {
                    dataRow[columns.period.key + item.periodNumber] = item[key] || 0;
                });
                dataRows.push(dataRow);
            });

            return dataRows;
        };


        /**
         * Create's Complex grid rows for the response data & apply row Config
         * @param  {object} default row that will extended
         * @param  {array} response data from service
         * @return {object} this
         */
        model.buildReferenceData = function(defaultRow) {
            var dataRows = [];
            var settings = worksheetData.getOccupancyWorksheetSettings();
            if (settings.occupancyShowReferenceData) {

                var data = worksheetData.getOccupancyWorksheetRefData() || [];

                var mappers = [
                    'referenceData',
                    //'refSubText',
                    'refMoveIns',
                    'refMoveOuts',
                    'refTurnoverPercent',
                    'refVacancyPercent',
                    'refOccupancyPercent'

                ];
                var mapRelations = {
                    'referenceData': "referenceData",
                    'refMoveIns': "moveins",
                    'refMoveOuts': "totalMoveOuts",
                    'refTurnoverPercent': "occupancyTurnOverPercent",
                    'refVacancyPercent': "vacancy",
                    'refOccupancyPercent': "occupancy"

                };

                mappers.forEach(function(key) {
                    var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                    var rKey = mapRelations[key];
                    data.forEach(function(item) {
                        dataRow[columns.period.key + item.periodNumber] = item[rKey] || 0;
                    });
                    dataRows.push(dataRow);
                });
            }
            return dataRows;
        };

        model.buildForecastData = function(defaultRow, data) {
            var dataRows = [];
            var mappers = [
                'revForecast',
                'revForecastOccupancy'
            ];
            var mapRelations = {
                'revForecast': "revForecast",
                'revForecastOccupancy': "occupancy"
            };

            mappers.forEach(function(key) {
                var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                var rKey = mapRelations[key];
                data.forEach(function(item) {
                    dataRow[columns.period.key + item.periodNumber] = item[rKey] || 0;
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
                refDataRow = model.handleRefData(defaultRow),
                dataRows = model.handleOccupancyData(defaultRow, form, grid, refDataRow),
                revForecastRows = model.handleRFData(defaultRow);
            dataRows = model.mergeRefRows(dataRows, refDataRow, revForecastRows);
            return dataRows;
            // var ForecastData= model.handleRFData(defaultRow);
        };

        model.handleOccupancyData = function(defaultRow, form, grid, refDataRow) {
            var data = worksheetData.getOccupancyWorksheetDetails();
            var dataRows = model.buildGridData(defaultRow, data);
            dataRows = settings.handleOccupancySettings(dataRows, form, worksheetData.getOccupancyWorksheetSettings(), refDataRow);
            settings.updateConfigByCondition(grid, form.occupancyType);
            dataRows = calculations.updateValues(dataRows, form, false);
            return dataRows;
        };

        model.handleRefData = function(defaultRow) {
            var refDataRow = model.buildReferenceData(defaultRow);
            refDataRow = calculations.updateReferenceData(refDataRow);
            return refDataRow;
        };

        model.handleRFData = function(defaultRow) {
            var data = worksheetData.getOccupancyWorksheetRevenueForecast(),
                revForecastRow;
            if (data) {
                revForecastRow = model.buildForecastData(defaultRow, data);
                revForecastRow = calculations.handleRevenueForecastData(revForecastRow);
            }
            return revForecastRow;
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
        .factory("worksheetMapperModel", [
            'worksheetConstantModel',
            'worksheetData',
            'worksheetCalculations',
            'worksheetSettings', factory
        ]);
})(angular);