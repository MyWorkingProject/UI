//  Users List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, session ,budgetTasksSvc,$location,$stateParams) {
        var text, state, model;
        var translate;
        translate = langTranslate('budgetTasks').translate;
        model = {};

        model.text = {
            PageHeaderText: translate('tasks_PageHeaderText'),
            hideFilters: translate('tasks_hideFilters'),
            showFilters: translate('tasks_showFilters'),
            addTask: translate('tasks_addTask'),
            print: translate('tasks_print')

        };
        model.state = {
            tableFilter: {
                filter: false
            }
        };

       // model.baseParams = {};

       

         model.baseParams = {
            isDashboardTask: false,
            isBudgetModelTask: false,
            isDashboardPropertyTask: false,
            distributedId:0,            
            show:false
        };
        // angular.copy( model.baseParams,model.emptyData);
        model.getPropertyID=function(){
           return session.getPropertyID();
        };

          model.isProperty=function(){
                if(model.getPropertyID()>0){
                    return true;
                }
                else{
                    return false;
                }
            };


        model.updateTaskFlag=function(){
            var path=$location.absUrl();
              if (path.indexOf("workspaces/budget-tasks") > 0) {
                     if(model.isProperty()){
                        model.setDashboardPropertyTask(true);
                    }
                    else{
                        model.setDashboardTask(true);
                    }                 
              }
              else if (path.indexOf("/budgetmodel/") > 0) {
                model.setDistributedID($stateParams.distID);   
                  model.setBudgetModelStatus(true);
              }
              

        };

        model.setDashboardTask=function(flag){
            model.baseParams.isDashboardTask=flag;
        };

         model.setBudgetModelStatus=function(flag){
            model.baseParams.isBudgetModelTask=flag;
        };

        model.setDashboardPropertyTask=function(flag){
            model.baseParams.isDashboardPropertyTask=flag;
        };


        model.isDashboardTask=function(){
            return model.baseParams.isDashboardTask;
        };

         model.isBudgetModelTask=function(){
            return model.baseParams.isBudgetModelTask;
        };

        model.isDashboardPropertyTask=function(){
            return model.baseParams.isDashboardPropertyTask;
        };

        model.setDistributedID=function(id){
            var path=$location.absUrl();
            if (path.indexOf("/budgetmodel/")){
                    model.baseParams.distributedId=id;
            }      
        }; 

        model.getDistributedID=function(){
            return model.baseParams.distributedId  ;
        };

        model.getServiceParams=function(){
            var params = {             
                    propertyID: model.getPropertyID(),
                    distributedID:model.getDistributedID()
                };

            return params;
        };


        model.getTasData = function (pg) {        
           // model.updateTaskFlag();
            var params = model.getServiceParams();
               /* Dashboard Task For All Properties */
            if (model.isDashboardTask()) { 
                return budgetTasksSvc.getAllPropertiesTasks(params, pg);
            }
            /* Dashboard Task For Specific Property */
            else if(model.isDashboardPropertyTask()){
                return budgetTasksSvc.getPropertyTasks(params, pg);
            }
            /* Budget Model task */
            else if(model.isBudgetModelTask()) {
                return budgetTasksSvc.getBudgetModelTasksList(params, pg);
            }

        };
            
        
        model.reset = function () {
          //  angular.copy(model.emptyData, model.baseParams);
            model.baseParams={};
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('budgetTaskModel', [
                'appLangTranslate',
                 'sessionInfo',
                 'budgetTasksSvc',
                 '$location',  
                 '$stateParams',       
                 
                factory
        ]);
})(angular);
