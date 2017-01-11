
(function (angular) {
    'use strict';

    function budgetCommentsDialog(budgetTasksSvc,taskComments) {

        function link(scope, elem, attr) {
            var dir = {},selRecord;            

            dir.init = function () {
                scope.dir = dir;   
                if(scope.records){
                    dir.load();
                }
            };
            scope.$watch(function(){return elem.attr('class');}, function(n,o){              
                dir.init();
            });

             dir.text = {
                commentHeader:"Comment",
                submit: "Post" 
            };
            
            dir.form = {};

             dir.emptyData = {
                comment:"",               
                taskCommentID:0,
                taskID:0,
                commentsCount:false,
                taskTitle:""
            };

            dir.load=function(){
                dir.reset();  
                selRecord=scope.records;
                dir.getComments(selRecord.taskID);
                dir.updateTitle(selRecord.title);
                angular.element("#user").modal();
        };


             angular.copy(dir.emptyData, dir.form);

            dir.getComments=function(taskID){
                var promise= dir.getCommentsPromise(taskID);
                promise.then(dir.setComments,dir.handleError);
            };

            dir.updateTitle=function(title){
                dir.form.taskTitle=title;
            };

           dir.setComments = function(data){
                dir.setCommentsCount(false);
                dir.commentsData = data;
                dir.getCommentCount(data);
                
            };
           
           dir.getCommentCount=function(data){
                if(data.records.length > 0){
                    dir.setCommentsCount(true);
                }
            };

           dir.setCommentsCount=function(flag){
                dir.form.commentsCount=flag;
            };

            dir.getCommentsPromise=function(taskID){
                 var params = {
                    taskID: taskID                    
                };
                 return budgetTasksSvc.getCommentsByTaskID(params).$promise;
            };

           

            dir.saveTaskComment=function(){
                var data=dir.PrepareCommentsData(); 
                taskComments.saveUpdateComments(data).then(dir.onSaveSuccess);
              //  dir.getComments(selRecord.taskID);
              //  dir.reset();
                
            };

            dir.onSaveSuccess=function(data){
                dir.getComments(selRecord.taskID);
                dir.reset();
            };

            dir.getTaskCommentByID=function(taskCommentID){
                var promise= dir.getTaskCommentByIDPromise(taskCommentID);
                promise.then(dir.setComment,dir.handleError);
            };

            dir.getTaskCommentByIDPromise=function(taskCommentID){
                  var params = {
                    taskcommentID: taskCommentID                    
                };
                 return budgetTasksSvc.getCommentByTaskCommentID(params).$promise;
            };

            dir.setComment = function(data){              
                dir.updateCommentForm(data.records);     
            };

            dir.updateCommentForm=function(data){
                dir.form.taskCommentID=data.taskCommentID;
                dir.form.comment=data.comment;
                dir.form.taskID=data.taskID;
            };

            dir.deleteTaskComment=function(taskCommentID){
                 var promise= dir.deleteTaskCommentPromise(taskCommentID);
                promise.then(dir.onDelSuccess,dir.handleError);
            };

             dir.deleteTaskCommentPromise=function(taskCommentID){
                  var params = {
                    taskcommentID: taskCommentID                    
                };
                 return budgetTasksSvc.deleteTaskComment(params).$promise;
            };

            dir.onDelSuccess=function(){
                 dir.getComments(selRecord.taskID);
            };

            dir.PrepareCommentsData=function(){
                return {
                    "taskCommentID": dir.form.taskCommentID,
                    "taskID":selRecord.taskID, // model.form.budgetTaskID,
                    "comment":dir.form.comment               
                };
            };

            dir.reset=function(){
                 dir.form.comment="";           
                 dir.form.taskCommentID=0;
                 dir.form.taskID=0;
            };
        
            dir.hideCommentsForm=function(){             
                taskComments.showComment(false);
            };
            
            

            dir.init();
          
        }      

        return {
            scope: {
                records: '=records'
            },
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: 'app/templates/comments-model.html'
        };
    }

    angular
        .module("budgeting")
        .directive('budgetCommentsDialog',['budgetTasksSvc','budgetTaskComments',  budgetCommentsDialog]);
})(angular);
