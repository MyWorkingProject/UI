//  Budgeting Overview List Model

(function(angular) {
    "use strict";

    function sgworksheetData() {

        var model = {};

        model.worksheetData = {
            occupancyVacancy: {},
            occupancyLeaseSettings: {},
            occupancyRefData: {},
            occupancyRevenueForecast: {}
        };

        model.setWorksheetData = function(data) {
            model.worksheetData.occupancyVacancy = data.monthlyOccupancyVacancy;
            model.worksheetData.occupancyLeaseSettings = data.occupancyLeaseSettings;
            model.worksheetData.occupancyRefData = data.monthlyOccupancyVacancyReference;
            model.worksheetData.occupancyRevenueForecast = data.monthlyOccupancyVacancyRF;
        };



        model.getOccupancyWorksheetDetails = function() {
            return model.worksheetData.occupancyVacancy;
        };

        model.getOccupancyWorksheetSettings = function() {
            return model.worksheetData.occupancyLeaseSettings;
        };

        model.getOccupancyWorksheetRefData = function() {
            return model.worksheetData.occupancyRefData;
        };

        model.getOccupancyWorksheetRevenueForecast = function() {
            return model.worksheetData.occupancyRevenueForecast;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory('sgworksheetData', [
            sgworksheetData
        ]);
})(angular);