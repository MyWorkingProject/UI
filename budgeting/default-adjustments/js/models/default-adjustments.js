//  Model

(function (angular) {
    "use strict";

    function factory(langTranslate, session, commentsSvc, $location, $stateParams, budgetDetails) {
        var text, state, model;
        var translate;    
        model = {};             
        model.baseParams = {
            isDashboardComment: false,
            isBudgetModelComment: false,        
            distributedId:0,
            records:"",
            show:false
        };    
        model.getPropertyID=function(){
            return budgetDetails.getModelDetails().propertyID;
        };

        model.isProperty=function(){
                if(model.getPropertyID()>0){
                    return true;
                }
                else{
                    return false;
                }
            };

        model.updateCommentFlag=function(){
            var path=$location.absUrl();
              if (path.indexOf("workspaces/budget-comments") > 0) {
                        model.setDashboardTask(true);
                                 
              }
              else if (path.indexOf("/budgetmodel/") > 0) {
                model.setDistributedID($stateParams.distID);   
                  model.setBudgetModelStatus(true);
              }    
        };

        model.setDistributedID=function(id){
            var path=$location.absUrl();
            if (path.indexOf("/budgetmodel/")){
                    model.baseParams.distributedId=id;
            }      
        }; 

        model.getDistributedID=function(){
            return budgetDetails.getModelDetails().budgetModelID;
        };

        model.getServiceParams=function(){
            var params = {             
                    propertyID: model.getPropertyID(),
                    budgetModelID: model.getDistributedID()
                };

            return params;
        };
  
        model.getCommentData = function () {        
            model.updateCommentFlag();
            var params = model.getServiceParams();          
            return commentsSvc.getDashboardComments(params);
        };
        model.reset = function () {     
            model.baseParams={};
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('defaultAdjustments', [
                'appLangTranslate',
                 'sessionInfo',
                 'commentsSvc',
                 '$location',  
                 '$stateParams',
                 'budgetDetails',
                factory
        ]);
})(angular);
