//  Users List Model

(function (angular) {
    'use strict';

    function factory(tasksSvc, errorHandling, $location, $filter) {
        var text, state, model;
        model = {};
        model.defaultData={
            taskID:0,
            taskTitle:"",
            taskStartDate:"",
            taskEndDate:"",
            taskDescription:"",
            users:[{}],
            properties:[{}],
            models:[{}],
            selectedUsers:[],
            selectedProperties:[],
            selectedModels:[],
            deletedUsers:[],
            deletedProperties:[],
            deletedModels:[]
        };

        model.filterData= "?datafilter.pages.resultsPerPage=100";       

        model.data = angular.extend({}, model.defaultData);

        model.reset = function () {
            model.data = angular.extend({}, model.defaultData);
        };


        model.resetUserData = function(){
            model.data.users = [];
        };

       model.resetModelData = function(){
            model.data.models = [];
        };

       model.resetPropertiesData = function(){
            model.data.properties = [];
       }; 

       
       model.setUserData = function(resp){
            model.data.selectedUsers = [];
        };

       model.setModelData = function(resp){
            model.data.selectedProperties = [];
        };

       model.setPropertiesData = function(resp){
            model.data.selectedModels = [];
       };   

        model.getData = function(taskType){
            var taskID = model.getTaskID(taskType);
            if(taskID >= 0){
                //model.getUserList(taskID).then(model.assignUsers,errorHandling.showBdgtUsersException);
                model.getModelsList(taskID).then(model.assignModels,errorHandling.showBdgtModelsException);
                model.getPropertiesList(taskID).then(model.assignProperties,errorHandling.showBdgtPropertiesException);
            }
            else{
                $location.path('/budgeting/#');
            }
        };

        model.getTaskID = function(taskType){
            if(taskType === "new-task"){
                return 0;
            }
            else{
                return parseInt(taskType);
            }
        };

        model.getUsers = function(query,taskType){
           model.resetUserData();
           var taskID = model.getTaskID(taskType);
           if(taskID >=0 && query!==""){
                model.getUserList(query).then(model.assignUsers,errorHandling.showBdgtUsersException);
           } 
        };

        model.getProperties = function(query,taskType){
           model.resetPropertiesData();
           ///var taskID = model.getTaskID(taskType);
           if(query!==""){
                model.getPropertiesList(query).then(model.assignProperties,errorHandling.showBdgtPropertiesException);
           } 
        };

       model.getModels = function(query,taskType){
           model.resetModelData();
           ///var taskID = model.getTaskID(taskType);
           if(query!==""){
                model.getModelsList(query).then(model.assignModels,errorHandling.showBdgtModelsException);
           } 
        };

        model.getUserList = function(query){
          /*  var params = {getModelsList
                taskID: taskID
            };*/
            return tasksSvc.abortGetUsers().getUsersList(query);//.$promise;
        };

        model.assignUsers = function(response){
            var records = response.data.records;
            model.data.selectedUsers.forEach(function (item) {
                 var userRecord = $filter('filter')(records, function (d) {
                        return d.userID === item.taskUserID;
                    });

                if(userRecord.length>0){
                    var index = records.indexOf(userRecord[0]);
                    records.remove(index);
                }
            });
            model.data.users = records;
            
        };
        
        model.getModelsList = function(query){
            
            return tasksSvc.abortGetModels().getModelsList(query);//.getBudgetTaskModels(params).$promise;
        };

        model.assignModels = function(response){
            var records = response.data.records;
            model.data.selectedModels.forEach(function (item) {
                 var modelRecord = $filter('filter')(records, function (d) {
                        return d.budgetModelID === item.budgetModelID;
                    });

                if(modelRecord.length>0){
                    var index = records.indexOf(modelRecord[0]);
                    records.remove(index);
                }
            });
            model.data.models = records;
        };

        model.getPropertiesList = function(query){
            
            return tasksSvc.abortGetProperties().getTaskPropertiesList(query);
        };

        model.assignProperties = function(response){
            //model.data.properties = response.data.records;
             var records = response.data.records;
            model.data.selectedProperties.forEach(function (item) {
                 var propRecord = $filter('filter')(records, function (d) {
                        return d.propertyID === item.propertyID;
                    });

                if(propRecord.length>0){
                    var index = records.indexOf(propRecord[0]);
                    records.remove(index);
                }
            });
            model.data.properties = records;
        };

        model.addDeletedUsers=function(item){
            if(item.taskUserUniqueID>0){
                model.addDeletedUserItem(item);
            }
        };

        model.addDeletedProperties=function(item){
            if(item.taskPropertyID>0){
                model.addDeletedPropertyItem(item);
            }
        };

        model.addDeletedModels=function(item){
            if(item.taskModelID>0){
                model.addDeletedModelItem(item);
            }
        };

        model.addDeletedUserItem=function(item){
            var record = $filter('filter')(model.data.deletedUsers, function (d) {
                return d.taskUserUniqueID === item.taskUserUniqueID;
            });
            
            if (record === undefined || record.length === 0) {
                    model.data.deletedUsers.push(item.taskUserUniqueID);
                }
        };

        model.addDeletedPropertyItem=function(item){
            var record = $filter('filter')(model.data.deletedProperties, function (d) {
                return d.taskPropertyID === item.taskPropertyID;
            });
            
            if (record === undefined || record.length === 0) {
                    model.data.deletedProperties.push(item.taskPropertyID);
                }
        };

        model.addDeletedModelItem=function(item){
            var record = $filter('filter')(model.data.deletedModels, function (d) {
                return d.taskModelID === item.taskModelID;
            });
            
            if (record === undefined || record.length === 0) {
                    model.data.deletedModels.push(item.taskModelID);
            }
        };

        model.saveData = function(formData){
                var postData={};
                postData.budgetTask = formData;
                postData.budgetTaskUsers = model.updateTaskUSerID(model.data.selectedUsers,formData.taskID);
                postData.budgetTaskProperties = model.addTaskID(model.data.selectedProperties,formData.taskID);
                postData.budgetTaskModels = model.addTaskID(model.data.selectedModels,formData.taskID);
                
                postData.deletedTaskUsers = model.data.deletedUsers;
                postData.deletedTaskProperties = model.data.deletedProperties;
                postData.deletedTaskModels = model.data.deletedModels;
                
                model.saveTaskData(postData).then(model.reset,errorHandling.showTaskSaveException);
        };

        model.addTaskID = function(list,taskID){
                list.forEach(function (item) {
                item.taskID=taskID;
            });
            return list;
        };

        model.updateTaskUSerID = function(list,taskID){
            list.forEach(function (item) {
                item.taskID=taskID;
                if( parseInt(item.userID) >=0 ){
                    item.taskUserID=item.userID;
                }
            });
         return list;
       };
        
        

        model.saveTaskData = function (data) {
            if(data.budgetTask.taskID>0){
                return tasksSvc.updateTask(data).$promise;
            }
            else{
                return tasksSvc.saveTask(data).$promise;
            }
        };

        model.assignMulitiSelection = function(record){
            model.selectedUsers=record.userList;
            model.selectedProperties= record.propertyList;
            model.selectedModels = record.modelList;
        };

        model.assignTaskUsers = function(response){
            //model.assignUsers(response);
            model.data.selectedUsers= response.records;
        };

        model.assignTaskModels = function(response){
            //model.assignModels(response);
            model.data.selectedModels= response.records;
        };

        model.assignTaskPropeprties = function(response){
            //model.assignProperties(response);
            model.data.selectedProperties = response.records;
        };


        return model;
    }

    angular
        .module('budgeting')
        .factory('manageTasksDataModel', [
                'manageTasksSvc',
                'manageTasksErrorHandling',
                '$location',
                '$filter',
                factory
        ]);
})(angular);
