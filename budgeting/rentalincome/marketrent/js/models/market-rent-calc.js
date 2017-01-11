//  SampleCg Model

(function (angular) {
    'use strict';

    function factory($filter, baseModel, eventStream, sumCalModel, mrModel, langTranslate, capValidation, changeRent, changeRentMR, detailCalc) {
        var model = {}, grpBalUnitCount = 0;
        var translate;
        translate = langTranslate('market-rent').translate;
        model.emptyData = {
            isReady: false,
            keyVal: "",
            periodSuf : "period",
            dtRent : [],
            dtRentCopy : [],
            dtRentRef : [],
            dtRentdtls : [],
            edGrid : [],
            grpBalUnitCount : 0,
            rowTitleUnitCalculation : '',
            periodModel:{},
            dataType: "",
            isUnitType: false,
            isInitalLoad:false,
            oldMrktRnt:[],
            newMrktRnt:[],
            olPeriodValue:0,
            currrentGrp:0,
            isTotalUpdate:false,
            deletedProforma:[],
            capMethod: "None",
            capValue:{},
            actualRentCapData:[],
            marketRentCapData:[],
            isCapDataReady: false,
            capCalledFrom: "init",
            responseData:{},
            curRow:{},
            unitTypeList:{}
        };
        model.form = {};

        model.init = function () {
            angular.extend(model.form, model.emptyData);
            model.form.periodModel = {
                noOfPeriods: baseModel.getNoOfPeriods(),
                months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                year: baseModel.getBudgetYear(),
                startMonth: baseModel.getStartMonth()    
            };
            //return model;
        };

        model.isCapReady = function(){
            return model.form.isCapDataReady;
        };

        model.isReasponseReady = function(){
            return model.form.reasponseReady;
        };

        model.setReasponseReady = function(val){
            model.form.reasponseReady = val;
        };

        model.setUnitTypeList = function(resp){
            resp.records.forEach(function (item) {
                item.description = item.name + " - " + item.description;
            });
            model.form.unitTypeList = resp.records;
        };

         model.getChangeRentParam = function(){
             var calculatorState = {};
             calculatorState.startMonth = baseModel.getStartMonth();
             calculatorState.startYear = baseModel.getBudgetYear();
             calculatorState.noOfPeriods = baseModel.getNoOfPeriods();
             calculatorState.display =  false;
             calculatorState.gridReady =  false;
             calculatorState.activePeriod =  model.form.curRow;
             calculatorState.rentText = baseModel.isMarketRent() ? baseModel.getMRText() : baseModel.getSRText();   
             calculatorState.isMarketRent = baseModel.isMarketRent();   
             calculatorState.rentMethod = baseModel.isMarketRent() ? baseModel.getIncomeModel() : baseModel.getScheduleRentMethod();  
             calculatorState.assetType = baseModel.getAssetType();
             calculatorState.rentData = model.form.dtRentdtls;
             var dropDownData = capValidation.addUnitListData(model.form.dtRentdtls, calculatorState.rentMethod, baseModel.getAssetType(), model.form.unitTypeList); 
             calculatorState.dropDownData = dropDownData;
             return calculatorState;
        };

         model.getActualRentCap = function(){
             return {
                    capMethod: model.form.capMethod,
                    capValue: model.form.capValue
                };
        };

        model.getRentMethod = function(){
            return baseModel.isMarketRent() ? baseModel.getIncomeModel() : baseModel.getScheduleRentMethod();
        };

        model.getResponseData = function(){
              return model.form.responseData ; 
        };

        model.setResponseData = function(val){
              model.form.responseData  = val;
        };

       model.setCalledFrom = function(val){
            model.form.capCalledFrom = val;
       }; 

        model.setActualRentModelCap = function(actualRentCap){
            model.form.capMethod = actualRentCap.capMethod;
            model.form.capValue = actualRentCap.capValue;
            if(model.form.capMethod !== undefined && model.form.capMethod !== null && model.form.capMethod !== "None"){
                model.setCalledFrom("popUp");
                model.applyActualRentCap();
            }
        };

        model.assignCapMethod = function(response){
            if(response.records.actualRentCapData !== null && response.records.actualRentCapData !== undefined){
                    model.form.capMethod =  response.records.actualRentCapData.monthlyCapType;
                    model.form.actualRentCapID =  response.records.actualRentCapData.actualRentCapID;
                    model.setCapValue(response);
            }
            else{
                model.form.capMethod =  "None";
                model.form.actualRentCapID = 0;
            }
       };

       model.isCapMarketRent = function(){
            return (model.form.capMethod.toLowerCase() === "market rent" &&  baseModel.getIncomeModel() === baseModel.getScheduleRentMethod());
       }; 

        model.isCapAvgMarketRent = function(){
            return ((model.form.capMethod.toLowerCase() === "market rent") &&  (baseModel.getIncomeModel() !== baseModel.getScheduleRentMethod()));
       }; 

       model.setCapValue = function(response){
            if(model.form.capMethod.toLowerCase() === "set value"){
                 model.setValueCapMethod(response);
            }
      };

       model.getMarketRentURL = function(){
            var url = baseModel.getURL();
            baseModel.setFloorPlan("all");
            url = url.replace(/ScheduleRent/g,"MarketRent");
            return url;
        }; 

      model.getMarketRentParams = function(){
             var params = {
                    distID: baseModel.getDistID(),
                    noOfPeriods: baseModel.getNoOfPeriods(),
                    islatestrent:  false
            };
            return params;
        };    

      model.getMarketRentDataForCap = function(){
            mrModel.getMarketRentDataForCap(model.getMarketRentURL(),  model.getMarketRentParams()).then(model.setMRValueCapMethod);
      };

      model.getAvgMRValue = function(){
            mrModel.getAvgMRCap().then(model.setAvgMRValueCapMethod);
       };     

       model.setValueCapMethod = function(response){
            model.form.capValue = response.records.actualRentCapValueData;   
        };

       model.setMRValueCapMethod = function(response){
           model.form.marketRentCapData = capValidation.getMRData(baseModel.getIncomeModel(), baseModel.getAssetType(), baseModel.getBudgetType(), response); 
        }; 

       model.setAvgMRValueCapMethod = function(response){
            model.form.actualRentCapData = response.data.records.mrCap;
        }; 
 
      
      model.setActualRentCap = function(capData){
            var returnData = capValidation.validateCapAmount(baseModel.getAssetType(), model.form.capMethod, baseModel.getIncomeModel(), baseModel.getScheduleRentMethod(), model.form.dtRentdtls, capData, model.form.periodModel.noOfPeriods);
            model.form.dtRentdtls = returnData;
            if(model.form.capCalledFrom === "popUp"){
               model.updateTotalData(true);
            }
      };

      model.updateTotalData = function(applyCap){
             var resultData;   
             if(model.form.dataType === "MarketRentByUnit" || model.form.dataType === "MarketRentByStudentUnit" || model.form.dataType === "ScheduleRentByUnit" || model.form.dataType === "ScheduleRentByStudentUnit"){
                    sumCalModel.updateStudentUnitTypeGroupHeaderData(model.form.dtRentdtls, model.form.periodModel.noOfPeriods, model.form.periodSuf, "unit");
                    model.getSummaryTotal(model.form.dtRent);
                }
                else {
                   resultData = sumCalModel.getSummaryData(model.form.dtRentdtls, model.form.periodModel.noOfPeriods, model.form.periodSuf, model.form.dataType, applyCap);
                   model.copyPeriodData(resultData); 
               }
                model.getPriorCalculations();
                model.getReferenceChangeCalc();

      };    

      model.copyPeriodData = function(resultData){
              for (var i = 1; i <= model.form.periodModel.noOfPeriods; i++) {
                model.form.dtRent[0][model.form.periodSuf + i] = resultData[0][model.form.periodSuf + i];
              }
              model.form.dtRent[0]["total"]  = resultData[0]["total"];
      };   

        model.applyActualRentCap = function(calledFrom){
            var capData = {};
            if(model.form.capMethod === "Set value"){
                capData = model.form.capValue;
                model.setActualRentCap(capData);
            }
            else if(baseModel.getIncomeModel() !== baseModel.getScheduleRentMethod() && model.form.capMethod.toLowerCase() === "market rent"){
                //capData = model.form.actualRentCapData;
                model.checkAvgMRValue();
            }
            else if(model.form.capMethod.toLowerCase() === "market rent") {
                 model.checkMRValue();
                //capData = model.form.marketRentCapData;
            }
        };

        model.checkAvgMRValue = function(){
            if(model.form.actualRentCapData.length > 0 ){
                //capData = model.form.actualRentCapData;
                model.setActualRentCap(model.form.actualRentCapData);
            }
            else{
                 mrModel.getAvgMRCap().then(model.setAvgMRData);
            }
        };

        model.setAvgMRData = function(response){
              model.setActualRentCap(model.form.actualRentCapData);  
        };

        model.setMRValueCapData = function(response){
             model.form.marketRentCapData = capValidation.getMRData(baseModel.getIncomeModel(), baseModel.getAssetType(), baseModel.getBudgetType(), response); 
             model.setActualRentCap(model.form.marketRentCapData);
        };

        model.checkMRValue = function(){
             if(model.form.marketRentCapData.length > 0 ){
                model.setActualRentCap(model.form.marketRentCapData);
            }
            else{
                mrModel.getMarketRentDataForCap(model.getMarketRentURL(), model.getMarketRentParams()).then(model.setMRValueCapData);
            }
        };

        model.getPeriodModel = function(){
            return model.form.periodModel;
        };

        model.setInitalLoad = function(val){
           model.form.isInitalLoad = val; 
        };

        model.isDataValid = function(){
            var inValidRecords = $filter('filter')(model.form.dtRentdtls, function (d) {
                                    return d.dataValid === false;
                                   });
           if(inValidRecords.length > 0){
                return false;
           }
           else{
               return true; 
           }  
        };

        model.getSaveData = function(){
            var returnPostData = detailCalc.getSaveData(model.form);
            return returnPostData;
        };

       model.isDataModified = function(){
             var modifiedRecords = $filter('filter')(model.form.dtRentdtls, function (d) {
                                    return d.isUpdated === true;
                                   });
            if(modifiedRecords.length > 0){
                return true;
            }
            else{
                return false;
            }
       }; 

       model.resetPostData = function(){
            var modifiedRecords = $filter('filter')(model.form.dtRentdtls, function (d) {
                                    return d.isUpdated === true;
                                   });
            modifiedRecords.forEach(function (item) {
                item.isUpdated = false;
            });
            model.form.deletedProforma = [];
       };

        model.getInitalLoad = function(){
           return model.form.isInitalLoad;
        };

        model.getDetailData = function(){
            return model.form.dtRentdtls;
        };

        model.getSummaryData = function(){
            return model.form.dtRent;
        };

        model.isTotalUpdate = function(){
            return model.form.isTotalUpdate;
        };

        model.setIsTotalUpdate = function(){
            model.form.isTotalUpdate = true;
        };

        model.events = {
                update: eventStream(),
                capData: eventStream()
            };

        model.update = function (data) {
            model.events.update.publish(data);
        };

        model.capData = function (data) {
            model.events.capData.publish(data);
        }; 

       model.resetEvents = function () {
           model.events.update.reset();
           model.events.capData.reset(); 
        }; 

        model.subscribe = function (eventName, callback) {
            if (model.events[eventName]) {
                return model.events[eventName].subscribe(callback);
            }
            else {
                logc("Market rent calc model " + eventName + " is not a valid event name");
            }
        };

       model.reset = function(){
            angular.extend(model.form,model.emptyData); 
       };  

    
        model.assignDetailData = function(response){
            var incomemodel = baseModel.isMarketRent() ? baseModel.getIncomeModel() : baseModel.getScheduleRentMethod();
            if(baseModel.getBudgetType().toLowerCase() === "proforma" && incomemodel.toLowerCase() === "unit type"){
                model.form.dtRentdtls = response.data.records.unitTypeData;
                model.form.dataType = baseModel.isMarketRent() ? "MarketRentByUnitType" : "ScheduleRentByUnitType";
                model.updateIsReady(true);
                model.update(true);
                return; 
            }
            model.form = detailCalc.assignDetailData(model.form, incomemodel, response);
            model.updateIsReady(true);
            model.update(true);
        };

        model.updateIsReady = function(val){
            model.form.isReady = val;
        }; 

        model.isReady = function(){
            return model.form.isReady;
        };

        model.showMRData = function(response){
            var resultData = "";
            model.assignDetailData(response);
            model.setCalledFrom("init");
            model.applyActualRentCap();
            var applyCap = model.form.capMethod.toLowerCase() !== "none" ? true : false;
            var keys = [];
            for (var i = 0; i < 2; i++) {
                keys[i] = Object.keys(response.data.records)[i];
            }
            model.form.dtRentCopy = model.copyObj(response.data.records[keys[1]]);
            if(model.form.dataType === "MarketRentByUnit" || model.form.dataType === "MarketRentByStudentUnit" || model.form.dataType === "ScheduleRentByUnit" || model.form.dataType === "ScheduleRentByStudentUnit"){
                if(applyCap){
                    sumCalModel.updateStudentUnitTypeGroupHeaderData(model.form.dtRentdtls, model.form.periodModel.noOfPeriods, model.form.periodSuf, "unit");
                }
                model.getSummaryTotal(response.data.records[keys[1]]);
                resultData = model.addRentSummaryRows(response.data.records[keys[1]]);
            }
            else {
               resultData = sumCalModel.getSummaryData(model.form.dtRentdtls,model.form.periodModel.noOfPeriods,model.form.periodSuf, model.form.dataType, applyCap);
               model.addRentSummaryRows(resultData);  
            }
            return resultData;
        };

       model.addMRRefData = function(response){
           return model.addDataToSummary(model.addRentReferenceRows(response.records)); 
       }; 

       model.addExstRefData = function(){
            return model.addDataToSummary(model.form.dtRentRef); 
       };   

       model.addDataToSummary = function(data){
            data.forEach(function (item) {
                model.form.dtRent.push(item);
            });
            return model.form.dtRent;
       }; 

        model.addRentSummaryRows = function (data) {
            data[0].rowTitle = baseModel.isMarketRent() ? baseModel.getMRText() : baseModel.getSRText();
            model.form.dtRent = data;
            if(model.form.dataType === "MarketRentByStudentUnit" || model.form.dataType === "ScheduleRentByStudentUnit"){
                var records = $filter('filter')(model.form.dtRentdtls, function (d) {
                                        return d.rowType === 'groupHeader';
                                  });
                model.form.dtRent[0].units = records.length + "/" + baseModel.getUnitCount();
            }
            else if(model.form.dataType === "MarketRentByStudentUnitType" || model.form.dataType === "ScheduleRentByStudentUnitType"){
                model.form.dtRent[0].units = model.getStudentUnitTypeCount();
            }
            else{
               model.form.dtRent[0].units = baseModel.getUnitCount();
            }
            var pdc = model.prepareRowObj(model.copyObj(data[0]),  translate('bdgt_rental_mr_prior_change_text'), "pdc");
            var ppc = model.prepareRowObj(model.copyObj(data[0]), translate('bdgt_rental_mr_prior_per_text'), "ppc");    
            data.splice(1, 0, pdc, ppc);
            model.getPriorCalculations();
            return data;
        };

        model.getStudentUnitTypeCount = function(){
             var records = $filter('filter')(model.form.dtRentdtls, function (d) {
                                        return d.rowType === 'groupHeader';
                                  });
             var cnt = 0;
             records.forEach(function (item) {
                cnt += parseInt(item.bedCount);
            });
            return cnt;
        };

        model.addRentReferenceRows = function (data) {
            var dupData = [];
            dupData = detailCalc.addRentReferenceRows(data, translate('bdgt_rental_mr_dollor_change_text'), translate('bdgt_rental_mr_dollor_per_text'), model.form.periodModel.noOfPeriods);
            model.form.dtRentRef = dupData;
            model.getReferenceChangeCalc(); 
            return model.form.dtRentRef;
        };
        
       
        model.copyObj = function (obj) {
            return angular.copy(obj);
        };

        model.prepareRowObj = function (rowObj, title, recType) {
           return detailCalc.prepareRowObj(rowObj, title, recType, model.form.periodModel.noOfPeriods);
        };

        model.getSummaryTotal = function(data){
          data = detailCalc.getSummaryTotal(data, model.form);
        };

        model.getKeyValue = function (val) {
            model.form.keyVal = val;
        };

        model.copyToAdj = function(column){
            var currentPeriodNo = model.form.keyVal.replace(model.form.periodSuf,"");
            model.resetMrktRnt(); 
            var changedRow = column.row.data;
            changedRow.isUpdated = true;
            model.copyMRPeriodData(changedRow, parseInt(currentPeriodNo, 10));
            var record = model.getCapRecord(changedRow.unitID, changedRow.unitTypeID);
            var currAmount = changedRow[model.form.keyVal];
            changedRow[model.form.keyVal] = model.getCapAmount(record, currentPeriodNo, currAmount, changedRow);
            var capAmount;
            for (var i = parseInt(currentPeriodNo); i <= model.form.periodModel.noOfPeriods; i++) {
                        capAmount = model.getCapAmount(record, i, currAmount, changedRow);
                        changedRow[model.form.periodSuf + i] = capAmount;
                        model.form.newMrktRnt[i] = changedRow[model.form.periodSuf + i];
                }
        };

        model.getCapAmount = function(record, periodNo, currAmount, changedRow){
            var returnAmount = currAmount, capAmount;
            returnAmount = detailCalc.getCapAmount(record, periodNo, currAmount, changedRow, model.form.periodSuf, model.form.capMethod);
            return returnAmount;
            //record 
        };

        model.getCapRecord = function(unitID,unitTypeID){
           var capData = {};
           var record = detailCalc.getCapRecord(unitID, unitTypeID, model.form);
           return record; 
        };

        model.copyMRPeriodData = function(changedRow, currentPeriodNo){
            for (var i = 1; i <= model.form.periodModel.noOfPeriods; i++) {
                       if(i === currentPeriodNo){
                        model.form.oldMrktRnt[i] = model.form.olPeriodValue;
                       }
                       else{  
                        model.form.oldMrktRnt[i] = changedRow[model.form.periodSuf + i];
                       } 
                       if(i < currentPeriodNo){
                         model.form.newMrktRnt[i] = changedRow[model.form.periodSuf + i];
                       } 
            }
        };

       model.setCurrentPeriodValue = function(key, column){
            var CurRow = column.row.data;
            model.form.curRow = angular.copy(column.row.data);
            model.form.olPeriodValue = parseInt(CurRow[key], 10);
       }; 

       model.setCurrentCntValue = function(key, column, type){
            var CurRow = column.row.data;
            model.form.currrentGrp = type === "program" ? CurRow.programID : CurRow.serviceGroupID;
       };  
       

        model.resetMrktRnt = function(){
            model.form.oldMrktRnt = [];
            model.form.newMrktRnt = [];
        };

        model.getTotals = function (data, column) {
            var total = 0, sumTot = 0;
            var changedRow = column.row.data;
            if(changedRow[model.form.keyVal] === ""){
                changedRow[model.form.keyVal] = 0;
            }
            changedRow[model.form.keyVal] = detailCalc.roundNumber(changedRow[model.form.keyVal], 0);
            if(model.form.dataType === "MarketRentByUnit" || model.form.dataType === "MarketRentByStudentUnit" || model.form.dataType === "ScheduleRentByUnit" || model.form.dataType === "ScheduleRentByStudentUnit"){
                model.copyToAdj(column);
                model.updateGroupTotal(data, column);
                model.updateRowTotal(column, model.form.oldMrktRnt, model.form.newMrktRnt);
            }
            else{
                sumCalModel.updateMRTotal(data, column, model.form.olPeriodValue, model.form.keyVal, model.form.dataType, model.form.periodSuf, model.form.periodModel.noOfPeriods, model.form.capMethod, model.form.capValue, model.form.actualRentCapData, model.form.marketRentCapData);
                //model.updateRowTotal(column, sumCalModel.getOldMrktRnt(), sumCalModel.getNewMrktRnt());
                model.updateGrandTotal(column, data);
            }
           
            model.getPriorCalculations();
            model.getReferenceChangeCalc();
           
        };

        model.updateGroupTotal = function(data, column){
            var changedRow = column.row.data;
            if (model.form.dataType === "MarketRentByStudentUnit" || model.form.dataType === "ScheduleRentByStudentUnit"){
               var groupRecords = $filter('filter')(data, function (d) {
                                        return parseInt(d.apartmentID) === parseInt(changedRow.apartmentID);
                                  });
                sumCalModel.updateStudentGroupHeaderData(groupRecords, model.form.periodModel.noOfPeriods,  model.form.periodSuf);
            }
        };

        model.updateGrandTotal = function(column, data){
            if(model.form.dataType === "MarketRentByStudentUnitType" || model.form.dataType === "ScheduleRentByStudentUnitType"){
                sumCalModel.updateStudentUnitTypeTotal(model.form.dtRent, data, model.form.periodSuf, model.form.periodModel.noOfPeriods);
            }
            else{
                model.updateRowTotal(column, sumCalModel.getOldMrktRnt(), sumCalModel.getNewMrktRnt());
            }
        };

        model.updateRowTotal = function (column, oldMrktRnt, newMrktRnt) {
            var rowTotal = column.row.data;
            rowTotal.total = 0;
            var sumTotal = 0;
            for (var i = 1; i <= model.form.periodModel.noOfPeriods; i++) {
                rowTotal.total += parseInt(rowTotal[model.form.periodSuf + i], 10);
                model.form.dtRent[0][model.form.periodSuf + i] = model.form.dtRent[0][model.form.periodSuf + i] - parseInt(oldMrktRnt[i]) + parseInt(newMrktRnt[i]);
                sumTotal +=  model.form.dtRent[0][model.form.periodSuf + i];
            }
            model.form.dtRent[0]["total"] = sumTotal;
        };

        model.getPriorCalculations = function () {
            model.form = detailCalc.getPriorCalculations(model.form);
        };

      
        model.getReferenceChangeCalc = function () {
            model.form = detailCalc.getReferenceChangeCalc(model.form);
        };
    
        model.getNonGrpUnitCount = function(){
            return sumCalModel.getNonGrpUnitCount(model.form.dtRentdtls, model.form.dataType);
        };

      model.getGroupUnitBalance = function (item, data) {
            sumCalModel.getGroupUnitBalance(item, data, model.form.dataType, model.form.currrentGrp, model.form.periodModel.noOfPeriods, model.form.periodSuf);
      };

      model.addNewUnitType = function(){
            sumCalModel.addNewUnitType(model.form.dtRentdtls);
      };

      model.validateDescr = function(column){
           sumCalModel.validateDescr(model.form.dtRentdtls, column);
      };  

      model.removeUnitType = function(column){
            sumCalModel.removeUnitType(model.form.dtRentdtls, column, model.form.deletedProforma);
      };

      model.updateUnitCount = function(){
            if(baseModel.isProforma()) {
                sumCalModel.updateUnitCount(model.form.dtRentdtls, model.form.dtRent[0]);
                model.setIsTotalUpdate(true);
            }
      };   

     model.updateUnitTypeSummaryData = function(){
        var totalRow = sumCalModel.getUnitTypeSummaryData(model.form.dtRentdtls,model.form.periodModel.noOfPeriods, model.form.periodSuf);
          for (var i = 1; i <= model.form.periodModel.noOfPeriods; i++) {
             model.form.dtRent[0][model.form.periodSuf + i] = totalRow[0][model.form.periodSuf + i];
          }
        model.form.dtRent[0]["total"] = totalRow[0]["total"];
        model.getPriorCalculations();
        model.getReferenceChangeCalc();
     };
     
    model.updateCommentCount = function(record, commentCount){
        sumCalModel.updateCommentCount(model.form.dtRentdtls,record, commentCount, model.form.dataType);
    };

    model.applyChangeRent = function(rentSettings){
     if(rentSettings.selectedMethod.method !== "applyMR"){   
            changeRent.applyChangeRent(rentSettings, model.form.dtRentdtls, baseModel.isMarketRent(), model.getRentMethod(), baseModel.getAssetType() , model.form.periodModel.noOfPeriods);
            model.applyCRTotal();
      }
      else{
           model.applyMRChange(rentSettings); 
       }     
    };

    model.applyCRTotal = function(){
        if(!baseModel.isMarketRent() && model.form.capMethod !== undefined && model.form.capMethod !== null && model.form.capMethod !== "None"){
            model.setCalledFrom("popUp");
            model.applyActualRentCap();
        }
        else{
            model.updateTotalData(false);
        } 
    }; 

    model.applyMRChange = function(rentSettings){
        var records = changeRent.getFilterRecords(model.form.dtRentdtls,  model.getRentMethod(), baseModel.getAssetType(), rentSettings.selectedMethod.unitTypeID, rentSettings.selectedMethod.unitID);
        if(baseModel.getIncomeModel().toLowerCase() === "None"){
           changeRentMR.applyMRNone(records, rentSettings, model.form.periodModel.noOfPeriods);
           model.applyCRTotal();
        }
        else if(baseModel.getIncomeModel() !== baseModel.getScheduleRentMethod()){
                model.rentSettings = rentSettings;
                mrModel.getAvgMRCap().then(model.setAvgMRCalc); 
        }
        else{
               model.rentSettings = rentSettings; 
               mrModel.getMarketRentDataForCap(model.getMarketRentURL(), model.getMarketRentParams()).then(model.setMRDataVal);  
        }
    };

    model.setAvgMRCalc = function(response){
        var rentSettings = model.rentSettings;
        var records = changeRent.getFilterRecords(model.form.dtRentdtls,  model.getRentMethod(), baseModel.getAssetType(), rentSettings.selectedMethod.unitTypeID, rentSettings.selectedMethod.unitID);
        changeRentMR.applyAvgMR(records, response.data.records.mrCap, rentSettings, model.form.periodModel.noOfPeriods, "unitTypeID");
        model.applyCRTotal();
        model.rentSettings = undefined;
    };

    model.setMRDataVal = function(response){
        var rentSettings = model.rentSettings;
        var records = changeRent.getFilterRecords(model.form.dtRentdtls,  model.getRentMethod(), baseModel.getAssetType(), rentSettings.selectedMethod.unitTypeID, rentSettings.selectedMethod.unitID);
        var responseData = capValidation.getMRData(baseModel.getIncomeModel(), baseModel.getAssetType(), baseModel.getBudgetType(), response);
        changeRentMR.applyAvgMR(records, responseData, rentSettings, model.form.periodModel.noOfPeriods, "unitID");
        model.applyCRTotal();
        model.rentSettings = undefined;
    };     
        return model;
    }

    angular
          .module('budgeting')
          .factory('MarketRentCalculationModel', ['$filter', 'BdgtRentalIncomeModelNav', 'eventStream', 'MarketRentSummaryCalcModel', 'MarketRentModel', 'appLangTranslate', 'ActaulRentCapValidation', 'ChangeRent', 'ChangeRentMR', 'MarketRentDetailCalculationModel', factory]);
})(angular);
