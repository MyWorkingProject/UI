//  Budget Task Actions Model

(function (angular) {
    "use strict";

    function budgetTaskActions(langTranslate) {
        var translate = langTranslate('budgetTasks').translate;
        return function (vm, record) {

            return {
                className: 'rp-actions-menu-1',

                actions: [
                    {
                        text: translate('bdgt_tasks_view_actions'),
                        iconClassName: 'rp-icon-edit-text',
                        href: '#'
                    },
                    {
                        text: translate('bdgt_tasks_mark_complete_actions'),
                        iconClassName: '',
                        href: '#'
                    },
                    {
                        text: translate('bdgt_tasks_add_comment_actions'),
                        href: '#',
                        iconClassName: ''

                    },
                    {
                        text: translate('bdgt_tasks_print_actions'),
                        href: '#',
                        iconClassName: ''

                    },
                    {
                        text: translate('bdgt_tasks_delete_actions'),
                        iconClassName: '',
                        href: '#'
                    }
                ]
            };
        };
    }

    angular
        .module("budgeting")
        .factory('budgetTaskActions', ['appLangTranslate', budgetTaskActions]);
})(angular);
