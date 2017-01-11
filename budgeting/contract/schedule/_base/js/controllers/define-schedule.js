// Define Schedule Controller

(function (angular) {
    "use strict";

    function DefineScheduleCtrl($scope, scheduleForm, schedule, scheduleValidator,
                contractModel, pricing, pricingGridModel, ptGridModel, paymentTermsSvc,
                notifSvc, i18n, asideModal, eventStream, rpWatchList) {

        var vm = this,
            calculatorAside = null;

        var showCalculatorModal = function(params) {
            var resolveData = {
                calculatorParamData: function() {
                    return params;
                }
            };

            calculatorAside.resolve(resolveData).show();
        };

        vm.init = function () {
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));
            vm.watchList.add($scope.$watch("page.state.open", vm.updateScheduleForm));
            vm.calculatorEvt = eventStream();
            vm.calendarChanged = angular.noop;
            vm.dataChanged = angular.noop;

            vm.translate = i18n.translate;
            vm.defineSchedule = scheduleForm;
            vm.state = contractModel.state.schedule;
            vm.pricing = pricing.init();

            vm.initGrids();

            calculatorAside = asideModal("calculator")
                .done(vm.applyCalculatorChanges);
            vm.calculatorEvt.subscribe(showCalculatorModal);
        };

        vm.applyCalculatorChanges = function(response) {
            pricing.applyChanges(response);
            scheduleForm.form.$setDirty(true);
        };

        vm.initGrids = function () {
            vm.pricingGridModel = pricingGridModel.model;
            pricingGridModel.setSrc(vm);
        };

        vm.initData = function() {
            var tempId = scheduleForm.generateTempId();
            vm.schedule = new schedule(tempId);           
        };

        vm.initForm = function() {
            scheduleValidator.setData(vm.schedule);
            pricing.setSchedule(vm.schedule);
            pricingGridModel.populateGrid(pricing.getGridData());
        };

        vm.fillUpForm = function(response) {
            if (!response || !response.records) {
                notifSvc.error("bdgt_schedule_unavailable");
                return;
            }

            var jsonSched = response.records[0];
            vm.schedule = new schedule(jsonSched.contractActivityID, jsonSched);
            vm.initForm();
        };

        vm.schedDetailError = function() {
            notifSvc.error("bdgt_schedule_details_fail");
        };

        vm.resetData = function() {
            vm.schedule = null;
            scheduleValidator.reset();
            pricingGridModel.clear();
            pricing.reset();
        };

        vm.updateCalendar = function() {
            pricing.update();
        };

        //reset or prepare workflow when displayed or hidden
        vm.updateScheduleForm = function (isOpen) {
            if (isOpen) { //prepare view
                vm.calendarChanged = $scope.$watchGroup([
                    "page.schedule.model.dateRange.startDate",
                    "page.schedule.model.dateRange.endDate",
                    "page.schedule.model.hasAnnualIncrease",
                ], vm.updateCalendar);

                vm.dataChanged = $scope.$watchGroup([
                    "page.schedule.model.amount",
                    "page.schedule.model.frequency",
                    "page.schedule.model.annualIncrease.value",
                    "page.schedule.model.annualIncrease.type",
                    "page.schedule.model.annualIncrease.basis"
                ], pricing.updateSchedule);

                if(scheduleForm.isNewForm()) {
                    vm.initData();
                    vm.initForm();                    
                } else if(!scheduleForm.isActiveSchedExisting()) { //schedule is not yet saved
                    vm.schedule = contractModel.getSchedule(scheduleForm.getActiveSchedID());
                    vm.schedule.resetDateFormat();
                    vm.initForm();
                } else {
                    paymentTermsSvc.getPaymentTermDetails(scheduleForm.getActiveSchedID())
                        .then(vm.fillUpForm, vm.schedDetailError);
                }                
            } else {
                //remove events
                vm.calendarChanged();
                vm.dataChanged();

                scheduleForm.resetFormState();
                vm.resetData();
            }
        };

        vm.openCalculator = function() {
            vm.calculatorEvt.publish(pricing.calculator);
        };
        
        vm.destroy = function() {
            calculatorAside.destroy();
            vm.updateScheduleForm(false);
            vm.calculatorEvt.destroy();
            vm.watchList.destroy();
        };

        vm.toggleAddSchedule = function(flag) {
            contractModel.toggleAddSchedule(flag);
        };

        vm.closeSchedule = function() {
            contractModel.toggleAddSchedule(false);
            $scope.$apply();
        };

        vm.cancel = function() {
            if(scheduleForm.form && scheduleForm.form.$dirty) {
                notifSvc.confirmDialog(
                    "bdgt_new_contract_dlg_cancel_ns_title", 
                    "bdgt_new_contract_dlg_cancel_ns_ask", vm.closeSchedule);
            } else {
                vm.toggleAddSchedule(false);
            }
        };

        vm.saveAndClose = function() {
            if(!scheduleValidator.checkForm(pricing.schedule.model)) {
                return;
            }

            if (scheduleForm.form.$invalid) {
                scheduleForm.form.$setSubmitted();
                return;
            }

            //store tempID to avoid repeats
            vm.defineSchedule.storeTempId(pricing.schedule.model.id); 

            //finalize schedule data
            pricing.update(true);
            pricing.schedule.setActivityPeriods(pricing.list);
            pricing.schedule.computeActivityTotal();

            //add schedule to corresponding lists
            if(scheduleForm.isNewForm()) {
                contractModel.addSchedule(pricing.schedule);
                ptGridModel.addToGrid(pricing.schedule);
            } else {
                contractModel.editSchedule(pricing.schedule);
                ptGridModel.editGrid(pricing.schedule);
            }

            vm.toggleAddSchedule(false);
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("DefineScheduleCtrl", [
            "$scope",
            "scheduleForm",
            "schedule",
            "schedValidationSvc",
            "contractModel",
            "pricingModel",
            "pricingGridModel",
            "paymentTermsGridModel",
            "paymentTermsSvc",
            "contractNotifSvc",
            "contractTranslatorSvc",
            "rpBdgtAsideModalService", 
            "eventStream",
            "rpWatchList",
            DefineScheduleCtrl
        ]);
})(angular);

