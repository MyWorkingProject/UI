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
                    'averageLeaseTerm',
                    'leaseExpiringhdr',
                    'actualLeasesExpiring',
                    'renewedLeasesExpiring',
                    'budgetedMoveinsExpiring',
                    'additionalLeasesExpiring',
                    'totalLeasesExpiring',
                    'moveouts',
                    'leasesExpiredPreviousMonth',
                    'leaseRenewalPer',
                    'leaseRenewals',
                    'leaseRenewalMTMPer',
                    'leaseRenewalMTM',
                    'moveoutsfromNonRenewals',
                    'turnoverPer',
                    'retention'
                ];

            mappers.forEach(function (key) {
                var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                data.forEach(function (item) {
                    if (item.periodNumber !== "total") {
                        dataRow[columns.period.key + item.periodNumber] = item[key] || 0;
                    }
                    else if (item.periodNumber === "total") {
                        dataRow[columns.total.key] = item[key] || 0;
                    }
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
        model.buildReferenceData = function (defaultRow,data) {
            var dataRows = [];
              

            var mappers = [
                    'referenceData',
                    'refavgLeaseTerm',
                    'refleaseExpiring',
                    'refLeaseRenewal',
                    'refLeaseRenewalper',
                    'refLeaseRenewalsMtm',
                    'refLeaseRenewalsMtmper',
                    'refNonRenewingMoveouts'

            ];
            var mapRelations = {
                'referenceData': "referenceData",                
                'refavgLeaseTerm': "avgleaseterm",
                'refleaseExpiring': "leaseExpiring",
                'refLeaseRenewal': "leaseRenewals",
                'refLeaseRenewalper': "leaseRenewalper",
                'refLeaseRenewalsMtm': "leaseRenewalsMtm",
                'refLeaseRenewalsMtmper':'leaseRenewalMTMPer',
                'refNonRenewingMoveouts':'nonRenewingMoveouts'

            };

            mappers.forEach(function (key) {
                var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                var rKey = mapRelations[key];
                data.forEach(function (item) {
                    dataRow[columns.period.key + item.periodNumber] = item[rKey] || 0;
                });
                dataRows.push(dataRow);
            });
            return dataRows;
        };


        model.prepareOccupancyData = function (gridConfig, data, refData) {
            var defaultRow = gridConfig.getDefaultRow({}, 0),
                 dataRows = model.handleOccupancyData(defaultRow, data),
             refDataRow = model.handleRefData(defaultRow, refData);
           
            dataRows = model.mergeRefRows(dataRows, refDataRow);
            return dataRows;
            // var ForecastData= model.handleRFData(defaultRow);
        };

        model.handleOccupancyData = function (defaultRow, data) {
            var dataRows = model.buildGridData(defaultRow, data);           
            return dataRows;
        };

        model.mergeRefRows = function (dataRow, refData) {
            angular.forEach(refData, function (item) {
                dataRow.push(item);
            });           
            return dataRow;
        };

        model.handleRefData = function (defaultRow,refData) {
            var refDataRow = model.buildReferenceData(defaultRow, refData);
        
            return refDataRow;
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
        .factory("lrSummaryMapperModel", ['lrSummaryConstantModel', factory]);
})(angular);
