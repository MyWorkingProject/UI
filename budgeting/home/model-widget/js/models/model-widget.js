//  User Properties Model

(function (angular) {
    'use strict';
    var fn = angular.noop;
    function factory(manageFilters,session,modelWidgetSVC,preferences) {
        var translate, model, form;
        model = {
            accTypeFilters:[]
        };

      model.emptyData = {
            selFilterValue:0,
            filterOptions: [{
                "name": "All Years",
                "value": 0
            }],
            
        };
        model.form = angular.extend({}, model.emptyData);
        

         model.getBudgetYears = function () {
            return model
                .loadBudgetYears();
               
        };

        model.loadBudgetYears = function () {
            return manageFilters.budgetYears.get(model.updateFiltTypes).$promise;
        };

        model.getBudgetYearsFilters = function () {
            return model.form.filterOptions;
        };

        model.updateFiltTypes = function (data) {
            if (model.form.filterOptions.length === 1) {
                var accountTypes = model.getAccountTypeArray(data.records);               
                model.form.filterOptions = model.form.filterOptions.concat(accountTypes);
                model.accTypeFilters = model.form.filterOptions;
            }
           
        };

        model.getAccountTypeArray = function (records) {
            var accTypes = [];
            angular.forEach(records, function (item) {
                var newItem = { "name": item.budgetYearText, "value": item.budgetYearValue };
                accTypes.push(newItem);
            });
            return accTypes;
        };

       model.setSelectedFilterValue=function(val){
            model.form.selFilterValue=val;
        };

       model.getSelectedYear=function(){
           if(model.form.selFilterValue === "All"){
                return model.form.selFilterValue;
            }             
            return parseInt(model.form.selFilterValue);
      };

                
        model.getbudgetModelData = function (pg) { 
             var params = {
                propertyID: session.getPropertyID()  
            };           
           return modelWidgetSVC.getbudgetModelList(params, pg);
          

        };

        model.saveFilterData=function(filterData){         
            var data=model.buildFilterDataToSave(filterData);
            preferences.savePreferences(data);
            // return modelWidgetSVC.updateBudgetModelFilters(data).$promise;
        };

        model.checkForBudgetYear=function(data){
            var list;
            if(data["budgetYear"]===undefined){
                     list=model.buildData("budgetYear","All"); 
                }
                else if(data["budgetYear"]!==undefined){
                       list=model.buildData("budgetYear",data["budgetYear"] ===0 ? "All": data["budgetYear"]);                       
                }
              return list;
        };

        model.checkForModelType=function(data){
            var list;
            if(data["modelType"]===undefined){
                     list=model.buildData("modelType","All");   
                }
            else if(data["modelType"]!==undefined){
                    list=model.buildData("modelType",data["modelType"]); 
            }

            return list;
        };

        model.checkForProperty=function(data){
            var list;
            if(data["property"]===undefined){
                    list=model.buildData("property","");   
            }
            else if(data["property"]!==undefined){
                    list=model.buildData("property",data["property"]); 
            }
            return list;
        };


         model.buildFilterDataToSave=function(data){
             var filList=[];
               var list;
            if(Object.keys(data).length >0){
               list=model.checkForBudgetYear(data);
               filList.push(list);

               list=model.checkForModelType(data);
               filList.push(list);
               
               list=model.checkForProperty(data);
               filList.push(list); 
            }
            else{
                  filList=model.getEmptyFilterList();
            }
            return filList;
        };

        model.buildData=function(field,value){
                return {
                            "screen":"DashBoardModels" ,
                            "fieldType":field,
                            "fieldValue":value
                        };    
        };

        model.getEmptyFilterList=function(){
                 var list=[{
                        "screen":"DashBoardModels" ,
                        "fieldType":"budgetYear",
                        "fieldValue":"All"
                    },{
                        "screen":"DashBoardModels" ,
                        "fieldType":"property",
                        "fieldValue":""
                    },{
                        "screen":"DashBoardModels" ,
                        "fieldType":"modelType",
                        "fieldValue":"All"
                    }];

            return list;
        };

              
        model.getFilterData=function(){
            var params={"screenName":"dashBoardModels" };
           return preferences.getPreferencesPromise(params);
             // return modelWidgetSVC.getBudgetModelFilters(params).$promise;
        };
       
        return model;
    }

   angular
        .module('budgeting')
        .factory('modelWidget', [ 'budgetYearFilters', 'sessionInfo', 'modelWidgetSVC','preferences', 
            factory
        ]);
})(angular);