//  GL Grid Filters Model

(function(angular) {
    "use strict";

    function factory(rpCgFilters, glEditConstant) {
        var model = {},
            referenceCalcuationType = glEditConstant.getReferenceCalculationRowConfigs();

        rpCgFilters.register('formatCalculatedReferenceData', function(column, dataType) {
            var data = column.row.data[column.config.key];
            switch (column.row.data.calculationType) {
                case referenceCalcuationType.dollor.calculationType:
                    data = Math.round(data).toLocaleString();
                    break;
                case referenceCalcuationType.percentage.calculationType:
                    data = data.toFixed(2).toLocaleString() + " %";
                    break;
                case referenceCalcuationType.unit.calculationType:
                    data = data.toFixed(2).toLocaleString();
                    break;
                default:
                    data = data.toLocaleString();
                    break;
            }
            return data;
        });

        return model;
    }

    angular
        .module("budgeting")
        .factory('glGridFilters', ['rpCgFilters', 'glEditConstantModel', factory]);
})(angular);
