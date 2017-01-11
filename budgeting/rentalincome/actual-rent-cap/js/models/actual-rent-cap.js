//  SampleCg Model

(function (angular) {
    'use strict';

    function factory(svc, langTranslate, budgetDetails, $filter) {
        var model = {};
          
        var translate;
        translate = langTranslate('actual-rent-cap').translate;
       
        model.emptyData = {
            capMethod: "None",
            actualRentCapID: 0,
            capValueData: {},
            state: {
                    edit:true,
                    isView:false
            },
            isFinal: false,
            originalMethod: "None",
            originalCapValueData: {},
            popDialog:""
            
        };

        model.paramModel = {};

        model.form = {};
        model.budgetDetails = {};

        model.init = function(paramModel){
            //angular.extend(model.form, model.emptyData);
            angular.copy(model.emptyData, model.form);
            model.paramModel = paramModel;
            model.budgetDetails = budgetDetails.getModelDetails();
            model.setFinal();
        };

        model.copyOriginalData = function(){
            model.paramModel.capValue =  angular.copy(model.form.originalCapValueData);
            model.paramModel.capMethod = model.form.originalMethod;
        };


        model.isFinal = function(){
            return model.form.isFinal;
        };

        model.hideWarning = function(){
            model.form.popDialog = "";
        };

        model.showWarning = function(){
            model.form.popDialog = "#alertZeroDialog";
        };


        model.setFinal = function(){
            var privalage = budgetDetails.getAccessPrivileges();
            model.form.isFinal = !privalage.allowEdit;
            model.form.errorMsg = privalage.errorMessage;
            if(model.form.errorMsg === "Finalized"){
                model.form.erroCode = "finalized";
            }
            else if(model.form.errorMsg === "Read Only"){
                model.form.erroCode = "read-only";
            }
            model.setState(privalage.allowEdit);
            //model.form.isFinal = model.budgetDetails.isFinal;
        };

        model.reset = function(){
            angular.copy(model.emptyData, model.form);
            model.budgetDetails = {};
            //model.state = { edit:true };
        };

        model.setState = function(val){
           model.form.state.edit = val;
           model.form.state.isView = !val; 
       }; 

       model.getState = function(){
            return model.form.state;
       }; 

       model.isDataValid = function(){
            if(model.form.capMethod === "Set value"){
               var invalidRecords = $filter('filter')(model.form.capValueData, function (d) {
                                    return (d.capAmount === "" || d.capAmount === undefined || parseInt(d.capAmount) < 0);
                                   });
               if(invalidRecords.length > 0 ) {
                    return false;
                }
            }
          return true;  
       };

       model.isZeroValues = function(){
            var invalidRecords = $filter('filter')(model.form.capValueData, function (d) {
                                    return (parseInt(d.capAmount) === 0);
                                   });
             if(invalidRecords.length > 0 && model.form.capMethod.toLowerCase() === "set value") {
                    return true;
                }
            return false;
       };  

        model.getKeyValue = function(key){
            return translate(key);
        };

        model.getDistID = function(){
            return model.budgetDetails.distributedID;
        };

        model.getIncomeModel = function(){
            return model.budgetDetails.incomeModel;
        };

        model.getScheduleMethod = function(){
            return model.budgetDetails.scheduleRentMethod;
        };

        model.getNoOfPeriods = function(){
            return model.budgetDetails.noOfPeriods;
        };

        model.getAssetType = function(){
            return model.budgetDetails.assettype;
        };
    
        model.getBudgetModelID = function(){
            return model.budgetDetails.budgetModelID;
        };

        model.getPropertyID = function(){
            return model.budgetDetails.propertyID;
        };

        model.getdataType = function(type, rentMethod, assetType){
            var dataType = type;
             if (assetType.toLowerCase() == "student living" && (rentMethod.toLowerCase() == "unit" || rentMethod.toLowerCase() == "unit type"))
            {
                if (rentMethod.toLowerCase() == "unit")
                {
                    dataType = dataType + "ByUnitStudent";
                }
                else if (rentMethod.toLowerCase() == "unit type")
                {
                    dataType = dataType + "ByUnitTypeStudent";
                }
            }
            else if (assetType.toLowerCase() == "student living")
            {
                dataType = dataType + "ByUnitTypeStudent";
            }
            else
            {
                if (rentMethod.toLowerCase() == "unit")
                {
                    dataType = dataType + "ByUnit";
                }
                else if (rentMethod.toLowerCase() == "unit type")
                {
                    dataType = dataType + "ByUnitType";
                }
                else if (rentMethod.toLowerCase() == "program")
                {
                    dataType = dataType + "ByProgram";
                }
                else if (rentMethod.toLowerCase() == "service group")
                {
                    dataType = dataType + "ByServiceGroup";
                }
                else
                {
                    dataType = dataType + "ByUnitType";
                }

            }
            return dataType;
        };

        model.showGridData = function(val){
         
        };

        model.getPropertyID = function(){
            return model.budgetDetails.propertyID;
        };    

        model.getActualRentCap = function(data){
            var params = { distributedID: model.getDistID(), 
                            propertyID:model.getPropertyID(), 
                            budgetModelID:model.getBudgetModelID(), 
                            mrDataType: model.getdataType("MarketRent", model.getIncomeModel(), model.getAssetType()) };
            return svc.getActualCapMethod(params);
        };

        model.saveData = function(){
            var postParams = {distributedID: model.getDistID(),
                            assettype: model.getAssetType()};
            var postData = { actualRentCapData: {
                                                 actualRentCapID: model.form.actualRentCapID,
                                                 propertyID: model.getPropertyID(), 
                                                 budgetModelID: model.getBudgetModelID(),
                                                 monthlyCapType: model.form.capMethod                       
                                                }
                           };
            if(model.form.capMethod === "Set value"){
                postData.actualRentCapValueData = model.form.capValueData;
            }
            return svc.updateActualCapMethod(postParams, postData).$promise;
        };

      /*  model.getActualRentCapValue = function(){
            var postRecords = [];
            model.form.capValueData.forEach(function (item) {
                    var data = {};
                    data.
            });
        }; */

        model.postActualRentCap = function(){
            
        };

        model.setActualRentCapData = function(response){
            if(response.records.actualRentCapData !== null && response.records.actualRentCapData !== undefined){
                model.form.capMethod =  response.records.actualRentCapData.monthlyCapType;
                model.form.actualRentCapID =  response.records.actualRentCapData.actualRentCapID;
            }
            else{
                model.form.capMethod =  "None";
                model.form.actualRentCapID = 0;
            }
            model.form.originalMethod = model.form.capMethod;
            model.form.originalCapValueData = angular.copy(response.records.actualRentCapValueData);
            model.paramModel.capValue =  model.form.capValueData = response.records.actualRentCapValueData;
            model.paramModel.capMethod = model.form.capMethod;
        };

        model.copyChangedData = function(){
           model.form.originalMethod = model.form.capMethod;
           model.form.originalCapValueData = angular.copy(model.form.capValueData); 
        };

        model.isValidCap = function(){
            return model.form.capMethod !== "None" && model.form.capMethod !== "Market rent";
        };

        model.isValidateAmount = function (data) {
            if (data === "" || parseInt(data) < 0 ){
                return false;
            }
            else  if(data >= 0 ){
                return true;                
            }
           return false;
        };

       return model;    
        //return model.init();
    }

    angular
          .module('budgeting')
          .factory('actualRentCapModel', ['actualRentCapSvc', 'appLangTranslate', 'budgetDetails', '$filter', factory]);
})(angular);

