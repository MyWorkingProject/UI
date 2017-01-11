//  RenewalCommn Calculation Model

(function (angular) {
    "use strict";

    function factory(bmGridCalculation, renewalCommnConstant) {
        var model = angular.extend({}, bmGridCalculation),
            rowConfig = renewalCommnConstant.getRowConfigs();

        model.getRenewalTotal = function (column, rows) {
            var total = 0;
            if (!column.isEditable) {
                return total;
            }
            total = 1;
            rows.forEach(function (row) {
                total *= parseFloat(row.getData()[column.key], 10);
            });

            return total / 100;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("renewalCommnCalculationModel", [
            'bmGridCalculationModel',
            'renewalCommnConstantModel',
            factory]);
})(angular);
