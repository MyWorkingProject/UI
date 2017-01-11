//  SampleCg Model

(function (angular) {
    'use strict';

//Show Apply chnages only when selected periods is choosen

//Change Rent AVG : need to Calculate and  Only show Apply chnage Row

//Change Rent : Cpomnd $ : Use ResultData, Only show Apply chnage Row and result

//Change Rent : Cpomnd % : Use ResultData, Only show Apply chnage Row and result

//Change Rent Incr/Decsr Montly/Annual $Amount : need to calculate, show (source  and result) for single unit/unit type selected + monthly data

//Change Rent STaright Monthly : Use ResultData
 
//Change Rent STaright Annual : Use ResultData  

//Change Rent Mulitplication : Use ResultData

//Change Rent Quarterly : Use ResultData


    function factory($filter) {
       var model = {};
       model.periodSuf = "period"; 
       
     
       model.applyMRNone = function(data, rentSettings, noOfPeriods){
            var periodSelection = rentSettings.selectedMethod.periodSelection;
            var checkedPeriods = rentSettings.selectedPeriods;
            var expirePeriod = rentSettings.selectedMethod.expirePeriod;
            var avg = 0, total = 0;
            angular.forEach(data, function (item) {
                avg = 0; total = 0;
                var leaseExpirePeriod = noOfPeriods;
                var leaseExpirePeriodOrg = 0;
                leaseExpirePeriod = parseInt(item['leaseExpirePeriod']);
                leaseExpirePeriodOrg = parseInt(item['leaseExpirePeriod']);
                if (leaseExpirePeriod <= 0) {
                    leaseExpirePeriod = noOfPeriods;
                } 
               switch (periodSelection.toLowerCase()) {
                    case "selected periods":
                        for(var i = 1; i <= noOfPeriods; i++) {
                            if(checkedPeriods[model.periodSuf + i]){
                                item[model.periodSuf + i] = parseInt(parseInt(item["marketRentAmount"])); 
                            }
                             total +=  parseInt(item[model.periodSuf + i]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "all periods":
                         for(var j = 1; j <= noOfPeriods; j++) {
                                item[model.periodSuf + j] = parseInt(parseInt(item["marketRentAmount"])); 
                                total +=  parseInt(item[model.periodSuf + j]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "expire periods":
                        for(var x = 1; x <= noOfPeriods; x++) {
                                if(x > leaseExpirePeriod || leaseExpirePeriodOrg<=0){
                                    item[model.periodSuf + x] = parseInt(parseInt(item["marketRentAmount"])); 
                                }
                                total +=  parseInt(item[model.periodSuf + x]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "selected expire periods":
                        if(parseInt(expirePeriod) === parseInt(leaseExpirePeriodOrg)){
                          for(var c = 1; c <= noOfPeriods; c++) {
                                if(c > leaseExpirePeriod || leaseExpirePeriodOrg <= 0){
                                    item[model.periodSuf + c] = parseInt(parseInt(item["marketRentAmount"])); 
                                }
                            total +=  parseInt(item[model.periodSuf + c]);
                            }
                            item.total = total;
                            item.isUpdated = true;
                        }
                        break;
                }
            });
         
       }; 

       model.applyAvgMR = function(data, response, rentSettings, noOfPeriods, sourceID){
            var periodSelection = rentSettings.selectedMethod.periodSelection;
            var expirePeriod = rentSettings.selectedMethod.expirePeriod;
            var checkedPeriods = rentSettings.selectedPeriods;
            var avg = 0, total = 0;
            angular.forEach(data, function (item) {
                avg = 0; total = 0; 
                var leaseExpirePeriod = noOfPeriods;
                var leaseExpirePeriodOrg = 0;
                leaseExpirePeriod = parseInt(item['leaseExpirePeriod']);
                leaseExpirePeriodOrg = parseInt(item['leaseExpirePeriod']);
                if (leaseExpirePeriod <= 0) {
                    leaseExpirePeriod = noOfPeriods;
                }
               var mrItem =  $filter('filter')(response, function (d) {
                                            return parseInt(d[sourceID]) === parseInt(item[sourceID]);
                             });
               if(mrItem.length > 0){ 
                   for(var i = 1; i <= noOfPeriods; i++) {
                        switch (periodSelection.toLowerCase()) {
                             case "selected periods":
                                    if(checkedPeriods[model.periodSuf + i]){
                                        item[model.periodSuf + i] = parseInt(parseInt(mrItem[0][model.periodSuf + i])); 
                                    }
                                break;
                            case "all periods":
                                     item[model.periodSuf + i] = parseInt(mrItem[0][model.periodSuf + i]); 
                                break;
                            case "expire periods":
                                    if(i > parseInt(leaseExpirePeriod) || parseInt(leaseExpirePeriodOrg) <=0){
                                      item[model.periodSuf + i] = parseInt(mrItem[0][model.periodSuf + i]); 
                                    }
                                break;
                            case "selected expire periods":
                                   if(parseInt(expirePeriod) === parseInt(leaseExpirePeriodOrg)){ 
                                      if(i > parseInt(leaseExpirePeriod) || parseInt(leaseExpirePeriodOrg) <=0){
                                        item[model.periodSuf + i] = parseInt(mrItem[0][model.periodSuf + i]); 
                                    }  
                                   }
                                break;
                        }
                    total +=  parseInt(item[model.periodSuf + i]);
                   }  
                   item.total = total;
                   item.isUpdated = true;  
               }   
               
            });
         
       }; 


       model.applyAR = function(data, noOfPeriods, expirePeriod, method){
           //if ((assetType.toLowerCase() === 'student living' && rentMethod.toLowerCase() === 'unit') || (assetType.toLowerCase() !== 'student living' && rentMethod.toLowerCase() === 'unit')){
                    angular.forEach(data, function (item) {
                        var leaseExpirePeriod = noOfPeriods, rentTotal = 0;
                        var leaseExpirePeriodOrg = 0;
                        leaseExpirePeriod = item["leaseExpirePeriod"];
                        leaseExpirePeriodOrg = parseInt(item["leaseExpirePeriod"]);
                        if (leaseExpirePeriod <= 0) {
                            leaseExpirePeriod = noOfPeriods;
                        }
                        if((method.toLowerCase() === "expire periods") || (method.toLowerCase() === "selected expire periods" && parseInt(leaseExpirePeriodOrg) === parseInt(expirePeriod))){
                            for (var i = 1; i <= noOfPeriods; i++) {
                                if (i > leaseExpirePeriod) {
                                    item[model.periodSuf + i] =  parseInt(item[model.periodSuf + leaseExpirePeriod]);
                                }
                                else if (leaseExpirePeriodOrg <= 0) {
                                    item[model.periodSuf + i] =  parseInt(item["scheduleRentAmount"]);
                                }
                                rentTotal += parseInt(item[model.periodSuf + i]);
                           }
                           item.total =  rentTotal;
                       }
                  }); 
           //}  
        
       }; 

       
       return model;    
        //return model.init();
    }

    angular
          .module('budgeting')
          .factory('ChangeRentMR', ['$filter', factory]);
})(angular);

