//  Users List Model

(function (angular) {
    "use strict";

    function factory( modelWidget,gridModel, gridConfig,langTranslate,eventStream) {
        var grid,event=eventStream(),
             translate = langTranslate('modelWidget').translate, 
            model = {},filterState ;    
            //grid.filtersModel.state.active
       
        model.filterState = {
            active: false
        };
        
        model.state={
              isActive:false
        };


        model.init = function () {
            grid = model.grid = gridModel();
            grid.subscribe('sortBy', model.load);
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            //grid.setFilterState(filterState);
            grid.setConfig(gridConfig).setEmptyMsg('No results were found');
            return model;
        };

        model.initLoad = function () {
            
             model.grid.setConfig(gridConfig);
            // model.getFilterData(); 
              
           //  model.load();
        };

        model.load = function () {            
          var data = grid.busy(true).flushData().getQuery();           
          return modelWidget.getbudgetModelData(data).success(model.setGridData);//add exception
        };

        model.paginate = function () {
            var data = grid.getQuery();
            return modelWidget.getbudgetModelData(data).success(model.addGridData);//add exception
        };

        model.setGridData = function (response) {         
            grid.setData(response).busy(false);
        };

      
        model.addGridData = function (response) {         
            grid.addData(response).busy(false);
        };

        model.sortBudgetModel=function(type){    
           model.grid.clearSortValue();                   
            model.grid.setSortValue (type,"ASC");
             model.load();
        };

        model.saveFilterData=function(){
             var filterData = grid.getFilterData();
             modelWidget.saveFilterData(filterData);
        };

        model.getFilterData=function(){
          //  modelWidget.getFilterData().then(model.setGridFilterData);
              modelWidget.getFilterData();
        };

       model.setGridFilterData=function(data){

          if(Object.keys(data).length >0){
            angular.forEach(data.records,function(item){           

                if(item.fieldValue !=="All" && item.fieldType =="budgetYear" ){
                    grid.setFilterValue("budgetYear", parseInt(item.fieldValue)); 
                }
                else if(item.fieldValue ==="All" && item.fieldType =="budgetYear"){
                    grid.setFilterValue("budgetYear", 0); 
                }                                
                else if(item.fieldValue !=="All"  && item.fieldType =="modelType"){
                    grid.setFilterValue(item.fieldType, item.fieldValue);  
                }
                else if(item.fieldValue !==""  && item.fieldType =="property"){
                     grid.setFilterValue(item.fieldType, item.fieldValue);  
                }
            });            
           
        }
           
            model.load();      
        
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('modelWidgetGridFactory', [
            'modelWidget',
            'rpGridModel',
            'modelWidgetConfig',
            'appLangTranslate',
            'eventStream',            
            factory
        ]);
})(angular);
