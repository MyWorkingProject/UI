//  Payroll Leasing Commissions Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        rpCgFilters,
        bmGridFilters,
        leasingCommCalculation,
        leasingComContent) {

        var model = angular.merge({}, bmGridFilters);

        rpCgFilters.register('roundDecimalsToTenths', function(column, dataType) {
            return leasingCommCalculation.getRoundedString(column.row.data[column.config.key], 2);
        });

        rpCgFilters.register('formatPercent', function(column, dataType) {
            return leasingCommCalculation.getRoundedString(column.row.data[column.config.key], 2) +
                    leasingComContent.affixPercent;
        });

        return model;
    }

    angular
        .module("budgeting")
        .factory("leasingCommGridFiltersModel", [
            "rpCgFilters",
            "bmGridFilters",
            "leasingCommCalculationModel",
            "leasingComContentModel",
             factory]);
})(angular);
