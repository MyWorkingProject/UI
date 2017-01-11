
(function (angular) {
    "use strict";

    function factory(gridActions, actionsMenuModel,langTranslate) {
        var model = gridActions();
        var translate = langTranslate('modelWidget').translate;
        model.get = function (record) {
            var actionsModel = actionsMenuModel();

            actionsModel.className = "rp-actions-menu-1";

            actionsModel.actions = [
                    {
                         text: translate('actions_view'),
                         href: '#/budgetmodel/' + record.distributedID + '/overview',
                         iconClassName: "view"
                     },
                    {
                        text: translate('actions_SummaryReport'),
                       // href: '#/budgetmodel/' + record.distributedID + '/overview',                      
                    },
                    {
                          text: translate('actions_detailReport'),
                         // href: '#/budgetmodel/' + record.distributedID + '/overview',
                    },
                    {

                       text: translate('actions_workflowStatus'),
                        href: '#/budgetmodel/' + record.distributedID + '/workflow',

                    }];

            return actionsModel;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("modelWidgetActions", ["rpGridActions", "rpActionsMenuModel","appLangTranslate", factory]);
})(angular);
