(function () {
    'use strict';

    function validation(dateUtils, contractNotifs, i18n) {
        var vld = {};

        vld.schedule = null;

        vld.isEmptyStr = function(val) {
            if(val === null || val === undefined) {
                return true;
            }

            val += ""; //make sure it's a string
            return (val.trim().length === 0);
        };
        vld.isEmptyArr = function(arr) {
            return (!arr || arr.length === 0);
        };

        vld.setData = function(schedule) {
            vld.schedule = schedule;
        };

        vld.isDataEmpty = function() {
            return vld.schedule === null;
        };

        vld.isReminderRequired = function(val) {
            if(vld.isDataEmpty()) {
                return;
            }
            if(vld.schedule.model.isRemindBeforeExpiry === true) { //email is required if checked
                if(vld.isEmptyStr(val)) {
                    return false;
                }
            }
            return true;
        };

        vld.validateFloat = function(val) {
            if(!vld.isEmptyStr(val)) {
                var num = +val;
                if(isNaN(num)){
                    return false;
                }
            }
            return true;
        };

        vld.isIncreaseRequired = function(val) {
            if(vld.isDataEmpty()) {
                return;
            }
            if(vld.schedule.model.hasAnnualIncrease === true) { //increaseValue is required if checked
                if(vld.isEmptyStr(val)) {
                    return false;
                }
            }
            return true;
        };

        vld.validateDate = function() {
            var startDate = vld.schedule.model.dateRange.startDate,
                endDate = vld.schedule.model.dateRange.endDate;

            if(startDate.isAfter(endDate, "day")) {
                return false;
            }
            return true;
        };       

        vld.reset = function() {
            vld.schedule = null;
        };

        vld.checkForm = function(schedModel) {
            var errorMsg = [];
            var startDate = dateUtils.getDate(schedModel.dateRange.startDate),
                endDate = dateUtils.getDate(schedModel.dateRange.endDate),
                hasValidDates = true;

            if(vld.isEmptyStr(schedModel.dateRange.startDate)) {
                errorMsg.push(i18n.translate("bdgt_schedule_start_date_req"));
                hasValidDates = false;
            }
            if(vld.isEmptyStr(schedModel.dateRange.endDate)) {
                errorMsg.push(i18n.translate("bdgt_schedule_end_date_req"));
                hasValidDates = false;
            }
            if(hasValidDates && startDate.isAfter(endDate, "day")) {
                errorMsg.push(i18n.translate("bdgt_schedule_invalid_dates"));
            }

            if(schedModel.isRemindBeforeExpiry) {
                if(!schedModel.reminder.daysBeforeExpiry) {
                    errorMsg.push(i18n.translate("bdgt_schedule_countdown_req"));
                }
                if(vld.isEmptyStr(schedModel.reminder.email)) {
                    errorMsg.push(i18n.translate("bdgt_schedule_email_req"));
                }
            }

            if(schedModel.hasAnnualIncrease) {
                if(vld.isEmptyStr(schedModel.annualIncrease.type)) {
                    errorMsg.push(i18n.translate("bdgt_schedule_increase_type_req"));
                }
                if(vld.isEmptyStr(schedModel.annualIncrease.basis)) {
                    errorMsg.push(i18n.translate("bdgt_schedule_increase_basis_req"));
                }
                if(!schedModel.annualIncrease.value) {
                    errorMsg.push(i18n.translate("bdgt_schedule_increase_val_req"));
                }
            }

            if(vld.isEmptyArr(errorMsg)) {
                return true;
            } else {
                contractNotifs.generic({
                    type: "error",
                    icon: true,
                    title: "Unable to create schedule", //TODO
                    text: errorMsg.join("\n")
                });
                return false;
            }

        };

       
        return vld;
    }

    angular
        .module("budgeting")
        .factory("schedValidationSvc", [
            "dateUtility",
            "contractNotifSvc",
            "contractTranslatorSvc",
            validation
        ]);
})();

