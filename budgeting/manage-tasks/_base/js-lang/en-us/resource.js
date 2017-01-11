(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('manageTasks');

        bundle.set({

            form_pageTitle: "New Task",
            form_editTaskTitle:"Edit Task",
            form_title:"Title",
            form_description:"Description",
            form_startDate:"Start Date",
            form_dueDate:"Due Date",
            form_priority:"Priority",
            form_status:"Status",
            ph_title:"Enter task title",
            ph_description: "Enter description",
            form_save: "Save",
            form_cancel: "Cancel",
            form_linkTask: "Link Task",
            form_assignedTo: "Assigned To",
            form_realtedModels: "Related Models",
            form_relatedProp: "Related Properties",
            tabs_models: "Models(4)",
            tabs_properties: "Properties(4)",
            tabs_users: "Users(0)",
            form_Edit: "Edit",
            error_title:"Please enter title",
            error_description:"Please enter description",
            error_startDate:"Please select start date",
            error_dueDate:"Please select end date",

            ex_getModel_notFound_title:"Given task budget models are not found",
            ex_getModel_notFound_desc:"Invalid task",
            ex_getModel_notFound_info:"Please select valid task",

            ex_getUsers_notFound_title:"Given task budget users are not found",
            ex_getUsers_notFound_desc:"Invalid task",
            ex_getUsers_notFound_info:"Please select valid task",

            ex_getProperty_notFound_title:"Given task budget properties are not found",
            ex_getProperty_notFound_desc:"Invalid task",
            ex_getProperty_notFound_info:"Please select valid task",

            ph_selectUsers : 'Select users...',
            ph_selectModels : 'Select models...',
            ph_selectProperties : 'Select properties...',
    
            error_invalidDueDate: 'start date must be less than due date'

            
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
