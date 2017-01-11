//  hourly mapper Model

(function(angular) {
    "use strict";

    function factory(serviceGroupConstant, $filter) {
        var model = {},
            columns = serviceGroupConstant.getColumns(),
            rowConfig = serviceGroupConstant.getRowConfigs();



        /**
         * Create's Complex grid rows for the response data & apply row Config
         * @param  {object} default row that will extended
         * @param  {array} response data from service
         * @return {object} this
         */
        model.buildGridData = function(defaultRow, data, occupancySettings, budgetModel) {
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
            var dataRow = [],
                refDataRow = [];
            mappers.forEach(function(key) {
                dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                data.monthlyOccupancyVacancy.forEach(function(item) {

                    dataRow[columns.period.key + item.periodNumber] = item[key] || 0;

                });
                dataRows.push(dataRow);

            });
            if (occupancySettings.occupancyShowReferenceData) {
                refDataRow = model.buildReferenceData(defaultRow, data);
                model.doUpdateHelpText(refDataRow, occupancySettings, budgetModel);
            }
            dataRows = model.mergeRefRows(dataRows, refDataRow);
            return dataRows;
        };
        model.getOVObject = function(data, name) {
            return $filter('filter')(data, { itemDescription: name }, true)[0];
        };
        model.doUpdateHelpText = function(refDataRow, occupancySettings, budgetModel) {
            var msg = "",
                openPeriodNo = 0;
            var opModelType = occupancySettings.occupancyOpenPeriodRefDataType;
            var opModelYear = occupancySettings.occupancyOpenPeriodRefDataYear;

            if (opModelType !== "") {
                msg = opModelYear + " " + opModelType;
            } else {
                msg = "Selected reference";
            }
            msg = msg + " data will be loaded into the open periods";

            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var columnNames = [];
            var startDt = new Date();
            startDt.setFullYear(budgetModel.budgetYear - 1, occupancySettings.startMonth - 1, 1);
            var endDt = new Date();
            endDt.setFullYear(budgetModel.budgetYear - 1, occupancySettings.startMonth - 1, 1);

            var currentDate = new Date();
            var currentMonth = currentDate.getMonth();
            var currentYear = currentDate.getYear();
            currentDate.setFullYear(currentYear, currentMonth, 1);

            var periodNo = 0;
            var noOfPeriods = budgetModel.noOfPeriods;
            for (var period = 0; period < noOfPeriods; period++) {
                if (endDt.getYear() == currentYear && endDt.getMonth() == currentMonth) {
                    periodNo = period;
                }
                columnNames[period] = monthNames[endDt.getMonth()] + "-" + endDt.getYear();
                endDt.setMonth(endDt.getMonth() + 1);
            }

            //currentDate.setFullYear(currentYear - 1, currentMonth, 1);
            if (periodNo > 0) {
                msg = msg + " starting " + columnNames[periodNo];
                openPeriodNo = periodNo + 1;
            } else {
                if (currentDate < startDt) {
                    //All Open Periods
                    msg = msg + " starting " + monthNames[startDt.getMonth()] + " - " + budgetModel.budgetYear;
                    openPeriodNo = 1;
                } else if (currentDate > endDt) {
                    //All Closed Periods
                    openPeriodNo = -1;
                }
            }

            var refHeader = model.getOVObject(refDataRow, serviceGroupConstant.rowConfig.referenceData.itemDescription);
            refHeader.yearType = (budgetModel.budgetYear - 1) + " Actual";
            refHeader.helpDesc = msg;
        };

        model.buildReferenceData = function(defaultRow, data) {
            var dataRows = [];

            var mappers = [
                'referenceData',
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
                data.monthlyOccupancyVacancyReference.forEach(function(item) {
                    dataRow[columns.period.key + item.periodNumber] = item[rKey] || 0;
                });
                dataRows.push(dataRow);
            });
            return dataRows;
        };
        model.mergeRefRows = function(dataRow, refData) {
            angular.forEach(refData, function(item) {
                dataRow.push(item);
            });
            return dataRow;
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
                    dataRows.forEach(function(dataRow) {
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
        .factory("serviceGroupMapperModel", ['serviceGroupConstantModel', '$filter', factory]);
})(angular);