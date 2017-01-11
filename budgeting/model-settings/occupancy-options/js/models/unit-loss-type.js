
(function () {
    'use strict';

    function unitLossTypeFactory(unitLossTypeSvc, notifSvc, i18n) {
        var defaultValue = {
            unitTypeID: 0,
            name: "none",
            description: i18n.translate("none")
        };

        var unitLossType = {};

        unitLossType.getList = function (budgetModelID, propertyID, successCallback) {
            unitLossTypeSvc.getList(budgetModelID, propertyID)
                .then(function(response) {
                    response.records.unshift(defaultValue); //add none - default value
                    successCallback(response);
                }, unitLossType.errorCallback);
        };

        unitLossType.errorCallback = function() {
            notifSvc.error(i18n.translate("err_unit_loss_type"));
        };

        return unitLossType;        
    }

    angular
        .module("budgeting")
        .factory("unitLossType", [
            "occupancySvc",
            "notificationService",
            "occTranslatorSvc",
            unitLossTypeFactory
        ]);
})();
