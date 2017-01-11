//  Users List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, session ,commentsSvc,$location,$stateParams) {
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

        model.setDashboardTask=function(flag){
            model.baseParams.isDashboardComment=flag;
        };

         model.setBudgetModelStatus=function(flag){
            model.baseParams.isBudgetModelComment=flag;
        };

        


        model.isDashboardComment=function(){
            return model.baseParams.isDashboardComment;
        };

         model.isBudgetModelComment=function(){
            return model.baseParams.isBudgetModelComment;
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


        model.getCommentData = function (pg) {        
            model.updateCommentFlag();
            var params = model.getServiceParams();
               /* Dashboard Comment For All Properties */
            if (model.isDashboardComment()) { 
                return commentsSvc.getDashboardComments(params, pg);
            }          
            /* Budget Model Comment */
            else if(model.isBudgetModelComment()) {
                return commentsSvc.getBudgetModelComments(params, pg);
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
        .factory('budgetComment', [
                'appLangTranslate',
                 'sessionInfo',
                 'commentsSvc',
                 '$location',  
                 '$stateParams',
                factory
        ]);
})(angular);
