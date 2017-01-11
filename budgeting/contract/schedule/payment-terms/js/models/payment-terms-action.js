//  Payment Terms Actions

(function (angular) {
    "use strict";

    function paymentTermsActionsFactory(rpGridActions, rpActionsMenuModel, i18n) {
        var actionsModel = rpGridActions();

        actionsModel.get = function (currRecord) {
            var actionsMenuModel = rpActionsMenuModel();
            actionsMenuModel.className = "rp-actions-menu-1";
            actionsMenuModel.actions = [{
                    text: i18n.translate("bdgt_new_contract_edit"),
                    iconClassName: 'chart-edit',
                    data: currRecord,
                    //href: '#', //TODO update during Edit Contract implementation
                    method: actionsModel.getMethod("editPaymentTerm")
                }, {
                    text: i18n.translate("bdgt_new_contract_del"),
                    iconClassName: 'chart-delete',
                    data: currRecord,
                    method: actionsModel.getMethod("confirmDeletePaymentTerm")
                }];

            return actionsMenuModel;
        };

        return actionsModel;
    }

    angular
        .module("budgeting")
        .factory('paymentTermsActionsModel', [
            "rpGridActions",
            "rpActionsMenuModel",
            "contractTranslatorSvc",
            paymentTermsActionsFactory
        ]);

})(angular);