//  Pricing Model

(function (angular) {
    "use strict";

    function pricingFactory(pricingYear, frequency, annualIncrease, calculatorStateModel, pricingUtils, dateUtils, i18n) {
        var pricing = {},
            pricingList = [], //holds the data used by the grid
            currSched = null; // holds the current schedule.model that the grid data depends on

        pricing.init = function () {
            //calculatorStateModel.setErrorMessage(i18n.translate("bdgt_calculator_required_fields")); TODO

            pricing.list = pricingList;
            pricing.calculator = new calculatorStateModel();
            pricing.calculator.maxDecimalCount = 2;
            //pricing.schedule = currSched = currentSchedule;
            pricing.state = {
                hasChanges: false
            };

            return pricing;
        };

         //reset to defaults
        pricing.reset = function () {
            pricing.calculator.reset();

            pricing.list = pricingList = [];
            pricing.schedule = currSched = null;

            pricing.state.hasChanges = false;
        };

        pricing.setSchedule = function(currentSchedule) {
            pricing.schedule = currSched = currentSchedule;            
            // console.debug("  scheduleId = %d", currentSchedule.model.id);
        };
       
        //returns a formatted JSON used by rp-grid
        pricing.getGridData = function () {
            return {
                totalRecords: pricingList.length,
                records: pricingList
            };
        };

        //computes for the expected increase when computing
        pricing.getIncrease = function (amt) {
            amt = Number(amt);
            if (currSched.model.hasAnnualIncrease) {
                var currIncrease = currSched.model.annualIncrease;
                if (currIncrease.type == annualIncrease.type.CURRENCY.value) {
                    return amt + Number(currIncrease.value);
                } else { //percent
                    var percent = currSched.model.annualIncrease.value / 100.0;
                    var increase = amt + (amt * percent);
                    return increase;
                }
            } else {
                return amt; //no increase
            }
        };

        //updates list and computation
        pricing.update = function (forSaving) {
            if(!currSched || !currSched.model || !currSched.model.dateRange.startDate || !currSched.model.dateRange.endDate) {
                // console.debug("pricing.update > skip");                
                return;
            }

            var startDate = dateUtils.getDate(currSched.model.dateRange.startDate),
                endDate = dateUtils.getDate(currSched.model.dateRange.endDate);

            pricingList.length = 0; //empties array without removing the reference used by the grid
            if (currSched.model.hasAnnualIncrease || forSaving === true) { //there will be rows for each year, calculations will be shown in the grid based on the start and end date
                pricing.populateCalendar(startDate, endDate);
            } else { //calculations will be shown in the row from Jan to Dec
                pricing.populateCalendar(startDate, startDate);
            }

            pricing.updateSchedule();
        };

        //updates computation
        pricing.updateSchedule = function () {
            if(!currSched || !currSched.model || !currSched.model.frequency) {
                // console.debug("pricing.updateSchedule > skip");
                return;
            }

            switch (currSched.model.frequency) {
                case frequency.WEEKLY.value:
                    pricing.computeWeekly();
                    break;
                case frequency.BIWEEKLY.value:
                    pricing.computeBiWeekly();
                    break;
                case frequency.MONTHLY.value:
                    pricing.computeMonthly();
                    break;
                case frequency.QUARTERLY.value:
                    pricing.computeQuarterly();
                    break;
                case frequency.ANNUALLY.value:
                    pricing.computeAnnually();
                    break;
                case frequency.ANNUALIZED.value:
                    pricing.computeAnnualized();
                    break;
            }

            pricing.state.hasChanges = true;
        };

        pricing.computeWeekly = function () {
            var amt = currSched.model.amount,
                startDate = dateUtils.getDate(currSched.model.dateRange.startDate),
                endDate = dateUtils.getDate(currSched.model.dateRange.endDate);

            for (var i = 0, max = pricingList.length; i < max; i++) {
                var currYear = pricingList[i],
                    total = 0;

                angular.forEach(currYear, function (val, key) {
                    if (!pricingUtils.isJsonKeyMonth(key)) {
                        return;
                    }

                    var noOfWeeks = 4,
                        currDate = null,
                        testMonth = null,
                        isStartDate = (i === 0 && key == pricingUtils.getMonthKey(startDate));

                    //get current date
                    if (isStartDate) {
                        currDate = dateUtils.createDate(currYear.year, key, startDate.date());
                    } else {
                        currDate = dateUtils.createDate(currYear.year, key, 1);
                    }

                    if (dateUtils.isWithin(currDate, startDate, endDate, "day")) {
                        testMonth = dateUtils.createDate(currYear.year, key, 1).endOf("month"); //compared against last day of the month                            
                        if(testMonth.isAfter(endDate, "day")) {
                            testMonth = endDate;
                        }

                        var currWeek = currDate.week(),
                            testWeek = testMonth.week();

                        if(currWeek > testWeek) { //if end of week is next year 
                            testWeek = testMonth.subtract(1, "week").week();
                        }

                        noOfWeeks = testWeek - currWeek;
                        if(noOfWeeks === 0 || isStartDate) { //if current date falls under the same week as end date, it's still considered as one week
                            noOfWeeks++;
                        }

                        if (currSched.model.hasAnnualIncrease) {
                            if (key == pricingUtils.getMonthKey(startDate) &&
                                    i > 0 && currSched.model.annualIncrease.basis == annualIncrease.basis.ANNIV.value) { //increase every anniversary
                                amt = pricing.getIncrease(amt);
                            }
                        }

                        var monthlyAmt = amt * noOfWeeks;
                        currYear[key] = pricingUtils.displayAsCurrency(monthlyAmt);
                        total += monthlyAmt;
                    } else {
                        currYear[key] = null;
                    }
                });
                currYear.total = total;

                //increase for every following year
                if (currSched.model.hasAnnualIncrease && currSched.model.annualIncrease.basis == annualIncrease.basis.CALENDAR.value) {
                    amt = pricing.getIncrease(amt);
                }
            }
        };

        pricing.computeBiWeekly = function () {
            var amt = currSched.model.amount,
                startDate = dateUtils.getDate(currSched.model.dateRange.startDate),
                endDate = dateUtils.getDate(currSched.model.dateRange.endDate);

            for (var i = 0, max = pricingList.length; i < max; i++) {
                var currYear = pricingList[i],
                    total = 0;
                angular.forEach(currYear, function (val, key) {
                    if (!pricingUtils.isJsonKeyMonth(key)) {
                        return;
                    }

                    var noOfWeeks = 2,
                        currDate = null,
                        testMonth = null;

                    //get current date
                    if (i === 0 && key == pricingUtils.getMonthKey(startDate)) {
                        currDate = dateUtils.createDate(currYear.year, key, startDate.date());
                    } else if (i == max - 1 && key == pricingUtils.getMonthKey(endDate)) {
                        currDate = dateUtils.createDate(currYear.year, key, endDate.date());
                    } else {
                        currDate = dateUtils.createDate(currYear.year, key, 1);
                    }

                    if (dateUtils.isWithin(currDate, startDate, endDate, "day")) {
                        //compute number of weeks based on startDate and endDate
                        testMonth = dateUtils.createDate(currYear.year, key, 15);
                        if (i === 0 && key == pricingUtils.getMonthKey(startDate)) {
                            if (currDate.isAfter(testMonth, "day")) {
                                noOfWeeks = 1;
                            }
                        } else if (i == max - 1 && key == pricingUtils.getMonthKey(endDate)) {
                            if (currDate.isSame(testMonth, "day") || currDate.isBefore(testMonth, "day")) {
                                noOfWeeks = 1;
                            }
                        }

                        if (currSched.model.hasAnnualIncrease) {
                            if (key == pricingUtils.getMonthKey(startDate) &&
                                    i > 0 && currSched.model.annualIncrease.basis == annualIncrease.basis.ANNIV.value) { //increase every anniversary
                                amt = pricing.getIncrease(amt);
                            }
                        }

                        var monthlyAmt = amt * noOfWeeks;
                        currYear[key] = pricingUtils.displayAsCurrency(monthlyAmt);
                        total += monthlyAmt;
                    } else {
                        currYear[key] = null;
                    }
                });
                currYear.total = total;

                //increase for every following year
                if (currSched.model.hasAnnualIncrease && currSched.model.annualIncrease.basis == annualIncrease.basis.CALENDAR.value) {
                    amt = pricing.getIncrease(amt);
                }
            }
        };

        pricing.computeMonthly = function (amountPerMonth) {
            var amt = amountPerMonth || currSched.model.amount,
                startDate = dateUtils.getDate(currSched.model.dateRange.startDate),
                endDate = dateUtils.getDate(currSched.model.dateRange.endDate);

            for (var i = 0, max = pricingList.length; i < max; i++) {
                var currYear = pricingList[i],
                    total = 0;
                angular.forEach(currYear, function (val, key) {
                    if (!pricingUtils.isJsonKeyMonth(key)) {
                        return;
                    }

                    var currDate = dateUtils.createDate(currYear.year, key, startDate.date());
                    if (dateUtils.isWithin(currDate, startDate, endDate, "month")) {
                        if (currSched.model.hasAnnualIncrease) {
                            if (key == pricingUtils.getMonthKey(startDate) &&
                                    i > 0 && currSched.model.annualIncrease.basis == annualIncrease.basis.ANNIV.value) { //increase every anniversary
                                amt = pricing.getIncrease(amt);
                            }
                        }

                        currYear[key] = pricingUtils.displayAsCurrency(amt);
                        total += amt;
                    } else {
                        currYear[key] = null;
                    }
                });
                currYear.total = total;

                //increase for every following year
                if (currSched.model.hasAnnualIncrease && currSched.model.annualIncrease.basis == annualIncrease.basis.CALENDAR.value) {
                    amt = pricing.getIncrease(amt);
                }
            }
        };

        pricing.computeQuarterly = function () {
            var amt = currSched.model.amount,
                startDate = dateUtils.getDate(currSched.model.dateRange.startDate),
                endDate = dateUtils.getDate(currSched.model.dateRange.endDate),
                monthInterval = 0;

            for (var i = 0, max = pricingList.length; i < max; i++) {
                var currYear = pricingList[i],
                    total = 0;
                angular.forEach(currYear, function (val, key) {
                    if (!pricingUtils.isJsonKeyMonth(key)) {
                        return;
                    }

                    var currDate = dateUtils.createDate(currYear.year, key, startDate.date());
                    if (dateUtils.isWithin(currDate, startDate, endDate, "month")) {
                        if (currSched.model.hasAnnualIncrease) {
                            if (key == pricingUtils.getMonthKey(startDate) &&
                                    i > 0 && currSched.model.annualIncrease.basis == annualIncrease.basis.ANNIV.value) { //increase every anniversary
                                amt = pricing.getIncrease(amt);
                            }
                        }

                        if (monthInterval % 3 === 0) {
                            currYear[key] = pricingUtils.displayAsCurrency(amt);
                            total += amt;
                        } else {
                            currYear[key] = null;
                        }

                        monthInterval++;
                    } else {
                        currYear[key] = null;
                    }
                });
                currYear.total = total;

                //increase for every following year
                if (currSched.model.hasAnnualIncrease && currSched.model.annualIncrease.basis == annualIncrease.basis.CALENDAR.value) {
                    amt = pricing.getIncrease(amt);
                }
            }
        };

        pricing.computeAnnually = function () {
            var amt = currSched.model.amount,
                startDate = dateUtils.getDate(currSched.model.dateRange.startDate),
                endDate = dateUtils.getDate(currSched.model.dateRange.endDate);

            for (var i = 0, max = pricingList.length; i < max; i++) {
                var currYear = pricingList[i],
                    total = 0;
                angular.forEach(currYear, function (val, key) {
                    if (!pricingUtils.isJsonKeyMonth(key)) {
                        return;
                    }

                    var currDate = dateUtils.createDate(currYear.year, key, startDate.date());
                    var startMonth = pricingUtils.getMonthKey(startDate);

                    if (key == startMonth && dateUtils.isWithin(currDate, startDate, endDate, "month")) {
                        if (currSched.model.hasAnnualIncrease) {
                            if (currSched.model.annualIncrease.basis == annualIncrease.basis.ANNIV.value && i > 0) { //increase every anniversary
                                amt = pricing.getIncrease(amt);
                            } //else CALENDAR YEAR
                        }

                        currYear[key] = pricingUtils.displayAsCurrency(amt);
                        total += amt;
                    } else {
                        currYear[key] = null;
                    }
                });
                currYear.total = total;

                //increase for every following year
                if (currSched.model.hasAnnualIncrease && currSched.model.annualIncrease.basis == annualIncrease.basis.CALENDAR.value) {
                    amt = pricing.getIncrease(amt);
                }
            }
        };

        pricing.computeAnnualized = function () {
            var amt = currSched.model.amount / 12;
            pricing.computeMonthly(amt);
        };

        //add rows on pricing grid depending on the start and end year
        pricing.populateCalendar = function (startDate, endDate) {
            var noOfYears = endDate.year() - startDate.year(),
                currYear = startDate.year();

            for (var i = 0; i <= noOfYears; i++) {
                var newPricingYear = new pricingYear();

                newPricingYear.year = currYear.toString();
                currYear++;

                pricingList.push(newPricingYear);
            }
        };

        //update total of a row when user edits a text field
        pricing.updateTotal = function (month, year) {
            for (var i = 0, max = pricingList.length; i < max; i++) {
                var currYear = pricingList[i];
                if (currYear.year != year) {
                    continue;
                } else {
                    currYear[month] = pricingUtils.displayAsCurrency(currYear[month]);

                    var total = 0;
                    angular.forEach(currYear, function (val, key) {
                        if (!pricingUtils.isJsonKeyMonth(key)) {
                            return;
                        }

                        var currVal = currYear[key];
                        if (currVal !== null) {
                            total += parseFloat(currYear[key]);
                        }
                    });
                    currYear.total = total;
                    break;
                }
            }
            pricing.state.hasChanges = true;
        };        

        //when user clicks on a certain period, assign it as active period
        pricing.assignActivePeriod = function (year) {
            var baseValueGrid = null;
            for (var i = 0, max = pricingList.length; i < max; i++) {
                var currList = pricingList[i];
                if (currList.year == year) {
                    baseValueGrid = {
                        year: currList.year,
                        total: currList.total
                    };

                    //format base value as per requirement
                    var idx = 1;
                    angular.forEach(currList, function(val, key) {
                        if (!pricingUtils.isJsonKeyMonth(key)) {
                            return;
                        }

                        var keyStr = "period" + idx;
                        baseValueGrid[keyStr] = val;
                        idx++;
                    });
                    break;
                }
            }

            //this data will be used as base value for some calculations
            pricing.calculator.activePeriod = baseValueGrid;
            pricing.calculator.startYear = year;
            pricing.calculator.startMonth = 1;
            pricing.calculator.noOfPeriods = 12;

            pricing.calculator.dateRange.startDate = pricing.schedule.model.dateRange.startDate;
            pricing.calculator.dateRange.endDate = pricing.schedule.model.dateRange.endDate;
        };

        pricing.applyChanges = function(returnData) {
            if(!returnData) {
                return; //nothing to do if this is null
            }
            
            var updatedGrid = returnData.resultsGrid,
                activeYear = returnData.startYear;

            for (var i = 0, max = pricingList.length; i < max; i++) {
                var currList = pricingList[i];
                if (currList.year == activeYear) {
                    var idx = 1;
                    angular.forEach(currList, function(val, key) {
                        if (!pricingUtils.isJsonKeyMonth(key)) {
                            return;
                        }

                        var keyStr = "period" + idx;
                        currList[key] = updatedGrid[keyStr];
                        idx++;
                    });
                    currList.total = updatedGrid.total;
                    break;
                }
            }
        };

        return pricing;
    }

    angular
        .module("budgeting")
        .factory("pricingModel", [
            "pricingYear",
            "frequency",
            "annualIncrease",
            "calculatorStateModel",
            "pricingUtility",
            "dateUtility",
            "contractTranslatorSvc",
            pricingFactory
        ]);

})(angular);