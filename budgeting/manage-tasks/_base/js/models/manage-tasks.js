//  Users List Model

(function (angular) {
    'use strict';

    function factory(langTranslate,tasksSvc, errorHandling, $location,dataModel,$filter,formConfig/*, session,*/, moment) {
        var text, state, model;
        var translate;
        translate = langTranslate('manageTasks').translate;
        model = {};
        model.text = {
            title: translate('form_pageTitle'),
            edit: translate('form_Edit'),
            createdText:'',
            modifiedText:''
    };


        model.fieldLabel = {
            title: translate('form_title'),
            description: translate('form_description'),
            startDate: translate('form_startDate'),
            dueDate: translate('form_dueDate'),
            priority: translate('form_priority'),
            status: translate('form_status'),
            save: translate('form_save'),
            cancel: translate('form_cancel'),
            linkTask:translate('form_linkTask'),
            aasignedTo:translate('form_assignedTo'),
            realtedModels:translate('form_realtedModels'),
            relatedProp:translate('form_relatedProp'),
            
        };
        model.placeholders = {
            title: translate('ph_title'),
            description: translate('ph_description'),
            selectUsers: translate('ph_selectUsers'),
            selectModels: translate('ph_selectModels'),
            selectProperties: translate('ph_selectProperties')

        };


        model.errorMessages = {
            title: {
                required: translate('error_title')
            },
            description: {
                required: translate('error_description')
            },
            startDate:
            {
                required: translate('error_startDate')
               
            },
            dueDate:
           {
               required: translate('error_dueDate')
           },
           invalidDueDate:{
                msg: translate('error_invalidDueDate')
           } 
        };

   

        //model.state = {
        //    isNewTask: false
        //};

        model.state = {
            edit: false,
            ready: false,
            inEditChart: false           
        };

        model.getState = function () {
            return model.state;
        };


       


        model.defaultFormValues = {
            taskID:0,
            title: "",
            description: "",
           
            dateModel: {
                startDateUTC: '',
                options: {
                    anchorRight: true,
                    displayFormat: 'MM/DD/YYYY'
                }
            },


            dueDateModel: {
                dueDateUTC: '',
                options: {
                    anchorRight: true,
                    displayFormat: 'MM/DD/YYYY'
                }
            },
            startDate: "",
            dueDate: "",
            priority: "Normal",
            status: "Pending",
            priorityOptions: {
                options: [{
                    "value": "Normal",
                    "name": 'Normal'
                }, {
                    "value": "High",
                    "name": 'High'
                }, {
                    "value": "Low",
                    "name": 'Low'
                }

                ]
            },
            statusOptions: {
                options: [{
                    "value": "Pending",
                    "name": 'Pending'
                }, {
                    "value": "Cancelled",
                    "name": 'Cancelled'
                }, {
                    "value": "In progress",
                    "name": 'In progress'
                }, {
                    "value": "Complete",
                    "name": 'Complete'
                }, {
                    "value": "Hold",
                    "name": 'Hold'
                }

                ]
            }
        };


        model.form = angular.extend({}, model.defaultFormValues);
       
        model.reset = function () {
            model.form = angular.extend({}, model.defaultFormValues);
            model.text.createdText = "";
            model.text.modifiedText = "";
        };

        
        model.setOptions=function(){            
            formConfig
                .setOptions("status", model.form.statusOptions.options)
                .setOptions("priorityOptions", model.form.priorityOptions.options);
        };

        model.updateTaskDetails = function (response) {
            var record = response.records;
            model.form.title=record.title;
            model.form.description=record.description;
            model.form.startDate = moment(new Date(record.startDate));
            model.form.dueDate= moment(new Date(record.dueDate)) ;
            model.form.priority=record.priority;
            model.form.status=record.status;
            model.form.taskID=record.taskID;
            model.text.createdText = record.createdBy === " " ?("Created on " + record.createdDate):("Created by " + record.createdBy + " on " + record.createdDate);
            model.text.modifiedText =record.lastModifiedBy ===" " ?("Last modified on "+  record.lastModifiedDate):("Last modified by "+ record.lastModifiedBy + " on " + record.lastModifiedDate);
            //dataModel.assignMulitiSelection(record);
        };

        model.edit = function () {
            model.state.edit = true;
        };

        model.setTask = function (flag) {
            model.state.edit = flag;
        };

        model.updateTitle = function (type) {
            if (type === "new-task") {
                model.text.title = translate('form_pageTitle');
            }
            else {
                model.text.title = translate('form_editTaskTitle');
            }
        };

        model.isValidData = function(){
            if(model.form.title === "" ||  model.form.startDate === "" || model.form.dueDate === ""){
                return false;
            }
            else{
               return true;
            }
        };

        model.isTitleValid = function(){
            if(model.form.title === ""){
                return false;
            }
            else{
                return true;
            }
        };

        model.isStartValid = function(){
            if(model.form.startDate === ""){
                return false;
            }
            else{
                return true;
            }
        };

        model.isDueValid = function(){
            if(model.form.dueDate === ""){
                return false;
            }
            else{
                return true;
            }
        };

        model.getFormDetails = function(){
            var returnObj = {
                                title:model.form.title,
                                description:model.form.description,
                                startDate:$filter('date')(new Date(model.form.startDate),'MM/dd/yyyy'), //model.form.startDate,
                                dueDate: $filter('date')(new Date(model.form.dueDate),'MM/dd/yyyy'),//$filter('date')(model.form.dueDate,'MM/dd/yyyy'), //model.form.dueDate,
                                priority:model.form.priority,
                                status:model.form.status,       
                                taskID:model.form.taskID
                            };
            return returnObj;
        };

        model.getTaskID = function(taskType){
            if(taskType === "new-task"){
                return 0;
            }
            else{
                return parseInt(taskType);
            }
        };

        model.getTaskData = function(taskType){
            var taskID = model.getTaskID(taskType);
            model.updateTitle(taskType);
            var params= {
                        taskID: taskID
                    };
            if(parseInt(taskID) > 0){
               model.getTaskPromise(params).then(model.updateTaskDetails,errorHandling.showTaskGetException);
               model.getTaskUserPromise(params).then(dataModel.assignTaskUsers,errorHandling.showBdgtUsersException);
               model.getTaskModelPromise(params).then(dataModel.assignTaskModels,errorHandling.showBdgtModelsException);
               model.getTaskPropertyPromise(params).then(dataModel.assignTaskPropeprties,errorHandling.showBdgtPropertiesException);   
            }
            else if (taskID === undefined || taskID==="" || taskID ===null){
                $location.path('/budgeting/#');
            }
        };

        model.getTaskPromise = function(params){
            return tasksSvc.getTask(params).$promise;
        };

        model.getTaskUserPromise = function(params){
            return tasksSvc.getTaskUsers(params).$promise;
        };

        model.getTaskModelPromise = function(params){
            return tasksSvc.getTaskModels(params).$promise;
        };

        model.getTaskPropertyPromise = function(params){
            return tasksSvc.getTaskProperties(params).$promise;
        };

        model.isValidDates = function(){
            if(model.form.startDate === ""){
                errorHandling.showErrorMessage(model.errorMessages.startDate.required);
                return false;
            }
            else if(model.form.dueDate === ""){
                errorHandling.showErrorMessage(model.errorMessages.dueDate.required);
                return false;
            }
            else if( $filter('date')(model.form.startDate,'MM/dd/yyyy') >  $filter('date')(model.form.dueDate,'MM/dd/yyyy')){
                errorHandling.showErrorMessage(model.errorMessages.invalidDueDate.msg);
                return false;
            }
            else{
                   return true;
            }
       };

        return model;
    }

    angular
        .module('budgeting')
        .factory('manageTasksModel', [
                'appLangTranslate',
                'manageTasksSvc',
                'manageTasksErrorHandling',
                '$location',
                'manageTasksDataModel',
                '$filter',
                'manage-task-config',
                 /*'session',*/
                 'moment',
                factory
        ]);
})(angular);
