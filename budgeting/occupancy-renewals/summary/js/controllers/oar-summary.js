(function (angular) {
    "use strict";

    var OARSummaryController = function($scope, oarBudgetDetails, oarSummaryModel, oarSummaryGrid, oarSummaryLineBarChart,
            oarSummaryPieChart, oarSummarySvc, i18n, rpWatchList) {
        var vm = this;

        vm.init = function () {
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));

            vm.oarSummary = oarSummaryModel();
            vm.oarSummaryGrid = oarSummaryGrid();
            vm.translate = i18n.translate;

            vm.oarSummaryLineBarChart = null;
            vm.leaseRenewalsPieChart = null;
            vm.occRenewalsPieChart = null;

            vm.initSummaryData();
        };

        vm.initSummaryData = function() {
            oarSummarySvc.getSummary(oarBudgetDetails.getDistributedID())
                .then(vm.assignSummaryData);
        };

        vm.assignSummaryData = function(response) {
            vm.oarSummary.setSummaryData(response);

            vm.oarSummaryLineBarChart = oarSummaryLineBarChart(vm.oarSummary.model);
            vm.oarSummaryGrid.setGridData(vm.oarSummary.model);

            vm.leaseRenewalsPieChart = oarSummaryPieChart("leaseRenewals", vm.oarSummary.getLeaseRenewalsChartData());
            vm.occRenewalsPieChart = oarSummaryPieChart("occupancy", vm.oarSummary.getOccRenewalsChartData());
        };

        vm.showOccupancyVacancy = function() {
            return oarBudgetDetails.isDisplayOccupancyVacancy();
        };

        vm.showLeaseRenewals = function() {
            return oarBudgetDetails.isDisplayLeaseRenewals();
        };

        vm.destroy = function () {
            vm.oarSummary.destroy();
            vm.oarSummaryGrid.destroy();
            vm.watchList.destroy();
        };

        vm.init();
    };


    angular
        .module("budgeting")
        .controller("OARSummaryCtrl", [
            "$scope",
            "oarBudgetDetails",
            "oarSummaryModel",
            "oarSummaryGridModel",
            "oarSummaryLineBarChartModel",
            "oarSummaryPieChartModel",
            "oarSummarySvc",
            "oarSummaryTranslatorSvc",
            "rpWatchList",
            OARSummaryController
        ]);
})(angular);
