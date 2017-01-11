//  model 

(function (angular) {
    "use strict";

    function changeRentCalc(changeRentModel, changeRentFormModel, changeRentGridModel, pricingUtils, formConfig, $filter) {
       var calculator = {};
       //calculator.isDataAdded = false; 
       calculator.init = function(changeRentParamData){
            calculator.state = changeRentParamData;
            calculator.model = changeRentModel;
            calculator.form = changeRentFormModel;
            calculator.grid = changeRentGridModel;
            changeRentModel.updateHeader(calculator.state.rentText, calculator.state.rentMethod, calculator.state.assetType);
            changeRentFormModel.init(calculator.addActualRent());
            calculator.loadDropDownData();
            //changeRentModel.updateLables()
       };

      calculator.loadDropDownData = function(){
            formConfig.setPeriodOptions(calculator.state.rentMethod, calculator.state.isMarketRent);
            formConfig.setUnitTypeOptions(calculator.state.dropDownData.lstData);
            if(calculator.state.dropDownData.sbList.length > 0){
               formConfig.setUnitOptions(calculator.state.dropDownData.sbList); 
            }
            formConfig.setExpirePeriodsOptions(calculator.state.startMonth, calculator.state.startYear, calculator.state.noOfPeriods);
      };

      calculator.getPeriods  = function(){
            return calculator.state.noOfPeriods;
      };

      calculator.updateUnitData = function(parentID){
            if(calculator.state.dropDownData.sbList.length > 0 && parseInt(parentID) > 0)
            {
                var childRecords = $filter('filter')(calculator.state.dropDownData.sbList, function (d) {
                                        return parseInt(d.parentID) === parseInt(parentID);
                                       });
                formConfig.setUnitOptions(childRecords);     
            }
            else if(calculator.state.dropDownData.sbList.length > 0 && parseInt(parentID) === 0){
                  formConfig.setUnitOptions(calculator.state.dropDownData.sbList);  
            }
      };

      calculator.getSourceRowData = function(parentID, childID){
          return calculator.getFilterRecords(calculator.state.rentData, calculator.state.rentMethod, calculator.state.assetType, parentID, childID);
      };

      calculator.isUnitType = function(){
        return calculator.state.assetType.toLowerCase() !== "student living" && calculator.state.rentMethod.toLowerCase() === "unit type";
      };
    

      calculator.getFilterRecords = function(data, rentMethod, assetType, parentID, childID){
            var returnRecords;
             switch (rentMethod.toLowerCase()) {
                case "service group":
                    returnRecords =  calculator.getFilterRows(data,  parentID, childID, "normal", "serviceGroupID", "unitTypeID");
                       break; 
                case "program":
                    returnRecords =  calculator.getFilterRows(data,  parentID, childID, "normal", "programID", "unitTypeID");
                    break;
                case "unit":
                    if (assetType.toLowerCase() === "student living") {
                    returnRecords =  calculator.getFilterRows(data,  parentID, childID, "normal", "apartmentID", "unitID");
                    }
                    else if (assetType.toLowerCase() !== "student living") {
                        returnRecords =  calculator.getFilterRows(data,  parentID, childID, "normal", "unitTypeID", "unitID");
                    }
                    break;
                case "unit type":
                    if (assetType.toLowerCase() === "student living") {
                    returnRecords =  calculator.getFilterRows(data,  parentID, childID, "normal", "unitTypeID", "roomNumber");
                    }
                    else if (assetType.toLowerCase() !== "student living") {
                    returnRecords =  calculator.getFilterRows(data,  parentID, childID, "unit type", "unitTypeID", "unitTypeID");
                    }
                    break;
            }
            return returnRecords;
            
       };

       calculator.getFilterRows = function(data, parentID, childID, type, parentText, childText){
        var returnRecords;
            if(type !== "unit type"){
                    returnRecords = $filter('filter')(data, function (d) {
                                                return d.rowType !== "groupHeader" &&  (parseInt(parentID) > 0 ?  parseInt(d[parentText]) === parseInt(parentID)  : parseInt(d[parentText])) &&  parseInt(d[childText]) === parseInt(childID);
                             }); 
            }
            else{

                  returnRecords = $filter('filter')(data, function (d) {
                                                return d.rowType !== "groupHeader" && parseInt(d[parentText]) === parseInt(parentID);
                                                  
                             }); 
            }

        return returnRecords;

       };   

  
        

      calculator.periodChange = function(){
            if(changeRentModel.selectedMethod() === "applyAR"){
                formConfig.updateSelectPeriodOptions(calculator.state.rentMethod, changeRentModel.selectedMethod(), calculator.state.isMarketRent);
                changeRentModel.setARDefaultOptions();
            }
            else if(!calculator.state.isMarketRent) {
                formConfig.updateSelectPeriodOptions(calculator.state.rentMethod, changeRentModel.selectedMethod(), calculator.state.isMarketRent);
                changeRentModel.setDefaultPeriod();
            }
            if(changeRentModel.selectedMethod() === "id-monthly-currency-expiry" || changeRentModel.selectedMethod() === "id-monthly-percent-percent-expiry"){
                 changeRentModel.setARDefaultOptions();
            }
      };            
   
        
      calculator.addActualRent = function(){
            var needToAdd = false;
            if(!calculator.state.isMarketRent && calculator.state.rentMethod.toLowerCase() === "unit"){
                needToAdd = true;
                //calculator.isDataAdded = true;
                //changeRentFormModel.addRentMethods();
            }
            return needToAdd;
       };  
    
       calculator.hasActivePeriod = function () {
            if(!calculator.state.activePeriod || angular.equals(calculator.state.activePeriod, {})) {
                return false;
            }
            return true;
        };

        calculator.hasDateRange = function() {
            if(calculator.state.startYear && calculator.state.startMonth && calculator.state.noOfPeriods) {
                return true;
            }
            return false;
        };

        calculator.initDisplay = function () {
            if(!calculator.state || calculator.state.display === undefined) {
                console.error("Assign changeRentStateModel to the change rent");
                return; //don't do anything else
            }

            if ( /*calculator.hasActivePeriod() && */ calculator.hasDateRange()) { 
                var hasOtherSourceData = (calculator.state.sourceDropdownData !== null && calculator.state.sourceDropdownData !== undefined &&
                        calculator.state.sourceDropdownData.length > 0);

                calculator.state.display = true;

                if(hasOtherSourceData) {
                    calculator.assignSourceData(calculator.state.sourceDropdownData);                    
                    calculator.form.state.aveCalculationSource = true;                    
                } else {
                    calculator.form.state.aveCalculationSource = false;
                }

                changeRentModel.setGridData(calculator.state);
                changeRentGridModel.initGrid(calculator.state);
                
                changeRentGridModel.populateGrid(changeRentModel.getGridData());
                changeRentFormModel.prepareCalculator();
            } else {
                calculator.state.display = false;
            }
        };

        calculator.assignSourceData = function(sourceData) {
            var sourceList = [],
                sourceGridData = {};

            angular.forEach(sourceData, function(currSource) {
                sourceList.push({
                    value: currSource.rowTitle,
                    name: currSource.rowTitle
                });

                sourceGridData[currSource.rowTitle] = calculator.createGridData(currSource); 
            });
            sourceGridData["current-row"] = calculator.createGridData(calculator.state.activePeriod);

            changeRentFormModel.updateSourceList(sourceList);
            changeRentModel.setSourceGridData(sourceGridData);
        };

        calculator.createGridData = function(referenceValue) {
            var gridData = {};
            for(var i=0, max=calculator.state.noOfPeriods; i<max; i++) {
                var keyStr = pricingUtils.getMonthKey(i+1);
                gridData[keyStr] = referenceValue[keyStr];
            }
            gridData.total = referenceValue.total;

            return gridData;
        };

        calculator.reset = function () {
            if(calculator.state && calculator.state.reset) {
                calculator.state.reset();
            }

            changeRentModel.reset();
            changeRentFormModel.reset();
        };

        calculator.calculate = function (form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else{
                changeRentModel.roundAmnt1();
                changeRentModel.roundAmnt2();
                changeRentModel.calculate(calculator.state.activePeriod);
                form.$setPristine();   
            }
        };

        calculator.saveAndClose = function() {
          var resultsGridData =  calculator.applyCalculations();
         // calculator.reset();
         return resultsGridData;
           // $scope.done();
        };

        calculator.applyCalculations = function () {
            var resultsGridData = changeRentModel.getResultsRowData(),
                updatedGrid = {};

            angular.forEach(resultsGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    updatedGrid[key] = val;
                }
            });
            updatedGrid.total = resultsGridData.total;
            return updatedGrid;
          /*  $scope.done({
                "resultsGrid": updatedGrid,
                "startYear": calculator.state.startYear, 
                "startMonth": calculator.state.startMonth, 
                "noOfPeriods": calculator.state.noOfPeriods
            }); */
        };

        calculator.resetGrids = function () {
            changeRentModel.resetGridData();
        };  
        
        return calculator;        
    }

    angular
        .module("budgeting")
        .factory("changeRentCalc", [
           // "changeRentParamData",
            "changeRentModel",
            "changeRentFormModel",
            "changeRentGridModel",
            "rentPricingUtility",
            "changeRentFormConfig",
            "$filter",
               changeRentCalc
        ]);

})(angular);