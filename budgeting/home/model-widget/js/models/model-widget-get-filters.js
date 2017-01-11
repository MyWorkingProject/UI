
(function (angular) {
    'use strict';
    var fn = angular.noop;
    function factory(widgetModel,modelWidgetSVC) {
       
       var  model = {
            ready: false          
        };

        model.isReady=function(){
           return  model.ready;
        };

        
        model.load = function() {
            return model
                .getFilters()
                .then(model.updateReadyFlag);
        };

        model.updateReadyFlag=function(data){
               // logc(data);
               model.updateFilterYear(data);
               model.ready=true;
        };

        model.updateFilterYear=function(data){
             if(Object.keys(data).length >0){
                angular.forEach(data.records,function(item){
                if(item.fieldValue !=="All" && item.fieldType =="budgetYear" ){               
                  widgetModel.setSelectedFilterValue(item.fieldValue);     
                         
                }
             });
           }
        };

        model.getFilters=function(){
              var params={"screenName":"dashBoardModels" };
              return modelWidgetSVC.getBudgetModelFilters(params).$promise;
        };

       model.reset=function(){
                model.ready=false;
        };

       
        return model;
    }

   angular
        .module('budgeting')
        .factory('modelWidgetGetFilters', [ 'modelWidget', 'modelWidgetSVC', 
            factory
        ]);
})(angular);