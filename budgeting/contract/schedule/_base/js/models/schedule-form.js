//  Schedule Data

(function (angular) {
    "use strict";

    function scheduleFactory(annualIncrease, frequency, reminderCountdown, pageState, pricing, scheduleFormConfig, i18n, dateUtils) { 
        var schedule = {};

        schedule.init = function() {
            scheduleFormConfig.setMethodsSrc(schedule);

            scheduleFormConfig.setOptions("reminderCountDown", reminderCountdown);
            scheduleFormConfig.setOptions("frequency", frequency.list);          
            scheduleFormConfig.setOptions("increaseType", annualIncrease.getTypeList());
            scheduleFormConfig.setOptions("increaseBasis", annualIncrease.getBasisList());

            schedule.form = null;
            schedule.formConfig = scheduleFormConfig;
            schedule.temporaryIds = [];
            schedule.selected = null;
            schedule.state = pageState.NEW;
            schedule.pageTitle = i18n.translate("bdgt_new_contract_add_schedule_hd");
        };

        //generate a temporary ID to uniquely identify not yet created contract activities
        schedule.generateTempId = function() {
            var rand = Math.floor(Math.random() * (100)) + 1;
                rand *= -1;

            for(var i=0, imax=schedule.temporaryIds.length; i<imax; i++) {
                if(rand == schedule.temporaryIds[i]) {
                    schedule.generateTempId();
                    break;
                }
            }

            return rand;
        };
        schedule.storeTempId = function(id) {
            schedule.temporaryIds.push(id);
        };

        schedule.reset = function() {
            schedule.temporaryIds = [];
            schedule.resetFormState();
        };

        schedule.resetFormState = function() {
            schedule.state = pageState.NEW;
            schedule.pageTitle = i18n.translate("bdgt_new_contract_add_schedule_hd");

            schedule.selected = null;
        };

        schedule.setFormToEdit = function(editMe) {
            schedule.state = pageState.EDIT;
            schedule.pageTitle = i18n.translate("bdgt_new_contract_edit_schedule_hd");

            schedule.selected = editMe;
        };

        schedule.isNewForm = function() {
            return schedule.state == pageState.NEW;
        };

        schedule.isActiveSchedExisting = function() {
            return schedule.selected.contractActivityID > 0;
        };

        schedule.getActiveSchedID = function() {
            return schedule.selected.contractActivityID;
        };

        schedule.onStartDateChange = function(date) {
            if(date) {
                schedule.formConfig.endDate.minDate(date);
            }
        };

        schedule.onEndDateChange = function(date) {
            if(date) {
                schedule.formConfig.startDate.maxDate(date);
            }
        };

        schedule.updateGrid = function() {
            pricing.updateSchedule();
        };


        schedule.init();

        return schedule;
    }

    angular
        .module("budgeting")
        .factory("scheduleForm", [
            "annualIncrease",
            "frequency",
            "reminderCountdown",
            "pageState",
            "pricingModel",
            "scheduleFormConfig",
            "contractTranslatorSvc",
            "dateUtility",
            scheduleFactory
        ]);
})(angular);

