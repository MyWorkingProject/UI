//  Budget Task List Actions
(function (angular) {
    "use strict";

    function factory(langTranslate,budgetTasksSvc,exHandling,notifications,grid) {
         var text, state, model;
        var translate;
        translate = langTranslate('budgetTasks').translate;
        model = {};
        
       

         model.markTaskAsComplete = function (task) {
            var paramsData = {
                taskID: task.taskID
            };
            var promise=model.markTaskAsCompleteByConditon(task,paramsData);
            promise.then(model.onSuccess, exHandling.getTaskCompleteException);
           
        };

        model.markTaskAsCompleteByConditon=function(task,paramsData){
            var promise;
             if(task.isEditable){
                promise = model.markAsCompleteForIsEditablePromise(paramsData);
            }
            else{
                promise = model.markAsCompletePromise(paramsData);
            }

            return promise;
        };

        model.markAsCompletePromise = function (paramsData) {
            return budgetTasksSvc.markTaskAsComplete(paramsData, '').$promise;
        };


        model.markAsCompleteForIsEditablePromise = function (paramsData) {
            return budgetTasksSvc.markTaskAsCompleteForEditable(paramsData, '').$promise;
        };

        model.onSuccess=function(data){            
            notifications.showSuccessNotification("Task Completed");
            grid.load();
        };


         model.deleteTask = function (task) {
            var paramsData = {
                taskID: task.taskID
            };
            var promise = model.deleteTaskPromise(paramsData);
            promise.then(model.onDeleteSuccess, exHandling.getTaskDeleteException);
           
        };

        model.deleteTaskPromise = function (paramsData) {
            return budgetTasksSvc.deleteTask(paramsData, '').$promise;
        };

        model.onDeleteSuccess=function(data){            
            notifications.showSuccessNotification("Deleted Successfully");
            grid.load();
        };
       

        return model;
    }

    angular
        .module("budgeting")
        .factory("budgetTaskActions", 
                    [
                        'appLangTranslate',
                        'budgetTasksSvc',  
                        'budgetTasksErrorHandling',           
                        'budgetTasksNotifications',
                        'budgetTasksGridFactory',    
                         factory]);
})(angular);
