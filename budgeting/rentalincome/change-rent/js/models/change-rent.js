//  model 

(function (angular) {
    "use strict";

    function changeRentModel(changeRentGridData, changeRentMethods, changeRentSources , pricingUtils, i18n) {
        var defaultData = {
            method:  changeRentMethods.STRAIGHT_MONTHLY.value,//changeRentMethods.getStrMntVal(),
            source: changeRentSources.START_PT.value,
            amt1: null,
            amt2: null,
            amtMonthly: null,
            noOfperiods:0,
            baseValueData: null, //active period selected by the user 
            affectedPeriod: null, //in case there's a date range set, limit the columns to within this period
            gridData: null, //grid content
            sourceGridData: null, //grid data for different sources
            unitTypeDescr:"",
            unitDescr:"",
            periodSelection: "all periods",
            unitType:-1,
            unit:-1,
            header:"Change Rent",
            showUnit: false,
            expirePeriod:1,
            showExpirePeriod: false,
            showGrid: false
        };

        var model = {};

        //initialize data
        model.data = angular.copy(defaultData);

        model.getActiveRow = function() {
            return model.data.baseValueData;
        };
        model.setActiveRow = function(activeRow) {
            model.data.baseValueData = activeRow;
        };

        model.selectedMethod = function(){
            return model.data.method;
        };

        model.roundAmnt1 = function(){
           model.data.amt1 =  pricingUtils.roundNumber(model.data.amt1, 4);
        };

        model.roundAmnt2 = function(){
           model.data.amt2 = pricingUtils.roundNumber(model.data.amt2, 4);
        };

        model.showExpirePeriod = function(val){
           if(val === "selected expire periods"){
               model.data.showExpirePeriod = true;
           }
           else{
               model.data.showExpirePeriod = false; 
           }  
        };

        model.getSelectedData = function(){
         var data = {};
             data.method = model.data.method;
             data.amount = model.data.amt1;
             data.source = model.data.source;
             data.factor = model.data.amt2;
             data.periodSelection = model.data.periodSelection;   
             data.unitTypeID = model.data.unitType;
             data.unitID = model.data.unit;
             data.monthlyData = model.getMonthlyRowData();
             data.expirePeriod = model.data.expirePeriod;
         return data;   
        };

        model.setARDefaultOptions = function(){
            model.data.periodSelection = "expire periods";
        };


        model.setDefaultPeriod = function(){
            model.data.periodSelection = "all periods";
        }; 

        model.updateHeader = function(rentText, rentMethod, assetType){
             model.data.header =  i18n.translate('bdgt_change_rent_hd') + rentText;
             model.data.showUnit = true;
             switch (rentMethod.toLowerCase()) {
                case "unit":
                    if(assetType.toLowerCase() == "student living"){
                        model.data.unitTypeDescr = i18n.translate('bdgt_change_rent_unit_desc');
                        model.data.unitDescr = i18n.translate('bdgt_change_rent_bed_type_desc');
                    }
                    else{
                        model.data.unitTypeDescr = i18n.translate('bdgt_change_rent_unitType_desc');
                        model.data.unitDescr = i18n.translate('bdgt_change_rent_unit_desc');
                    }
                    break;
                case "unit type":
                     if(assetType.toLowerCase() == "student living"){
                        model.data.unitTypeDescr = i18n.translate('bdgt_change_rent_unitType_desc');
                        model.data.unitDescr = i18n.translate('bdgt_change_rent_bed_type_desc');
                    }
                    else{
                        model.data.unitTypeDescr = i18n.translate('bdgt_change_rent_unitType_desc');
                        model.data.showUnit = false;
                    }
                    break;
                case "program":
                      model.data.unitTypeDescr = i18n.translate('bdgt_change_rent_program_desc');
                      model.data.unitDescr = i18n.translate('bdgt_change_rent_unitType_desc');
                    break;
                case "service group":
                    model.data.unitTypeDescr = i18n.translate('bdgt_change_rent_service_desc');
                    model.data.unitDescr = i18n.translate('bdgt_change_rent_unitType_desc');
                    break;
            } 
        };

        // refer to changeRentGridData for gridData's array contents
        model.getSourceRowData = function() {
            return model.data.gridData[0];
        };
        model.getMonthlyRowData = function() {
            return model.data.gridData[1];
        };
        model.getApplyChangesRowData = function() {
            return model.data.gridData[2];
        };

        model.resetApplyChangesRowData = function() {
            angular.forEach(model.data.gridData[2], function (val, key) {
               if (pricingUtils.isJsonKeyMonth(key)) { 
                    model.data.gridData[2][key] = true;
                }
            });
        };

        model.getResultsRowData = function() {
            return model.data.gridData[3];
        };

        model.setSourceRowData = function(data, noOfperiods) {
            if(data.length > 0){ 
                //model.data.gridData[0] = data[0];
                model.copyPeriodData(data[0], noOfperiods);
            }
            model.setActiveRow(data[0]);
        }; 

        model.copyPeriodData = function(data, noOfperiods){
            for (var x = 1; x <= noOfperiods; x++) {
                model.data.gridData[0]["period" + x] = data["period" + x];
            }
            model.data.gridData[0]["total"] = data["total"];    
        };

        model.getSelectedUnitType = function(){
            return model.data.unitType;
        };       

        model.resetGridData = function() {
            model.data.gridData = [];
        };
        model.setGridData = function(stateParams) {
            model.data.gridData = new changeRentGridData(stateParams);
        };
        model.getGridData = function() {
            return model.data.gridData;
        };

        model.setSourceGridData = function(sourceData) {
            model.data.sourceGridData = sourceData;
        };
        model.getSourceGridData = function(source) {
            return model.data.sourceGridData[source];
        };

        //calculate according to the method and other user inputs
        model.calculate = function (baseValueData) {
            //model.setActiveRow(baseValueData);

            var currMethod = model.data.method;
            switch (currMethod) {
                case changeRentMethods.STRAIGHT_MONTHLY.value:
                    model.calculateMonthly();
                    break;
                case changeRentMethods.STRAIGHT_ANNUALLY.value:
                    model.calculateAnnually();
                    break;
                case changeRentMethods.AVERAGE.value:
                    model.calculateAverage();
                    break;
                case changeRentMethods.QUARTERLY.value:
                    model.calculateQuarterly();
                    break;
                case changeRentMethods.MULTIPLICATION.value:
                    model.calculateMultiplication();
                    break;
                case changeRentMethods.ID_MONTHLY_CURRENCY.value:
                case changeRentMethods.ID_MONTHLY_PERCENTAGE.value:
                    model.calculateIDMonthly(currMethod);
                    break;
                case changeRentMethods.ID_ANNUALLY_CURRENCY.value:
                case changeRentMethods.ID_ANNUALLY_PERCENTAGE.value:
                    model.calculateIDAnnually(currMethod);
                    break;
                case changeRentMethods.COMPOUND_CURRENCY.value:
                case changeRentMethods.COMPOUND_PERCENTAGE.value:
                    model.calculateCompoundingValue(currMethod);
                    break;
            }
        };

        model.getComputeValue = function(val) {
            if(val === null || val === undefined) {
                return 0;
            }
            return parseFloat(val);
        };

        model.calculateMonthly = function (amountPerMonth) {
            var amt = amountPerMonth || parseFloat(model.data.amt1),
                baseValueGridData = model.getActiveRow(),
                resultsGridData = model.getResultsRowData(),
                applyChangesGridData = model.getApplyChangesRowData(),
                total = 0;

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    newVal = amt;
                } else {
                    newVal = baseValueGridData[key];
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal);
                total += model.getComputeValue(newVal);
            });   
            resultsGridData.total = Math.round(total);
        };

        model.calculateAnnually = function () {
            var total = parseFloat(model.data.amt1),
                amt = 0,
                applicableMonths = model.countApplicableMonths();

            amt = (total * 1.0) / applicableMonths;
            model.calculateMonthly(amt);
        };

        model.calculateAverage = function () {
            var applyChangesGridData = model.getApplyChangesRowData(),  
                resultsGridData = model.getResultsRowData(),                              
                sourceGridData = model.getSourceRowData(),
                amt = 0,
                applicableMonths = 0,
                activeYearTotal = 0,
                total = 0;

            angular.forEach(sourceGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                if(applyChangesGridData[key] === true) {
                    applicableMonths++;

                    if(val !== null) {
                        activeYearTotal += parseFloat(val);
                    }
                }
            });

            if(applicableMonths > 1) {
                model.data.affectedPeriod = applicableMonths + " periods";                
            } else {
                model.data.affectedPeriod = applicableMonths + " period";                
            }
            amt = activeYearTotal / applicableMonths;

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    newVal = amt;
                } else {
                    newVal = sourceGridData[key];
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal);
                total += model.getComputeValue(newVal);
            });   
            resultsGridData.total = Math.round(total);
        };

        model.calculateQuarterly = function () {
            var amt = parseFloat(model.data.amt1),
                quarter = parseInt(model.data.amt2),
                resultsGridData = model.getResultsRowData(),
                applyChangesGridData = model.getApplyChangesRowData(),
                baseValueGridData = model.getActiveRow(),
                index = 1,
                total = 0;

            quarter = quarter % 3; //determine which quarter it 
            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (index % 3 == quarter) {
                    if(applyChangesGridData[key] === true) {
                        newVal = amt;
                    } else {
                        newVal = baseValueGridData[key];
                    }  
                } else {
                    newVal = null;
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal);
                total += model.getComputeValue(newVal);
                index++;
            });
            resultsGridData.total = Math.round(total);
        };

        model.calculateMultiplication = function () {
            var amt = parseFloat(model.data.amt1),
                multiplier = parseFloat(model.data.amt2);

            var amtPerMonth = amt * multiplier;
            model.calculateMonthly(amtPerMonth);
        };

        model.calculateCompoundingValue = function (currMethod) {
            var amt = parseFloat(model.data.amt1),
                factor = parseFloat(model.data.amt2),
                percent = factor / 100.00,
                resultsGridData = model.getResultsRowData(),
                applyChangesGridData = model.getApplyChangesRowData(),
                baseValueGridData = model.getActiveRow(),                
                total = 0;

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    newVal = amt;

                    //increase value for next iteration
                    if (currMethod == changeRentMethods.COMPOUND_CURRENCY.value) {
                        amt += factor;
                    } else { //changeRentMethods.COMPOUND_PERCENTAGE
                        amt += amt * percent;
                    }
                } else {
                    newVal = baseValueGridData[key];
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal);
                total += model.getComputeValue(newVal);
            });
            resultsGridData.total = Math.round(total);
        };

        model.calculateIDAnnually = function (currMethod) {
            var amt = parseFloat(model.data.amt1),
                resultsGridData = model.getResultsRowData(),
                applyChangesGridData = model.getApplyChangesRowData(),
                applicableMonths = model.countApplicableMonths(),
                baseValueGridData = model.getActiveRow(),
                total = 0, annaulAmount = 0;

            if (currMethod == changeRentMethods.ID_ANNUALLY_CURRENCY.value) {
                amt = amt / applicableMonths;
            }
            else{
                var annualTotal = parseFloat(baseValueGridData["total"]);
                annaulAmount = (annualTotal * amt) / 100;
                amt = applicableMonths === 0 ? 0 : annaulAmount / applicableMonths;
            }    
            /* else {
                amt = amt / 100.0; //treat as percent
            }*/

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    newVal = parseFloat(baseValueGridData[key]) || 0;
                    newVal += amt;
                   /* if (currMethod == changeRentMethods.ID_ANNUALLY_CURRENCY.value) {
                        newVal += amt;
                    } else {
                        newVal += (newVal * amt);
                    }*/
                } else {
                    newVal = baseValueGridData[key];
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal);
                total += model.getComputeValue(newVal);
            });
            resultsGridData.total = Math.round(total);
        };

        model.calculateIDMonthly = function (currMethod) {
            var monthlyGridData = model.getMonthlyRowData(),
                applyChangesGridData = model.getApplyChangesRowData(),
                resultsGridData = model.getResultsRowData(),
                sourceGridData = model.getSourceRowData(),
                baseValueGridData = model.getActiveRow(),
                sourceData = model.data.source,
                total = 0;

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    //get initial value based on source data
                    var base = 0;
                    if (sourceData == changeRentSources.START_PT.value) {
                        base = model.data.amt1;
                    } else {
                        base = sourceGridData[key];
                    }
                    base = parseFloat(base) || 0;

                    //get value that will be added to the additional value based on method
                    var addends = parseFloat(monthlyGridData[key]) || 0;
                    if (currMethod == changeRentMethods.ID_MONTHLY_PERCENTAGE.value) {
                        addends = addends / 100.0 * base;
                    }

                    //get sum and assign
                    newVal = base + addends;
                } else {
                    if (sourceData == changeRentSources.START_PT.value) {
                        newVal = model.data.amt1;
                    } else {
                        newVal = sourceGridData[key]; //use source row
                    }
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal);
                total += model.getComputeValue(newVal);
            });
            resultsGridData.total = Math.round(total);
        };

        // calculate total value of a row.
        model.calculateTotal = function(rowType, periodId, newVal) {
            if(rowType == "results") {
                var resultsRow = model.getResultsRowData(),
                    total = 0;

                angular.forEach(resultsRow, function (val, key) {
                    if (!pricingUtils.isJsonKeyMonth(key)) {
                        return;
                    }

                    if(key == periodId) {
                        val = newVal;
                    }

                    total += model.getComputeValue(val);
                });
                resultsRow.total = Math.round(total);
            }
        };

        model.countApplicableMonths = function () {
            var applyChangesGridData = model.getApplyChangesRowData(),
                count = 0;

            angular.forEach(applyChangesGridData, function (isApplicable, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    if (isApplicable === true) {
                        count++;
                    }
                }                
            });

            return count;
        };

        //sets monthly data when amount has been input
        model.setMonthlyGridData = function (defaultAmt) {
            var monthlyGridData = model.getMonthlyRowData();
            angular.forEach(monthlyGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    monthlyGridData[key] = pricingUtils.displayAsCurrency(defaultAmt);
                }
            });
        };

        model.resetMonthlyGridData = function() {
            var monthlyGridData = model.getMonthlyRowData();
            angular.forEach(monthlyGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    monthlyGridData[key] = null;
                }
            });
            monthlyGridData.monthlyAmt = null;
        };

        model.resetResultsGridData = function() {
            var resultsGridData = model.getResultsRowData();
            angular.forEach(resultsGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    resultsGridData[key] = null;
                }
            });
            resultsGridData.total = 0;
        };

        model.setSelectedSourceRowData = function(source) {
            var sourceGridData = model.getSourceRowData(),
                newSourceGridData = model.getSourceGridData(source);

            angular.forEach(sourceGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    sourceGridData[key] = pricingUtils.displayAsCurrency(newSourceGridData[key]);
                }
            });
            sourceGridData.total = newSourceGridData.total;            
        };

        model.reset = function () {
            model.data = angular.copy(defaultData);
        };

        
        return model;        
    }

    angular
        .module("budgeting")
        .factory("changeRentModel", [
            "changeRentGridData",
            "changeRentMethods",
            "changeRentSources",
            "rentPricingUtility",
            "changeRentTranslatorSvc",
            changeRentModel
        ]);

})(angular);