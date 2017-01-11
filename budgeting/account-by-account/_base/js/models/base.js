//ModelSettingsNav

(function (angular) {
    "use strict";

    function accountByAccountBase(budgetDetails) {     
        var model = {};
        
        model.form={

              modelDetails: ""
             /*   modelDetails:{
                                 "distributedID": 110,
                                "propertyID": 1192563,
                                "propertyName": "Meadow Bay",
                                "modelName": "Account by Account",
                                "budgetType": "Forecast",
                                "budgetYear": 2012,
                                "assettype": "Conventional",
                                "isFinal": true,
                                "startMonth": 1,
                                "noOfPeriods": 12,
                                "currentSequence": 2,
                                "noOfUnits": 50,
                                "rentableSqFt": 88600,
                                "masterChartID": 18,
                                "masterChartName": "Meadow Bay 2012 COA",
                                "unitCustomLabel": null

                            } */
            };

        model.setBudgetDetails=function(distID){
            //if(!budgetDetails.ready){
            //        budgetDetails.getPropertyInfo(distID);
            //}
            //else{
            //      model.assBugetDetails(budgetDetails.getModelDetails());
            //}
            model.assBugetDetails(budgetDetails.getModelDetails());
        };

      

       model.getDistributedID=function(){
          return budgetDetails.getModelDetails().distributedID;            
       };

       model.getBudgetModelID=function(){
          return budgetDetails.getModelDetails().budgetModelID;            
       };

       model.getNoOfPeriods=function(){
          return budgetDetails.getModelDetails().noOfPeriods;            
       };

       model.getBudgetYear=function(){
          return budgetDetails.getModelDetails().budgetYear;            
       };

       model.getStartMonth=function(){
          return budgetDetails.getModelDetails().startMonth;            
       };

       model.assBugetDetails=function(data){
            model.form.modelDetails =data;   
        };

        model.getBudgetModelDetails=function(){
            return  model.form.modelDetails;
        };

       model.getBudgetType=function(){
          return budgetDetails.getModelDetails().budgetType;            
       };

        model.getPropertyID=function(){
          return budgetDetails.getModelDetails().propertyID;            
       };

       model.getMasterChartID=function(){
          return budgetDetails.getModelDetails().masterChartID;            
       };


        return model;
    }

    angular
        .module("budgeting")
        .factory('accountByAccountBase', [
            'budgetDetails',          
            accountByAccountBase]);
})(angular);
