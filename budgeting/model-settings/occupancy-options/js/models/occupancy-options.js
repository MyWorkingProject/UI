
(function () {
    "use strict";

    function occupancyOptionsFactory(assetType) {

        return function(options) {
            var occOpt = {},
                ocm = null;

            occOpt.model = ocm = options;

            occOpt.destroy = function() {
                occOpt.model = ocm = null;
                occOpt = undefined;
            }; 


            /* OCCUPANCY OPTIONS */

            occOpt.getModel = function() {
                return ocm;
            };

            occOpt.getOccupancyOptions = function() {
                return ocm.occupancyOption;
            };

            occOpt.getBudgetModelID = function() {
                return ocm.occupancyOption.budgetModelID;
            };

            occOpt.getEmployeeUnitCount = function() {
                return ocm.occupancyOption.employeeUnitCount;
            };

            occOpt.getEmployeeUnitDiscount = function() {
                return ocm.occupancyOption.employeeUnitDiscount;
            };

            occOpt.getGLAcctAdminUnit = function() {
                return ocm.occupancyOption.adminUnitGLAccount;
            };
            
            occOpt.getGLDescAdminUnit = function() {
                return ocm.occupancyOption.adminUnitGLDescription;
            };
            
            occOpt.getGLAcctDownUnit = function() {
                return ocm.occupancyOption.downUnitGLAccount;
            };
            
            occOpt.getGLDescDownUnit = function() {
                return ocm.occupancyOption.downUnitGLDescription;
            };
            
            occOpt.getGLAcctEmployeeUnit = function() {
                return ocm.occupancyOption.employeeUnitGLAccount;
            };
            
            occOpt.getGLDescEmployeeUnit = function() {
                return ocm.occupancyOption.employeeUnitGLDescription;
            };
            
            occOpt.getGLAcctModelUnit = function() {
                return ocm.occupancyOption.modelUnitGLAccount;
            };
            
            occOpt.getGLDescModelUnit = function() {
                return ocm.occupancyOption.modelUnitGLDescription;
            };
            
            occOpt.getGLAcctVacantUnit = function() {
                return ocm.occupancyOption.vacantUnitGLAccount;
            };
            
            occOpt.getGLDescVacantUnit = function() {
                return ocm.occupancyOption.vacantUnitGLDescription;
            };
             
            occOpt.getIncomeModel = function() {
                return ocm.occupancyOption.incomeModel;
            };

            occOpt.getModelUnitsLossType = function() {
                if(!ocm.occupancyOption.modelUnitsLossUnitType || ocm.occupancyOption.modelUnitsLossUnitType == "none") {
                    return 0;
                }
                return ocm.occupancyOption.modelUnitsLossUnitType;
            };

            occOpt.getOccupancyModel = function() {
                return ocm.occupancyOption.occupancyModel;
            };

            occOpt.getOpenPeriodRefDataValue = function() {
                if(occOpt.isShowReferenceData() && ocm.occupancyOption.openPeriodRefDataType !== null) {
                    return ocm.occupancyOption.openPeriodRefDataType + "-" + ocm.occupancyOption.openPeriodRefDataYear;                    
                }
                return "";
            };

            occOpt.getScheduleRentMethod = function() {
                return ocm.occupancyOption.scheduleRentMethod;
            };

            occOpt.getSkipEvictionUnitCount = function() {
                return ocm.occupancyOption.skipEvictionUnitCount;
            };

            occOpt.getVacancyUnitRentType = function() {
                return ocm.occupancyOption.vacancyUnitRentType;
            };

            occOpt.isGLAccountEditable = function() {
                return ocm.occupancyOption.editGLAccounts;
            };

            occOpt.isInputMethodEditable = function() {
                return ocm.occupancyOption.editInputMethod;
            };

            occOpt.isOccupancyGoalEditable = function() {
                return ocm.occupancyOption.editOccupancyGoal;
            };

            occOpt.isSeniorLiving = function() {
                return assetType.isSeniorLiving(ocm.occupancyOption.assetType);
            };

            occOpt.isShowReferenceData = function() {
                return ocm.occupancyOption.showReferenceData;
            };

            /* MODEL OCCUPANCY GOALS - used with Occupancy Goal % */

            occOpt.getOccupancyGoals = function() {
                return ocm.modelOccupancyGoals;
            };

            /* PROPERTY SERVICE GROUP */

            occOpt.getPropertyServiceGroups = function() {
                return ocm.propertyServiceGroups;
            };

            occOpt.getPropertyServiceGroup = function(idx) {
                return ocm.propertyServiceGroups[idx];
            };

            return occOpt;
        };
    }

    angular
        .module("budgeting")
        .factory("occupancyOptions", [
            "assetType",
            occupancyOptionsFactory
        ]);
})();