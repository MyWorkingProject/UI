//  Contract Activity (Schedule) Details

(function (angular) {
    "use strict";

    function scheduleFactory(annualIncrease, dateUtils, pricingYear, $filter) {
        var scheduleDetails = {
            id: 0,
            dateRange: {
                startDate: null,
                endDate: null,
            },
            frequency: "monthly", //frequency
            amount: null,
            total: null,

            isRemindBeforeExpiry: false,
            reminder: {
                daysBeforeExpiry: 0, //reminderCountdown
                email: null
            },

            hasAnnualIncrease: false,
            annualIncrease: {
                value: 0,
                type: null, //annualIncrease.type
                basis: null //annualIncrease.basis
            },

            activityPeriods: [] //pricingYear
        };

        return function(id, json) {
            var sched = this;

            sched.model = angular.copy(scheduleDetails);
            sched.model.id = id;

            if(json !== undefined && json !== null) {
                sched.model.dateRange.startDate = dateUtils.getDate(json.startDate);
                sched.model.dateRange.endDate = dateUtils.getDate(json.endDate);
                sched.model.frequency = json.frequency ? json.frequency.toLowerCase() : "";
                sched.model.amount = parseFloat(json.amount);
                sched.model.total = json.total;

                sched.model.isRemindBeforeExpiry = json.sendExpireEmail;
                sched.model.reminder.daysBeforeExpiry = json.daysBeforeExpire;
                sched.model.reminder.email = json.sendEmailTo;

                sched.model.hasAnnualIncrease = json.isContractIncrease;
                sched.model.annualIncrease.value = json.annualIncrease;
                sched.model.annualIncrease.type = json.increaseType;
                sched.model.annualIncrease.basis = json.basisForIncrease;
            }

            sched.setReminderDefaults = function () {
                sched.model.reminder.email = null;
                if (sched.model.isRemindBeforeExpiry) {
                    sched.model.reminder.daysBeforeExpiry = 60;
                } else {
                    sched.model.reminder.daysBeforeExpiry = 0;
                }
            };

            sched.setAnnualIncreaseDefaults = function () {
                sched.model.annualIncrease.value = null;
                if (sched.model.hasAnnualIncrease) {
                    sched.model.annualIncrease.type = annualIncrease.type.CURRENCY.value;
                    sched.model.annualIncrease.basis = annualIncrease.basis.ANNIV.value;
                } else {
                    sched.model.annualIncrease.type = null;
                    sched.model.annualIncrease.basis = null;
                }
            };

            sched.getIncreaseTypeDisp = function() {
                return annualIncrease.getTypeDisplay(sched.model.annualIncrease.type);
            };

            sched.assignActivityPeriod = function(activityPeriod) {
                var periodForSched = $filter("filter")(activityPeriod, {contractActivityID:sched.model.id});
                angular.forEach(periodForSched, function(currPeriod) {
                    var periodObj = new pricingYear(currPeriod);
                    sched.model.activityPeriods.push(periodObj);
                });
            };

            sched.getParameterData = function(contractId) {
                var paramData = {},
                    schedId = 0;

                //use existing ID when applicable
                if(sched.model.id > 0) {
                    schedId = sched.model.id;
                }

                paramData.contractActivity = {
                    contractActivityID: schedId,
                    vendorContractID: contractId,
                    startDate: dateUtils.getFriendlyDate(sched.model.dateRange.startDate),
                    endDate: dateUtils.getFriendlyDate(sched.model.dateRange.endDate),
                    frequency: sched.model.frequency,
                    amount: sched.model.amount,
                    sendExpireEmail: sched.model.isRemindBeforeExpiry,
                    daysBeforeExpire: sched.model.reminder.daysBeforeExpiry,
                    sendEmailTo: sched.model.reminder.email,
                    isContractIncrease: sched.model.hasAnnualIncrease,
                    increaseType: sched.model.annualIncrease.type,
                    annualIncrease: sched.model.annualIncrease.value,
                    basisForIncrease: sched.model.annualIncrease.basis
                };

                var activityPeriods = [];  
                if(0 < sched.model.activityPeriods.length) {
                    angular.forEach(sched.model.activityPeriods, function(currPeriod) {
                        activityPeriods = activityPeriods.concat(currPeriod.getParameterData(sched.model.id));
                    });
                }
                paramData.contractActivityPeriods = activityPeriods;

                return paramData;
            };

            sched.getGridData = function() {
                var json = {};

                json.contractActivityID = sched.model.id;
                json.startDate = dateUtils.getFriendlyDate(sched.model.dateRange.startDate);
                json.endDate = dateUtils.getFriendlyDate(sched.model.dateRange.endDate);
                json.frequency = sched.model.frequency;
                json.amount = sched.model.amount;
                json.total = sched.model.total;

                return json;
            };

            sched.addPricingYear = function(py) {
                sched.model.activityPeriods.push(py);
            };

            sched.setActivityPeriods = function(arr) {
                sched.model.activityPeriods = angular.copy(arr);
            };

            sched.computeActivityTotal = function() {
                var total = 0;
                angular.forEach(sched.model.activityPeriods, function(currPeriod) {
                    total += parseFloat(currPeriod.total);
                });
                sched.model.total = total;

                return total;
            };

            sched.resetDateFormat = function() {
                var testStr = sched.model.dateRange.startDate;
                if(typeof testStr == "string" && testStr.split(" ").length > 1) {
                    sched.model.dateRange.startDate = dateUtils.getDate(sched.model.dateRange.startDate, dateUtils.dateFormat.dateTime);
                    sched.model.dateRange.endDate = dateUtils.getDate(sched.model.dateRange.endDate, dateUtils.dateFormat.dateTime);
                } else {
                    sched.model.dateRange.startDate = dateUtils.getDate(sched.model.dateRange.startDate);
                    sched.model.dateRange.endDate = dateUtils.getDate(sched.model.dateRange.endDate);
                }
                
            };

            return sched;
        };

    }

    angular
        .module("budgeting")
        .factory("schedule", [
            "annualIncrease",
            "dateUtility",
            "pricingYear",
            "$filter",
            scheduleFactory
        ]);
})(angular);

