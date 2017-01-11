// Payroll Leasing Commissions form config Model

(function (angular) {
    "use strict";

    function factory(baseFormConfig,
        inputConfig,
        leasingComContent) {

        return function (src) {
            var model = baseFormConfig();

            model.setMethodsSrc(src);

            model.moveInsPercent = inputConfig({
                id: "moveInsPercent",
                fieldName: "moveInsPercent",
                suffix: leasingComContent.affixPercent,
                placeholder: "100.00",
                dataType: "text",
                modelOptions: {
                    updateOn: "blur",
                    allowInvalid: true
                },
                onChange: model.methods.get("updateMonthlyMoveinsPercentage"),
                validators: {
                    positiveNumber: model.methods.get("validateNumber")
                },
                errorMsgs: [{
                    name: "positiveNumber",
                    text: leasingComContent.errPositiveNum
                }]
            });

            model.commissionAmt = inputConfig({
                id: "commissionAmt",
                fieldName: "commissionAmt",
                prefix: leasingComContent.affixCurrency,
                placeholder: "0.00",
                dataType: "text",
                modelOptions: {
                    updateOn: "blur",
                    allowInvalid: true
                },
                onChange: model.methods.get("updateMonthlyCommissionAmt"),
                validators: {
                    positiveNumber: model.methods.get("validateNumber")
                },
                errorMsgs: [{
                    name: "positiveNumber",
                    text: leasingComContent.errPositiveNum
                }]
            });      

            model.destroy = function () {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("leasingCommFormConfigModel", [
            "baseFormConfig",
            "rpFormInputTextConfig",
            "leasingComContentModel",
             factory]);
})(angular);
