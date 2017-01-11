//  Users List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, actions, langTranslate) {
        var model = gridConfig();
        var translate = langTranslate('budgetTasks').translate;

        model.get = function () {
            return [
                    {
                        key: 'action',
                        type: 'actionsMenu',
                        getActions: actions.get
                    },
                    {
                        key: 'title',
                        //type: 'link'
                        type: 'custom',
                        templateUrl: 'app/templates/task-edit-model.html'

                    }, {
                        key: 'createdUserName'

                    }, {
                        key: 'priority',
						type: 'custom',
                        templateUrl: 'app/templates/budget-task-priority.html'

                    }, {
                        key: 'dueDate'

                    }, {
                        key: 'status',
                        type: 'custom',
                        templateUrl: 'app/templates/budget-task-status.html'
                    }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        text: translate('action'),
                        key: 'action',
                        isSortable: false,
                        className: 'action-menu'

                    }, {
                        text: translate('title'),
                        key: 'title',
                        isSortable: true,
                        className: 'title'
                    }, {
                        text: translate('assignedTo'),
                        key: 'assignedTo',
                        isSortable: true,
                        className: 'assigned-to'

                    }, {
                        text: translate('priority'),
                        key: 'priority',
                        isSortable: true,
                        className: 'priority'
                    }, {
                        text: translate('dueDate'),
                        key: 'dueDate',
                        isSortable: true,
                        className: 'due-date'
                    }, {
                        text: translate('status'),
                        key: 'status',
                        isSortable: true,
                        className: 'status'
                    }
                ]
            ];
        };

        model.getFilters = function () {
            return [
               {
                   type: '',
                   key: 'action'
               },
               {
                   key: 'TaskTitle',
                   type: 'text',
                   className: 'title',
                   placeholder: translate('ph_title')
               }, {
                   key: 'Createdby',
                   type: 'text',
                   className: 'assigned-to',
                   placeholder: translate('ph_assignedTo'),

               }, {
                   key: 'Taskpriority',
                   type: 'text',
                   className: 'priority',
                   placeholder: translate('ph_priority'),

               }, {
                   key: 'dueDate',                  
                   className: 'dueDate'
                  

               }, {
                   key: 'Taskstatus',
                   type: 'menu',
                   className: 'status',
                   value:'',
                   options: [
                         {
                            
                             name: 'All',
                            value: '',
                         }, {
                             name: 'Overdue',
                             value: 'Overdue'
                         }, {
                             name: 'Pending',
                             value: 'Pending'
                         }, {
                             name: 'Cancelled',
                             value: 'Cancelled'
                         }, {
                             name: 'In Progress',
                             value: 'InProgress'
                         }, {
                             name: 'Complete',
                             value: 'Complete'
                         }, {
                             name: 'Hold',
                             value: 'Hold'
                         }]
               }
            ];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('budgetTaskConfig', ['rpGridConfig', 'budgetTaskActionsDef', 'appLangTranslate', factory]);
})(angular);
