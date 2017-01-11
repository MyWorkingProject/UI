//  Users List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, budgetTasksSvc,budgetTaskModel) {
        var text, state, model;
        var translate;
        translate = langTranslate('budgetTasks').translate;
        model = {};

        model.text = {
            commentHeader:"Comment",
            submit: "Post" 
        };


        model.form = {};

      

         model.emptyData = {
            comments:"",
            showForm:false,
            isNewComment:false,
            budgetCommentID:0,
            budgetTaskID:0,
            showComment:false,
            taskID:0,
            title:"",
            rowData:[]
        };

       model.data= {
                  records:[],
                  id:0,
                  title:""
                };

       angular.copy(model.emptyData, model.form);

      model.showHideForm=function(flag){
            model.form.showForm=flag;
            
       };

       model.showComment=function(flag){
          model.form.showComment=flag;
            
       };


       model.saveUpdateComments = function (data) {         
            model.setNewEditComment(data);
            if (model.isNewComment()) {               
                return budgetTasksSvc.saveTaskComment(data).$promise;
              
            }
            else {
               return budgetTasksSvc.updateTaskComment(data).$promise;

            }
        };

      /*  model.saveTaskComment=function(data){
              var savePromise = model.saveCommentPromise(data);
               savePromise.then(model.onSaveSuccess, model.showEx);
        };

        model.updateTaskComment=function(data){
                 var updatePromise = model.updateTaskCommentPromise(data);
                updatePromise.then(model.onSaveSuccess, model.showEx);
        };

        model.onSaveSuccess=function(){
            logc("save promise");
        };
        
        model.showEx=function(resp){
            
        };  */

          model.saveCommentPromise = function (data) {
            return budgetTasksSvc.saveTaskComment(data).$promise;
        };

         model.updateTaskCommentPromise = function (data) {
            return budgetTasksSvc.updateTaskComment(data).$promise;
        };

        model.getBudgetCommentID=function(){
            return model.form.budgetCommentID;
        };

        model.setNewEditComment=function(data){
            if(data.taskCommentID <= 0){
                model.setNewComment(true);
            }
            else{
                 model.setNewComment(false);
            }
        };

        model.setNewComment=function(flag){
            model.form.isNewComment=flag;
        };

        model.isNewComment=function(){
            return model.form.isNewComment;
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        /* Get Comments  */
        model.getTaskComments=function(record){
            model.updateFields(record);
            var promise= model.getCommentsPromise(record.taskID);
            promise.then(model.setComments,model.handleError);
        };
        
        model.updateFields=function(data){
            model.form.rowData=data;
            model.form.taskID=data.taskID;
            model.form.title=data.title;
            
        };

        model.setComments = function(data){
           var conData=model.ConvertJsonData(data);
           model.setObjectInfo(conData);            
            model.showHideForm(!model.form.showForm);
            model.showComment(true); 
        };

        model.ConvertJsonData=function(data){
            var postData=[];
            if(data.records){
                angular.forEach(data.records, function (item) {
                    var newItem = { 
                            "commentID": item.taskCommentID, 
                            "sourceID": item.taskID ,
                            "lastModifiedDate": item.lastModifiedDate, 
                            "lastModifiedBy": item.lastModifiedBy ,
                            "comment": item.comment
                            
                        };
                    postData.push(newItem);
                });
            }
              return postData;
        };

        model.setObjectInfo=function(data){
           model.data.records=data;
           model.data.sourceID= model.form.taskID;
           model.data.title=model.form.title;          
        };
       

        model.getCommentsPromise=function(taskID){
                var params = {
                taskID: taskID                    
            };
                return budgetTasksSvc.getCommentsByTaskID(params).$promise;
        };

        
        /* Save Comments */
        model.saveTaskComment=function(data){   
           var postData=model.setSaveData(data);         
            model.saveUpdateComments(postData).then(model.onSaveSuccess);
            //  dir.getComments(selRecord.taskID);
            //  dir.reset();
                
        };

        model.onSaveSuccess=function(data){
            model.getTaskComments(model.form.rowData);           
        };

        model.setSaveData=function(data){
            return {
                 "taskCommentID": data.commentID,
                 "taskID":data.sourceID, 
                  "comment":data.comment  
            };
        };

       /* Delete Comment */

        model.deleteTaskComment=function(taskCommentID){
                 var promise= model.deleteTaskCommentPromise(taskCommentID);
                promise.then(model.onDelSuccess,model.handleError);
            };

        model.deleteTaskCommentPromise=function(taskCommentID){
            var params = {
                 taskcommentID: taskCommentID                    
            };
            return budgetTasksSvc.deleteTaskComment(params).$promise;
        };

        model.onDelSuccess=function(data){
             model.getTaskComments(model.form.rowData); 
        };
        
      
        return model;
    }

    angular
        .module("budgeting")
        .factory('budgetTaskComments', [
                'appLangTranslate',               
                 'budgetTasksSvc', 
                  'budgetTaskModel',
                factory
        ]);
})(angular);
