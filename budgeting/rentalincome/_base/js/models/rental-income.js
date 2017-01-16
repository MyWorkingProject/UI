(function(angular) {
    'use strict';

    function BdgtRentalIncomeModelNav($rootScope, $stateParams, budgetDetails, langTranslate, $window) {
        var model = {};
        var budgetEvent;
        var translate, baseURL = "#/rentalincome/:distID/";
        translate = langTranslate('rental-income').translate;

        model._data = [{
            href: "#/rentalincome/:distID/summary",
            className: "",
            isActive: false,
            text: 'Summary'
        }];
        /*{
            href: "#/rentalincome/:distID/marketrent",
            className: "",
            isActive: true,
            text: 'Market Rent'
        }],
        {
            href: "#/rentalincome/:distID/actualrent",
            className: "",
            isActive: true,
            text: 'Actual Rent'
        }; */

        model.originalData = [];
        angular.copy(model._data, model.originalData);

        model.marketRentText = "";
        model.marketRentSubText = "";
        model.scheduleRentText = "";
        model.scheduleRentSubText = "";
        model.isReady = false;

        model.getMRText = function() {
            return model.marketRentText;
        };

        model.getKeyValue = function(key) {
            return translate(key);
        };

        model.setReady = function(val) {
            model.isReady = val;
        };

        model.isModelReady = function() {
            return model.isReady;
        };


        model.addMRScheduleRentLink = function() {
            if (model.getIncomeModel().toLowerCase() !== "none") {
                var MRentLink = {
                    href: "#/rentalincome/" + model.getDistID() + "/marketrent",
                    className: "",
                    isActive: model.isMarketRent() ? true : false,
                    text: model.getMRText()
                };
                model._data.push(MRentLink);
            }

            if (model.getScheduleRentMethod().toLowerCase() !== "none") {
                var ActualRentLink = {
                    href: "#/rentalincome/" + model.getDistID() + "/actualrent",
                    className: "",
                    isActive: model.isMarketRent() ? false : true,
                    text: model.getSRText()
                };
                model._data.push(ActualRentLink);
            }
            var lossOrGain = {};
            switch (model.getLossorGainType()) {
                case "service-group":
                    lossOrGain = {
                        href: baseURL + 'LossOrGain/ServiceSummary',
                        className: "",
                        isActive: false,
                        text: 'Loss/Gain'
                    };
                    break;

            }
            model._data.push(lossOrGain);
        };

        model.getSRText = function() {
            return model.scheduleRentText;
        };

        model.reset = function() {
            angular.copy(model.originalData, model._data);
            model.setReady(false);
            //budgetEvent();  
        };

        model.getMRSubText = function() {
            return model.marketRentSubText;
        };

        model.getSRSubText = function() {
            return model.scheduleRentSubText;
        };

        model.init = function() {
            $rootScope.$on('$locationChangeStart', model.updateState);
            model.setReady(false);
            //budgetEvent = budgetDetails.events.update.subscribe(model.assBugetDetails);
            //if(!budgetDetails.isReady()){
            //        budgetDetails.getPropertyInfo($stateParams.distID);
            //}
            //else{
            //      model.assBugetDetails(budgetDetails.getModelDetails());
            //}
            model.assBugetDetails(budgetDetails.getModelDetails());
            // return model;
        };

        model.updateRentType = function() {
            var rentType = $stateParams.rent;
            if (rentType.toLowerCase() === "marketrent" || rentType.toLowerCase() === "actualrent") {
                model.pageTypes.rentType = rentType.toLowerCase() === "marketrent" ? "MarketRent" : "ScheduleRent";
            }
        };

        model.getIncomeModel = function() {
            return model.budgetDetails.incomeModel;
        };

        model.getScheduleRentMethod = function() {
            return model.budgetDetails.scheduleRentMethod;
        };
        model.getLossorGainType = function() {
            return 'service-group';
        };
        model.getAssetType = function() {
            return model.budgetDetails.assettype;
        };

        model.getBudgetType = function() {
            return model.budgetDetails.budgetType;
        };

        //model.budgetDetails=budgetDetails.getModelDetails();
        model.assBugetDetails = function(data) {
            model.budgetDetails = {};
            angular.extend(model.budgetDetails, data);
            model.updateCustomLables();
            model.updateActualRentCustomLables();
            model.checkPageType(model.budgetDetails.incomeModel, model.budgetDetails.assettype, model.budgetDetails.budgetType);
            model.addMRScheduleRentLink();
            model.setReady(true);
        };

        model.getAccessPrivilages = function() {
            return budgetDetails.getAccessPrivileges();
        };

        model.getUserBudgetWorkflow = function() {
            return budgetDetails.getUserBudgetWorkflow();
        };

        model.updateCustomLables = function() {
            if (model.budgetDetails.marketRentCustomLabel !== null && !angular.isUndefined(model.budgetDetails.marketRentCustomLabel)) {
                model.marketRentText = model.budgetDetails.marketRentCustomLabel;
            } else {
                model.marketRentText = translate('bdgt_rental_mr_lable');
            }
            //model._data[1].text = model.marketRentText;
            model.budgetDetails.pageTitle = translate('bdgt_rental_lable');
            if (model.budgetDetails.incomeModel !== null && !angular.isUndefined(model.budgetDetails.incomeModel)) {
                model.marketRentSubText = translate('bdgt_rental_by_lable') + " " + model.budgetDetails.incomeModel;
            }
        };

        model.updateActualRentCustomLables = function() {
            if (model.budgetDetails.actualRentCustomLabel !== null && !angular.isUndefined(model.budgetDetails.actualRentCustomLabel)) {
                model.scheduleRentText = model.budgetDetails.actualRentCustomLabel;
            } else {
                model.scheduleRentText = translate('bdgt_rental_ar_lable');
            }
            //model._data[2].text = model.actualRentText;
            //model.budgetDetails.pageTitle = translate('bdgt_rental_lable');
            if (model.budgetDetails.scheduleRentMethod !== null && !angular.isUndefined(model.budgetDetails.scheduleRentMethod)) {
                model.scheduleRentSubText = translate('bdgt_rental_by_lable') + " " + model.budgetDetails.scheduleRentMethod;
            }
        };

        model.getBudgetDetails = function() {
            return model.budgetDetails;
        };

        model.getPageTypes = function() {
            return model.pageTypes;
        };

        model.getDistID = function() {
            return model.budgetDetails.distributedID;
        };

        model.getNoOfPeriods = function() {
            return model.budgetDetails.noOfPeriods;
        };

        model.getBudgetYear = function() {
            return model.budgetDetails.budgetYear;
        };

        model.getBudgetModelID = function() {
            return model.budgetDetails.budgetModelID;
        };

        model.getPropertyID = function() {
            return model.budgetDetails.propertyID;
        };

        model.getUnitCount = function() {
            return model.budgetDetails.noOfUnits;
        };

        model.getStartMonth = function() {
            return model.budgetDetails.startMonth;
        };

        model.getURL = function() {
            if (model.pageTypes.studentUnit || model.pageTypes.unit) {
                return model.url + '?datafilter.filterBy=' + model.encodeURL(model.floorPlan);
                //return model.url + '?datafilter='+ $window.btoa("{'filterBy' : '"+ model.floorPlan +"'}");
            }
            return model.url;
        };

        model.getSaveURL = function() {
            return model.saveURL;
        };

        model.setFloorPlan = function(val) {
            model.floorPlan = "{ 'floorPlan' : '" + val + "'}";
        };

        var records = {};

        model.data = function() {
            return model._data;
        };

        model.updateState = function(ev, next, current) {
            var url = '#' + next.split('#')[1];
            model.setState(url);
        };

        model.setState = function(url) {
            model._data.forEach(function(tab) {
                tab.isActive = tab.href == url;
            });
        };

        model.setDistID = function(id) {
            model.distID = id;
        };

        model.setNavUrls = function() {
            model._data.forEach(function(item) {
                item.href = item.href.replace(":distID", model.distID);
            });
        };

        model.pageTypes = {
            serviceGroupUnitType: false,
            programUnitType: false,
            studentUnit: false,
            studentUnitType: false,
            unit: false,
            unitType: false,
            proforma: false,
            rentType: "MarketRent"
        };

        model.isServiceGroup = function() {
            return model.pageTypes.serviceGroupUnitType;
        };

        model.isProgram = function() {
            return model.pageTypes.programUnitType;
        };

        model.isStudentUnit = function() {
            return model.pageTypes.studentUnit;
        };

        model.isStudentUnitType = function() {
            return model.pageTypes.studentUnitType;
        };

        model.isUnit = function() {
            return model.pageTypes.unit;
        };

        model.isUnitType = function() {
            return model.pageTypes.unitType;
        };

        model.isMarketRent = function() {
            return model.pageTypes.rentType === "MarketRent";
        };

        model.getRentType = function() {
            return model.pageTypes.rentType;
        };

        model.isProforma = function() {
            return model.pageTypes.proforma;
        };

        model.floorPlan = "{ 'floorPlan' : 'all' }"; //TODO - This is temporary, it should be included in grid default query

        model.checkPageType = function(incomemodel, assettype, budgetType) {
            model.updateRentType();
            model.pageTypes.serviceGroupUnitType = false;
            model.pageTypes.programUnitType = false;
            model.pageTypes.studentUnit = false;
            model.pageTypes.studentUnitType = false;
            model.pageTypes.unit = false;
            model.pageTypes.unitType = false;
            model.pageTypes.proforma = false;
            var sourceType = model.pageTypes.rentType; // === "mr" ? "MarketRent" : "ScheduleRent";
            //model.pageTypes.rentType = sourceType;


            if (budgetType.toLowerCase() === "proforma" && incomemodel.toLowerCase() === "unit type") {
                model.pageTypes.proforma = true;
                model.url = "";
                model.saveURL = "/api/budgeting/leasingrents/distribute/:distributedID/:updateAll" + sourceType + "/saveproforma" + sourceType + "unittype";
                model.url = '/api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/islatestrent/:islatestrent/proformaunittype' + sourceType;
                return;
            }

            switch (incomemodel.toLowerCase()) {
                case "service group":
                    //Service Group
                    model.pageTypes.serviceGroupUnitType = true;
                    model.url = '/api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/islatestrent/:islatestrent/' + sourceType + 'servicegroup';
                    model.saveURL = "/api/budgeting/leasingrents/distribute/:distributedID/:updateAll" + sourceType + "/save" + sourceType + "servicegroup";
                    break;
                case "program":
                    //Program
                    model.pageTypes.programUnitType = true;
                    model.url = '/api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/islatestrent/:islatestrent/' + sourceType + 'program';
                    model.saveURL = "/api/budgeting/leasingrents/distribute/:distributedID/:updateAll" + sourceType + "/save" + sourceType + "program";
                    break;
                case "unit":
                    if (assettype.toLowerCase() === "student living") {
                        //Student Living - unit
                        model.pageTypes.studentUnit = true;
                        model.url = '/api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/islatestrent/:islatestrent/' + sourceType + 'studentunit';
                        model.saveURL = "/api/budgeting/leasingrents/distribute/:distributedID/:updateAll" + sourceType + "/save" + sourceType + "studentunit";
                        //model.url = 'api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/islatestrent/:islatestrent/marketrentstudentunit?datafilter.filterBy=' + model.encodeURL(model.floorPlan);

                    } else if (assettype.toLowerCase() !== "student living") {
                        //unit
                        model.pageTypes.unit = true;
                        model.url = '/api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/islatestrent/:islatestrent/' + sourceType + 'unit';
                        model.saveURL = "/api/budgeting/leasingrents/distribute/:distributedID/:updateAll" + sourceType + "/save" + sourceType + "unit";
                        //model.url = 'api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/islatestrent/:islatestrent/marketrentunit?datafilter.filterBy=' + model.encodeURL(model.floorPlan);
                    }
                    break;
                case "unit type":
                    if (assettype.toLowerCase() === "student living") {
                        //Student Living - unitType
                        model.pageTypes.studentUnitType = true;
                        model.url = '/api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/islatestrent/:islatestrent/' + sourceType + 'studentunittype';
                        model.saveURL = "/api/budgeting/leasingrents/distribute/:distributedID/:updateAll" + sourceType + "/save" + sourceType + "studentunittype";
                    } else if (assettype.toLowerCase() !== "student living") {
                        //unitType
                        model.pageTypes.unitType = true;
                        model.url = '/api/budgeting/leasingrents/distribute/:distributedID/noofperiods/:noOfPeriods/islatestrent/:islatestrent/unittype' + sourceType;
                        model.saveURL = "/api/budgeting/leasingrents/distribute/:distributedID/:updateAll" + sourceType + "/save" + sourceType + "unittype";
                    }
                    break;
            }
        };

        //TODO - This is temporary, it should be included in grid default query, as we are passing prefix to here
        model.encodeURL = function(prefix) {
            var newUrl = encodeURI(prefix);
            newUrl = newUrl.replace(':', '%3A');
            return newUrl;
        };

        return model; //.init();
    }

    angular
        .module("budgeting")
        .factory('BdgtRentalIncomeModelNav', ['$rootScope', '$stateParams', 'budgetDetails', 'appLangTranslate', "$window", BdgtRentalIncomeModelNav]);
})(angular);