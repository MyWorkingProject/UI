//  Budgeting Overview List Model
(function (angular) {
    "use strict";

    function worksheetData() {

        var model = {};

        model.renewalsData = {
            leaseWorksheetSummaryData: {},
            leaseWorksheetSettings: {},
            leaseWorksheetRefData: {},
            leaseWorksheetRevenueForecast: {},
            budgetModelSettings: {}
        };


        model.setWorksheetData = function (data, budgetModelSettings) {
            model.renewalsData.leaseWorksheetSummaryData = data.monthlyLeaseRenewal;
            model.renewalsData.leaseWorksheetSettings = data.leaseRenewalSettings;
            model.renewalsData.leaseWorksheetRefData = data.monthlyLeaseRenewalReference;
            model.renewalsData.leaseWorksheetRevenueForecast = data.monthlyLeaseRenewalRF;
            model.renewalsData.budgetModelSettings = budgetModelSettings;
        };

        model.getOccupancyWorksheetDetails = function () {
            return model.renewalsData.leaseWorksheetSummaryData;
        };

        model.getOccupancyWorksheetSettings = function () {
            return model.renewalsData.leaseWorksheetSettings;
        };

        model.getOccupancyWorksheetRefData = function () {
            return model.renewalsData.leaseWorksheetRefData;
        };

        model.getOccupancyWorksheetRevenueForecast = function () {
            return model.renewalsData.leaseWorksheetRevenueForecast;
        };

        model.getBudgetModelSettings = function () {
            return model.renewalsData.budgetModelSettings;
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory('renewalsUnitTypeData', [
            worksheetData]);
})(angular);
