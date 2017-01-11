//  SampleCg Model

(function (angular) {
    'use strict';

    function factory($filter, mrModel, msgSVC) {
        var model = {};
        model.oldMrktRnt = [];
        model.newMrktRnt = []; 
        
        model.getSummaryData = function(detailsData, periods, periodSuf, dataType, applyCap){
            var returnData; 
            switch (dataType){
                case "MarketRentByUnitType":
                case "ScheduleRentByUnitType":
                       returnData =  model.getUnitTypeSummaryData(detailsData, periods, periodSuf);
                       break;
                case "MarketRentByProgram":
                case "ScheduleRentByProgram":
                       if(applyCap) {
                            model.updateProgramGroupHeaderData(detailsData, periods, periodSuf, "program"); 
                       }
                       returnData =  model.getUnitTypeProgramData(detailsData, periods, periodSuf, "program");
                       break;
                case "MarketRentByServiceGroup":
                case "ScheduleRentByServiceGroup":
                       if(applyCap) {
                            model.updateProgramGroupHeaderData(detailsData, periods, periodSuf, "service"); 
                       } 
                       returnData =  model.getUnitTypeProgramData(detailsData, periods, periodSuf, "service");
                       break;
                case "MarketRentByStudentUnitType":
                case "ScheduleRentByStudentUnitType":
                       if(applyCap) {
                            model.updateStudentUnitTypeGroupHeaderData(detailsData, periods, periodSuf, "unitType"); 
                       }   
                       returnData =  model.getUnitTypeStudentData(detailsData, periods, periodSuf);
                       break;
            }
            return returnData;
        };

       
        model.updateProgramGroupHeaderData = function(data, periods, periodSuf, type){
             var headerRecords = $filter('filter')(data, function (d) {
                                    return d.rowType === 'groupHeader';
                                 });
             headerRecords.forEach(function (item) { 
                    var groupRecords = [];
                    if(type === "program"){
                        groupRecords = $filter('filter')(data, function (d) {
                                        return parseInt(d.programID) === parseInt(item.programID);
                                        });
                    }
                   else{
                        groupRecords = $filter('filter')(data, function (d) {
                                        return parseInt(d.serviceGroupID) === parseInt(item.serviceGroupID);
                                        });
                    } 
                    model.updateGroupHeaderData(groupRecords, periods, periodSuf, type);
             });
        };

         model.updateStudentUnitTypeGroupHeaderData = function(data, periods, periodSuf, type){
             var headerRecords = $filter('filter')(data, function (d) {
                                    return d.rowType === 'groupHeader';
                                 });
             headerRecords.forEach(function (item) { 
                    var groupRecords = [];
                        if(type === "unit"){
                            groupRecords = $filter('filter')(data, function (d) {
                                            return parseInt(d.apartmentID) === parseInt(item.apartmentID);
                                            });
                        }
                        else{
                            groupRecords = $filter('filter')(data, function (d) {
                                            return parseInt(d.unitTypeID) === parseInt(item.unitTypeID);
                                            });
                        }
                    model.updateStudentGroupHeaderTotalData(groupRecords, periods, periodSuf, type);
             });
        };

        model.updateStudentGroupHeaderTotalData = function(data, periods, periodSuf, type){
            var Total = 0, avlTotal = { total:0 };
            data.forEach(function (item) {
                if(item.rowType !== "groupHeader")
                {
                    for (var i = 1; i <= periods; i++) {
                            if(!avlTotal[periodSuf + i]){
                                avlTotal[periodSuf + i] = 0;
                            }
                        avlTotal[periodSuf + i] += parseInt(item[periodSuf + i]);
                        //Total += avlTotal[periodSuf + i];
                    }
                } 
            });

            var groupHeaderRecords = $filter('filter')(data, function (d) {
                                    return  d.rowType === "groupHeader"; });

            var aprtCount = type === "unit" ? 0 : parseInt(groupHeaderRecords[0].aparetmentCount);
            Total = 0;
            groupHeaderRecords.forEach(function (item) {
                 for (var i = 1; i <= periods; i++) {
                        item[periodSuf + i] = type === "unit" ? (parseInt(avlTotal[periodSuf + i])) : (parseInt(avlTotal[periodSuf + i]) * aprtCount);
                        Total += item[periodSuf + i];
                 }   
            });
            groupHeaderRecords[0].total = Total;   

           /* for (var i = 1; i <= periods; i++) {
                Total += avlTotal[periodSuf + i];
            }
            model.assignDataToGroup(data, avlTotal, periodSuf, periods, Total); */
        };
        
       model.assignZeroValues = function(periodSuf, periods){
           var avlTotal = { total:0 }; 
            for (var j = 1; j <= periods; j++) {
                avlTotal[periodSuf + j] = 0;
            }
            return avlTotal;
        };

        model.getUnitTypeSummaryData = function(detailsData, periods, periodSuf){
             var mrTotal = 0, TotalArry = [];
             var avlTotal = model.assignZeroValues(periodSuf, periods);    
             detailsData.forEach(function (item) {
                for (var i = 1; i <= periods; i++) {
                        if(!avlTotal[periodSuf + i]){
                            avlTotal[periodSuf + i] = 0;
                        }
                    
                   avlTotal[periodSuf + i] += (item[periodSuf + i] * parseInt(item.unitCount));
                   //avlTotal["total"] += avlTotal[periodSuf + i];
               }
            });
            avlTotal["total"] = 0;
            for (var j = 1; j <= periods; j++) {
                avlTotal["total"] += avlTotal[periodSuf + j];
            }
            TotalArry[0] = avlTotal;
            return TotalArry;
        };

        model.getUnitTypeProgramData = function(detailsData, periods, periodSuf, type){
             var mrTotal = 0, TotalArry = [];
             var avlTotal = model.assignZeroValues(periodSuf, periods);    
             detailsData.forEach(function (item) {
                if(item.rowType !== "groupHeader")
                {
                    for (var i = 1; i <= periods; i++) {
                            if(!avlTotal[periodSuf + i]){
                                avlTotal[periodSuf + i] = 0;
                            }
                       avlTotal[periodSuf + i] += (item[periodSuf + i] * (type ==="program" ? parseInt(item.programUnitCount) : parseInt(item.serviceUnitCount)));
                   }
               } 
            });
            avlTotal["total"] = 0;
            for (var j = 1; j <= periods; j++) {
                avlTotal["total"] += avlTotal[periodSuf + j];
            }
            TotalArry[0] = avlTotal;
            return TotalArry;
        };

        model.getUnitTypeStudentData = function(detailsData, periods, periodSuf){
             var mrTotal = 0, TotalArry = [];
             var avlTotal = model.assignZeroValues(periodSuf, periods), apartCount = 0; 
              var headerRecords = $filter('filter')(detailsData, function (d) {
                                    return d.rowType === 'groupHeader';
                                 });   
             headerRecords.forEach(function (item) {
                    for (var i = 1; i <= periods; i++) {
                            if(!avlTotal[periodSuf + i]){
                                avlTotal[periodSuf + i] = 0;
                            }
                       avlTotal[periodSuf + i] += parseInt(item[periodSuf + i]); 
                   }
            });
            avlTotal["total"] = 0;
            for (var j = 1; j <= periods; j++) {
                avlTotal["total"] += avlTotal[periodSuf + j];
            }
            TotalArry[0] = avlTotal;
            return TotalArry;
        };

        model.updateGroupHeaderData = function(data, periods, periodSuf, type){
            var avlTotal = model.assignZeroValues(periodSuf, periods), Total = 0, unitTotal = 0;
            data.forEach(function (item) {
                if(item.rowType !== "groupHeader")
                {
                    for (var i = 1; i <= periods; i++) {
                            if(!avlTotal[periodSuf + i]){
                                avlTotal[periodSuf + i] = 0;
                            }
                        avlTotal[periodSuf + i] += (parseInt(item[periodSuf + i]) * (type === "program" ? parseInt(item.programUnitCount) : parseInt(item.serviceUnitCount)));
                        Total += avlTotal[periodSuf + i];
                    }
                    unitTotal += (type === "program" ? parseInt(item.programUnitCount) : parseInt(item.serviceUnitCount));
                } 
            });
            var headerRecords = model.assignDataToGroup(data, avlTotal, periodSuf, periods, Total);
            
            if(type === "program"){
                headerRecords[0].programUnitCount = unitTotal;
            }
            else{
                headerRecords[0].serviceUnitCount = unitTotal;
            }
        };

        model.assignDataToGroup = function(data, avlTotal, periodSuf, periods, total){
            var rowTotal = 0;
            var headerRecords = $filter('filter')(data, function (d) {
                                    return d.rowType === 'groupHeader';
                                 });
            for (var i = 1; i <= periods; i++) {
                        headerRecords[0][periodSuf + i] = avlTotal[periodSuf + i];
                        rowTotal += parseInt(headerRecords[0][periodSuf + i]);
            }
            headerRecords[0]["total"] = rowTotal;
            return headerRecords;
        };

        model.updateStudentGroupHeaderData = function(data, periods, periodSuf){
            var Total = 0, avlTotal = model.assignZeroValues(periodSuf, periods);
            data.forEach(function (item) {
                if(item.rowType !== "groupHeader")
                {
                    for (var i = 1; i <= periods; i++) {
                            if(!avlTotal[periodSuf + i]){
                                avlTotal[periodSuf + i] = 0;
                            }
                        avlTotal[periodSuf + i] += parseInt(item[periodSuf + i]);
                        //Total += avlTotal[periodSuf + i];
                    }
                } 
            });
            for (var i = 1; i <= periods; i++) {
                Total += avlTotal[periodSuf + i];
            }
            model.assignDataToGroup(data, avlTotal, periodSuf, periods, Total); 
        };

        model.resetMrktRnt = function(){
            model.oldMrktRnt = [];
            model.newMrktRnt = [];
        };
        
        model.getOldMrktRnt = function(){
            return model.oldMrktRnt;
        };

        model.getNewMrktRnt = function(){
            return model.newMrktRnt;
        };

        model.updateMRTotal = function(data, column, olPeriodValue, keyVal, dataType, periodSuf, periods, capMethod, capValue, actualRentCapData, marketRentCapData){
            var currentPeriodNo = keyVal.replace(periodSuf,"");
            model.resetMrktRnt(); 
            var changedRow = column.row.data;
            changedRow.isUpdated = true;
            var groupRecords;    
            switch (dataType){
                case "MarketRentByUnitType":
                case "ScheduleRentByUnitType":
                        model.copyMRUnitTypePeriodData(changedRow, currentPeriodNo, periods, periodSuf, keyVal, olPeriodValue, capMethod, capValue, actualRentCapData, marketRentCapData);
                break;
                case "MarketRentByProgram":
                case "ScheduleRentByProgram":
                        model.copyMRProgramPeriodData(changedRow, currentPeriodNo, periods, periodSuf, keyVal, olPeriodValue, "program", capMethod, capValue, actualRentCapData, marketRentCapData);
                        groupRecords = $filter('filter')(data, function (d) {
                                    return parseInt(d.programID) === parseInt(changedRow.programID);
                                    });
                        model.updateGroupHeaderData(groupRecords, periods, periodSuf, "program");
                break;
                case "MarketRentByServiceGroup":
                case "ScheduleRentByServiceGroup":
                        model.copyMRProgramPeriodData(changedRow, currentPeriodNo, periods, periodSuf, keyVal, olPeriodValue, "service", capMethod, capValue, actualRentCapData, marketRentCapData);
                        groupRecords = $filter('filter')(data, function (d) {
                                    return parseInt(d.serviceGroupID) === parseInt(changedRow.serviceGroupID);
                                    });
                        model.updateGroupHeaderData(groupRecords, periods, periodSuf, "service");
                break;
                case "MarketRentByStudentUnitType":
                case "ScheduleRentByStudentUnitType":
                        model.copyMRStudentUnitTypeData(data, changedRow, currentPeriodNo, periods, periodSuf, keyVal, olPeriodValue, capMethod, capValue, actualRentCapData, marketRentCapData);
                break;
            }
        };

        model.getCapAmount = function(record, periodNo, currAmount, capMethod, periodSuf){
            var returnAmount = currAmount, capAmount;
            if(record !== undefined){
                     if(capMethod === "Set value"){
                        capAmount = record.capAmount;
                     }
                     else {
                          capAmount = record[periodSuf + periodNo];
                     }
                     if(parseInt(currAmount) > parseInt(capAmount)){
                            returnAmount = capAmount;
                     }
            }
            return returnAmount;
            //record 
        };

        model.getCapRecord = function(id, unitTypeID, capMethod, capValue, actualRentCapData, marketRentCapData, type){
           var capData = {};
           var record;
           if(capMethod === "Set value"){
                capData = capValue;
                record =  $filter('filter')(capData, function (d) {
                                        return parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                  });
           }
           else if(mrModel.getIncomeModel() !== mrModel.getScheduleRentMethod() && capMethod.toLowerCase() === "market rent"){
                capData = actualRentCapData;
                record =  $filter('filter')(capData, function (d) {
                                        return parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                  });
           } 
           else if(capMethod.toLowerCase() === "market rent"){
                capData = marketRentCapData;
                if(type === "unit"){
                    record =  $filter('filter')(capData, function (d) {
                                        return parseInt(d.unitID) === parseInt(id);
                                  });
                }
                else if(type === "unit type"){
                    record =  $filter('filter')(capData, function (d) {
                                        return parseInt(d.unitTypeID) === parseInt(id);
                                  });
                }
                else if(type === "program"){
                    record =  $filter('filter')(capData, function (d) {
                                        return parseInt(d.programID) === parseInt(id) && parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                  });
                }
                else if(type === "service"){
                    record =  $filter('filter')(capData, function (d) {
                                        return parseInt(d.serviceGroupID) === parseInt(id) && parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                  });
                }
                else if(type === "student"){
                    record =  $filter('filter')(capData, function (d) {
                                        return d.roomNumber === id && parseInt(d.unitTypeID) === parseInt(unitTypeID);
                                  });
                }
                
                
           }
           if(record !== undefined){
               return record[0];     
           } 
           else {
               return record;     
           }
        };
         
         model.copyMRUnitTypePeriodData = function(changedRow, currentPeriodNo, periods, periodSuf, keyVal, olPeriodValue, capMethod, capValue, actualRentCapData, marketRentCapData){
            var copyAmount = changedRow[keyVal], capAmount;
            var capRecord = model.getCapRecord(changedRow.unitTypeID, changedRow.unitTypeID, capMethod, capValue, actualRentCapData, marketRentCapData, "unit type"); 
            for (var i = 1; i <= periods; i++) {
                       capAmount = model.getCapAmount(capRecord, i, copyAmount, capMethod, periodSuf);
                       changedRow[keyVal] =  capAmount;  
                       if(i === parseInt(currentPeriodNo)){
                        model.oldMrktRnt[i] = olPeriodValue * changedRow.unitCount;
                       }
                       else{  
                        model.oldMrktRnt[i] = changedRow[periodSuf + i] * changedRow.unitCount;
                       } 
                       if(i < parseInt(currentPeriodNo)){
                         model.newMrktRnt[i] = changedRow[periodSuf + i] * changedRow.unitCount;
                       } 
            }
            for (var j = parseInt(currentPeriodNo); j <= periods; j++) {
                        capAmount = model.getCapAmount(capRecord, j, copyAmount, capMethod, periodSuf);
                        changedRow[periodSuf + j] = capAmount;
                        model.newMrktRnt[j] = changedRow[periodSuf + j] * changedRow.unitCount;
            }
        };

         model.copyMRStudentUnitTypeData = function(data, changedRow, currentPeriodNo, periods, periodSuf, keyVal, olPeriodValue, capMethod, capValue, actualRentCapData, marketRentCapData){
            var Total = 0, avlTotal = { total:0 };
            var copyAmount = changedRow[keyVal], capAmount;
            var capRecord = model.getCapRecord(changedRow.roomNumber, changedRow.unitTypeID, capMethod, capValue, actualRentCapData, marketRentCapData, "student"); 
            capAmount = model.getCapAmount(capRecord, currentPeriodNo, copyAmount, capMethod, periodSuf);
            changedRow[keyVal] =  capAmount; 
            for (var j = parseInt(currentPeriodNo); j <= periods; j++) {
                        capAmount = model.getCapAmount(capRecord, j, copyAmount, capMethod, periodSuf);
                        changedRow[periodSuf + j] = capAmount;
                        //changedRow[periodSuf + j] = changedRow[keyVal];
                }
            var groupNonHeaderRecords = $filter('filter')(data, function (d) {
                                        return parseInt(d.unitTypeID) === parseInt(changedRow.unitTypeID) && d.rowType !== "groupHeader";
                                    });
            var groupHeaderRecords = $filter('filter')(data, function (d) {
                                        return parseInt(d.unitTypeID) === parseInt(changedRow.unitTypeID) && d.rowType === "groupHeader";
                                    });
            for (var i = 1; i <= periods; i++) {
                Total += parseInt(changedRow[periodSuf + i]);
            }
            changedRow.total = Total;   
            groupNonHeaderRecords.forEach(function (item) {
                 for (var i = 1; i <= periods; i++) {
                         if(!avlTotal[periodSuf + i]){
                                avlTotal[periodSuf + i] = 0;
                            }
                        avlTotal[periodSuf + i] += parseInt(item[periodSuf + i]);
                 }   
            });             

            var aprtCount = parseInt(groupHeaderRecords[0].aparetmentCount);
            Total = 0;
            groupHeaderRecords.forEach(function (item) {
                 for (var i = 1; i <= periods; i++) {
                        item[periodSuf + i] = parseInt(avlTotal[periodSuf + i]) * aprtCount;
                        Total += avlTotal[periodSuf + i];
                 }   
            });
            groupHeaderRecords[0].total = Total;    
           
        };

        model.updateStudentUnitTypeTotal = function(dtRent, data, periodSuf, noOfPeriods){
            var returnData =  model.getUnitTypeStudentData(data, noOfPeriods, periodSuf);
            var total = 0;
            for (var i = 1; i <= noOfPeriods; i++) {
                dtRent[0][periodSuf + i] = returnData[0][periodSuf + i] ;
                total += parseInt(dtRent[0][periodSuf + i]);
            }
            dtRent[0]["total"] = total;
        };

        model.copyMRProgramPeriodData = function(changedRow, currentPeriodNo, periods, periodSuf, keyVal, olPeriodValue, type, capMethod, capValue, actualRentCapData, marketRentCapData){
            var copyAmount = changedRow[keyVal], capAmount;
            var capRecord = model.getCapRecord(type === "program" ? changedRow.programID : changedRow.serviceGroupID, changedRow.unitTypeID, capMethod, capValue, actualRentCapData, marketRentCapData, type); 
            for (var i = 1; i <= periods; i++) {
                       capAmount = model.getCapAmount(capRecord, i, copyAmount, capMethod, periodSuf);
                       changedRow[keyVal] =  capAmount;  
                       if(i === parseInt(currentPeriodNo)){
                        model.oldMrktRnt[i] = olPeriodValue * (type === "program" ? changedRow.programUnitCount : changedRow.serviceUnitCount);
                       }
                       else{  
                        model.oldMrktRnt[i] = changedRow[periodSuf + i] * (type === "program" ? changedRow.programUnitCount : changedRow.serviceUnitCount);
                       } 
                       if(i < parseInt(currentPeriodNo)){
                         model.newMrktRnt[i] = changedRow[periodSuf + i] * (type === "program" ? changedRow.programUnitCount : changedRow.serviceUnitCount);
                       } 
            }
            for (var j = parseInt(currentPeriodNo); j <= periods; j++) {
                        capAmount = model.getCapAmount(capRecord, j, copyAmount, capMethod, periodSuf);
                        changedRow[periodSuf + j] = capAmount;
                        model.newMrktRnt[j] = changedRow[periodSuf + j] * (type === "program" ? changedRow.programUnitCount : changedRow.serviceUnitCount);
            }
        };

        model.getAvailableProgramUnitCount = function(data, unitTypeID, type){
            var totalProgramCount = 0;
            var unitTypeRecords = $filter('filter')(data, function (d) {
                                    return d.unitTypeID === unitTypeID && (type === "program" ? parseInt(d.programID) > 0 : parseInt(d.serviceGroupID) > 0) && d.rowType !== 'groupHeader';
                                    });
            unitTypeRecords.forEach(function (item) {
                totalProgramCount +=  (type === "program" ? parseInt(item.programUnitCount) : parseInt(item.serviceUnitCount));
            }); 

            unitTypeRecords.forEach(function (item) {
                item.grpBalUnitCount = parseInt(item.totalUnitCount) - parseInt(totalProgramCount);
                item.rowTitleUnitCalculation= item.rowTitle + " [" + item.grpBalUnitCount + "/" + item.totalUnitCount + " ]";
            }); 
         
            return totalProgramCount;
        };

        model.updateNonProgramUnitCount = function(data, type){
            var unitTypeRecords = $filter('filter')(data, function (d) {
                                    return (type === "program" ? parseInt(d.programID) === 0 : parseInt(d.serviceGroupID) === 0) && d.rowType !== 'groupHeader';
                                });
            unitTypeRecords.forEach(function (item) {
                item.grpBalUnitCount = 0;
                 var otherUnitTypeRecords = $filter('filter')(data, function (d) {
                                    return (type === "program" ? parseInt(d.programID) >0 : parseInt(d.serviceGroupID) >0) && d.rowType !== 'groupHeader' && d.unitTypeID === item.unitTypeID;
                                });
                var programCount = 0;
                otherUnitTypeRecords.forEach(function (other) {
                    programCount += (type === "program" ? parseInt(other.programUnitCount) : parseInt(other.serviceUnitCount));
                });
                if(type === "program"){
                    item.programUnitCount = parseInt(item.totalUnitCount) - parseInt(programCount);
                }
                else{
                    item.serviceUnitCount = parseInt(item.totalUnitCount) - parseInt(programCount);
                }
                item.rowTitleUnitCalculation= item.rowTitle + " [" + item.grpBalUnitCount + "/" + item.totalUnitCount + " ]";
            });
            
        };

        model.getNonGrpUnitCount = function(data, type){
               var cnt = 0; 
               var unitTypeRecords = $filter('filter')(data, function (d) {
                                    return ((type === "MarketRentByProgram" || type === "ScheduleRentByProgram") ? parseInt(d.programID) === 0 : parseInt(d.serviceGroupID) === 0) && d.rowType !== 'groupHeader';
                                });  
               unitTypeRecords.forEach(function (item) { 
                    if(type === "MarketRentByProgram" || type === "ScheduleRentByProgram"){
                        cnt += parseInt(item.programUnitCount);
                    }
                    else{
                        cnt += parseInt(item.serviceUnitCount); 
                    }
               });
            return cnt;
        };


      
        model.getGroupUnitBalance = function (item, data, dataType, currrentGrp, noOfPeriods, periodSuf) {
            var maxGrpSvcUnitCount = 0;
            var totalUnitCount = 0;
            var recordType = "";
            if(item.programUnitCount === ""){
                item.programUnitCount = 0;
            }
            else if(item.serviceUnitCount === ""){
                item.serviceUnitCount = 0;
            }
            var type =  (dataType === "MarketRentByProgram" || dataType === "ScheduleRentByProgram") ? "program" : "service";
            model.getAvailableProgramUnitCount(data.gridData,item.unitTypeID, type);
            item.currrentGrp =  currrentGrp;
            if(parseInt(item.grpBalUnitCount) < 0 ){
                //show error message
                var maxUnits = (type === "program" ? parseInt(item.programUnitCount) : parseInt(item.serviceUnitCount)) + parseInt(item.grpBalUnitCount);
                if(parseInt(maxUnits) < 0){
                    maxUnits = 0;
                }
                item.dataValid = false;
                item.title = (type === "program" ? mrModel.getKeyValue('bdgt_rental_mr_unit_pogram_cnt_msg') : mrModel.getKeyValue('bdgt_rental_mr_unit_service_cnt_msg')) + maxUnits + mrModel.getKeyValue('bdgt_rental_mr_unit_text');
            }
            else{
                item.title = "";
                item.dataValid = true;
                model.updateNonProgramUnitCount(data.gridData, type);
                var groupRecords = $filter('filter')(data.gridData, function (d) {
                                    return (type === "program" ? d.programID === item.programID : d.serviceGroupID === item.serviceGroupID);
                                    });
                model.updateGroupHeaderData(groupRecords,  noOfPeriods,  periodSuf, type);
                var groupNonPrgmRecords = $filter('filter')(data.gridData, function (d) {
                                    return (type === "program" ? parseInt(d.programID) === 0 : parseInt(d.serviceGroupID) === 0);
                                    });
                model.updateGroupHeaderData(groupNonPrgmRecords,  noOfPeriods,  periodSuf, type);
                model.getUnitTypeProgramData(data.gridData, noOfPeriods,  periodSuf, type);
            }
        };

       model.addNewUnitType = function(data){
        var newRow = angular.copy(data["0"]);
        var newItemIndex = data.length;
            angular.forEach(newRow,function(value,key){
                if(key ==="rowID"){
                    newRow[key] = newItemIndex;
                }
                else if(key !== "rowType"){
                    newRow[key] = 0;
                }  
            });
        newRow.name = "";
        newRow.isProformaUnitType = 1;
        newRow.proformaUnitTypeID = 0;//parseInt(newItemIndex) + 1;    
        newRow.unitCount = 0;
        newRow.isUpdated = true;
        data.push(newRow);
       };

      model.removeUnitType = function(data, column, deletedProforma){  
        var deleteRow = column.row.data;
        var index = data.indexOf(deleteRow);
        if(parseInt(deleteRow.proformaUnitTypeID) > 0){
            deletedProforma.push(deleteRow);    
        }
        data.remove(index);
       };
    
      model.validateDescr = function(data, column){  
        var row = column.row.data;
        var dupRecords = $filter('filter')(data, function (d) {
                                       return row.name === d.name && parseInt(row.rowID) !== parseInt(d.rowID);
                            });
        if(dupRecords.length){
            row.dataValid = false;
            msgSVC.showDuplicateMsg();
        }
        else{
            row.dataValid = true;
        }
       };    

     model.updateUnitCount = function(detailData, summaryRow){
        var totalUnitCount = 0;
        angular.forEach(detailData,function(item){
                totalUnitCount += parseInt(item.unitCount);
        });
        summaryRow.units = totalUnitCount;
        
     };

    model.updateCommentCount = function(detailsData, record, commentCount, dataType){
            var returnData; 
            switch (dataType){
                case "MarketRentByUnitType":
                case "MarketRentByStudentUnitType":
                case "ScheduleRentByUnitType":
                case "ScheduleRentByStudentUnitType":
                       if(record.proformaUnitTypeID > 0) {
                           var unitTypePRecord = $filter('filter')(detailsData, function (d) {
                                           return record.proformaUnitTypeID === d.proformaUnitTypeID;
                                });
                               unitTypePRecord[0].commentCount =  commentCount;
                        }
                       else {
                           var unitTypeRecord = $filter('filter')(detailsData, function (d) {
                                           return record.unitTypeID === d.unitTypeID;
                                });
                                if(unitTypeRecord.length>0){
                                    unitTypeRecord[0].commentCount =  commentCount;
                                }
                        }
                       break;
                case "MarketRentByProgram":
                case "ScheduleRentByProgram":
                       var programRecord = $filter('filter')(detailsData, function (d) {
                                       return record.programID === d.programID;
                            });
                           programRecord[0].commentCount =  commentCount;
                       break;
                case "MarketRentByServiceGroup":
                case "ScheduleRentByServiceGroup":
                       var serviceRecord = $filter('filter')(detailsData, function (d) {
                                       return record.serviceGroupID === d.serviceGroupID;
                            });
                           serviceRecord[0].commentCount =  commentCount;
                       break;
                case "MarketRentByStudentUnit":
                case "ScheduleRentByStudentUnit":
                       var studentUnitRecord = $filter('filter')(detailsData, function (d) {
                                       return record.apartmentID === d.apartmentID;
                            });
                           studentUnitRecord[0].commentCount =  commentCount;
                       break;
                case "MarketRentByUnit":
                case "ScheduleRentByUnit":
                    var unitRecord = $filter('filter')(detailsData, function (d) {
                                    return record.unitID === d.unitID;
                        });
                        unitRecord[0].commentCount =  commentCount;
                    break;
            }
            return returnData;
        };

       return model;    
        //return model.init();
    }

    angular
          .module('budgeting')
          .factory('MarketRentSummaryCalcModel', ['$filter', 'MarketRentModel', 'marketRentMsgSVC', factory]);
})(angular);

