(function(angular) {
    'use strict';

    function factory(budgetDetails, $filter, worksheetData, constantModel) {
        var model = {},
            modelDetails;
        model.totals = {};
        model.rowValues = {};

        model.initialTotals = {
            totalNoOfUnitsTotal: 0,
            beginingOccupiedUnitsTotal: 0,
            moveInsTotal: 0,
            occupancyGoalTotal: 0,
            moveOutsNonRenewalTotal: 0,
            moveOutSkipEvictionsTotal: 0,
            netChangeInOccupancyTotal: 0,
            endingOccupiedUnitsTotal: 0,
            occupancyTotal: 0,
            turnOverTotal: 0,
            turnOverMinusTotal: 0,
            vacantUnitsTotal: 0,
            vacancyTotal: 0,
            previousMoveOutTotal: 0,
            previousNoOfUnits: 0,
            netRevenueUnitsAvg: 0
        };

        model.initialRowValues = {
            beginingOccupiedUnits: 0,
            moveOutsNonRenewal: 0,
            moveOutSkipEvictions: 0,
            occupancyGoal: 0,
            moveIns: 0,
            netChangeInOccupancy: 0,
            endingOccupiedUnits: 0,
            occupancy: 0,
            turnOver: 0,
            turnOverMinus: 0,
            netRevenueUnits: 0,
            vacantUnits: 0,
            vacancy: 0,
            totalMoveOuts: 0
        };



        model.getValue = function(data, name, index) {
            var obj = model.getDataObject(data, name);
            return obj["period" + index];
        };

        model.getDataObject = function(data, name) {
            return $filter('filter')(data, { itemDescription: name }, true)[0];
        };

        model.getBudgetDetails = function() {
            modelDetails = budgetDetails.getModelDetails();
        };

        model.getObjectValueByPeriod = function(data, index, name) {
            var obj = $filter('filter')(data, { periodNumber: index }, true)[0];
            return obj[name];
        };

        model.RoundNumber = function(number, places) {
            if (isNaN(number)) {
                return 0;
            }
            if (Number.POSITIVE_INFINITY === number || Number.NEGATIVE_INFINITY === number) {
                return 0;
            }
            if (places === null) {
                places = 0;
            }
            var value = Math.round(number * Math.pow(10, places)) / Math.pow(10, places);

            return value;
        };

        return model;

    }

    angular
        .module('budgeting')
        .factory('sgworksheetCalculations', ['budgetDetails',
            '$filter',
            'sgworksheetData',
            'sgworksheetConstantModel', factory
        ]);
})(angular);