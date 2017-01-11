//  hapvoucherAll Actions Model

(function (angular) {
    "use strict";

    function factory(gridActions, actionsMenuModel, appTranslate) {
        var translate, model = gridActions();

        translate = appTranslate('allocations.manage-allocations').translate;

        model.sendParams = function (obj, action) {
            var modelObj = {
                data: obj,
                actionParam: action
            };
            return modelObj;
        };
        model.get = function (record) {

            var actionsModel = actionsMenuModel();
            actionsModel.className = "rp-actions-menu-1";

            //check allocation is created in sitelevel or central
            switch (record.isSiteLevel) {

                case true:
                    actionsModel.actions = [
                                        { text: translate('rpView'), data: model.sendParams(record, 'allocation-req-view'), method: model.getMethod("MngAllGridActionView") },
                                        { text: translate('rpEdit'), data: model.sendParams(record, 'allocation-req-edit'), method: model.getMethod("MngAllGridActionEdit") },
                                        { text: translate('rpRecall'), data: model.sendParams(record, 'alloaction-recall'), method: model.getMethod("MngAllGridActionRecall") },
                                        { text: translate('rpDistribute'), data: model.sendParams(record, 'alloaction-distribute'), method: model.getMethod("MngAllGridActionDistribute") },
                                        { text: translate('rpCopy'), data: model.sendParams(record, 'allocation-copy'), method: model.getMethod("MngAllGridActionCopy") },
                                        { text: translate('rpDelete'), data: model.sendParams(record, 'allocation-delete'), method: model.getMethod("MngAllGridActionDelete") },
                                        { text: translate('rpViewHistory'), data: model.sendParams(record, 'allocation-history'), method: model.getMethod("MngAllGridActionHistory") },
                    ];
                    break;
                case false:
                    actionsModel.actions = [
                                     { text: translate('rpView'), data: model.sendParams(record, 'allocation-req-view'), method: model.getMethod("MngAllGridActionView") },
                                     { text: translate('rpViewHistory'), data: model.sendParams(record, 'allocation-history'), method: model.getMethod("MngAllGridActionHistory") },
                    ];
                    break;

                default:
            }


            return actionsModel;

        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("manageAllocationActions", ["rpGridActions", "rpActionsMenuModel", "appLangTranslate", factory]);
})(angular);
