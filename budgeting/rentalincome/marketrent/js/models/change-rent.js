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


    function factory($filter, rentModel) {
       var model = {};
       model.periodSuf = "period"; 
       
       model.applyChangeRent = function(rentSettings, data, isMarketRent, rentMethod, assetType, noOfperiods){
           var leaseExpirePeriod = noOfperiods;//rentSettings.selectedMethod.method expirePeriod
           var filterRecords =  model.getFilterRecords(data, rentMethod, assetType, rentSettings.selectedMethod.unitTypeID, rentSettings.selectedMethod.unitID);
           model.applyCalcMethod(isMarketRent, rentSettings.selectedMethod.periodSelection, filterRecords, noOfperiods, rentSettings.selectedPeriods, rentSettings.resultsGrid, rentSettings.selectedMethod.expirePeriod, rentSettings.selectedMethod.method, rentSettings.selectedMethod.source, rentSettings.selectedMethod.monthlyData, rentSettings.selectedMethod.amount); 
       };

      model.applyCalcMethod = function(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, resultData, expirePeriod, method, source, monthlyData, startingAmount){
            switch (method.toLowerCase()) {
                case "average":
                    model.applyAverageCalc(periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source);
                    break;
                case "compound-currency":
                case "compound-percent":
                case "straight-monthly":
                case "straight-annually":
                case "quarterly":
                case "multiplication":
                    model.applyChangeCalc(periodSelection, data, noOfperiods, checkedPeriods, resultData, expirePeriod);
                    break;
                case "id-monthly-currency":
                     model.applyIDMCCalc(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount, false);
                    break;
                case "id-monthly-percent":
                      model.applyIDMPCalc(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount, false);
                    break;
                case "id-annually-currency":
                     model.applyIDANCCalc(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount);
                    break;
                case "id-annually-percent":
                     model.applyIDANPCalc(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount);
                    break;
             /*  case "applymr":
                     model.applyExpirePeriods(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod);
                    break; */
               case "applyar":
                     rentModel.applyAR(data, noOfperiods, expirePeriod, periodSelection);
                    break;
               case "id-monthly-currency-expiry":
                     model.applyIDMCCalc(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount, true);
                    break;
               case "id-monthly-percent-percent-expiry":
                      model.applyIDMPCalc(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount, true);
                    break;   
            }
      };


    model.applyIDMCCalc = function(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount, isExpiryIDMonthly){
         if(source.toLowerCase() === "starting-point"){   
            var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0;
            angular.forEach(data, function (item) {
                avg = 0; total = 0; totalPeriods = 0; resultData = {}; monthlyVal = 0;
                for(var i = 1; i <= noOfperiods; i++) {
                    monthlyVal = parseFloat(monthlyData[model.periodSuf + i]) || 0;
                    resultData[model.periodSuf + i] = monthlyVal + parseInt(startingAmount);
                }
                model.applyChangeRentCalc(periodSelection, item, noOfperiods, checkedPeriods, resultData, expirePeriod);
            });
        }
        else{
            model.applyIDMCCalcCurRow(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, monthlyData, startingAmount, isExpiryIDMonthly); 
        }
     }; 

     model.applyIDANCCalc = function(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount){
           var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0;
           startingAmount = parseFloat(startingAmount);
            var actualPeriods = model.getSelectedPeriodsCount(periodSelection, checkedPeriods, noOfperiods);
            angular.forEach(data, function (item) {
               avg = 0; total = 0; totalPeriods = 0; resultData = {}; monthlyVal = 0;
               switch (periodSelection.toLowerCase()) {
                    case "selected periods":
                        for(var i = 1; i <= noOfperiods; i++) {
                            if(checkedPeriods[model.periodSuf + i]){
                                item[model.periodSuf + i] = parseInt(item[model.periodSuf + i]) + (actualPeriods === 0 ? 0 : Math.round(startingAmount / actualPeriods, 0));
                            }
                             total +=  parseInt(item[model.periodSuf + i]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "all periods":
                         for(var j = 1; j <= noOfperiods; j++) {
                                item[model.periodSuf + j] = parseInt(item[model.periodSuf + j]) + Math.round(startingAmount / noOfperiods, 0);
                                total +=  parseInt(item[model.periodSuf + j]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "expire periods":
                        model.applyIDANCCalcExpireRow(item, isMarketRent, noOfperiods, false, monthlyData, expirePeriod, startingAmount);
                        break;
                    case "selected expire periods":
                          model.applyIDANCCalcExpireRow(item, isMarketRent, noOfperiods, true, monthlyData, expirePeriod, startingAmount);
                        break;
                }
            });
     };

    model.applyIDANPCalc = function(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount){
           var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0, amnt = 0;
           startingAmount = parseFloat(startingAmount); 
            var actualPeriods = model.getSelectedPeriodsCount(periodSelection, checkedPeriods, noOfperiods);
            amnt = parseFloat(parseFloat(startingAmount) / 100.0);
            angular.forEach(data, function (item) {
               avg = 0; total = 0; totalPeriods = 0; resultData = {}; monthlyVal = 0;
               switch (periodSelection.toLowerCase()) {
                    case "selected periods":
                        for(var i = 1; i <= noOfperiods; i++) {
                            if(checkedPeriods[model.periodSuf + i]){
                                //startingAmount = parseFloat(parseFloat(startingAmount) / 100.0); 
                                item[model.periodSuf + i] = Math.round(parseFloat(item[model.periodSuf + i]) + (amnt *  parseFloat(item[model.periodSuf + i])),0);
                            }
                             total +=  parseInt(item[model.periodSuf + i]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "all periods":
                         for(var j = 1; j <= noOfperiods; j++) {
                                //startingAmount = parseFloat(parseFloat(startingAmount) / 100.0); 
                                item[model.periodSuf + j] = Math.round(parseFloat(item[model.periodSuf + j]) + (amnt *  parseFloat(item[model.periodSuf + j])),0);
                                total +=  parseInt(item[model.periodSuf + j]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "expire periods":
                        model.applyIDANPCalcExpireRow(item, isMarketRent, noOfperiods, false, monthlyData, expirePeriod, startingAmount);
                        break;
                    case "selected expire periods":
                          model.applyIDANPCalcExpireRow(item, isMarketRent, noOfperiods, true, monthlyData, expirePeriod, startingAmount);
                        break;
                }
            });
     };


    model.applyIDANPCalcExpireRow = function(item, isMarketRent, noOfperiods, checkExpireMonth, monthlyData, expirePeriod, startingAmount){
        var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0, actualPeriods = 0, amnt = 0;
        startingAmount = parseFloat(startingAmount);    
        var leaseExpirePeriod = noOfperiods;
        var leaseExpirePeriodOrg = 0;
        leaseExpirePeriod = parseInt(item['leaseExpirePeriod']);
        leaseExpirePeriodOrg = parseInt(item['leaseExpirePeriod']);
        if (leaseExpirePeriod <= 0) {
            leaseExpirePeriod = noOfperiods;
        }
        actualPeriods = noOfperiods - leaseExpirePeriod;
        if((checkExpireMonth &&  parseInt(leaseExpirePeriodOrg) === parseInt(expirePeriod)) || (!checkExpireMonth)){
            amnt = parseFloat(parseFloat(startingAmount) / 100.0);
            for(var i = 1; i <= noOfperiods; i++) {
                if(i > leaseExpirePeriod && !isMarketRent){
                    item[model.periodSuf + i] = Math.round(parseFloat(item[model.periodSuf + leaseExpirePeriod]) + (amnt *  parseFloat(item[model.periodSuf + leaseExpirePeriod])),0);
                    item[model.periodSuf + i] = item[model.periodSuf + leaseExpirePeriod] + (actualPeriods === 0 ? 0 : Math.round(amnt / actualPeriods, 0));
                }
                else if(leaseExpirePeriodOrg <=0 && !isMarketRent){
                    item[model.periodSuf + i] = Math.round(parseFloat(item["scheduleRentAmount"]) + (amnt *  parseFloat(item["scheduleRentAmount"])),0);
                }
                else if(i > leaseExpirePeriod  && isMarketRent){
                    item[model.periodSuf + i] = Math.round(parseFloat(item[model.periodSuf + i]) + (amnt *  parseFloat(item[model.periodSuf + i])),0);
                }
            total +=  parseInt(item[model.periodSuf + i]);
            }
            item.total = total;
            item.isUpdated = true;
        }
    };

     model.applyIDANCCalcExpireRow = function(item, isMarketRent, noOfperiods, checkExpireMonth, monthlyData, expirePeriod, startingAmount){
        var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0, actualPeriods = 0;
        startingAmount = parseFloat(startingAmount);
        var leaseExpirePeriod = noOfperiods;
        var leaseExpirePeriodOrg = 0;
        leaseExpirePeriod = parseInt(item['leaseExpirePeriod']);
        leaseExpirePeriodOrg = parseInt(item['leaseExpirePeriod']);
        if (leaseExpirePeriod <= 0) {
            leaseExpirePeriod = noOfperiods;
        }
        actualPeriods = noOfperiods - leaseExpirePeriod;
        if((checkExpireMonth &&  parseInt(leaseExpirePeriodOrg) === parseInt(expirePeriod)) || (!checkExpireMonth)){
            for(var i = 1; i <= noOfperiods; i++) {
                if(i > leaseExpirePeriod && !isMarketRent){
                    item[model.periodSuf + i] = item[model.periodSuf + leaseExpirePeriod] + (actualPeriods === 0 ? 0 : Math.round(startingAmount / actualPeriods, 0));
                }
                else if(leaseExpirePeriodOrg <=0 && !isMarketRent){
                    monthlyVal = parseFloat(monthlyData[model.periodSuf + i]) || 0;
                    monthlyVal = monthlyVal === 0 ? 0 : Math.round(parseInt(item["scheduleRentAmount"]) / monthlyVal, 0) ;
                    item[model.periodSuf + i] = parseInt(item["scheduleRentAmount"]) + (Math.round(startingAmount / (actualPeriods === 0 ? 12 : actualPeriods), 0));
                }
                else if(i > leaseExpirePeriod  && isMarketRent){
                    item[model.periodSuf + i] = item[model.periodSuf + i] + (actualPeriods === 0 ? 0 : Math.round(startingAmount / actualPeriods, 0));
                }
            total +=  parseInt(item[model.periodSuf + i]);
            }
            item.total = total;
            item.isUpdated = true;
        }
    }; 

    model.getSelectedPeriodsCount = function(periodSelection, checkedPeriods, noOfperiods){
         var actualPeriods = 0;
         switch (periodSelection.toLowerCase()) {
            case "selected periods":
                for(var i = 1; i <= noOfperiods; i++) {
                     if(checkedPeriods[model.periodSuf + i]){
                        actualPeriods = actualPeriods + 1;
                     }
                }
                break;
        }
        return actualPeriods;
    }; 

    model.applyIDMPCalc = function(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, source, monthlyData, startingAmount, isExpiryIDMonthly){
         if(source.toLowerCase() === "starting-point"){   
            var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0;
            angular.forEach(data, function (item) {
                avg = 0; total = 0; totalPeriods = 0; resultData = {}; monthlyVal = 0;
                for(var i = 1; i <= noOfperiods; i++) {
                    monthlyVal = parseFloat(monthlyData[model.periodSuf + i]) || 0;
                    monthlyVal = monthlyVal / 100.0 * startingAmount;
                    resultData[model.periodSuf + i] = monthlyVal + parseInt(startingAmount);
                }
                model.applyChangeRentCalc(periodSelection, item, noOfperiods, checkedPeriods, resultData, expirePeriod);
            });
        }
        else{
            model.applyIDMPCalcCurRow(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, monthlyData, startingAmount, isExpiryIDMonthly); 
        }
     };

    model.applyIDMPCalcCurRow = function(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, monthlyData, startingAmount, isExpiryIDMonthly){
        var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0;
        var leaseExpirePeriod = noOfperiods;
        startingAmount = parseFloat(startingAmount);
        var leaseExpirePeriodOrg = 0;
        angular.forEach(data, function (item) {
               avg = 0; total = 0; totalPeriods = 0; resultData = {}; monthlyVal = 0;
               switch (periodSelection.toLowerCase()) {
                    case "selected periods":
                        for(var i = 1; i <= noOfperiods; i++) {
                            if(checkedPeriods[model.periodSuf + i]){
                                monthlyVal = parseFloat(monthlyData[model.periodSuf + i]) || 0;
                                monthlyVal = monthlyVal ===0 ? 0 : Math.round((item[model.periodSuf + i] * monthlyVal) / 100, 0) ;
                                item[model.periodSuf + i] = item[model.periodSuf + i] + monthlyVal;
                            }
                             total +=  parseInt(item[model.periodSuf + i]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "all periods":
                         for(var j = 1; j <= noOfperiods; j++) {
                                monthlyVal = parseFloat(monthlyData[model.periodSuf + j]) || 0;
                                monthlyVal = monthlyVal ===0 ? 0 : Math.round((item[model.periodSuf + j] * monthlyVal) / 100, 0) ;
                                item[model.periodSuf + j] = parseInt(item[model.periodSuf + j]) + parseInt(monthlyVal);
                                total +=  parseInt(item[model.periodSuf + j]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "expire periods":
                        model.applyIDMPCalcExpireCurRow(item, isMarketRent, noOfperiods, false, monthlyData, expirePeriod, isExpiryIDMonthly);
                        break;
                    case "selected expire periods":
                          model.applyIDMPCalcExpireCurRow(item, isMarketRent, noOfperiods, true, monthlyData, expirePeriod, isExpiryIDMonthly);
                        break;
                }
            });
    };

    model.applyIDMPCalcExpireCurRow = function(item, isMarketRent, noOfperiods, checkExpireMonth, monthlyData, expirePeriod, isExpiryIDMonthly){
        var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0;
        var leaseExpirePeriod = noOfperiods;
        var leaseExpirePeriodOrg = 0;
        leaseExpirePeriod = parseInt(item['leaseExpirePeriod']);
        leaseExpirePeriodOrg = parseInt(item['leaseExpirePeriod']);
        if (leaseExpirePeriod <= 0) {
            leaseExpirePeriod = noOfperiods;
        }
        if((checkExpireMonth &&  parseInt(leaseExpirePeriodOrg) === parseInt(expirePeriod)) || (!checkExpireMonth)){
            for(var i = 1; i <= noOfperiods; i++) {
                if(i > leaseExpirePeriod && !isMarketRent){
                    monthlyVal = isExpiryIDMonthly ? (parseFloat(monthlyData[model.periodSuf + leaseExpirePeriod]) || 0) : (parseFloat(monthlyData[model.periodSuf + i]) || 0);
                    monthlyVal = monthlyVal === 0 ? 0 : Math.round((parseInt(item[model.periodSuf + leaseExpirePeriod]) * monthlyVal ) /100, 0) ;
                    item[model.periodSuf + i] = item[model.periodSuf + leaseExpirePeriod] + monthlyVal;
                }
                else if(leaseExpirePeriodOrg <=0 && !isMarketRent){
                    monthlyVal = parseFloat(monthlyData[model.periodSuf + i]) || 0;
                    monthlyVal = monthlyVal === 0 ? 0 : Math.round((parseInt(item["scheduleRentAmount"]) * monthlyVal ) / 100, 0) ;
                    item[model.periodSuf + i] = parseInt(item["scheduleRentAmount"]) + monthlyVal;
                }
                else if(i > leaseExpirePeriod  && isMarketRent){
                    monthlyVal = parseFloat(monthlyData[model.periodSuf + i]) || 0;
                    monthlyVal = monthlyVal === 0 ? 0 : Math.round((parseInt(item[model.periodSuf + i]) * monthlyVal ) / 100, 0) ;
                    item[model.periodSuf + i] = item[model.periodSuf + i] + monthlyVal;
                }
            total +=  parseInt(item[model.periodSuf + i]);
            }
            item.total = total;
            item.isUpdated = true;
        }
    };
    

    

    model.applyIDMCCalcCurRow = function(isMarketRent, periodSelection, data, noOfperiods, checkedPeriods, expirePeriod, monthlyData, startingAmount, isExpiryIDMonthly){
        var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0;
        var leaseExpirePeriod = noOfperiods;
        startingAmount = parseFloat(startingAmount);
        var leaseExpirePeriodOrg = 0;
        angular.forEach(data, function (item) {
               avg = 0; total = 0; totalPeriods = 0; resultData = {}; monthlyVal = 0;
               switch (periodSelection.toLowerCase()) {
                    case "selected periods":
                        for(var i = 1; i <= noOfperiods; i++) {
                            if(checkedPeriods[model.periodSuf + i]){
                                monthlyVal = parseFloat(monthlyData[model.periodSuf + i]) || 0;
                                item[model.periodSuf + i] = item[model.periodSuf + i] + monthlyVal;
                            }
                             total +=  parseInt(item[model.periodSuf + i]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "all periods":
                         for(var j = 1; j <= noOfperiods; j++) {
                                monthlyVal = parseFloat(monthlyData[model.periodSuf + j]) || 0;
                                item[model.periodSuf + j] = item[model.periodSuf + j] + monthlyVal;
                                total +=  parseInt(item[model.periodSuf + j]);
                        }
                        item.total = total;
                        item.isUpdated = true;
                        break;
                    case "expire periods":
                        model.applyIDMCCalcExpireCurRow(item, isMarketRent, noOfperiods, false, monthlyData, expirePeriod, isExpiryIDMonthly);
                        break;
                    case "selected expire periods":
                          model.applyIDMCCalcExpireCurRow(item, isMarketRent, noOfperiods, true, monthlyData, expirePeriod, isExpiryIDMonthly);
                        break;
                }
            });

    };

    model.applyIDMCCalcExpireCurRow = function(item, isMarketRent, noOfperiods, checkExpireMonth, monthlyData, expirePeriod, isExpiryIDMonthly){
        var avg = 0, total = 0, totalPeriods = 0, resultData = {}, monthlyVal = 0;
        var leaseExpirePeriod = noOfperiods;
        var leaseExpirePeriodOrg = 0;
        leaseExpirePeriod = parseInt(item['leaseExpirePeriod']);
        leaseExpirePeriodOrg = parseInt(item['leaseExpirePeriod']);
        if (leaseExpirePeriod <= 0) {
            leaseExpirePeriod = noOfperiods;
        }
        if((checkExpireMonth &&  parseInt(leaseExpirePeriodOrg) === parseInt(expirePeriod)) || (!checkExpireMonth)){
            for(var i = 1; i <= noOfperiods; i++) {
                if(i > leaseExpirePeriod && !isMarketRent){
                    monthlyVal = isExpiryIDMonthly ? (parseFloat(monthlyData[model.periodSuf + leaseExpirePeriod]) || 0) : (parseFloat(monthlyData[model.periodSuf + i]) || 0);
                    item[model.periodSuf + i] = item[model.periodSuf + leaseExpirePeriod] + monthlyVal;
                }
                else if(leaseExpirePeriodOrg <=0 && !isMarketRent){
                    monthlyVal = parseFloat(monthlyData[model.periodSuf + i]) || 0;
                    item[model.periodSuf + i] = item["scheduleRentAmount"] + monthlyVal;
                }
                else if(i > leaseExpirePeriod  && isMarketRent){
                    monthlyVal = parseFloat(monthlyData[model.periodSuf + i]) || 0;
                    item[model.periodSuf + i] = item[model.periodSuf + i] + monthlyVal;
                }
            total +=  parseInt(item[model.periodSuf + i]);
            }
            item.total = total;
            item.isUpdated = true;
        }
    };
    

     model.applyAverageCalc = function(periodSelection, data, noOfperiods, checkedPeriods, expirePeriod){
            angular.forEach(data, function (item) {
                var avg = 0, total = 0, totalPeriods = 0, resultData = {};
                for(var i = 1; i <= noOfperiods; i++) {
                    if(checkedPeriods[model.periodSuf + i]){
                       total +=  parseInt(item[model.periodSuf + i]);
                       totalPeriods = totalPeriods + 1; 
                    }
                }
                avg = totalPeriods === 0 ? 0 : Math.round((total/totalPeriods),0);
                for(var j = 1; j <= noOfperiods; j++) {
                   resultData[model.periodSuf + j] = avg;
                }
                model.applyChangeRentCalc(periodSelection, item, noOfperiods, checkedPeriods, resultData, expirePeriod);
            });
     };           

      model.applyChangeCalc = function(periodSelection, data, noOfperiods, checkedPeriods, resultData, expirePeriod){
             angular.forEach(data, function (item) { 
                model.applyChangeRentCalc(periodSelection, item, noOfperiods, checkedPeriods, resultData, expirePeriod);
             });   
      };   
       
       model.applyChangeRentCalc = function(periodSelection, item, noOfperiods, checkedPeriods, resultData, expirePeriod){
                switch (periodSelection.toLowerCase()) {
                    case "selected periods":
                        model.applyPeriods(item, noOfperiods, checkedPeriods, resultData, true);
                        break;
                    case "all periods":
                        model.applyPeriods(item, noOfperiods, checkedPeriods, resultData, false);
                        break;
                    case "expire periods":
                         model.applyExpirePeriods(item, noOfperiods, checkedPeriods, resultData, false);
                        break;
                    case "selected expire periods":
                         model.applySelectedExpirePeriods(item, noOfperiods, checkedPeriods, resultData, expirePeriod);
                        break;
                }
       };


      model.applyPeriods = function(item, noOfperiods, checkedPeriods, resultData, toCheckPeriods){
           var total = 0; 
           //angular.forEach(data, function (item) {
                    total = 0;
                    for(var i = 1; i <= noOfperiods; i++) {
                       if(toCheckPeriods && checkedPeriods[model.periodSuf + i]){
                           item[model.periodSuf + i] = resultData[model.periodSuf + i];
                        }
                        else if(!toCheckPeriods){
                           item[model.periodSuf + i] = resultData[model.periodSuf + i];
                        }
                        total +=  parseInt(item[model.periodSuf + i]);
                    }
                    item.total = total;
                    item.isUpdated = true;
             //});
      };

      model.applyExpirePeriods = function(item, noOfperiods, checkedPeriods, resultData, toCheckPeriods){
           var total = 0, leaseExpirePeriod = 0; 
          // angular.forEach(data, function (item) {
                    total = 0;
                    leaseExpirePeriod = parseInt(item.leaseExpirePeriod) < 0 ? 0 : parseInt(item.leaseExpirePeriod);  
                    for(var i = 1; i <= noOfperiods; i++) {
                       if(toCheckPeriods && checkedPeriods[model.periodSuf + i] && parseInt(i) > parseInt(leaseExpirePeriod)){
                           item[model.periodSuf + i] = resultData[model.periodSuf + i];
                        }
                        else if(!toCheckPeriods && parseInt(i) > parseInt(leaseExpirePeriod)){
                           item[model.periodSuf + i] = resultData[model.periodSuf + i];
                        }
                        total +=  parseInt(item[model.periodSuf + i]);
                    }
                    item.total = total;
                    item.isUpdated = true;
            // });
      }; 

     model.applySelectedExpirePeriods = function(item, noOfperiods, checkedPeriods, resultData, expirePeriod){
           var total = 0, leaseExpirePeriod = 0; 
           //angular.forEach(data, function (item) {
                    total = 0;
                    leaseExpirePeriod = parseInt(item.leaseExpirePeriod) < 0 ? 0 : parseInt(item.leaseExpirePeriod);
                    if(parseInt(leaseExpirePeriod) === parseInt(expirePeriod)){  
                        for(var i = 1; i <= noOfperiods; i++) {
                           if(parseInt(i) > parseInt(leaseExpirePeriod)){
                               item[model.periodSuf + i] = resultData[model.periodSuf + i];
                            }
                            total +=  parseInt(item[model.periodSuf + i]);
                        }
                    }
                    item.total = total;
                    item.isUpdated = true;
             //});
      };      


       model.getFilterRecords = function(data, rentMethod, assetType, parentID, childID){
            var returnRecords;
             switch (rentMethod.toLowerCase()) {
                case "service group":
                    returnRecords =  model.getFilterRows(data,  parentID, childID, "normal", "serviceGroupID", "unitTypeID");
                       break; 
                case "program":
                    returnRecords =  model.getFilterRows(data,  parentID, childID, "normal", "programID", "unitTypeID");
                    break;
                case "unit":
                    if (assetType.toLowerCase() === "student living") {
                    returnRecords =  model.getFilterRows(data,  parentID, childID, "normal", "apartmentID", "unitID");
                    }
                    else if (assetType.toLowerCase() !== "student living") {
                        returnRecords =  model.getFilterRows(data,  parentID, childID, "normal", "unitTypeID", "unitID");
                    }
                    break;
                case "unit type":
                    if (assetType.toLowerCase() === "student living") {
                    returnRecords =  model.getFilterRows(data,  parentID, childID, "room", "unitTypeID", "roomNumber");
                    }
                    else if (assetType.toLowerCase() !== "student living") {
                    returnRecords =  model.getFilterRows(data,  parentID, childID, "unit type", "unitTypeID", "unitTypeID");
                    }
                    break;
            }
            return returnRecords;
            
       };

       model.getFilterRows = function(data, parentID, childID, type, parentText, childText){
        var returnRecords;
            if(type !== "unit type" && type !== "room"){
                    returnRecords = $filter('filter')(data, function (d) {
                                                return d.rowType !== "groupHeader" && (parseInt(parentID) >= 0 ?  parseInt(d[parentText]) === parseInt(parentID)  : (parseInt(d[parentText]) === 0 ? 1 : parseInt(d[parentText]))) && (parseInt(childID) > 0 ?  parseInt(d[childText]) === parseInt(childID)  : parseInt(d[childText]));
                             }); 
            }
            else if(type === "room"){
                    returnRecords = $filter('filter')(data, function (d) {
                                                return d.rowType !== "groupHeader" && (parseInt(parentID) >= 0 ?  parseInt(d[parentText]) === parseInt(parentID)  : (parseInt(d[parentText]) === 0 ? 1 : parseInt(d[parentText]))) && (parseInt(childID) < 0 ? d[childText] :  d[childText] === childID);
                             }); 
            }
            else{

                  returnRecords = $filter('filter')(data, function (d) {
                                                return d.rowType !== "groupHeader" && (parseInt(parentID) > 0 ?  parseInt(d[parentText]) === parseInt(parentID)  : parseInt(d[parentText]));
                                                  
                             }); 
            }

        return returnRecords;

       };               
       
       return model;    
        //return model.init();
    }

    angular
          .module('budgeting')
          .factory('ChangeRent', ['$filter', 'ChangeRentMR', factory]);
})(angular);

