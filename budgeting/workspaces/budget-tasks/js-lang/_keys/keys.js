(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
           'action',
           'title',
           'assignedTo',
           'priority',
           'dueDate',
           'status',
           'ph_title',
           'ph_assignedTo',
           'ph_priority',
           'actions_view',
           'actions_markComplete',
           'actions_addComment',
           'actions_print',
           'actions_delete',
           'tasks_PageHeaderText',
           'tasks_hideFilters',
           'tasks_showFilters',
           'tasks_addTask',
           'tasks_print'

        ];

        appLangKeys.app('budgetTasks').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
