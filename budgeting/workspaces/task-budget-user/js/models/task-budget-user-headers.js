(function (angular) {
    "use strict";

    function factory(gridHeadersModel, appLangTranslate) {
        var headers, model, translate;

        translate = appLangTranslate('taskBudgetUser').translate;

        headers = [[{
            value: false,
            key: 'isSelected',
            type: 'selectAll',
            text: 'select all',
            className: 'select-all'
        }, {
            text: translate('bdgt_taskBudgetUser_grdUserNameText'),
            key: 'name',
            isSortable: false,
            className: 'name'
        }, {
            text: translate('bdgt_taskBudgetUser_grdRoleText'),
            key: 'role',
            isSortable: false,
            className: 'role',
        }, {
            text: translate('bdgt_taskBudgetUser_grdEmailAddrsText'),
            key: 'emailAddress',
            isSortable: false,
            className: 'email-address'
        }, {
            text: translate('bdgt_taskBudgetUser_grdPhoneText'),
            key: 'phone',
            isSortable: false,
            className: 'phone'
        }]];
        model = gridHeadersModel(headers);
        model.className = 'rp-grid-header-1';
        logc(model);
        return model;
    }

    angular
        .module("budgeting")
        .factory('taskBudgetUserHeaders', ['rpGridHeadersModel', 'appLangTranslate', factory]);
})(angular);
