//  New Contract Data

(function () {
    'use strict';

    function factory(contractFormConfig, dateUtils, pageState, schedule) {
        var emptyData = {
                id: 0,
                vendor: null,
                description: "",
                notes: "",
                applyTo: [],

                schedules: [],
                documents: [],
                properties: [],

                deletedSchedules: [],
                deletedProperties: []
            }, 
            defaultState = {
                page: "new", //pageState
                schedule: {
                    open: false
                },
                property: {
                    accountAllocation: "edit" //pageState
                }
            };

        var contract = {};
        contract.model = angular.copy(emptyData); //model will hold all the data that is assigned when creating a new contract
        contract.state = angular.copy(defaultState);
        contract.config = contractFormConfig;

        contract.getId = function () {
            return contract.model.id;
        };

        contract.isVendorValid = function () {
            return (contract.model.vendor.vendorName !== null && contract.model.vendor.vendorName.trim().length > 0) &&
                       (contract.model.vendor.vendorID !== null && contract.model.vendor.vendorID > 0);
        };

        //reset new contract data to empty
        contract.reset = function () {
            contract.model = angular.copy(emptyData);
            contract.state = angular.copy(defaultState);
        };

        //Map out model to required parameters
        contract.getBaseParameterData = function () {
            var currData = contract.model;
            return {
                vendorContractID: currData.id,
                vendorID: currData.vendor.vendorID,
                vendorName: currData.vendor.vendorName,
                description: currData.description,
                note: currData.notes
            };
        };

        contract.setContract = function(responseData) {
            contract.model.id = responseData.vendorContract.vendorContractID;            
            contract.model.description = responseData.vendorContract.description;
            contract.model.notes = responseData.vendorContract.notes;

            contract.model.vendor = {}; 
            contract.model.vendor.vendorID = responseData.vendorContract.vendorID;
            contract.model.vendor.vendorName = responseData.vendorContract.vendorName;            

            if(responseData.contractActivityList && responseData.contractActivityList.length > 0) {
                contract.createActivityList(responseData.contractActivityList);
            }

            //load the contract activity during edit mode only
            if(contract.state.page == pageState.EDIT && responseData.contractActivityPeriodsList && responseData.contractActivityPeriodsList.length > 0) {
                contract.assignToActivityList(responseData.contractActivityPeriodsList);
            }
        };

        //convert schedule json into schedule objects
        contract.createActivityList = function(activityList) {
            angular.forEach(activityList, function(currSchedule) {
                var newSched = new schedule(currSchedule.contractActivityID, currSchedule);
                contract.model.schedules.push(newSched);
            });
        };

        //convert activity period json into pricingYear objects & assign to corresponding schedule
        contract.assignToActivityList = function(activityPeriod) {
            var scheduleList = contract.model.schedules;
            angular.forEach(scheduleList, function(currSchedule) {                
                currSchedule.assignActivityPeriod(activityPeriod);
            });
        };

        contract.toggleAddSchedule = function(flag) {
            if(flag === null || flag === undefined) {
                flag = !contract.state.schedule.open;
            }

            contract.state.schedule.open = flag;
        };

        contract.isScheduleFormOpen = function() {
            return contract.state.schedule.open;
        };

        contract.addSchedule = function(currSchedule) {
            // console.debug("    adding schedule (%d)", currSchedule.model.id);
            contract.model.schedules.push(currSchedule);              
        };

        contract.editSchedule = function(currSchedule) {
            for(var i=0, max=contract.model.schedules.length; i<max; i++) {
                var curr = contract.model.schedules[i];
                if(curr.model.id == currSchedule.model.id) {
                    contract.model.schedules[i] = currSchedule;
                    break;
                }
            }
        };

        contract.getSchedule = function(scheduleId)  {            
            for(var i=0, max=contract.model.schedules.length; i<max; i++) {
                var curr = contract.model.schedules[i];
                if(curr.model.id == scheduleId) {
                    return curr;
                }
            }
        };

        contract.deleteSchedule = function(scheduleId) {
            // console.debug("    delete schedule (%d)", scheduleId);

            //this schedule has been stored in the database, we should delete it there too
            if(scheduleId > 0) { 
                contract.model.deletedSchedules.push(scheduleId);
            }

            for(var i=0, max=contract.model.schedules.length; i<max; i++) {
                var currSchedule = contract.model.schedules[i];
                if(currSchedule.model.id == scheduleId) {
                    contract.model.schedules.splice(i, 1);
                    break;
                }
            }          
        };

        contract.getSchedulesForDeletion = function() {
            return contract.model.deletedSchedules;
        };

        contract.isDisplayForm = function() {
            if(contract.state.page == pageState.VIEW) {
                return false;
            }
            return true;
        };

        contract.isNew = function() {
            if(contract.state.page == pageState.NEW) {
                return true;
            }
            return false;
        };

        contract.getParameterData = function() {
            var vendorContractId = contract.model.id || 0;
            var contractActivityDetails = [];

            //get parameter data for schedules
            if(contract.model.schedules && contract.model.schedules.length > 0) {
                angular.forEach(contract.model.schedules, function(schedule) {
                    contractActivityDetails.push(schedule.getParameterData(vendorContractId));
                });
            }       

            return {
                "vendorContract": contract.getBaseParameterData(),
                "vendorContractProperty": contract.model.properties,
                "vendorContractPropertyDelete": contract.model.deletedProperties,
                "contractActivityDelete": contract.getSchedulesForDeletion(), //TODO
                "contractActivityDetails": contractActivityDetails
            };
        };

        return contract;
    }

    angular
        .module("budgeting")
        .factory("contractModel", [
            "contractFormConfig",
            "dateUtility",
            "pageState",
            "schedule",
            factory
        ]);
})();

