//  SampleCg Model

(function (angular) {
    'use strict';

    function factory($filter) {
        var model = {};
                   
        model.periodText = "period";     
        model.emptyData = {
            latestRent: false,
        };

        model.getPeriodText = function(){
            return model.periodText;
        };

        model.form = {};

        
        model.init = function () {
            angular.extend(model.form, model.emptyData);
        };

     
       model.reset = function(){
           angular.extend(model.form, model.emptyData);
       };

       model.validateCapAmount = function(assetType, capMethod, marketRentMethod, scheduleRentMethod, ScheduleRentData, capData, noOfPeriods){
        var returnData = {};
        if(assetType.toLowerCase() !== "student living"){  
            returnData =  model.doNonStudentValidation(capMethod, marketRentMethod, scheduleRentMethod, ScheduleRentData, capData, noOfPeriods);
            }
        else{
            returnData =  model.doStudentValidation(capMethod, marketRentMethod, scheduleRentMethod, ScheduleRentData, capData, noOfPeriods); 
        }      
        return  returnData;  
       }; 

       model.doNonStudentValidation = function(capMethod, marketRentMethod, scheduleRentMethod, ScheduleRentData, capData, noOfPeriods){
         var returnData = {};
             switch(scheduleRentMethod.toLowerCase()){
                case "unit":
                   returnData =  model.ActualRentUnitValidation(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods);
                   break;
                case "unit type":
                   returnData =  model.ActualRentUnitTypeValidation(capMethod, ScheduleRentData, capData, noOfPeriods);
                   break;
                case "program":
                   returnData =  model.ActualRentProgramValidation(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods);
                   break;
                case "service group":
                   returnData =  model.ActualRentServiceGroupValidation(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods);
                   break;
            }
            return  returnData;   
       };

       model.doStudentValidation = function(capMethod, marketRentMethod, scheduleRentMethod, ScheduleRentData, capData, noOfPeriods){
        var returnData = {};
             switch(scheduleRentMethod.toLowerCase()){
                case "unit":
                   returnData =  model.ActualRentStudentUnitValidation(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods);
                   break;
                case "unit type":
                   returnData =  model.ActualRentStudentUnitTypeValidation(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods);
                   break;
            }
            return  returnData;   
       };   

       model.ActualRentUnitValidation = function(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods){
            if(marketRentMethod.toLowerCase() === "unit" && capMethod !== "Set value"){         
                return model.doActualUnitCapUnitValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = Unit and MR Rent = Unit and Method = MR
            }
            else{
                return model.doActualUnitCapUnitTypeValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = Unit and Method = Set Value
            }
      };

      model.ActualRentUnitTypeValidation = function(capMethod,  ScheduleRentData, capData, noOfPeriods){
            return model.doActualUnitTypeCapUnitTypeValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = UnitType || MR Rent = UnitType and Method = Set Value OR MR
            //return ScheduleRentData;
      };  

       model.ActualRentProgramValidation = function(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods){
            if(marketRentMethod.toLowerCase() === "program" && capMethod !== "Set value"){         
                return model.doActualProgramCapProgramValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = program and MR Rent = program and Method = MR
            }
            else{
                return model.doActualProgramCapUnitTypeValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = program and Method = Set Value
            }
       };

       model.ActualRentServiceGroupValidation = function(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods){
            if(marketRentMethod.toLowerCase() === "service group" && capMethod !== "Set value"){         
                return model.doActualServiceGroupCapServiceGroupValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = service group and MR Rent = service and Method = MR
            }
            else{
                return model.doActualProgramCapUnitTypeValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = service group and Method = Set Value
            }
       };

       model.ActualRentStudentUnitValidation = function(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods){
            if(marketRentMethod.toLowerCase() === "unit" && capMethod !== "Set value"){         
                return model.doActualStudentUnitCapStudentUnitValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = Unit and MR Rent = Unit and Method = MR
            }
            else{
                return model.doActualUnitCapUnitTypeValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = Unit and Method = Set Value
            }
       };

       model.ActualRentStudentUnitTypeValidation = function(capMethod, marketRentMethod, ScheduleRentData, capData, noOfPeriods){
            if(marketRentMethod.toLowerCase() === "unit type" && capMethod !== "Set value"){         
                return model.doActualStudentUnitTypeCapStudentUnitTypeValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = Unit type and MR Rent = Unit type and Method = MR
            }
            else{
                return model.doActualProgramCapUnitTypeValidation(capMethod, ScheduleRentData, capData, noOfPeriods); // Actual Rent = Unit type and Method = Set Value
            }
       };

       model.doActualUnitCapUnitValidation = function(capMethod, ScheduleRentData, capData, noOfPeriods){
            var belowCapAmount = false;
            var AtleastOneBelowCap = false;
            capData.forEach(function (item) {
                var UnitID = item.unitID;
                var oSchdlNode = $filter('filter')(ScheduleRentData, function (d) {
                                            return parseInt(d.unitID) === parseInt(UnitID);
                                 });
                if(oSchdlNode.length > 0){
                    var PeriodTotal = parseFloat(oSchdlNode[0].total);
                    var leaseExpirePeriod = parseInt(oSchdlNode[0].leaseExpirePeriod) < 0 ? 0 : parseInt(oSchdlNode[0].leaseExpirePeriod); 
                    oSchdlNode[0].total = model.updateUnitCapAmount(noOfPeriods, leaseExpirePeriod, oSchdlNode[0], PeriodTotal, item, capMethod);   
                }
            });            

            return ScheduleRentData;
       };

       model.updateUnitCapAmount = function(noOfPeriods, leaseExpirePeriod, dataNode, PeriodTotal, item, capMethod){
            for (var x = leaseExpirePeriod + 1; x <= noOfPeriods; x++) {
                        var CapAmount = capMethod === "Set value" ? parseFloat(item.capAmount) : parseFloat(item[model.getPeriodText() + x]);
                        var PeriodValue = parseFloat(dataNode[model.getPeriodText() + x]);
                        if (CapAmount < PeriodValue) {
                            PeriodTotal = PeriodTotal - PeriodValue;
                            PeriodTotal = PeriodTotal + CapAmount;
                            dataNode[model.getPeriodText() + x] = CapAmount;
                            dataNode.isUpdated = true;
                        }
            }
            return PeriodTotal;
       }; 

       model.doActualUnitTypeCapUnitTypeValidation = function(capMethod, ScheduleRentData, capData, noOfPeriods){
            var belowCapAmount = false;
            var AtleastOneBelowCap = false;
            capData.forEach(function (item) {
                var unitTypeID = item.unitTypeID;
                var oSchdlNode = $filter('filter')(ScheduleRentData, function (d) {
                                            return parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                 });
                 if(oSchdlNode.length > 0){
                    var PeriodTotal = parseFloat(oSchdlNode[0].total);
                    oSchdlNode[0].total = model.updateUnitTypeCapAmount(noOfPeriods, oSchdlNode[0], PeriodTotal, item, capMethod);   
                }
            });            

            return ScheduleRentData;
       };

       model.doActualProgramCapUnitTypeValidation = function(capMethod, ScheduleRentData, capData, noOfPeriods){
            capData.forEach(function (item) {
                var unitTypeID = item.unitTypeID;
                var oSchdlNodes = $filter('filter')(ScheduleRentData, function (d) {
                                            return parseInt(d.unitTypeID) === parseInt(unitTypeID) && d.rowType !== "groupHeader";
                                 });
                oSchdlNodes.forEach(function (dataNode) {
                    var PeriodTotal = parseFloat(dataNode.total);
                    dataNode.total = model.updateUnitTypeCapAmount(noOfPeriods, dataNode, PeriodTotal, item, capMethod);   
                });
            });            

            return ScheduleRentData;
       }; 

        model.updateUnitTypeCapAmount = function(noOfPeriods,  dataNode, PeriodTotal, item, capMethod){
            for (var x = 1; x <= noOfPeriods; x++) {
                        var CapAmount = capMethod === "Set value" ? parseFloat(item.capAmount) : parseFloat(item[model.getPeriodText() + x]);
                        var PeriodValue = parseFloat(dataNode[model.getPeriodText() + x]);
                        if (CapAmount < PeriodValue) {
                            PeriodTotal = PeriodTotal - PeriodValue;
                            PeriodTotal = PeriodTotal + CapAmount;
                            dataNode[model.getPeriodText() + x] = CapAmount;
                            dataNode.isUpdated = true;
                        }
            }
            return PeriodTotal;
       };     

       model.doActualUnitCapUnitTypeValidation = function(capMethod, ScheduleRentData, capData, noOfPeriods){
            var ReturnVal = false;
            capData.forEach(function (item) {
                var unitTypeId = item.unitTypeID;
                var oSchdlUnitTypeNodes = $filter('filter')(ScheduleRentData, function (d) {
                                            return parseInt(d.unitTypeID) === parseInt(unitTypeId);
                                          });
                oSchdlUnitTypeNodes.forEach(function (unitType){
                    var PeriodTotal = parseFloat(unitType.total);
                    var leaseExpirePeriod = parseInt(unitType.leaseExpirePeriod) < 0 ? 0 : parseInt(unitType.leaseExpirePeriod);        
                    unitType.total = model.updateUnitCapAmount(noOfPeriods, leaseExpirePeriod, unitType, PeriodTotal, item, capMethod);  //PeriodTotal;
                });

            });
        return ScheduleRentData;
       };

       model.doActualProgramCapProgramValidation = function(capMethod, ScheduleRentData, capData, noOfPeriods){
            capData.forEach(function (item) {
                if(item.rowType !== "groupHeader"){
                    var programID = item.programID;
                    var unitTypeID = item.unitTypeID;
                    var oSchdlNode = $filter('filter')(ScheduleRentData, function (d) {
                                                return parseInt(d.programID) === parseInt(programID) && parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                     });
                    if(oSchdlNode.length > 0){
                        var PeriodTotal = parseFloat(oSchdlNode[0].total);
                        oSchdlNode[0].total = model.updateUnitTypeCapAmount(noOfPeriods, oSchdlNode[0], PeriodTotal, item, capMethod);   
                    }
                }
            });            

            return ScheduleRentData;
       }; 

       model.doActualServiceGroupCapServiceGroupValidation = function(capMethod, ScheduleRentData, capData, noOfPeriods){
            capData.forEach(function (item) {
                if(item.rowType !== "groupHeader"){
                    var serviceGroupID = item.serviceGroupID;
                    var unitTypeID = item.unitTypeID;
                    var oSchdlNode = $filter('filter')(ScheduleRentData, function (d) {
                                                return parseInt(d.serviceGroupID) === parseInt(serviceGroupID) && parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                     });
                     if(oSchdlNode.length > 0){
                        var PeriodTotal = parseFloat(oSchdlNode[0].total);
                        oSchdlNode[0].total = model.updateUnitTypeCapAmount(noOfPeriods, oSchdlNode[0], PeriodTotal, item, capMethod);   
                     }
                }
            });            

            return ScheduleRentData;
       };  

       model.doActualStudentUnitCapStudentUnitValidation = function(capMethod, ScheduleRentData, capData, noOfPeriods){
            capData.forEach(function (item) {
                if(item.rowType !== "groupHeader"){
                    var apartmentID = item.apartmentID;
                    var unitID = item.unitID;
                    var oSchdlNode = $filter('filter')(ScheduleRentData, function (d) {
                                                return parseInt(d.apartmentID) === parseInt(apartmentID) && parseInt(d.unitID) === parseInt(unitID);
                                     });
                    if(oSchdlNode.length > 0){
                           var PeriodTotal = parseFloat(oSchdlNode[0].total);
                           var leaseExpirePeriod = parseInt(oSchdlNode[0].leaseExpirePeriod) < 0 ? 0 : parseInt(oSchdlNode[0].leaseExpirePeriod); 
                           oSchdlNode[0].total = model.updateUnitCapAmount(noOfPeriods, leaseExpirePeriod, oSchdlNode[0], PeriodTotal, item, capMethod);  
                    }
                }
            });            

            return ScheduleRentData;
       };

       model.doActualStudentUnitCapUnitTypeValidation  = function(capMethod, ScheduleRentData, capData, noOfPeriods){

       };

      model.doActualStudentUnitTypeCapStudentUnitTypeValidation = function(capMethod, ScheduleRentData, capData, noOfPeriods){
            capData.forEach(function (item) {
                if(item.rowType !== "groupHeader"){
                    var roomNumber = item.roomNumber;
                    var unitTypeID = item.unitTypeID;
                    var oSchdlNode = $filter('filter')(ScheduleRentData, function (d) {
                                                return d.roomNumber === roomNumber && parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                     });
                    if(oSchdlNode.length > 0){
                        var PeriodTotal = parseFloat(oSchdlNode[0].total);
                        oSchdlNode[0].total = model.updateUnitTypeCapAmount(noOfPeriods, oSchdlNode[0], PeriodTotal, item, capMethod);   
                    }
                }
            });            

            return ScheduleRentData;
       };  
    

       model.getMRData = function(incomeModel, assetType, modelType, response){
            var data = {};        
            if(modelType.toLowerCase() === "proforma" && incomeModel.toLowerCase() === "unit type"){
              data =  response.data.records.unitTypeData;
              return data;  
            }
            switch (incomeModel.toLowerCase()) {
                case "service group":
                case "program":
                    data = incomeModel.toLowerCase() === "program" ? response.data.records.unitTypeProgram : response.data.records.unitTypeServiceGroup;
                    //model.form.dtRent = dtRent;
                    break;
                case "unit":
                    if (assetType.toLowerCase() === "student living") {
                        data = response.data.records.studentUnit;                       
                    }
                    else if (assetType.toLowerCase() !== "student living") {
                        data = response.data.records.units;
                    }
                    //model.form.isUnit = true;
                    break;
                case "unit type":
                    if (assetType.toLowerCase() === "student living") {
                        data = response.data.records.studentUnitType;
                    }
                    else if (assetType.toLowerCase() !== "student living") {
                        //unitType
                        data = response.data.records.unitTypes;
                    }
                    //model.form.isUnitType = true;
                    break;
            }
            return data;

       };

       model.addUnitListData = function(data, method, assetType, unitTypeList){
            var returnData;
             switch (method.toLowerCase()) {
                case "service group":
                      returnData =  model.getServiceDetailsData(data, "service");     
                      break;
                case "program":
                    returnData =  model.getServiceDetailsData(data, "program");  
                    break;
                case "unit":
                    if (assetType.toLowerCase() === "student living") {
                        returnData = model.getStudentUnitDetailsData(data);                     
                    }
                    else if (assetType.toLowerCase() !== "student living") {
                         returnData = model.getUnitDetailsData(data, unitTypeList); 
                    }
                    break;
                case "unit type":
                    if (assetType.toLowerCase() === "student living") {
                        returnData =  model.getStudentUnitTypeDetailsData(data);
                    }
                    else if (assetType.toLowerCase() !== "student living") {
                      returnData =  model.getUnitTypeDetailsData(data);
                    }
                    break;
            } 
            return   returnData;
       };

      model.getUnitTypeDetailsData = function(data){
            var listData = [], subListData = [], returnData = {};
            data.forEach(function (item) {
                listData.push({
                                "id": item.proformaUnitTypeID ? item.proformaUnitTypeID : item.unitTypeID,
                                "name": item.description
                             });
            });
            returnData.lstData = listData;
            returnData.sbList = subListData;
            return  returnData; 
       };

      model.getStudentUnitTypeDetailsData = function(data){
            var listData = [], subListData = [], returnData = {};
            var serviceHeaders = model.getHeaderData(data);
            var unitData =  model.getDetailData(data);
            serviceHeaders.forEach(function (item) {
                listData.push({
                                "id": item.unitTypeID,
                                "name": item.rowTitle
                             });
            });
            unitData.forEach(function (item) {
                subListData.push({
                                "id": item.roomNumber,
                                "name": item.rowTitle,
                                "parentID": item.unitTypeID
                             });
            });
            returnData.lstData = listData;
            returnData.sbList = subListData;
            return  returnData; 
       };     

      model.getUnitDetailsData = function(data, unitTypeList){
            var listData = [], subListData = [], returnData = {};
            unitTypeList.forEach(function (item) {
                listData.push({
                                "id": item.unitTypeID,
                                "name": item.description
                             });
            });
            data.forEach(function (item) {
                subListData.push({
                                "id": item.unitID,
                                "name": item.unitNumber,
                                "parentID": item.unitTypeID
                             });
            });
            returnData.lstData = listData;
            returnData.sbList = subListData;
            return  returnData; 
       }; 

       model.getStudentUnitDetailsData = function(data){
            var listData = [], subListData = [], returnData = {};
            var serviceHeaders = model.getHeaderData(data);
            var unitData =  model.getDetailData(data);
            serviceHeaders.forEach(function (item) {
                listData.push({
                                "id": item.apartmentID,
                                "name": item.rowTitle
                             });
            });
            unitData.forEach(function (item) {
                subListData.push({
                                "id": item.unitID,
                                "name": item.rowTitle,
                                "parentID": item.apartmentID
                             });
            });
            returnData.lstData = listData;
            returnData.sbList = subListData;
            return  returnData; 
       };   

       
       model.getServiceDetailsData = function(data, type){
            var listData = [], subListData = [], returnData = {};
            var serviceHeaders = model.getHeaderData(data);
            var unitTypeData =  model.getDetailData(data);
            serviceHeaders.forEach(function (item) {
                listData.push({
                                "id": type === "program" ? item.programID : item.serviceGroupID,
                                "name": item.rowTitle
                             });
            });
            unitTypeData.forEach(function (item) {
                subListData.push({
                                "id": item.unitTypeID,
                                "name": item.rowTitle,
                                "parentID": type === "program" ? item.programID : item.serviceGroupID
                             });
            });
            returnData.lstData = listData;
            returnData.sbList = subListData;
            return  returnData; 
       };

       model.getHeaderData = function(data){
            var headersData = $filter('filter')(data, function (d) {
                                                return d.rowType === "groupHeader";
                             });
            return headersData;
       }; 

       model.getDetailData = function(data){
            var detailData = $filter('filter')(data, function (d) {
                                                return d.rowType !== "groupHeader";
                             });
            return detailData;
       };               
      
       return model;    
        //return model.init();
    }

    angular
          .module('budgeting')
          .factory('ActaulRentCapValidation', ['$filter', factory]);
})(angular);

