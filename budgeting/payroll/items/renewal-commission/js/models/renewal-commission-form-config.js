//  renewalCommn form config Model

(function (angular) {
    "use strict";

    function factory(baseFormConfig,
        inputConfig,
        datetimepickerConfig,
        renewalCommnContent) {

        return function (src) {
            var model = baseFormConfig();

            model.setMethodsSrc(src);

            model.leaseRenewalPercentage = inputConfig({
                id: "leaseRenewalPercentage",
                fieldName: "leaseRenewalPercentage",
                suffix: renewalCommnContent.preSuffixPercentage,
                placeholder: renewalCommnContent.leaseRenewalText,
                dataType: "text",
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: true
                },
                onChange: model.methods.get("leaseRenewalPercentageChanged")
            });

            model.renewalCommission = inputConfig({
                id: "renewalCommission",
                fieldName: "renewalCommission",
                prefix: renewalCommnContent.preSuffixCurrency,
                placeholder: renewalCommnContent.renewalCommissionText,
                dataType: "text",
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: true
                },
                onChange: model.methods.get("renewalCommissionChanged")
            });      

            model.mtmRenewalPercentage = inputConfig({
                id: "mtmRenewalPercentage",
                fieldName: "mtmRenewalPercentage",
                suffix: renewalCommnContent.preSuffixPercentage,
                placeholder: renewalCommnContent.mtmRenewalText,
                dataType: "text",
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: true
                },
                onChange: model.methods.get("mtmRenewalPercentageChanged")
            });

            model.mtmCommission = inputConfig({
                id: "mtmCommission",
                fieldName: "mtmCommission",
                prefix: renewalCommnContent.preSuffixCurrency,
                placeholder: renewalCommnContent.mtmCommissionText,
                dataType: "text",
                modelOptions: {
                    updateOn: 'blur',
                    allowInvalid: true
                },
                onChange: model.methods.get("mtmCommissionChanged")
            });      

            model.destroy = function () {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("renewalCommnFormConfigModel", [
            "baseFormConfig",
            "rpFormInputTextConfig",
            "rpDatetimepickerConfig",
            "renewalCommnContentModel",
             factory]);
})(angular);
