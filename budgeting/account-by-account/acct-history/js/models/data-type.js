
(function (angular) {
    "use strict";

    function dataTypeFactory(i18n) {
        var options = {
                ACTUAL: {
                    value: "Actual",
                    name: i18n.translate("gah_data_type_actual")
                },
                MODEL: {
                    value: "BudgetModel",
                    name: i18n.translate("gah_data_type_model")
                }
            };

        var dataType = angular.copy(options);

        dataType.isActualData = function(val) {
            if(val && val.length > 0) {
                if(dataType.ACTUAL.value == val) {
                    return true;
                }
            }
            return false;
        };

        dataType.getLabel = function(val) {
            if(dataType.ACTUAL.value == val) {
                return dataType.ACTUAL.name;
            } else {
                return dataType.MODEL.name;
            }

        };

        return dataType;
    }

    angular
        .module("budgeting")
        .factory("glAcctDataType", [
            "glAcctTranslatorSvc",
            dataTypeFactory
        ]);
})(angular);