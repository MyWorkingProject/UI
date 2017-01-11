
(function () {
    "use strict";

    function occupancyFactory($filter, occupancyOptions, occFormConfig, occFormValidator, assetType, occupancyMethod,
            occGoalPercent, occupancyGoalType, unitLossType, rentLossMethod, openPeriodRefData, i18n) {
        var defaultModel = {
            method: occupancyMethod.NONE,
            goalPercentage: {},

            glAccounts: {
                adminUnit: null,
                downUnit: null,
                employeeUnit: null,
                modelUnit: null,
                vacantUnit: null
            },
            seniorGLAccounts: [],
            assumptions: {
                earlyTermination: 0,
                employeeUnits: null,
                employeeDiscount: "100.00",
                showReferenceData: false,
                modelUnitsLossType: {
                    value: "none",
                    name: "none"
                },
                noneRevenueRents: {
                    value: "",
                    name: ""
                },
                openPeriodRefData: {
                    value: "",
                    name: ""
                }
            }
        };

        var defaultFormData = {
            propertyID: null,

            occupancyGoalType: null,
            occupancyOptions: null,
            openPeriodRefData: null,
            modelUnitsLossType: null,

            // Title and tooltip depending on asssetType
            basisForVacancy: {
                title: "",
                tooltip: ""
            }
        };

        var defaultFormState = {
            isReady: false,
            isDisplayForm: false,
            isEditable: false,

            isModelUnitLossTypeDisabled: true,
            isOccupancyMethodNone: true,
            isSeniorLiving: false,
            priorYear: null,

            isInputMethodEditable: false,
            isOccupancyGoalEditable: false,
            isGLAccountEditable: false
        };

        var noneLabel = i18n.translate("none");        

        var glAccount = {
            masterchartID: 0,
            siteID: 0,
            glAccountNumber: null,
            glAccountDescription: null
        };

        angular.forEach(defaultModel.glAccounts, function(value, key) {
            defaultModel.glAccounts[key] = angular.copy(glAccount);
        });

        return function() {
            var occupancy = {},
                opm, fmData, fmState;

            occupancy.model = opm = angular.copy(defaultModel);
            occupancy.form = null;
            occupancy.formData = fmData = angular.copy(defaultFormData); //holds the data that is needed to display the form
            occupancy.formState = fmState = angular.copy(defaultFormState); //hide/display state of form elements
            occupancy.formConfig = occFormConfig;

            occupancy.init = function(bmDetails) {
                occupancy.budgetModelDetails = bmDetails;

                var isSeniorLiving = assetType.isSeniorLiving(bmDetails.assettype),
                    priorYear = bmDetails.budgetYear - 1;

                fmState.isEditable = (bmDetails.isFinal === false);
                fmState.isSeniorLiving = isSeniorLiving;
                fmState.priorYear = priorYear;

                fmData.propertyID = bmDetails.propertyID;
                fmData.occupancyGoalType = occupancyGoalType;
                fmData.occupancyOptions = occupancyMethod.getList(isSeniorLiving);
                fmData.openPeriodRefData = openPeriodRefData.getList(priorYear);

                occFormConfig.setMethodsSrc(occupancy);
                occFormConfig.setOptions("occupancyMethod", fmData.occupancyOptions);
                // console.debug("  fill-up occupancyMethod");
                // console.debug(fmData.occupancyOptions);
                occFormConfig.setOptions("openPeriodRefData", fmData.openPeriodRefData);
                // console.debug("  fill-up openPeriodRefData");
                // console.debug(fmData.openPeriodRefData);

                if(isSeniorLiving) {
                    fmData.basisForVacancy.title = i18n.translate("basis_for_vacancy");
                    fmData.basisForVacancy.tooltip = i18n.translate("nr_tooltip_sl");              
                      
                    //seniorGLAccounts depends on the propertyServiceGroups that will be sent to initData
                } else {
                    fmData.basisForVacancy.title = i18n.translate("none_revenue_units_rent");
                    fmData.basisForVacancy.tooltip = i18n.translate("nr_tooltip");

                    //assign GL Account
                    angular.forEach(opm.glAccounts, function(value, key) {
                        value.masterchartID = bmDetails.masterChartID;
                        value.siteID = bmDetails.propertyID;
                    });
                }
            };

            occupancy.initData = function(options, isCancelledPage) {
                var occOpt = null;
                occupancy.options = occOpt = new occupancyOptions(options);

                if(isCancelledPage !== true) { //no need to get list again if it's just a cancelled page.                    
                    //Model Units Loss Unit Type
                    unitLossType.getList(occOpt.getBudgetModelID(), fmData.propertyID, occupancy.assignModelUnitLossType);

                    //Basis for Vacancy / Non-Revenue Units
                    fmData.rentLossMethod = rentLossMethod.getList(occOpt.getIncomeModel(), occOpt.getScheduleRentMethod());                
                    occFormConfig.setOptions("noneRevenueRents", fmData.rentLossMethod);
                    // console.debug("  fill-up noneRevenueRents");
                    // console.debug(fmData.rentLossMethod);
                }

                var isSeniorLiving = occOpt.isSeniorLiving(); 

                opm.method = {};
                opm.method.value = occOpt.getOccupancyModel();
                opm.method.name = occupancy.getOccMethodLabel(opm.method.value);
                opm.goalPercentage = new occGoalPercent(occOpt, occupancy.budgetModelDetails);

                if(isSeniorLiving) {
                    //update GL Accounts - Senior
                    var seniorGLAccounts = [];
                    angular.forEach(occOpt.getPropertyServiceGroups(), function(seniorGL) {
                        var currGLAccount = angular.copy(glAccount);
                        currGLAccount.masterchartID = occupancy.budgetModelDetails.masterChartID;
                        currGLAccount.siteID = occupancy.budgetModelDetails.propertyID;
                        currGLAccount.glAccountNumber = seniorGL.vacancyGL;
                        currGLAccount.glAccountDescription = seniorGL.vacancyGLDescription;
                        currGLAccount.serviceGroupName = seniorGL.serviceGroupName;

                        seniorGLAccounts.push(currGLAccount);
                    });
                    opm.seniorGLAccounts = seniorGLAccounts;
                } else {
                    //update GL Account Values
                    opm.glAccounts.adminUnit.glAccountNumber = occOpt.getGLAcctAdminUnit();
                    opm.glAccounts.adminUnit.glAccountDescription = occOpt.getGLDescAdminUnit();

                    opm.glAccounts.downUnit.glAccountNumber = occOpt.getGLAcctDownUnit();
                    opm.glAccounts.downUnit.glAccountDescription = occOpt.getGLDescDownUnit();

                    opm.glAccounts.employeeUnit.glAccountNumber = occOpt.getGLAcctEmployeeUnit();
                    opm.glAccounts.employeeUnit.glAccountDescription = occOpt.getGLDescEmployeeUnit();

                    opm.glAccounts.modelUnit.glAccountNumber = occOpt.getGLAcctModelUnit();
                    opm.glAccounts.modelUnit.glAccountDescription = occOpt.getGLDescModelUnit();

                    opm.glAccounts.vacantUnit.glAccountNumber = occOpt.getGLAcctVacantUnit();
                    opm.glAccounts.vacantUnit.glAccountDescription = occOpt.getGLDescVacantUnit();

                    //assign assumptions
                    opm.assumptions.earlyTermination = occOpt.getSkipEvictionUnitCount();
                    opm.assumptions.employeeUnits = occOpt.getEmployeeUnitCount();
                    opm.assumptions.employeeDiscount = occOpt.getEmployeeUnitDiscount();

                    opm.assumptions.modelUnitsLossType = {
                        value: occOpt.getModelUnitsLossType(),
                        name: "" //initial value set at the occupancy.assignModelUnitLossType()
                    };
                }

                //assign assumptions
                opm.assumptions.showReferenceData = occOpt.isShowReferenceData();
                opm.assumptions.noneRevenueRents = {
                    value: occOpt.getVacancyUnitRentType(),
                    name: ""
                };
                occupancy.updateNoneRevenueRentsLabel(opm.assumptions.noneRevenueRents.value);

                opm.assumptions.openPeriodRefData = {
                    value: occOpt.getOpenPeriodRefDataValue(),
                    name: ""
                };
                occupancy.updateOpenPeriodRefDataLabel(opm.assumptions.openPeriodRefData.value);

                fmState.isOccupancyMethodNone = occupancyMethod.isNone(occOpt.getOccupancyModel());            
                fmState.isInputMethodEditable = occOpt.isInputMethodEditable();
                fmState.isOccupancyGoalEditable = occOpt.isOccupancyGoalEditable();
                fmState.isGLAccountEditable = occOpt.isGLAccountEditable();
                fmState.isReady = true;
            };

            occupancy.getParamData = function() {
                var occOpt = occupancy.options,
                    saveOccOpt = angular.copy(occOpt.getOccupancyOptions()),
                    saveModelOccGoals = [],
                    savePropertyServiceGroups = [];

                saveOccOpt.propertyID = occupancy.budgetModelDetails.propertyID;

                //Occupancy Method
                if(occOpt.isInputMethodEditable()) {
                    saveOccOpt.occupancyModel = opm.method.value;
                }

                if(!occupancyMethod.isNone(opm.method)) {
                    saveModelOccGoals = angular.copy(occOpt.getOccupancyGoals());
                    savePropertyServiceGroups = angular.copy(occOpt.getPropertyServiceGroups());

                    if(occOpt.isSeniorLiving()) {
                        //GL Accounts - Senior
                        if(occOpt.isGLAccountEditable()) {
                            savePropertyServiceGroups = [];
                            for(var i=0, max=opm.seniorGLAccounts.length; i<max; i++) {
                                var updatedGLAccount = opm.seniorGLAccounts[i],
                                    origGLAccount = occOpt.getPropertyServiceGroup(i);
        
                                origGLAccount.vacancyGL = updatedGLAccount.glAccountNumber;
                                origGLAccount.vacancyGLDescription = updatedGLAccount.glAccountDescription;
        
                                savePropertyServiceGroups.push(origGLAccount);
                            }
                        }
                    } else {
                        //Occupancy Goal %
                        if(occOpt.isOccupancyGoalEditable()) {
                            saveOccOpt.occupancyGoalType = opm.goalPercentage.type;
                            saveModelOccGoals = opm.goalPercentage.getGoalsParamData();
                        }

                        //GL Accounts - Non-senior
                        if(occOpt.isGLAccountEditable()) {
                            saveOccOpt.adminUnitGLAccount = opm.glAccounts.adminUnit.glAccountNumber; 
                            saveOccOpt.adminUnitGLDescription = opm.glAccounts.adminUnit.glAccountDescription; 

                            saveOccOpt.downUnitGLAccount = opm.glAccounts.downUnit.glAccountNumber; 
                            saveOccOpt.downUnitGLDescription = opm.glAccounts.downUnit.glAccountDescription; 

                            saveOccOpt.employeeUnitGLAccount = opm.glAccounts.employeeUnit.glAccountNumber; 
                            saveOccOpt.employeeUnitGLDescription = opm.glAccounts.employeeUnit.glAccountDescription; 

                            saveOccOpt.modelUnitGLAccount = opm.glAccounts.modelUnit.glAccountNumber; 
                            saveOccOpt.modelUnitGLDescription = opm.glAccounts.modelUnit.glAccountDescription; 

                            saveOccOpt.vacantUnitGLAccount = opm.glAccounts.vacantUnit.glAccountNumber; 
                            saveOccOpt.vacantUnitGLDescription = opm.glAccounts.vacantUnit.glAccountDescription;
                        }

                        //Model Units Loss Unit Type
                        saveOccOpt.modelUnitsLossUnitType = opm.assumptions.modelUnitsLossType.value;

                        //Skips / Evictions / Early Termination
                        saveOccOpt.skipEvictionUnitCount = opm.assumptions.earlyTermination;

                        //Employee Units
                        saveOccOpt.employeeUnitCount = opm.assumptions.employeeUnits;
                        
                        //Employee Discount
                        saveOccOpt.employeeUnitDiscount = opm.assumptions.employeeDiscount;
                    }

                    //Basis for Vacancy / Non-Revenue Rents
                    saveOccOpt.vacancyUnitRentType = opm.assumptions.noneRevenueRents.value;

                    //Show reference data
                    saveOccOpt.showReferenceData = opm.assumptions.showReferenceData;

                    //Open period Reference Data
                    var oprd = [null, null];
                    if(opm.assumptions.showReferenceData) {
                        oprd = opm.assumptions.openPeriodRefData.value.split("-");
                    }
                    saveOccOpt.openPeriodRefDataType = oprd[0];
                    saveOccOpt.openPeriodRefDataYear = oprd[1];
                } //occupanyMethod != none
                
                return {
                    occupancyOptions: saveOccOpt,
                    modelOccupancyGoals: saveModelOccGoals,
                    propertyServiceGroups: savePropertyServiceGroups
                };
            };

            occupancy.assignModelUnitLossType = function(response) {
                if(!response || response.records.length === 0) {
                    return; //TODO show error message
                }

                fmData.modelUnitsLossType = response.records;

                //set dropdown records
                occFormConfig.setOptions("modelUnitsLossType", fmData.modelUnitsLossType);
                // console.debug("  fill-up modelUnitsLossType");
                // console.debug(fmData.modelUnitsLossType);

                //set initial display value based on records
                occupancy.updateModelUnitLossTypeLabel(opm.assumptions.modelUnitsLossType.value);

                //enable use to users
                fmState.isModelUnitLossTypeDisabled = false;
            };

            occupancy.changedView = function(val) {
                if(val == occupancyMethod.NONE.value) {
                    fmState.isOccupancyMethodNone = true;
                } else {
                    fmState.isOccupancyMethodNone = false;
                }

                opm.method.name = occupancy.getOccMethodLabel(val);
            };
            
            occupancy.getOccMethodLabel = function(val) {
                var selected = $filter('filter')(fmData.occupancyOptions, {'value': val}, true);
                if(selected && selected.length > 0) {
                    return selected[0].name;
                }
                return noneLabel;
            };

            occupancy.updateModelUnitLossTypeLabel = function(val) {
                var label = noneLabel;
                if(fmData.modelUnitsLossType && val !== "none") {
                    for(var i=0, max=fmData.modelUnitsLossType.length; i<max; i++) {
                        var curr = fmData.modelUnitsLossType[i];
                        if(curr.unitTypeID == val) {
                            label = curr.description;
                            break;
                        }
                    }    
                }
                opm.assumptions.modelUnitsLossType.name = label;
            };

            occupancy.updateNoneRevenueRentsLabel = function(val) {
                var selected = $filter('filter')(fmData.rentLossMethod, { 'value': val }, true); 
                if(selected && selected.length > 0) {
                    opm.assumptions.noneRevenueRents.name = selected[0].name;
                } else {
                    opm.assumptions.noneRevenueRents.name = noneLabel;
                }
            };

            occupancy.updateOpenPeriodRefDataLabel = function(val) {
                var selected = $filter('filter')(fmData.openPeriodRefData, { 'value': val }, true); 
                if(selected && selected.length > 0) {
                    opm.assumptions.openPeriodRefData.name = selected[0].name;
                } else {
                    opm.assumptions.openPeriodRefData.name = noneLabel;
                }
            };

            occupancy.toggleFormDisplay = function(flag) {
                if(flag === null || flag === undefined) {
                    flag = !fmState.isDisplayForm;
                }
                fmState.isDisplayForm = flag;
            };

            occupancy.changedOccVal = function(val) {
                var str = Number(val).toFixed(2);
                opm.goalPercentage.display = str + " " + occupancyGoalType.ANNUALLY.name;
            };

            occupancy.validatePositiveInt = function(val) {
                return occFormValidator.checkPositiveNumber(val);
            };

            occupancy.validatePositiveFloat = function(val) {
                return occFormValidator.checkPositiveFloat(val);
            };

            occupancy.clearDropdownOptions = function() {
                occFormConfig.clearOptions("occupancyMethod");
                occFormConfig.clearOptions("openPeriodRefData");
                occFormConfig.clearOptions("noneRevenueRents");
                occFormConfig.clearOptions("modelUnitsLossType");
                // console.debug("  clear dropdowns");
            };

            occupancy.destroy = function() {
                fmState.isReady = false;

                occupancy.clearDropdownOptions();
                occupancy.options.destroy();
                occupancy.budgetModelDetails = null;
                occupancy.model = opm = null;
                occupancy.formData = fmData = null;
                occupancy.formState = fmState = null;
                occupancy.formConfig = null;
                occupancy = undefined;
            };


            return occupancy;
        };
    }

    angular
        .module("budgeting")
        .factory("occupancyModel", [
            "$filter",
            "occupancyOptions",
            "occupancyFormConfig",
            "occupancyFormValidator",
            "assetType",
            "occupancyMethod",
            "occupancyGoalPercent",
            "occupancyGoalType",
            "unitLossType",
            "rentLossMethod",
            "openPeriodRefData",
            "occTranslatorSvc",
            occupancyFactory
        ]);
})();