(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('budgetTasks');

        bundle.set({

            action:"Action",
            title:"Task",
            assignedTo:"Created By",
            priority:"Priority",
            dueDate:"Due Date",
            status:"Status",
            ph_title:"Filter By Task",
            ph_assignedTo:"Filter By Created",
            ph_priority:"Filter By Priority",
            actions_view:"Edit",
            actions_markComplete:"Mark Complete",
            actions_addComment:"Add Comment",
            actions_print:"Print",
            actions_delete:"Delete",
            tasks_PageHeaderText:"Tasks",
            tasks_hideFilters:"Hide Filters",
            tasks_showFilters:"Show Filters",
            tasks_addTask:"New Task",
            tasks_print:"Print"
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
