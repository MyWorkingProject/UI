//  Roles List Actions Model

(function (angular) {
    "use strict";

    function factory(gridActions, langTranslate) {
        var model = gridActions();
        var translate;
        translate = langTranslate('propertyChart').translate;
        model.get = function (record) {
            var actionsModel = {
                className: 'rp-actions-menu-1'
            };


            actionsModel.actions = [
                {
                    text: translate('bdgt_propertychart_action_manage_Gl_Text'),//'Manage GL Accounts',
                    iconClassName: '',
                    data: record,
                    method: model.getMethod('manageGL')
                },
                {
                    text: translate('bdgt_propertychart_action_print_Text'),// "Print",
                    data: record,
                    iconClassName: '',
                    method: model.getMethod('print')
                }
            ];
            return actionsModel;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('propertyChartListActions', ['rpGridActions', 'appLangTranslate', factory]);
})(angular);

