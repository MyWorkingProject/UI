(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
           'form_pageTitle',
           'form_editTaskTitle',
           'form_title',
           'form_description',
           'form_startDate',
           'form_dueDate',
           'form_priority',
           'form_status',
           'ph_title',
           'ph_description',
           'form_save',
           'form_cancel',
            'form_linkTask',
            'form_assignedTo',
            'form_realtedModels',
            'form_relatedProp',
            'tabs_models',
            'tabs_properties',
           'tabs_users',
           'form_Edit',
           'error_title',
           'error_description',
           'error_startDate',
           'error_dueDate',
           'ex_getModel_notFound_title',
           'ex_getModel_notFound_desc',
           'ex_getModel_notFound_info', 
           'ex_getUsers_notFound_title',
           'ex_getUsers_notFound_desc',
           'ex_getUsers_notFound_info',  
           'ex_getProperty_notFound_title',
           'ex_getProperty_notFound_desc',
           'ex_getProperty_notFound_info',
           'ph_selectUsers',
           'ph_selectModels',
           'ph_selectProperties',
           'error_invalidDueDate' 

        ];

        appLangKeys.app('manageTasks').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
