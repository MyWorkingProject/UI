//  SampleCg Model

(function (angular) {
    'use strict';

    function factory(bdgtRentalIncomeModelNav, svc, langTranslate, refSVC, $filter, $stateParams, preferences, capSVC, capModel) {
        var model = {},
             showRefCalRows = "",
             budgetDetails = {};
        var translate;
        translate = langTranslate('market-rent').translate;
        model.latestRent = false;
        model.rentLink = {
            icon: "fa fa-building-o",
            text: "Budgeting"
        };

        model.homeData = {
            icon: "rp-icon-statistics-5",
            text: "Property Management"
        };        

        model.emptyData = {
            latestRent: false,
            unitType: "All",
            showfilter: false,
            gridReady:false,
            showReferenceData:false,
            showReferenceCalcData:false,
            monthNames : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            periodSuf : "period",
            rowHeightClass : "large",
            isFinal: false,
            rentType: "marketRent",
            capMethod: "None",
            capValue:{},
            errorMsg:""
        };

        model.form = {};

        model.getActualRentCap = function(){
             return {
                    capMethod: model.form.capMethod,
                    capValue: model.form.capValue
                };
        };

        model.setActualRentCap = function(actualRentCap){
            model.form.capMethod = actualRentCap.capMethod;
            model.form.capValue = actualRentCap.capValue;
        };

        model.isProgramService = function(){
            if(bdgtRentalIncomeModelNav.isServiceGroup() || bdgtRentalIncomeModelNav.isProgram()){
                return true;
            }
            else{
                return false;
            }
        };

         model.isStudent = function(){
            if(bdgtRentalIncomeModelNav.isStudentUnitType() || bdgtRentalIncomeModelNav.isStudentUnit()){
                return true;
            }
            else{
                return false;
            }
        };

        model.isProgram = function(){
            return bdgtRentalIncomeModelNav.isProgram();
        };

        model.isServiceGroup = function(){
            return bdgtRentalIncomeModelNav.isServiceGroup();
        };


        model.init = function () {
            angular.extend(model.form, model.emptyData);
            model.isValidRoute();
            model.showRefCalRows = showRefCalRows;
            model.budgetDetails = bdgtRentalIncomeModelNav.getBudgetDetails();
            model.pageTypes = bdgtRentalIncomeModelNav.getPageTypes();
            bdgtRentalIncomeModelNav.checkPageType(model.getRentMethod(), model.budgetDetails.assettype, model.budgetDetails.budgetType);
            model.setBtnsState();
            var links = [{href: "#/",text: "Budgeting"},
                         {href:"#/budgetmodel/"+ model.budgetDetails.distributedID +"/overview", text : model.budgetDetails.modelName }];
            //breadCum.home = model.rentLink;
            //breadCum.setLinks(links);
            //breadCum.links = links;
            //return model;
        };

       model.getRentType = function(){
            return model.isMarketRent() ? "mr" : "sr";
       };

       model.getIncomeModel = function(){
            return bdgtRentalIncomeModelNav.getIncomeModel();
       };

       model.getScheduleRentMethod = function(){
            return bdgtRentalIncomeModelNav.getScheduleRentMethod();
       };

       model.getWorksheetText = function(){
            if(model.isMarketRent()){
             return bdgtRentalIncomeModelNav.getMRText();
            }
            else{
                return bdgtRentalIncomeModelNav.getSRText();
            }
       }; 

       model.getCapMethod = function(){
             var params = { distributedID: bdgtRentalIncomeModelNav.getDistID(), 
                            propertyID:bdgtRentalIncomeModelNav.getPropertyID(), 
                            budgetModelID:bdgtRentalIncomeModelNav.getBudgetModelID(), 
                            mrDataType: capModel.getdataType("MarketRent", bdgtRentalIncomeModelNav.getIncomeModel(), bdgtRentalIncomeModelNav.getAssetType()) };
            return capSVC.getActualCapMethod(params);
       };

      model.getAvgMRCap = function(){
            var params = { distributedID: bdgtRentalIncomeModelNav.getDistID(),
                           noOfPeriods:   bdgtRentalIncomeModelNav.getNoOfPeriods()
                         };
            return capSVC.getMarketRentForActualCap(params);
      };  

     model.autoUpdateActualRent = function(){
            var params = { distributedID: bdgtRentalIncomeModelNav.getDistID()
                         };
            return capSVC.autoUpdateActualRent(params).$promise;
      };    

         
      model.getRentMethod = function(){
            return model.isMarketRent() ? model.budgetDetails.incomeModel : model.budgetDetails.scheduleRentMethod;
       };  

       model.isMarketRent = function(){
            return model.form.rentType === "marketRent";
       }; 

       model.isValidRoute = function(){
            var rentType = $stateParams.rent;
            if(rentType.toLowerCase() === "marketrent" || rentType.toLowerCase() === "actualrent"){
                model.form.rentType = rentType.toLowerCase() === "marketrent" ? "marketRent" : "scheduleRent";
                return true;
            }
            else{
                return false;
            }
       }; 

       model.setBtnsState = function(){
           var privalage = bdgtRentalIncomeModelNav.getAccessPrivilages();
            model.form.isFinal = !privalage.allowEdit;
            model.form.errorMsg = privalage.errorMessage;
            if(model.form.errorMsg === "Finalized"){
                model.form.erroCode = "finalized";
            }
            else if(model.form.errorMsg === "Read Only"){
                model.form.erroCode = "read-only";
            }
       };

       model.isModelFinal = function(){
            return model.form.isFinal;
       }; 

       model.setFilter = function(val){
            model.form.showfilter = val;
       };

       model.getDistID = function(){
            return bdgtRentalIncomeModelNav.getDistID();
            //$location.path('budgetmodel/' + bdgtRentalIncomeModelNav.getDistID() + '/overview');
       }; 

       model.setRefereceData = function(){
            if(!model.form.showReferenceData){
                model.form.showReferenceCalcData = false;
            } 
       }; 

       model.setRefereceCalcData = function(){
            //model.form.showReferenceCalcData = val;
       };  

       model.toggleFilter = function(){
            model.setFilter(!model.form.showfilter);
       };
    
       model.updateLatestRent = function(val){
           model.form.latestRent = val; 
       };  

       model.getImportedData = function(){
            model.form.latestRent = true;
            return model.getmarketRentSummary("all");
       };  

        model.getmarketRentSummary = function (floorPlan) {
            bdgtRentalIncomeModelNav.setFloorPlan(floorPlan);
            var params = {
                distID: bdgtRentalIncomeModelNav.getDistID(),
                noOfPeriods: bdgtRentalIncomeModelNav.getNoOfPeriods(),
                islatestrent:  model.form.latestRent
            };

            return svc.abortGetMRData().getMRData(params);
        };

       model.getMarketRentDataForCap = function(params,url){
            return svc.getMRCapData(params,url);
       };
    
       model.getImportedDates = function () {
            var params = {
                distributedID: bdgtRentalIncomeModelNav.getDistID(),
            };

            if(model.isMarketRent()){ 
                return svc.getmarketRentModifiedDates(params).$promise;
            }
            else{
                return svc.getScheduleRentModifiedDates(params).$promise;
            }
        };  

       model.reset = function(){
         angular.extend(model.form, model.emptyData);
         //breadCum.setHome(model.homeData);
          //breadCum.home = model.homeData;  
       };

       model.setPreferenceData = function(){
            model.getPreferenceData().then(model.loadPreferenceData);
       }; 

       model.loadPreferenceData = function(data){
            angular.forEach(data.records,function(item){
                switch(item.fieldType){
                    case"showReferenceData":
                        model.form.showReferenceData = item.fieldValue === "false" ? false : true;
                        break;
                    case"showReferenceCalcData":
                        model.form.showReferenceCalcData = item.fieldValue === "false" ? false : true;
                        break;
                    case "rowHeightClass":  
                        model.form.rowHeightClass = item.fieldValue;   
                        break;
                }
            });
            return model.form.rowHeightClass;
       }; 

        model.setPreferenceValues = function(data){
            model.form.showReferenceData = data.rowOptions.options[0].value;
            model.form.showReferenceCalcData = data.rowOptions.options[1].value;
            model.form.rowHeightClass = data.sizeOptions.selected === "large" ? "large" : "small";
            return model.form.rowHeightClass;
       }; 

       model.getPreferenceData = function(){
           var params={"screenName":"marketRent" };
           if(!model.isMarketRent()){
                params.screenName = "scheduleRent";
           }
           return  preferences.getPreferencesPromise(params);
       };

       model.savePrefernce = function(rowHeightClass){
            var filList=[],list;
            list = model.buildObjToPost("showReferenceData", model.form.showReferenceData);
            filList.push(list);
            list = model.buildObjToPost("showReferenceCalcData", model.form.showReferenceCalcData);
            filList.push(list);
            list = model.buildObjToPost("rowHeightClass", rowHeightClass);
            filList.push(list);
            preferences.savePreferences(filList);
       };

        model.buildObjToPost=function(field,value){
            return   {
		                "screen": model.isMarketRent() ? "marketRent" : "scheduleRent",
	                    "fieldType": field,
	                    "fieldValue": value
	                };
        };    

       model.isNewDataImported = function(reponse){
        var marketRentRecord = $filter('filter')(reponse.records, function (d) {
                        return model.isMarketRent() ? d.dataType === "Market rent" : d.dataType === "Schedule rent";
                    });
        var unitsRecord = $filter('filter')(reponse.records, function (d) {
                    return d.dataType === "Unit detail";
                });

        var unitTypeRecord = $filter('filter')(reponse.records, function (d) {
                    return d.dataType === "Unit type";
                }); 
        if(marketRentRecord.length > 0){
           var lastSavedDate = model.doGetDate(marketRentRecord[0].lastModifiedDate);
           var importedDate;
           if(unitTypeRecord.length > 0 && (bdgtRentalIncomeModelNav.isServiceGroup() || bdgtRentalIncomeModelNav.isProgram() || bdgtRentalIncomeModelNav.isStudentUnitType() || bdgtRentalIncomeModelNav.isUnitType() || bdgtRentalIncomeModelNav.isProforma())){
                importedDate = model.doGetDate(unitTypeRecord[0].lastModifiedDate);
            }
           else if(unitsRecord.length > 0 && (bdgtRentalIncomeModelNav.isStudentUnit() || bdgtRentalIncomeModelNav.isUnit())){
                importedDate = model.doGetDate(unitsRecord[0].lastModifiedDate);
            } 
          if(importedDate > lastSavedDate) {
            return true;
          } 
        }
        return false;
       }; 

      model.doGetDate = function(strDate) {
        var finalDate;
        var dateString = strDate;
        var dateParts = dateString.split(" ");
        var timeParts, timeStr;
        /*if (dateParts.length > 2) {
            timeParts = dateParts[2].split(':');
        }
        else {
            timeParts = dateParts[1].split(':');
        } */

        if(dateParts.length > 0){
            timeParts = dateParts[1].split(':');
        }
        
        if(dateParts.length > 2){
            timeStr = dateParts[2];
        }
        
       
        dateParts = dateParts[0].split('/');

        if (timeParts.length > 1 && dateParts.length > 2) {
            if (timeStr.indexOf("PM") > -1) {
                timeParts[0] = parseInt(timeParts[0], 10) + 12;
            }
            finalDate = new Date(dateParts[2], parseInt(dateParts[0], 10) - 1, dateParts[1], timeParts[0], timeParts[1]);
        }
        return finalDate;
       }; 
        
       model.setGridReady = function(val){
          model.form.gridReady = val;  
       };

       model.isGridReady = function(val){
          return model.form.gridReady; 
       }; 
  

       model.getMRText = function(){
         return model.isMarketRent() ? bdgtRentalIncomeModelNav.getMRText() : bdgtRentalIncomeModelNav.getSRText();
       };        

       model.getMRSubText = function(){
         return model.isMarketRent() ? bdgtRentalIncomeModelNav.getMRSubText() : bdgtRentalIncomeModelNav.getSRSubText();
       };         
 
       model.getKeyValue = function(key){
         return translate(key);
       }; 

       model.getUnitTypesPromise = function(){
            var params = {
                budgetModelID: bdgtRentalIncomeModelNav.getBudgetModelID(),
                propertyID: bdgtRentalIncomeModelNav.getPropertyID(),
            };
            return svc.getUnitTypes(params).$promise;
       }; 

       model.getUnitTypes = function(){
            return model.getUnitTypesPromise();
       }; 

       model.getMRRefernecData  = function(){
            var params = {
                distributedID: bdgtRentalIncomeModelNav.getDistID(),
                noOfPeriods: bdgtRentalIncomeModelNav.getNoOfPeriods()
            };
            if(model.isMarketRent()){
                return refSVC.getmarketRentReferenceDetails(params).$promise;
            }
            else{
                return refSVC.getScheduleRentReferenceDetails(params).$promise;
            }
       };

       model.saveMRData = function(data){
            var params = {
                distributedID: bdgtRentalIncomeModelNav.getDistID(),
                //updateAllMarketRent: model.form.latestRent
            };
            if(model.isMarketRent()){
                params.updateAllMarketRent =  model.form.latestRent;
            }
            else{
                params.updateAllScheduleRent = model.form.latestRent;
            }
            var postData = {};
            var detailsRecords = $filter('filter')(data.mrData, function (d) {
                        return model.isMarketRent() ? d.dataType !== "TotalMarketRent" : d.dataType !== "TotalScheduleRent";
                    });
            var TotalRecord = $filter('filter')(data.mrData, function (d) {
                        return model.isMarketRent() ? d.dataType === "TotalMarketRent" : d.dataType === "TotalScheduleRent";
                    });    
            postData = model.getMarketRentSaveData(detailsRecords,TotalRecord[0]);

            if(bdgtRentalIncomeModelNav.isProforma()){
                postData.deletedProformaUnitTypes = model.getProformaDataRecord(data.deletedProformaUnitTypes);
                postData.proformaUnitTypes = model.getProformaDataRecord(data.proformaUnitTypes);
            } 
            return svc.saveMRData(params, postData);
       };

       model.getStartDateArray = function(){
             var startDt = new Date();
             var startDates = [];
             startDt.setFullYear(bdgtRentalIncomeModelNav.getBudgetYear(), parseInt(bdgtRentalIncomeModelNav.getStartMonth()) - 1, 1);

            for (var period = 0; period < bdgtRentalIncomeModelNav.getNoOfPeriods(); period++) {
                startDates[period] = startDt.getDate() + "-" + model.form.monthNames[startDt.getMonth()] + "-" + startDt.getFullYear();
                startDt.setMonth(startDt.getMonth() + 1);
            }
            return startDates;
       }; 

      model.getProformaDataRecord = function(data){
            var postData = [];
            data.forEach(function (item) {
                      postData.push(model.getMRProformaTypesRecord(item));
            });
            return postData;
      };  

       model.getMarketRentSaveData = function(detailsRecords, TotalRecord){
             var postData = [];
             var totalRecords = [];
             var startDates = model.getStartDateArray();
             detailsRecords.forEach(function (item) {
                    for(var i = 1 ; i<= bdgtRentalIncomeModelNav.getNoOfPeriods() ; i++){
                        if(item.isUpdated === true){
                            postData.push(model.getMRTypeRecord(item,startDates[i-1], (model.form.periodSuf) + i));
                        }
                    }
            });
            for(var i = 1 ; i<= bdgtRentalIncomeModelNav.getNoOfPeriods() ; i++){
                totalRecords.push(model.getMRTotalRecord(TotalRecord,startDates[i-1], (model.form.periodSuf) + i));
            }
            if(bdgtRentalIncomeModelNav.isProgram()){
                var returnData = {};
                if(model.isMarketRent()){
                   returnData =  {marketRentProgram : [], programUnitCount : [], marketRentTotalData:totalRecords};
                   returnData.marketRentProgram = postData; 
                }
                else{
                    returnData =  {scheduleRentProgram : [], programUnitCount : [], scheduleRentTotalData:totalRecords};
                    returnData.scheduleRentProgram = postData; 
                }
                returnData.programUnitCount = model.getUnitCountData(detailsRecords,"program");
                return returnData;
            }
            else if(bdgtRentalIncomeModelNav.isServiceGroup()){
                var returnService = {};
                if(model.isMarketRent()){
                  returnService = {marketRentServiceGroup : [], serviceGroupUnitCount : [], marketRentTotalData:totalRecords};
                  returnService.marketRentServiceGroup = postData;
                }
                else{
                  returnService = {scheduleRentServiceGroup : [], serviceGroupUnitCount : [], scheduleRentTotalData:totalRecords};
                  returnService.scheduleRentServiceGroup = postData; 
                }
                returnService.serviceGroupUnitCount = model.getUnitCountData(detailsRecords,"service");
                return returnService;
            }
            var mrModelData = {};
            if(model.isMarketRent()){
               mrModelData =   {marketRentData :postData, marketRentTotalData:totalRecords };
            }
            else{
                mrModelData =   {scheduleRentData :postData, scheduleRentTotalData:totalRecords };
            }
            return mrModelData;
       };

       model.getMRTypeRecord = function(item, startDate, period){
            if(bdgtRentalIncomeModelNav.isUnit() || bdgtRentalIncomeModelNav.isStudentUnit()){
                return model.getMRUnitRecord(item, startDate, period);
            }
            else if(bdgtRentalIncomeModelNav.isUnitType()){
                return model.getMRUnitTypeRecord(item, startDate, period);
            }
            else if(bdgtRentalIncomeModelNav.isProgram()){
                return model.getMRProgramRecord(item, startDate, period);
            }
            else if(bdgtRentalIncomeModelNav.isServiceGroup()){
                return model.getMRServiceRecord(item, startDate, period);
            }
            else if(bdgtRentalIncomeModelNav.isStudentUnitType()){
                return model.getMRStudentUnitTypeRecord(item, startDate, period);
            }
            else if(bdgtRentalIncomeModelNav.isProforma()){
                return model.getMRProformaRecord(item, startDate, period);
            }
       }; 

       model.getUnitCountData = function(detailsRecords, type){
            var finalData = [];
            detailsRecords.forEach(function (item) {
                        if(item.rowType !== 'groupHeader'){
                            finalData.push(model.getMRUnitCntRecord(item, type));
                        }
            });
            return finalData;
       }; 

       model.getMRUnitCntRecord = function(item, type){
            var newRecord = {};
            newRecord.distributedID = bdgtRentalIncomeModelNav.getDistID();
            newRecord.propertyID = bdgtRentalIncomeModelNav.getPropertyID();
            newRecord.unitTypeID = item.unitTypeID;
            if(type === "program"){
                newRecord.programID = item.programID;
                newRecord.unitCount = item.programUnitCount;
            }
            else{
                newRecord.serviceGroupID = item.serviceGroupID;
                newRecord.unitCount = parseInt(item.serviceUnitCount);
            }
            
            return newRecord;
       };         

       model.getMRUnitRecord = function(item, startDate, period){
            var newRecord = {};
            newRecord.distributedID = bdgtRentalIncomeModelNav.getDistID();
            newRecord.propertyID = bdgtRentalIncomeModelNav.getPropertyID();
            newRecord.unitID = item.unitID;
            newRecord.startDate = startDate;
            newRecord.dataType = bdgtRentalIncomeModelNav.isUnit() ? (model.isMarketRent() ? "MarketRentByUnit" : "ScheduleRentByUnit") : (model.isMarketRent() ? "MarketRentByUnitStudent" : "ScheduleRentByUnitStudent");    
            newRecord.dataValue = item[period];
            return newRecord;
       };

        model.getMRUnitTypeRecord = function(item, startDate, period){
            var newRecord = {};
            newRecord.distributedID = bdgtRentalIncomeModelNav.getDistID();
            newRecord.propertyID = bdgtRentalIncomeModelNav.getPropertyID();
            newRecord.unitTypeID = item.unitTypeID;
            newRecord.startDate = startDate;
            newRecord.dataType = model.isMarketRent() ? "MarketRentByUnitType" : "ScheduleRentByUnitType";    
            newRecord.dataValue = item[period];
            return newRecord;
       };

        model.getMRProformaRecord = function(item, startDate, period){
            var newRecord = {};
            newRecord.distributedID = bdgtRentalIncomeModelNav.getDistID();
            newRecord.propertyID = bdgtRentalIncomeModelNav.getPropertyID();
            newRecord.unitTypeID = item.unitTypeID;
            newRecord.proformaUnitTypeID = item.proformaUnitTypeID;
            newRecord.isProformaUnitType = item.isProformaUnitType;
            newRecord.name = item.name; 
            newRecord.startDate = startDate;
            newRecord.dataType = model.isMarketRent() ? "MarketRentByUnitType" : "ScheduleRentByUnitType";    
            newRecord.dataValue = item[period];
            return newRecord;
       };


       model.getMRStudentUnitTypeRecord = function(item, startDate, period){
            var newRecord = {};
            newRecord.distributedID = bdgtRentalIncomeModelNav.getDistID();
            newRecord.propertyID = bdgtRentalIncomeModelNav.getPropertyID();
            newRecord.unitTypeID = item.unitTypeID;
            newRecord.roomNumber = item.roomNumber;
            newRecord.startDate = startDate;
            newRecord.dataType = model.isMarketRent() ? "MarketRentByUnitTypeStudent" : "ScheduleRentByUnitTypeStudent";    
            newRecord.dataValue = item[period];
            return newRecord;
       };   

        model.getMRProgramRecord = function(item, startDate, period){
            var newRecord = {};
            newRecord.distributedID = bdgtRentalIncomeModelNav.getDistID();
            newRecord.propertyID = bdgtRentalIncomeModelNav.getPropertyID();
            newRecord.unitTypeID = item.unitTypeID;
            newRecord.programID = item.programID;
            newRecord.startDate = startDate;
            newRecord.dataType = model.isMarketRent() ? "MarketRentByProgram" : "ScheduleRentByProgram";    
            newRecord.dataValue = item[period];
            return newRecord;
       };

        model.getMRServiceRecord = function(item, startDate, period){
            var newRecord = {};
            newRecord.distributedID = bdgtRentalIncomeModelNav.getDistID();
            newRecord.propertyID = bdgtRentalIncomeModelNav.getPropertyID();
            newRecord.unitTypeID = item.unitTypeID;
            newRecord.serviceGroupID = item.serviceGroupID;
            newRecord.startDate = startDate;
            newRecord.dataType = model.isMarketRent() ? "MarketRentByServiceGroup" : "ScheduleRentByServiceGroup";    
            newRecord.dataValue = item[period];
            return newRecord;
       };

       model.getMRTotalRecord = function(item, startDate, period){
            var newRecord = {};
            newRecord.distributedID = bdgtRentalIncomeModelNav.getDistID();
            newRecord.propertyID = bdgtRentalIncomeModelNav.getPropertyID();
            newRecord.startDate = startDate;
            newRecord.dataType = model.isMarketRent() ? "TotalMarketRent" : "TotalScheduleRent";    
            newRecord.dataValue = item[period];
            return newRecord;
       }; 

       model.getMRProformaTypesRecord = function(item, startDate, period){
            var newRecord = {};
            newRecord.distributedID = bdgtRentalIncomeModelNav.getDistID();
            newRecord.proformaUnitTypeID = item.proformaUnitTypeID;
            newRecord.name = item.name;
            newRecord.unitCount = item.unitCount;   
            return newRecord;
       }; 

       model.isProforma = function(){
                return bdgtRentalIncomeModelNav.isProforma();
       };

       return model;    
        //return model.init();
    }

    angular
          .module('budgeting')
          .factory('MarketRentModel', ['BdgtRentalIncomeModelNav','MarketRentSvc', 'appLangTranslate', 'MarketRentRefSvc', '$filter', '$stateParams', 'preferences', 'actualRentCapSvc', 'actualRentCapModel', factory]);
})(angular);

