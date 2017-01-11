
(function () {
    'use strict';

    function oarSummaryModelFactory (i18n) {
        var emptyData = {
            avgMoveIns: 0,
            avgMoveOuts: 0,

            leaseRenewalsPercent: 0,
            turnoverPercent: 0,
            occupancyRenewalsPercent: 0,
            vacancyPercent: 0,

            moveIns: null,
            moveOuts: null,
            leaseRenewals: null,
            occupancyPercent: null, 
        };

        var genericRowData = {
            itemDescription: null, 
            total: 0, 
            legend: null,
            rowType: "summaryRow", 
            level: 2,
        };

        return function() {
            var summary = {};

            summary.model = angular.copy(emptyData);

            summary.model.moveIns = angular.copy(genericRowData);
            summary.model.moveIns.itemDescription = i18n.translate("oar_move_ins"); //"Move-ins";
            summary.model.moveIns.legend = "move-ins";

            summary.model.moveOuts = angular.copy(genericRowData);
            summary.model.moveOuts.itemDescription = i18n.translate("oar_total_move_outs"); //"Total Move-outs";
            summary.model.moveOuts.legend = "move-outs";

            summary.model.leaseRenewals = angular.copy(genericRowData);
            summary.model.leaseRenewals.itemDescription = i18n.translate("oar_lease_renewals"); //"Lease Renewals";
            summary.model.leaseRenewals.legend = "lease-renewals";

            summary.model.occupancyPercent = angular.copy(genericRowData);
            summary.model.occupancyPercent.itemDescription = i18n.translate("oar_occ_percent"); //"Occupancy %";
            summary.model.occupancyPercent.legend = "occupancy-percent";

            summary.getPeriodKey = function(idx) {
                return "period" + idx;
            };

            summary.setSummaryData = function(response) {
                if(response.records && response.records.length > 0) {

                    var count = 0;
                    angular.forEach(response.records, function(currPeriod) {
                        if(currPeriod.periodNumber > 0) {
                            var periodKey = summary.getPeriodKey(currPeriod.periodNumber);

                            summary.model.moveIns[periodKey] = currPeriod.moveins;
                            summary.model.moveIns.total += currPeriod.moveins;

                            summary.model.moveOuts[periodKey] = currPeriod.totalMoveOuts;
                            summary.model.moveOuts.total += currPeriod.totalMoveOuts;

                            summary.model.leaseRenewals[periodKey] = currPeriod.leaseRenewals;
                            summary.model.leaseRenewals.total += currPeriod.leaseRenewals;

                            summary.model.occupancyPercent[periodKey] = currPeriod.occupancy;
                            summary.model.occupancyPercent.total += currPeriod.occupancy;

                            count++;
                        } else { // periodNumber = 0 holds summary data

                            summary.model.avgMoveIns = currPeriod.moveins;
                            summary.model.avgMoveOuts = currPeriod.totalMoveOuts;

                            summary.model.leaseRenewalsPercent = summary.getPercentage(
                                currPeriod.leaseRenewals,
                                currPeriod.totalLeasesExpiring);
                            summary.model.turnoverPercent = summary.getPercentage(
                                currPeriod.totalMoveOuts, 
                                currPeriod.occupancyNumberOfUnits);
                            summary.model.occupancyRenewalsPercent = summary.getPercentage(
                                currPeriod.endingOccupiedUnits, 
                                currPeriod.occupancyNumberOfUnits);
                            summary.model.vacancyPercent = summary.getPercentage(
                                currPeriod.vacantUnits, 
                                currPeriod.occupancyNumberOfUnits);

                        }
                    });

                    //change Occupancy % Total to Average percent value
                    summary.model.occupancyPercent.total = Math.round(summary.model.occupancyPercent.total/count);
                }
            };

            summary.getPercentage = function(partialVal, totalVal) {
                var percent = partialVal / totalVal * 100;
                return Math.round(percent);
            };

            summary.getLeaseRenewalsChartData = function() {
                return [
                    summary.model.turnoverPercent,
                    summary.model.leaseRenewalsPercent,
                ];
            };

            summary.getOccRenewalsChartData = function() {
                return [
                    summary.model.vacancyPercent,
                    summary.model.occupancyRenewalsPercent,
                ];
            };

            summary.destroy = function() {
                summary = undefined;
            };

            return summary;

        };
    }

    angular
        .module("budgeting")
        .factory("oarSummaryModel", [
            "oarSummaryTranslatorSvc",
            oarSummaryModelFactory
        ]);
})();

