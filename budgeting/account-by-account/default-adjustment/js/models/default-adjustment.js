
(function () {
    'use strict';

    function factory(i18n, rpGridModel, moment) {
        var emptyData = {
            referenceYear: null,
            referenceDataType: null,
            gridData: null,

            startMonth: 0,
            startYear: 0,
            noOfPeriods: 0,

            percentForAll: null,
            isBudgetModelFinal: false
        };

        var defAdj = {};

        defAdj.model = angular.copy(emptyData);

        defAdj.getBaseValueRow = function() {
            return defAdj.model.gridData[0];
        };
        defAdj.getAdjustmentRow = function() {
            return defAdj.model.gridData[1];
        };
        defAdj.getResultsRow = function() {
            return defAdj.model.gridData[2];
        };
        defAdj.getGridData = function() {
            return defAdj.model.gridData;
        };

        defAdj.getBaseRowTitle = function() {
            return defAdj.model.referenceYear + " " + defAdj.model.referenceDataType;
        };

        defAdj.getColumnConfig = function() {
            return {
                startMonth: defAdj.model.startMonth,
                startYear: defAdj.model.startYear,
                noOfPeriods: defAdj.model.noOfPeriods
            };
        };

        defAdj.adjustPercentageValues = function(adjustedValue) {
            if(adjustedValue === null || adjustedValue === undefined) {
                adjustedValue = 0;
            }

            var baseRow = defAdj.getBaseValueRow(),
                adjustmentRow = defAdj.getAdjustmentRow(),
                resultsRow = defAdj.getResultsRow(),
                total = 0;
            angular.forEach(adjustmentRow, function(val, key) {
                if(defAdj.isMonthKey(key)) {
                    adjustmentRow[key] = adjustedValue;
                    resultsRow[key] = defAdj.getAdjustedValue(baseRow[key], adjustedValue);
                    total += resultsRow[key];
                }
            });
            resultsRow.total = total;
        };

        defAdj.computeAdjustedValue = function(columnId, percentage) {
            var baseRow = defAdj.getBaseValueRow(),
                resultsRow = defAdj.getResultsRow(),
                total = 0;

            resultsRow[columnId] = baseRow[columnId] + (baseRow[columnId] * percentage/100);
            angular.forEach(resultsRow, function(val, key) {
                if(defAdj.isMonthKey(key)) {
                    total += val;
                }
            });
            resultsRow.total = total;
        };

        defAdj.setGridData = function(bmDetails, json) {
            defAdj.model.startMonth = bmDetails.startMonth; 
            defAdj.model.startYear = bmDetails.budgetYear;
            defAdj.model.noOfPeriods = bmDetails.noOfPeriods;

            var activeDate = moment();
                activeDate.year(defAdj.model.startYear)
                    .month(defAdj.model.startMonth - 1) //month is index 0
                    .date(1); //assumes it's always the first day of the month

            var baseRow = {},
                adjustmentRow = {},
                resultsRow = {},
                totalBase = 0,
                totalAmt = 0;

            angular.forEach(json.adjustments, function(curr) {
                var keyStr = activeDate.format("MMM-YYYY").toLowerCase(),
                    origVal = parseInt(curr.amount),
                    adjustedVal = defAdj.getAdjustedValue(origVal, curr.percentage);

                baseRow[keyStr] = origVal;
                adjustmentRow[keyStr] = curr.percentage;
                resultsRow[keyStr] = adjustedVal;

                totalBase += origVal;
                totalAmt += adjustedVal;

                activeDate.add(1, "months");
            });
            baseRow.total = totalBase;
            resultsRow.total = totalAmt;

            defAdj.model.gridData = [baseRow, adjustmentRow, resultsRow];
            defAdj.model.referenceYear = json.year;
            defAdj.model.referenceDataType = json.type;

            return defAdj.model;
        };

        defAdj.getReturnData = function() {
            var resultsRow = defAdj.getResultsRow(),
                adjPercentageRow = defAdj.getAdjustmentRow(),
                columnConfig = defAdj.getColumnConfig(),
                adjustmentArr = [];

            var currPeriod = moment();
                currPeriod.year(columnConfig.startYear)
                    .month(columnConfig.startMonth-1)
                    .date(1);
            for(var i=0; i<columnConfig.noOfPeriods; i++) {
                var keyStr = currPeriod.format("MMM-YYYY").toLowerCase();
                adjustmentArr.push({
                    amount: resultsRow[keyStr],
                    percentage: adjPercentageRow[keyStr]
                });
                currPeriod.add(1, "months");
            }

            return adjustmentArr;
        };

        defAdj.isMonthKey = function(key) {
            var val = key.split("-")[0];
            return val == "jan" || val == "feb" || val == "mar" ||
                   val == "apr" || val == "may" || val == "jun" ||
                   val == "jul" || val == "aug" || val == "sep" ||
                   val == "oct" || val == "nov" || val == "dec";
        };

        defAdj.getAdjustedValue = function(origVal, percent) {
            var percentVal = origVal * parseInt(percent) / 100;
            return origVal + percentVal;
        };


        defAdj.reset = function() {
            angular.extend(defAdj.model, emptyData);
        };

        defAdj.finalBudgetModel = function() {
            defAdj.model.isBudgetModelFinal = true;
        };

        return defAdj;
    }

    angular
        .module("budgeting")
        .factory("defaultAdjModel", [
            "defaultAdjTranslatorSvc",
            "rpGridModel",
            "moment",
            factory
        ]);
})();

