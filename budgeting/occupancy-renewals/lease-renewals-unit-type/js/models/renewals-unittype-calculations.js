
(function (angular) {
    'use strict';

    function factory($filter, wsData, constantModel) {
        var model = {};
        model.totals = {};
        model.rowValues = {};

        model.initialTotals = {
            totalNumberOfUnitsAvg: 0,
            totalAverageLeaseTerm: 0,
            totalActualLeasesExpiring: 0,
            totalRenewedLeasesExpiring: 0,
            totalBudgetedMoveInsExpiring: 0,
            totalAdditionalLeasesExpiring: 0,
            totalLeaseExpiringCummulative: 0,
            totalPreviousLeaseExpiring: 0,
            totalLeaseRenewalsPercentage: 0,
            totalLeaseRenewals: 0,
            totalLeaseRenewalsMTMPercentage: 0,
            totalLeaseRenewalsMTM: 0,
            totalMoveoutsNonRenewal: 0,
            totalTurnOverPercent: 0,
            totalRetentionPercent: 0
        };

        model.initialRowValues = {
            totalNumberOfUnits: 0,
            averageLeaseTerm: 0,
            actualLeasesExpiring: 0,
            renewedLeasesExpiring: 0,
            budgetedMoveInsExpiring: 0,
            moveins: 0,
            additionalLeasesExpiring: 0,
            totalLeaseExpiring: 0,
            previousLeaseExpiring: 0,
            leaseRenewalsPercentage: 0,
            leaseRenewals: 0,
            leaseRenewalsMTMPercentage: 0,
            leaseRenewalsMTM: 0,
            moveoutsNonRenewal: 0,
            turnOverPercent: 0,
            retentionPercent: 0
        };

        model.refData = {
            totalRefAverageLeaseTerm: 0,
            totalRefActualLeasesExpiring: 0,
            totalRefLeaseRenewals: 0,
            totalRefLeaseRenewalsPercentage: 0,
            totalRefLeaseRenewalsMTM: 0,
            totalRefLeaseRenewalsMTMPercentage: 0,
            totalRefMoveoutsNonRenewal: 0
        };

        model.updateValues = function (data, form) {
            angular.extend(model.totals, model.initialTotals);
            angular.extend(model.rowValues, model.initialRowValues);

            //model.getBudgetDetails();
            var noOfPeriods = wsData.renewalsData.budgetModelSettings.noOfPeriods;

            var objPreviousUnits = wsData.getOccupancyWorksheetDetails();
            var temp;

            for (var pos = 1; pos <= noOfPeriods; pos++) {
                model.updateOccupancyDataObject(0, data, constantModel.rowConfig.renewedLeasesExpiring.itemDescription, pos);
                model.updateOccupancyDataObject(0, data, constantModel.rowConfig.budgetedMoveInsExpiring.itemDescription, pos);
            }

            for (var i = 1; i <= noOfPeriods; i++) {

                model.rowValues.totalNoOfUnits = parseInt(model.getValue(data, constantModel.rowConfig.totalNumberOfUnits.itemDescription, i));
                model.rowValues.averageLeaseTerm = parseInt(model.getValue(data, constantModel.rowConfig.averageLeaseTerm.itemDescription, i));
                model.rowValues.actualLeasesExpiring = parseInt(model.getValue(data, constantModel.rowConfig.actualLeasesExpiring.itemDescription, i));
                model.rowValues.renewedLeasesExpiring = parseInt(model.getValue(data, constantModel.rowConfig.renewedLeasesExpiring.itemDescription, i));
                model.rowValues.budgetedMoveInsExpiring = parseInt(model.getValue(data, constantModel.rowConfig.budgetedMoveInsExpiring.itemDescription, i));

                //Move-ins from Occupancy Vacancy Screen
                model.rowValues.moveins = parseInt(model.getValue(data, constantModel.rowConfig.moveins.itemDescription, i));

                model.rowValues.additionalLeasesExpiring = parseFloat(model.getValue(data, constantModel.rowConfig.additionalLeasesExpiring.itemDescription, i));

                //Handle Lease Expired Previous Month                
                if (i !== 1) {
                    var getPreTLEVal = parseFloat(model.getValue(data, constantModel.rowConfig.totalLeaseExpiring.itemDescription, i - 1));
                    model.updateOccupancyDataObject(getPreTLEVal, data, constantModel.rowConfig.previousLeaseExpiring.itemDescription, i);
                }

                model.rowValues.previousLeaseExpiring = parseFloat(model.getValue(data, constantModel.rowConfig.previousLeaseExpiring.itemDescription, i));

                model.rowValues.leaseRenewalsPercentage = parseFloat(model.getValue(data, constantModel.rowConfig.leaseRenewalsPercentage.itemDescription, i));
                model.rowValues.leaseRenewals = parseFloat(model.getValue(data, constantModel.rowConfig.leaseRenewals.itemDescription, i));
                model.rowValues.leaseRenewalsMTMPercentage = parseFloat(model.getValue(data, constantModel.rowConfig.leaseRenewalsMTMPercentage.itemDescription, i));
                model.rowValues.leaseRenewalsMTM = parseFloat(model.getValue(data, constantModel.rowConfig.leaseRenewalsMTM.itemDescription, i));

                model.rowValues.moveoutsNonRenewal = parseFloat(model.getValue(data, constantModel.rowConfig.moveoutsNonRenewal.itemDescription, i));
                model.rowValues.turnOverPercent = parseFloat(model.getValue(data, constantModel.rowConfig.turnOverPercent.itemDescription, i));
                model.rowValues.retentionPercent = parseFloat(model.getValue(data, constantModel.rowConfig.retentionPercent.itemDescription, i));

                if (true) {   //TODO: check Model is finalized or not: if (wsData.renewalsData.budgetModelSettings.isFinal)

                    //Handel Lease Renewal/MTM and Lease Renewal/MTM % 
                    if (form.renewalsType === "percentage") {
                        model.rowValues.leaseRenewals = (model.rowValues.leaseRenewalsPercentage * model.rowValues.previousLeaseExpiring) / 100;
                        model.updateOccupancyDataObject(model.RoundNumber(model.rowValues.leaseRenewals, 1), data, constantModel.rowConfig.leaseRenewals.itemDescription, i);

                        model.rowValues.leaseRenewalsMTM = (model.rowValues.leaseRenewalsMTMPercentage * model.rowValues.previousLeaseExpiring) / 100;
                        model.updateOccupancyDataObject(model.RoundNumber(model.rowValues.leaseRenewalsMTM, 1), data, constantModel.rowConfig.leaseRenewalsMTM.itemDescription, i);
                    }
                    else {
                        if (model.rowValues.previousLeaseExpiring !== 0) {
                            model.rowValues.leaseRenewalsPercentage = (model.rowValues.leaseRenewals / model.rowValues.previousLeaseExpiring) * 100;
                        }
                        else {
                            model.rowValues.leaseRenewalsPercentage = 0;
                        }
                        model.updateOccupancyDataObject(model.RoundNumber(model.rowValues.leaseRenewalsPercentage, 1), data, constantModel.rowConfig.leaseRenewalsPercentage.itemDescription, i);

                        if (model.rowValues.previousLeaseExpiring !== 0) {
                            model.rowValues.leaseRenewalsMTMPercentage = (model.rowValues.leaseRenewalsMTM / model.rowValues.previousLeaseExpiring) * 100;
                        }
                        else {
                            model.rowValues.leaseRenewalsMTMPercentage = 0;
                        }
                        model.updateOccupancyDataObject(model.RoundNumber(model.rowValues.leaseRenewalsMTMPercentage, 1), data, constantModel.rowConfig.leaseRenewalsMTMPercentage.itemDescription, i);
                    }

                    //Handle Renewed Lease Expiring & Budgeted lease expiring
                    if (model.rowValues.averageLeaseTerm !== 0) {
                        var newPeriod = i + model.rowValues.averageLeaseTerm;
                        if (newPeriod <= noOfPeriods && newPeriod >= 1) {
                            temp = parseFloat(model.getValue(data, constantModel.rowConfig.renewedLeasesExpiring.itemDescription, newPeriod));
                            model.updateOccupancyDataObject(model.rowValues.leaseRenewals + temp, data, constantModel.rowConfig.renewedLeasesExpiring.itemDescription, newPeriod);

                            //Budgeted lease expiring 
                            var bmeTemp = parseInt(model.getValue(data, constantModel.rowConfig.budgetedMoveInsExpiring.itemDescription, newPeriod));
                            var occMoveinstemp = parseInt(model.getValue(data, constantModel.rowConfig.moveins.itemDescription, i));
                            model.updateOccupancyDataObject(occMoveinstemp + bmeTemp, data, constantModel.rowConfig.budgetedMoveInsExpiring.itemDescription, newPeriod);
                        }
                    }

                    //Move outs from non renewal
                    model.rowValues.moveoutsNonRenewal = model.rowValues.previousLeaseExpiring - (model.rowValues.leaseRenewals + model.rowValues.leaseRenewalsMTM);
                    model.updateOccupancyDataObject(model.rowValues.moveoutsNonRenewal, data, constantModel.rowConfig.moveoutsNonRenewal.itemDescription, i);

                    //Turn Over Percent
                    model.rowValues.turnOverPercent = (model.rowValues.moveoutsNonRenewal / model.rowValues.totalNoOfUnits) * 100;
                    model.updateOccupancyDataObject(model.RoundNumber(model.rowValues.turnOverPercent, 1), data, constantModel.rowConfig.turnOverPercent.itemDescription, i);

                    //Retention Percent
                    model.rowValues.retentionPercent = model.rowValues.previousLeaseExpiring === 0 ? 0 : ((model.rowValues.leaseRenewals + model.rowValues.leaseRenewalsMTM) / model.rowValues.previousLeaseExpiring) * 100;
                    model.updateOccupancyDataObject(model.RoundNumber(model.rowValues.retentionPercent, 1), data, constantModel.rowConfig.retentionPercent.itemDescription, i);
                }

                //Total Lease Expiring Summary Totoal
                model.rowValues.totalLeaseExpiring = model.rowValues.actualLeasesExpiring + model.rowValues.renewedLeasesExpiring + model.rowValues.budgetedMoveInsExpiring + model.rowValues.additionalLeasesExpiring;
                model.updateOccupancyDataObject(model.rowValues.totalLeaseExpiring, data, constantModel.rowConfig.totalLeaseExpiring.itemDescription, i);

                //TODO: Validation
                //if (model.rowValues.moveoutsNonRenewal < 0) {
                //    //columnIndex = i;
                //    //attention = 1;
                //    //document.getElementById("spnMOFNR" + i).style.color = "red";
                //    //document.getElementById("spnMOFNR" + i).style.fontWeight = "bold";
                //}
                //else {
                //    //document.getElementById("spnMOFNR" + i).style.color = "black";
                //    //document.getElementById("spnMOFNR" + i).style.fontWeight = "normal";
                //}

                //All Row Cummulative Totals 
                model.totals.totalNumberOfUnitsAvg = model.totals.totalNumberOfUnitsAvg + model.rowValues.totalNoOfUnits;
                model.totals.totalActualLeasesExpiring = model.totals.totalActualLeasesExpiring + model.rowValues.actualLeasesExpiring;
                model.totals.totalRenewedLeasesExpiring = model.totals.totalRenewedLeasesExpiring + model.rowValues.renewedLeasesExpiring;
                model.totals.totalBudgetedMoveInsExpiring = model.totals.totalBudgetedMoveInsExpiring + model.rowValues.budgetedMoveInsExpiring;
                model.totals.totalAdditionalLeasesExpiring = model.totals.totalAdditionalLeasesExpiring + model.rowValues.additionalLeasesExpiring;
                model.totals.totalLeaseExpiringCummulative = model.totals.totalLeaseExpiringCummulative + model.rowValues.totalLeaseExpiring;
                model.totals.totalPreviousLeaseExpiring = model.totals.totalPreviousLeaseExpiring + model.rowValues.previousLeaseExpiring;
                model.totals.totalLeaseRenewals = model.totals.totalLeaseRenewals + model.rowValues.leaseRenewals;
                model.totals.totalLeaseRenewalsPercentage = model.totals.totalLeaseRenewalsPercentage + model.rowValues.leaseRenewalsPercentage;
                model.totals.totalLeaseRenewalsMTM = model.totals.totalLeaseRenewalsMTM + model.rowValues.leaseRenewalsMTM;
                model.totals.totalLeaseRenewalsMTMPercentage = model.totals.totalLeaseRenewalsMTMPercentage + model.rowValues.leaseRenewalsMTMPercentage;
                model.totals.totalMoveoutsNonRenewal = model.totals.totalMoveoutsNonRenewal + model.rowValues.moveoutsNonRenewal;
                model.totals.totalTurnOverPercent = model.totals.totalTurnOverPercent + model.rowValues.turnOverPercent;
                model.totals.totalRetentionPercent = model.totals.totalRetentionPercent + model.rowValues.retentionPercent;
            }

            //Handing Total of Total Number of units
            var totalNumberOfUnitsAvg = model.RoundNumber(model.totals.totalNumberOfUnitsAvg / noOfPeriods, 0);
            model.updateOccupancyDataTotalObj(totalNumberOfUnitsAvg, data, constantModel.rowConfig.totalNumberOfUnits.itemDescription);

            //Handing Total Average Lease Term
            //model.updateOccupancyDataTotalObj("", data, constantModel.rowConfig.averageLeaseTerm.itemDescription);

            model.updateOccupancyDataTotalObj(model.totals.totalActualLeasesExpiring, data, constantModel.rowConfig.actualLeasesExpiring.itemDescription);
            model.updateOccupancyDataTotalObj(model.totals.totalRenewedLeasesExpiring, data, constantModel.rowConfig.renewedLeasesExpiring.itemDescription);
            model.updateOccupancyDataTotalObj(model.totals.totalBudgetedMoveInsExpiring, data, constantModel.rowConfig.budgetedMoveInsExpiring.itemDescription);
            model.updateOccupancyDataTotalObj(model.totals.totalAdditionalLeasesExpiring, data, constantModel.rowConfig.additionalLeasesExpiring.itemDescription);

            //Handing Total Lease Expiring
            model.updateOccupancyDataTotalObj(model.totals.totalLeaseExpiringCummulative, data, constantModel.rowConfig.totalLeaseExpiring.itemDescription);

            //Handling Previous Lease Expiring
            model.updateOccupancyDataTotalObj(model.totals.totalPreviousLeaseExpiring, data, constantModel.rowConfig.previousLeaseExpiring.itemDescription);

            //Handling Total Lease Renewals
            model.updateOccupancyDataTotalObj(model.totals.totalLeaseRenewals, data, constantModel.rowConfig.leaseRenewals.itemDescription);

            //Handling Total Lease Renewals  MTM
            model.updateOccupancyDataTotalObj(model.totals.totalLeaseRenewalsMTM, data, constantModel.rowConfig.leaseRenewalsMTM.itemDescription);

            //Handling Move Outs From Renewals
            model.updateOccupancyDataTotalObj(model.totals.totalMoveoutsNonRenewal, data, constantModel.rowConfig.moveoutsNonRenewal.itemDescription);

            //Handling Lease Renewal Percentage TOTAL COLUMN
            var totalLRP = model.RoundNumber(model.totals.totalLeaseRenewalsPercentage / noOfPeriods, 0);
            model.updateOccupancyDataTotalObj(totalLRP, data, constantModel.rowConfig.leaseRenewalsPercentage.itemDescription);

            //Handling Lease Renewal MTM Percentage TOTAL COLUMN
            var totalLRMP = model.RoundNumber(model.totals.totalLeaseRenewalsMTMPercentage / noOfPeriods, 0);
            model.updateOccupancyDataTotalObj(totalLRMP, data, constantModel.rowConfig.leaseRenewalsMTMPercentage.itemDescription);

            //Handling Turnover Percentage TOTAL COLUMN
            var totalTP = model.RoundNumber(model.totals.totalTurnOverPercent / noOfPeriods, 0);
            model.updateOccupancyDataTotalObj(totalTP, data, constantModel.rowConfig.turnOverPercent.itemDescription);

            //Handling Retention Percentage TOTAL COLUMN
            var totalRP = model.RoundNumber(model.totals.totalRetentionPercent / noOfPeriods, 0);
            model.updateOccupancyDataTotalObj(totalRP, data, constantModel.rowConfig.retentionPercent.itemDescription);

            return data;
        };

        model.updateReferenceData = function (data, form) {
            model.updatRefTotal(data, constantModel.rowConfig.refAverageLeaseTerm.itemDescription);
            model.updatRefTotal(data, constantModel.rowConfig.refActualLeasesExpiring.itemDescription);
            model.updatRefTotal(data, constantModel.rowConfig.refLeaseRenewals.itemDescription);
            model.updatTotalAveragePercentage(data, constantModel.rowConfig.refLeaseRenewalsPercentage.itemDescription);
            model.updatRefTotal(data, constantModel.rowConfig.refLeaseRenewalsMTM.itemDescription);
            model.updatTotalAveragePercentage(data, constantModel.rowConfig.refLeaseRenewalsMTMPercentage.itemDescription);
            model.updatRefTotal(data, constantModel.rowConfig.refMoveoutsNonRenewal.itemDescription);
            return data;
        };

        model.updatRefTotal = function (data, name) {
            var total = model.getTotalForRef(data, name);
            model.updateOccupancyDataTotalObj(total, data, name);
        };

        model.getTotalForRef = function (data, name) {
            var obj = model.getDataObject(data, name);
            var total = 0, noOfPeriods = wsData.renewalsData.budgetModelSettings.noOfPeriods;
            for (var i = 1; i <= noOfPeriods; i++) {
                total = total + parseInt(obj["period" + i]);
            }
            return total;
        };

        model.updatTotalAveragePercentage = function (data, name) {
            var total = model.getAvgForPercentage(data, name);
            model.updateOccupancyDataTotalObj(total, data, name);
        };

        model.getAvgForPercentage = function (data, name) {
            var obj = model.getDataObject(data, name);
            var avg = 0, noOfPeriods = wsData.renewalsData.budgetModelSettings.noOfPeriods;
            for (var i = 1; i <= noOfPeriods; i++) {
                avg = avg + obj["period" + i];
            }
            return model.RoundNumber((avg / noOfPeriods), 1);
        };

        model.handleRevenueForecastData = function (data) {
            var avg = 0, totNoOfUnits = model.rowValues.totalNoOfUnits, occupanyTotal = 0;
            var obj = model.getDataObject(data, constantModel.rowConfig.revForecastOccupancy.itemDescription),
                noOfPeriods = wsData.renewalsData.budgetModelSettings.noOfPeriods;
            for (var i = 1; i <= noOfPeriods; i++) {
                var activityFormatedValue = obj["period" + i];
                var occupany = model.RoundNumber((activityFormatedValue / totNoOfUnits) * 100, 1);
                occupanyTotal = occupanyTotal + model.RoundNumber((occupany * totNoOfUnits), 1);
                model.updateOccupancyDataObject(occupany, data, constantModel.rowConfig.revForecastOccupancy.itemDescription, i);
            }
            var revTotal = model.RoundNumber((occupanyTotal / (totNoOfUnits * noOfPeriods)), 1);
            model.updateOccupancyDataTotalObj(revTotal, data, constantModel.rowConfig.revForecastOccupancy.itemDescription);
            return data;
        };

        model.updateOccupancyDataObject = function (value, data, columnType, index) {
            var obj = model.getDataObject(data, columnType);
            obj["period" + index] = value;
        };

        model.updateOccupancyDataTotalObj = function (value, data, columnType) {
            var obj = model.getDataObject(data, columnType);
            obj["total"] = value;
        };

        model.updateOccupancyDataTotalObjWithPercentage = function (value, data, columnType) {
            var obj = model.getDataObject(data, columnType);
            obj["total"] = value; //+ "%";
        };

        model.getValue = function (data, name, index) {
            var obj = model.getDataObject(data, name);
            return obj["period" + index];
        };

        model.getDataObject = function (data, name) {
            return $filter('filter')(data, { itemDescription: name }, true)[0];
        };

        //model.getBudgetDetails = function () {
        //    modelDetails = worksheetData.getBudgetModelSettings();
        //};

        model.getObjectValueByPeriod = function (data, index, name) {
            var obj = $filter('filter')(data, { periodNumber: index }, true)[0];
            return obj[name];
        };

        model.RoundNumber = function (number, places) {
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
          .factory('renewalsUnitTypeCalculations', ['$filter',
                                          'renewalsUnitTypeData',
                                          'renewalsUnitTypeConstantModel', factory]);
})(angular);

