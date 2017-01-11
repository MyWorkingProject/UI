//  Budgeting Overview List Model

(function(angular) {
    "use strict";

    function worksheetData() {

        var model = {};

        model.worksheetData = {
            occupancyVacancy: {},
            occupancyLeaseSettings: {},
            occupancyRefData: {},
            occupancyRevenueForecast: {}
        };

        model.setWorksheetData = function(data, budgetModelSettings) {
            //  model.initialData(data);
            model.worksheetData.occupancyVacancy = data.monthlyOccupancyVacancy;
            model.worksheetData.occupancyLeaseSettings = data.occupancyLeaseSettings;
            model.worksheetData.occupancyRefData = data.monthlyOccupancyVacancyReference;
            model.worksheetData.occupancyRevenueForecast = data.monthlyOccupancyVacancyRF;
            model.worksheetData.budgetModelSettings = budgetModelSettings;
        };

        //model.initialData = {
        //    occupancyVacancy: angular.copy(data.monthlyOccupancyVacancy),
        //    occupancyLeaseSettings: angular.copy(data.occupancyLeaseSettings),
        //    occupancyRefData: angular.copy(data.monthlyOccupancyVacancyReference),
        //    occupancyRevenueForecast: angular.copy(data.monthlyOccupancyVacancyRF)
        //};

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
        model.getBudgetModelSettings = function() {
            return model.worksheetData.budgetModelSettings;
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory('worksheetData', [
            worksheetData
        ]);
})(angular);