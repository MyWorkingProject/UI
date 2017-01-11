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

        model.refData = {
            moveIns: 0,
            moveOuts: 0,
            turnOverPercent: 0,
            vacancyPercent: 0,
            occupancyPercent: 0


        };
        modelDetails = budgetDetails.getModelDetails();
        model.updateValues = function(data, form, recalculateMoveIns) {
            angular.extend(model.totals, model.initialTotals);
            angular.extend(model.rowValues, model.initialRowValues);


            var noOfPeriods = modelDetails.noOfPeriods;

            var objPreviousUnits = worksheetData.getOccupancyWorksheetDetails();
            //var objPrevMoveoutNonRenewal = worksheetData.getOccupancyWorksheetDetails().previousMoveoutsNonRenewal;
            //var objPrevMoveoutSkip = worksheetData.getOccupancyWorksheetDetails().previousMoveoutsSkipEviction;
            for (var i = 1; i <= noOfPeriods; i++) {

                model.rowValues.totalNoOfUnits = parseInt(model.getValue(data, constantModel.rowConfig.occupancyNumberOfUnits.itemDescription, i));

                model.totals.previousNoOfUnits = model.getObjectValueByPeriod(objPreviousUnits, i, "previousNumberOfUnits"); //parseInt(objPrevNoOfUnits, 10);
                var previousMoveoutNonRen = 0;
                var previousMoveoutSkip = 0;
                if (objPreviousUnits) {
                    previousMoveoutNonRen = model.getObjectValueByPeriod(objPreviousUnits, i, "previousMoveoutsNonRenewal"); //parseInt(objPrevMoveoutNonRenewal, 10);
                }
                if (objPreviousUnits) {
                    previousMoveoutSkip = model.getObjectValueByPeriod(objPreviousUnits, i, "previousMoveoutsSkipEviction"); //parseInt(objPrevMoveoutSkip, 10);
                }

                model.totals.previousMoveOutTotal += (previousMoveoutNonRen + previousMoveoutSkip);



                model.rowValues.beginingOccupiedUnits = parseInt(model.getValue(data, constantModel.rowConfig.beginingOccupiedUnits.itemDescription, i));
                model.rowValues.moveOutsNonRenewal = parseInt(model.getValue(data, constantModel.rowConfig.moveoutsNonRenewal.itemDescription, i));
                model.rowValues.moveOutSkipEvictions = parseInt(model.getValue(data, constantModel.rowConfig.moveoutsSkipEviction.itemDescription, i));
                model.rowValues.occupancyGoal = parseFloat(model.getValue(data, constantModel.rowConfig.occupancyGoal.itemDescription, i));

                /**
                 **Calculation of MoveINS and Updatating MoveIN value
                 */
                // model.rowValues.moveIns = model.calculateMoveIns(model.rowValues.totalNoOfUnits, model.rowValues.occupancyGoal, model.rowValues.beginingOccupiedUnits, model.rowValues.moveOutsNonRenewal, model.rowValues.moveOutSkipEvictions, form, recalculateMoveIns,data,i);
                model.rowValues.moveIns = model.calculateMoveIns(form, recalculateMoveIns, data, i);

                model.updateOccupancyDataObject(model.rowValues.moveIns, data, constantModel.rowConfig.moveins.itemDescription, i);

                /**
                 **Calculation of Net Changes in Total move-outs
                 */
                model.rowValues.totalMoveOuts = model.rowValues.moveOutsNonRenewal + model.rowValues.moveOutSkipEvictions;
                model.updateOccupancyDataObject(model.rowValues.totalMoveOuts, data, constantModel.rowConfig.totalMoveouts.itemDescription, i);

                /**
                 **Calculation of Net Changes in Occupancy Value
                 */
                model.rowValues.netChangeInOccupancy = model.rowValues.moveIns - (model.rowValues.moveOutsNonRenewal + model.rowValues.moveOutSkipEvictions);
                model.updateOccupancyDataObject(model.rowValues.netChangeInOccupancy, data, constantModel.rowConfig.netOccupancyChange.itemDescription, i);

                /**
                 **Calculation of ending Occupied Units Value
                 */
                model.rowValues.endingOccupiedUnits = model.rowValues.beginingOccupiedUnits + model.rowValues.netChangeInOccupancy;
                model.updateOccupancyDataObject(model.rowValues.endingOccupiedUnits, data, constantModel.rowConfig.endingOccupiedUnits.itemDescription, i);

                /**
                 **Calculation of occupancy % Value
                 */
                model.rowValues.occupancy = model.RoundNumber((model.rowValues.endingOccupiedUnits / model.rowValues.totalNoOfUnits) * 100, 1);
                model.updateOccupancyDataObject(model.rowValues.occupancy, data, constantModel.rowConfig.occupancy.itemDescription, i);
                model.validateOccupancy(); //TODO

                /**
                 **Calculation of TurnOver % Value
                 */
                model.rowValues.turnOver = model.RoundNumber(((model.rowValues.moveOutsNonRenewal + model.rowValues.moveOutSkipEvictions) / model.rowValues.totalNoOfUnits) * 100, 1);
                model.updateOccupancyDataObject(model.rowValues.turnOver, data, constantModel.rowConfig.occupancyTurnOverPercent.itemDescription, i);

                /**
                 **Handling pervious year value, if value exist then update
                 */
                model.rowValues.turnOverMinus = 0;
                if (model.getValue(data, constantModel.rowConfig.previousTurnOverPercent.itemDescription, i)) {
                    model.rowValues.turnOverMinus = parseFloat(model.getValue(data, constantModel.rowConfig.previousTurnOverPercent.itemDescription, i));
                }

                /**
                 **Calculation of Net revenue units
                 */
                model.rowValues.netRevenueUnits = model.handleNonRevenueUnits(data, i);

                /**
                 **Calculation of vacant Units
                 */
                model.rowValues.vacantUnits = (model.rowValues.totalNoOfUnits - model.rowValues.endingOccupiedUnits - model.rowValues.netRevenueUnits);
                model.updateOccupancyDataObject(model.rowValues.vacantUnits, data, constantModel.rowConfig.vacantUnits.itemDescription, i);

                /**
                 **Calculation of vacany
                 */
                model.rowValues.vacancy = model.RoundNumber(((model.rowValues.totalNoOfUnits - model.rowValues.endingOccupiedUnits - model.rowValues.netRevenueUnits) / model.rowValues.totalNoOfUnits) * 100, 1);
                model.updateOccupancyDataObject(model.rowValues.vacancy, data, constantModel.rowConfig.vacany.itemDescription, i);


                model.totals.totalNoOfUnitsTotal = model.totals.totalNoOfUnitsTotal + model.rowValues.totalNoOfUnits;
                model.totals.beginingOccupiedUnitsTotal = model.totals.beginingOccupiedUnitsTotal + model.rowValues.beginingOccupiedUnits;
                model.totals.moveInsTotal = model.totals.moveInsTotal + model.rowValues.moveIns;
                model.totals.moveOutsNonRenewalTotal = model.totals.moveOutsNonRenewalTotal + model.rowValues.moveOutsNonRenewal;
                model.totals.moveOutSkipEvictionsTotal = model.totals.moveOutSkipEvictionsTotal + model.rowValues.moveOutSkipEvictions;
                model.totals.netChangeInOccupancyTotal = model.totals.netChangeInOccupancyTotal + model.rowValues.netChangeInOccupancy;
                model.totals.endingOccupiedUnitsTotal = model.totals.endingOccupiedUnitsTotal + model.rowValues.endingOccupiedUnits;
                model.totals.occupancyTotal = model.totals.occupancyTotal + model.rowValues.occupancy;
                model.totals.occupancyGoalTotal = model.totals.occupancyGoalTotal + model.rowValues.occupancyGoal;
                model.totals.turnOverTotal = model.totals.turnOverTotal + model.rowValues.turnOver;
                model.totals.turnOverMinusTotal = model.totals.turnOverMinusTotal + model.rowValues.turnOverMinus;
                model.totals.vacantUnitsTotal = model.totals.vacantUnitsTotal + model.rowValues.vacantUnits;
                model.totals.vacancyTotal = model.totals.vacancyTotal + model.rowValues.vacancy;

                if (i + 1 <= modelDetails.noOfPeriods) {
                    model.updateOccupancyDataObject(model.rowValues.endingOccupiedUnits, data, constantModel.rowConfig.beginingOccupiedUnits.itemDescription, i + 1);
                }

            }

            /**
             * Handling Total of Total Number of units
             */
            var totalNumberOfUnitsAvg = model.RoundNumber(model.totals.totalNoOfUnitsTotal / noOfPeriods, 0);
            model.updateOccupancyDataTotalObj(totalNumberOfUnitsAvg, data, constantModel.rowConfig.occupancyNumberOfUnits.itemDescription);

            /**
             * Handling Total of Total Number of units
             */
            var beginingOccupiedUnitsAvg = model.RoundNumber(model.totals.beginingOccupiedUnitsTotal / noOfPeriods, 0);
            model.updateOccupancyDataTotalObj(beginingOccupiedUnitsAvg, data, constantModel.rowConfig.beginingOccupiedUnits.itemDescription);


            /**
             * Handling Moveins Avf
             */
            model.updateOccupancyDataTotalObj(model.totals.moveInsTotal, data, constantModel.rowConfig.moveins.itemDescription);

            /**
             * Handling  Non Renuvals Avf
             */
            model.updateOccupancyDataTotalObj(model.totals.moveOutsNonRenewalTotal, data, constantModel.rowConfig.moveoutsNonRenewal.itemDescription);


            /**
             * Handling moveoutsSkipEviction Avf
             */
            model.updateOccupancyDataTotalObj(model.totals.moveOutSkipEvictionsTotal, data, constantModel.rowConfig.moveoutsSkipEviction.itemDescription);


            /**
             * Handling netChangeInOccupancyTotal Avf
             */
            model.updateOccupancyDataTotalObj(model.totals.netChangeInOccupancyTotal, data, constantModel.rowConfig.netOccupancyChange.itemDescription);

            /**
             * Handling endingOccupiedUnitsAvg Avf
             */
            var endingOccupiedUnitsAvg = model.RoundNumber(model.totals.endingOccupiedUnitsTotal / noOfPeriods, 0);
            model.updateOccupancyDataTotalObj(endingOccupiedUnitsAvg, data, constantModel.rowConfig.endingOccupiedUnits.itemDescription);

            /**
             * Enable this code once you add text box added for occupancy goal Percentage ** TODO **
             */
            var occupTotal = model.handleOccupancyGoalPercentage(form, data, model.totals.occupancyTotal, model.totals.occupancyGoalTotal, noOfPeriods);

            /**
             ** Handling occupTotal Avf
             */
            model.updateOccupancyDataTotalObjWithPercentage(occupTotal, data, constantModel.rowConfig.occupancy.itemDescription);

            /**
             ** Handling Turnover Percentage
             */
            var currentYearTurnOver = model.RoundNumber(((model.totals.moveOutsNonRenewalTotal + model.totals.moveOutSkipEvictionsTotal) / model.rowValues.totalNoOfUnits) * 100, 1);
            model.updateOccupancyDataTotalObjWithPercentage(currentYearTurnOver, data, constantModel.rowConfig.occupancyTurnOverPercent.itemDescription);

            if (model.totals.previousNoOfUnits !== 0) {
                var previousTurnOver = model.RoundNumber((model.totals.previousMoveOutTotal / model.totals.previousNoOfUnits) * 100, 1);
                model.updateOccupancyDataTotalObjWithPercentage(previousTurnOver, data, constantModel.rowConfig.previousTurnOverPercent.itemDescription);
            } else {
                model.updateOccupancyDataTotalObjWithPercentage(0, data, constantModel.rowConfig.previousTurnOverPercent.itemDescription);
            }

            /**
             ** Handling Vacance Units Avf
             */
            var vacantUnitsAvg = model.RoundNumber(model.totals.vacantUnitsTotal / noOfPeriods, 0);
            model.updateOccupancyDataTotalObj(vacantUnitsAvg, data, constantModel.rowConfig.vacantUnits.itemDescription);

            /**
             ** Handling Vacance Percentage Avf
             */
            var vacantPercent = model.RoundNumber(model.totals.vacancyTotal / noOfPeriods, 1);
            model.updateOccupancyDataTotalObjWithPercentage(vacantPercent, data, constantModel.rowConfig.vacany.itemDescription);

            /*
                  if (_previousVacancy != tdVacancyAvg.innerText) {
                    _fireAlert = true;
                    document.getElementById("tdSaveMsg").innerText = "";
                 }
            */

            return data;
        };

        model.updateReferenceData = function(data, form) {
            model.updatRefTotal(data, constantModel.rowConfig.refMoveIns.itemDescription);
            model.updatRefTotal(data, constantModel.rowConfig.refMoveOuts.itemDescription);
            model.updateTurnOverPercentage(data, constantModel.rowConfig.refTurnoverPercent.itemDescription);
            model.updatTurnOverTotal(data, constantModel.rowConfig.refVacancyPercent.itemDescription);
            model.updatTurnOverTotal(data, constantModel.rowConfig.refOccupancyPercent.itemDescription);
            return data;
        };

        model.updatRefTotal = function(data, name) {
            var total = model.getTotalForRef(data, name);
            model.updateOccupancyDataTotalObj(total, data, name);
        };

        model.updateTurnOverPercentage = function(data, name) {
            var avg = model.getAvgForRef(data, name);
            model.updateOccupancyDataTotalObj(model.RoundNumber(avg, 1), data, name);
        };

        model.updatTurnOverTotal = function(data, name) {
            var total = model.getAvgForTurnOver(data, name);
            model.updateOccupancyDataTotalObj(total, data, name);
        };

        model.getAvgForRef = function(data, name) {
            var obj = model.getDataObject(data, name);
            var avg = 0;
            for (var i = 1; i <= modelDetails.noOfPeriods; i++) {
                avg = avg + obj["period" + i];
            }
            return avg;
        };

        model.getAvgForTurnOver = function(data, name) {
            var obj = model.getDataObject(data, name);
            var avg = 0;
            for (var i = 1; i <= modelDetails.noOfPeriods; i++) {
                avg = avg + obj["period" + i];
            }
            return model.RoundNumber((avg / modelDetails.noOfPeriods), 1);
        };


        model.getTotalForRef = function(data, name) {
            var obj = model.getDataObject(data, name);
            var total = 0;
            for (var i = 1; i <= modelDetails.noOfPeriods; i++) {
                total = total + parseInt(obj["period" + i]);
            }
            return total;
        };

        model.handleRevenueForecastData = function(data) {
            var avg = 0,
                totNoOfUnits = model.rowValues.totalNoOfUnits,
                occupanyTotal = 0;
            var obj = model.getDataObject(data, constantModel.rowConfig.revForecastOccupancy.itemDescription);
            for (var i = 1; i <= modelDetails.noOfPeriods; i++) {
                var activityFormatedValue = obj["period" + i];
                var occupany = model.RoundNumber((activityFormatedValue / totNoOfUnits) * 100, 1);
                occupanyTotal = occupanyTotal + model.RoundNumber((occupany * totNoOfUnits), 1);
                model.updateOccupancyDataObject(occupany, data, constantModel.rowConfig.revForecastOccupancy.itemDescription, i);
            }
            var revTotal = model.RoundNumber((occupanyTotal / (totNoOfUnits * modelDetails.noOfPeriods)), 1);
            model.updateOccupancyDataTotalObj(revTotal, data, constantModel.rowConfig.revForecastOccupancy.itemDescription);
            return data;
        };


        /**
         * Enable this code once you add text box added for occupancy goal Percentage ** TODO ** Styles are pending
         */
        model.handleOccupancyGoalPercentage = function(form, data, occupancyTotal, occupancyGoalTotal, noOfPeriods) {
            var occupTotal = model.RoundNumber(occupancyTotal / noOfPeriods, 1);
            if (form.occupancyType === "goal") {
                var txtOccupancyPercentage = model.RoundNumber(occupancyGoalTotal / noOfPeriods, 2);
            }

            if (occupTotal != model.RoundNumber(occupancyGoalTotal / noOfPeriods, 1)) {
                // tdOPAvg.style.color = "Red";
            } else {
                // tdOPAvg.style.color = "Black";
            }

            return occupTotal;
        };

        model.doChangeAnnualGoal = function(dataRow) {
            var obj = model.getDataObject(dataRow, constantModel.rowConfig.occupancyGoal.itemDescription);
            for (var j = 1; j <= modelDetails.noOfPeriods; j++) {
                model.updateOccupancyDataObject(obj.goalPercentage, dataRow, constantModel.rowConfig.occupancyGoal.itemDescription, j);
            }
            model.updateOccupancyDataTotalObj(obj.goalPercentage, dataRow, constantModel.rowConfig.occupancyGoal.itemDescription);
        };

        model.handleNonRevenueUnits = function(data, i) {
            var netRevenueUnits = 0,
                netRevenueUnitsAvg = 0;
            if (modelDetails.assettype.toLowerCase() !== "senior living") {
                var modelUnits = parseInt(model.getValue(data, constantModel.rowConfig.modelUnits.itemDescription, i));
                var adminUnits = parseInt(model.getValue(data, constantModel.rowConfig.adminUnits.itemDescription, i));
                var employeeUnits = parseInt(model.getValue(data, constantModel.rowConfig.employeeUnits.itemDescription, i));
                var downUnits = parseInt(model.getValue(data, constantModel.rowConfig.downUnits.itemDescription, i));
                netRevenueUnits = modelUnits + adminUnits + employeeUnits + downUnits;
                model.updateOccupancyDataObject(netRevenueUnits, data, constantModel.rowConfig.totalNonRevenueUnits.itemDescription, i);
                netRevenueUnitsAvg = netRevenueUnitsAvg + netRevenueUnits;
                var totalNRUAvg = model.RoundNumber(netRevenueUnitsAvg / modelDetails.noOfPeriods, 0);
                model.updateOccupancyDataTotalObj(totalNRUAvg, data, constantModel.rowConfig.totalNonRevenueUnits.itemDescription);
            }
            return netRevenueUnits;
        };

        model.validateOccupancy = function() {
            //if (occupancy > 100) {
            //    document.getElementById("spnOP" + i).style.color = "Red";
            //    document.getElementById("spnPerOP" + i).style.color = "Red";
            //} else {
            //    document.getElementById("spnOP" + i).style.color = "Black";
            //    document.getElementById("spnPerOP" + i).style.color = "Black";
            //}
        };

        model.calculateMoveIns = function(form, recalculateMoveIns, data, i) {
            var moveIns = 0;
            if (form.occupancyType === "goal" || recalculateMoveIns) {
                moveIns = model.RoundNumber((model.rowValues.totalNoOfUnits * model.rowValues.occupancyGoal / 100) - model.rowValues.beginingOccupiedUnits + model.rowValues.moveOutsNonRenewal + model.rowValues.moveOutSkipEvictions, 0);
            } else {
                moveIns = parseInt(model.getValue(data, constantModel.rowConfig.moveins.itemDescription, i));
            }
            return moveIns;
        };

        model.updateOccupancyDataObject = function(value, data, columnType, index) {
            var obj = model.getDataObject(data, columnType);
            obj["period" + index] = value;
        };

        model.updateOccupancyDataTotalObj = function(value, data, columnType) {
            var obj = model.getDataObject(data, columnType);
            obj["total"] = value;
        };

        model.updateOccupancyDataTotalObjWithPercentage = function(value, data, columnType) {
            var obj = model.getDataObject(data, columnType);
            obj["total"] = value; //+ "%";
        };

        model.getValue = function(data, name, index) {
            var obj = model.getDataObject(data, name);
            return obj["period" + index];
        };

        model.getDataObject = function(data, name) {
            return $filter('filter')(data, { itemDescription: name }, true)[0];
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
        .factory('worksheetCalculations', ['budgetDetails',
            '$filter',
            'worksheetData',
            'worksheetConstantModel', factory
        ]);
})(angular);