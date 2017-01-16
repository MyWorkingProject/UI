(function() {
    "use strict";

    function oarBudgetDetailsFactory() {
        var bmDetails = {};

        bmDetails.data = null;

        bmDetails.tabStatus = true;

        bmDetails.setBudgetModelDetails = function(data) {
            bmDetails.data = data;
        };

        bmDetails.getBudgetModelDetails = function() {
            return bmDetails.data;
        };

        bmDetails.getDistributedID = function() {
            return bmDetails.data.distributedID;
        };

        bmDetails.getStartYear = function() {
            return bmDetails.data.budgetYear;
        };

        bmDetails.getStartMonth = function() {
            return bmDetails.data.startMonth;
        };

        bmDetails.getNoOfPeriods = function() {
            return bmDetails.data.noOfPeriods;
        };

        bmDetails.isWorksheet = function() {
            return bmDetails.data.assettype !== "Senior Living" && bmDetails.data.occupancyModel === "Worksheet";
        };

        bmDetails.isServiceGroup = function() {
            return bmDetails.data.assettype === "Senior Living" && bmDetails.data.occupancyModel === "Worksheet";
        };

        bmDetails.isLeaseRenewalsWorksheet = function() {
            return bmDetails.data.leaseRenewalMethod.toLowerCase() === "summary";
        };

        bmDetails.isLeaseRenewalsUnitType = function() {
            return bmDetails.data.leaseRenewalMethod.toLowerCase() === "unit type";
        };

        bmDetails.isDisplayLeaseRenewals = function() {
            if (!bmDetails.data.leaseRenewalMethod) {
                return false;
            } else if (bmDetails.data.leaseRenewalMethod.trim() === "" || bmDetails.data.leaseRenewalMethod.toLowerCase() == "none") {
                return false;
            }
            return true;
        };

        bmDetails.isDisplayOccupancyVacancy = function() {
            if (!bmDetails.data.occupancyModel) {
                return false;
            } else if (bmDetails.data.occupancyModel.trim() === "" || bmDetails.data.occupancyModel.toLowerCase() == "none") {
                return false;
            }
            return true;
        };

        bmDetails.reset = function() {
            bmDetails.data = null;
        };

        bmDetails.handlePageTabs = function(flag) {
            if (flag) {
                bmDetails.tabStatus = false;
            } else {
                bmDetails.tabStatus = true;
            }
        };
        bmDetails.handlePageModelDetails = function(flag) {
            bmDetails.modelStatus = flag;
        };
        return bmDetails;
    }

    angular
        .module("budgeting")
        .factory("oarBudgetDetails", [
            oarBudgetDetailsFactory
        ]);
})();