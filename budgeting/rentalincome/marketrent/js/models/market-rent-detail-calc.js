//  SampleCg Model

(function (angular) {
    'use strict';

    function factory($filter, baseModel, sumCalModel, langTranslate) {
        var model = {}; 
        model.form = {};
        var translate;
        translate = langTranslate('market-rent').translate;

        model.roundNumber = function(number, places) {
                if (isNaN(number)) {
                    return 0;
                }
                if (Number.POSITIVE_INFINITY == number || Number.NEGATIVE_INFINITY == number) {
                    return 0;
                }
                if (places === null || places === undefined ) {
                    places = 0;
                }
                var value = Math.round(number * Math.pow(10, places)) / Math.pow(10, places);

                return value;
        };
          
         model.getPriorCalculations = function (form) {
            model.form = form;
            var totalRow = model.form.dtRent[0];
            var ft = 0, st = 0, ftTotal = 0, stTotal = 0;
            if (totalRow && model.form.dtRent[1] && model.form.dtRent[2]) {
                for (var i = 1; i <= model.form.periodModel.noOfPeriods; i++) {
                    if (i == 1) {
                        model.form.dtRent[1][model.form.periodSuf + i] = "";
                        model.form.dtRent[2][model.form.periodSuf + i] = "";
                    }
                    else {
                        ft = parseInt(totalRow[model.form.periodSuf + i]);
                        st = parseInt(totalRow[model.form.periodSuf + (i - 1)]);
                        model.form.dtRent[1][model.form.periodSuf + i] = (ft - st);//"$" + (ft - st);
                        model.form.dtRent[2][model.form.periodSuf + i] = st !== 0 ? model.roundNumber((((ft - st) / st) * 100),1) + "%" : "0%";
                        ftTotal +=  parseInt((ft - st));
                        stTotal +=  st !== 0 ? parseFloat((((ft - st) / st) * 100).toFixed(1)) : 0;
                    }
                }
                model.form.dtRent[1]["total"] = ftTotal;
                model.form.dtRent[2]["total"] = model.roundNumber(parseFloat(stTotal),1) + "%";
            }
            return model.form;
        };

      
        model.getReferenceChangeCalc = function (form) {
            model.form = form;
            var totalRow = model.form.dtRent[0], rentrefLen = model.form.dtRentRef.length;
            var ft = 0, st = 0, refTotal = 0;
            var mrTotal = model.form.dtRent[0]["total"];
            for (var k = 0; k < rentrefLen; k++) {
                if (model.form.dtRentRef[k] && model.form.dtRentRef[k].recordType == "referenceData") {
                    model.form.dtRentRef[k + 1]["total"] = 0;
                    model.form.dtRentRef[k + 2]["total"] = 0;
                    for (var i = 1; i <= model.form.periodModel.noOfPeriods; i++) {
                        ft = parseInt(totalRow[model.form.periodSuf + i]);
                        st = parseInt(model.form.dtRentRef[k][model.form.periodSuf + i]);
                        model.form.dtRentRef[k + 1][model.form.periodSuf + i] = ft - st;
                        model.form.dtRentRef[k + 2][model.form.periodSuf + i] = st !== 0 ? model.roundNumber(((((ft - st) / st) * 100)),1) + "%" : "0%";
                        model.form.dtRentRef[k + 1]["total"] +=  parseInt((ft - st));
                        //model.form.dtRentRef[k + 2]["total"] +=  st !== 0 ? parseFloat((((ft - st) / st) * 100).toFixed(0)) : 0;
                    }
                    refTotal = model.form.dtRentRef[k]["total"];
                    model.form.dtRentRef[k + 2]["total"] =  refTotal !== 0 ?  model.roundNumber((((mrTotal - refTotal) / refTotal) * 100),1): 0;
                    model.form.dtRentRef[k + 2]["total"] = model.form.dtRentRef[k + 2]["total"] + "%";
                }
            }
            return model.form;
        };

         model.getCapRecord = function(unitID, unitTypeID, form){
           model.form = form; 
           var capData = {};
           var record;
           if(model.form.capMethod === "Set value"){
                capData = model.form.capValue;
                record =  $filter('filter')(capData, function (d) {
                                        return parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                  });
           }
           else if(baseModel.getIncomeModel() !== baseModel.getScheduleRentMethod() && model.form.capMethod.toLowerCase() === "market rent"){
                capData = model.form.actualRentCapData;
                record =  $filter('filter')(capData, function (d) {
                                        return parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                  });
           } 
           else if(model.form.capMethod.toLowerCase() === "market rent"){
                capData = model.form.marketRentCapData;
                record =  $filter('filter')(capData, function (d) {
                                        return parseInt(d.unitID) === parseInt(unitID);
                                  });
           }
           if(record !== undefined){
               return record[0];     
           } 
           else {
               return record;     
           }
        };

        model.getSaveData = function(form){
            model.form = form; 
            var returnPostData = { mrData:[] };
            returnPostData.mrData.push(model.copyObj(model.form.dtRent[0]));
            returnPostData.mrData[0].dataType = baseModel.isMarketRent() ? "TotalMarketRent" : "TotalScheduleRent";
            var modifiedRecords = $filter('filter')(model.form.dtRentdtls, function (d) {
                                    return d.isUpdated === true;
                                   });
            var copyModfied = model.copyObj(modifiedRecords);
            if( model.form.dataType === "MarketRentByProgram" ||  model.form.dataType === "MarketRentByServiceGroup" || model.form.dataType === "ScheduleRentByProgram" ||  model.form.dataType === "ScheduleRentByServiceGroup"){
                modifiedRecords = $filter('filter')(model.form.dtRentdtls, function (d) {
                                    return d.rowType !== 'groupHeader';
                                   });
                copyModfied = model.copyObj(modifiedRecords);
            }
            copyModfied.forEach(function (item) {
                item.dataType = model.form.dataType;
                returnPostData.mrData.push(item);    
            });

           if(baseModel.getBudgetType().toLowerCase() === "proforma" && ((baseModel.getIncomeModel().toLowerCase() === "unit type" && baseModel.getRentType().toLowerCase() === "marketrent") || (baseModel.getScheduleRentMethod().toLowerCase() === "unit type" && baseModel.getRentType().toLowerCase() === "schedulerent")) ){
                returnPostData.deletedProformaUnitTypes = angular.copy(model.form.deletedProforma);
                returnPostData.proformaUnitTypes =  $filter('filter')(model.form.dtRentdtls, function (d) {
                                                        return d.isProformaUnitType === 1;
                                                   });   
            }
            
            return returnPostData;
        };

        model.assignDetailData = function(form, incomemodel, response){
            model.form = form; 
            var assettype = baseModel.getAssetType();
            switch (incomemodel.toLowerCase()) {
                case "service group":
                case "program":
                    var data = incomemodel.toLowerCase() === "program" ? model.addDynamicColumn(response.data.records.unitTypeProgram, "program") : model.addDynamicColumn(response.data.records.unitTypeServiceGroup, "service");
                    model.form.dtRentdtls = data;
                    if(incomemodel.toLowerCase() === "program"){
                        model.form.dataType = baseModel.isMarketRent() ? "MarketRentByProgram" : "ScheduleRentByProgram";
                    }
                    else{
                        model.form.dataType = baseModel.isMarketRent() ? "MarketRentByServiceGroup" : "ScheduleRentByServiceGroup";
                    }
                    //model.form.dtRent = dtRent;
                    break;
                case "unit":
                    if (assettype.toLowerCase() === "student living") {
                        model.form.dtRentdtls = response.data.records.studentUnit;                       
                        model.form.dataType = baseModel.isMarketRent() ? "MarketRentByStudentUnit" : "ScheduleRentByStudentUnit";
                    }
                    else if (assettype.toLowerCase() !== "student living") {
                        model.form.dtRentdtls = response.data.records.units;
                        model.form.dataType = baseModel.isMarketRent() ? "MarketRentByUnit" : "ScheduleRentByUnit";                     
                    }
                    //model.form.isUnit = true;
                    break;
                case "unit type":
                    if (assettype.toLowerCase() === "student living") {
                        //Student Living - unitType
                        model.form.dtRentdtls = response.data.records.studentUnitType;
                        model.form.dataType = baseModel.isMarketRent() ? "MarketRentByStudentUnitType" : "ScheduleRentByStudentUnitType";    
                    }
                    else if (assettype.toLowerCase() !== "student living") {
                        //unitType
                        model.form.dtRentdtls = response.data.records.unitTypes;
                        model.form.dataType = baseModel.isMarketRent() ? "MarketRentByUnitType": "ScheduleRentByUnitType";
                    }
                    //model.form.isUnitType = true;
                    break;
            }
            return model.form;
        };

        model.addDynamicColumn = function (data, type) {
            for (var i in data) {
                if (data[i].rowType !== 'groupHeader' && (type === "program" ? parseInt(data[i].programID) > 0 : parseInt(data[i].serviceGroupID) > 0)) {
                    model.totalSvcGrpUnitCount = 0;
                    if(data[i].grpBalUnitCount === null || data[i].grpBalUnitCount === undefined) {
                        sumCalModel.getAvailableProgramUnitCount(data, data[i].unitTypeID, type);
                    } 
                    else{ 
                        data[i].rowTitleUnitCalculation= data[i].rowTitle + " [" + data[i].grpBalUnitCount + "/" + data[i].totalUnitCount + " ]";
                    }
                }
            }
            sumCalModel.updateNonProgramUnitCount(data, type);
            return data;
      };
        
      model.prepareRowObj = function (rowObj, title, recType, noOfPeriods) {
            var newrowObj = rowObj;
            newrowObj.columnTitle = title;
            newrowObj.rowTitle = title;
            newrowObj.rowClass = recType;
            newrowObj.total = 0;
            newrowObj.units = "";
            newrowObj.recordType = recType;
            for (var i = 0; i < noOfPeriods; i++) {
                var index = "period" + (i + 1);
                newrowObj[index] = 0;
            }
            return newrowObj;
      };  

      model.getSummaryTotal = function(data, form){
          model.form = form;   
          var mrTotal = 0;
          var avlTotal = {};  
            model.form.dtRentdtls.forEach(function (item) {
                for (var i = 1; i <= model.form.periodModel.noOfPeriods; i++) {
                        if(!avlTotal[model.form.periodSuf + i]){
                            avlTotal[model.form.periodSuf + i] = 0;
                        }
                        if(item.rowType !== "groupHeader"){
                            avlTotal[model.form.periodSuf + i] += parseInt(item[model.form.periodSuf + i]);
                        }
                     
                }
            });
            data[0].total = 0;
            for (var i = 1; i <= model.form.periodModel.noOfPeriods; i++) {
                        data[0][model.form.periodSuf + i] = model.roundNumber(model.form.dtRentCopy[0][model.form.periodSuf + i] + avlTotal[model.form.periodSuf + i],0);
                        data[0].total = data[0].total + data[0][model.form.periodSuf + i];
                }

           return data;
        };  

        model.getCapAmount = function(record, periodNo, currAmount, changedRow, periodSuf, capMethod){
            var returnAmount = currAmount, capAmount;
            if(record !== undefined){
                    var leaseExpirePeriod = parseInt(changedRow.leaseExpirePeriod) < 0 ? 0 : parseInt(changedRow.leaseExpirePeriod);
                     if(model.form.capMethod === "Set value"){
                        capAmount = record.capAmount;
                     }
                     else {
                          capAmount = record[model.form.periodSuf + periodNo];
                     }
                     if(parseInt(currAmount) > parseInt(capAmount) && parseInt(leaseExpirePeriod) < parseInt(periodNo)){
                            returnAmount = capAmount;
                     }
            }
            return returnAmount;
            //record 
        }; 

         model.addRentReferenceRows = function (data, changeText, perText, noOfPeriods) {
            var dupData = [];
            var objlen = data.length;
            var bdcClass, bpcClass;    
            dupData.push(model.prepareRowObj(model.copyObj(data[0]), translate('bdgt_rental_mr_reference_header') , "reference-data-header", noOfPeriods));
            for (var i = 0; i < objlen; i++) {
                if (data[i].recordType == "referenceData") {
                    if(i%2 === 0){
                        data[i].rowClass = "ref-data even-ref";
                        bdcClass = "bdc even-ref";
                        bpcClass = "bpc even-ref";
                    }
                    else{
                        data[i].rowClass = "ref-data odd-ref";
                        bdcClass = "bdc odd-ref";
                        bpcClass = "bpc odd-ref";
                    }
                     for (var j = 0; j < noOfPeriods; j++) {
                            var index = "period" + (j + 1);
                            data[i][index] = model.roundNumber(data[i][index],0);
                    }
                    data[i]["total"] = model.roundNumber(data[i]["total"],0);
                    dupData.push(data[i]);
                    dupData.push(model.prepareRowObj(model.copyObj(data[0]), changeText + baseModel.getBudgetType() , bdcClass, noOfPeriods));
                    dupData.push(model.prepareRowObj(model.copyObj(data[0]), perText + baseModel.getBudgetType(), bpcClass, noOfPeriods));
                }
            }
            return dupData;
        };

        model.copyObj = function (obj) {
            return angular.copy(obj);
        };

        //return model.init();
        return model;
    }

    angular
          .module('budgeting')
          .factory('MarketRentDetailCalculationModel', ['$filter', 'BdgtRentalIncomeModelNav', 'MarketRentSummaryCalcModel', 'appLangTranslate', factory]);
})(angular);

