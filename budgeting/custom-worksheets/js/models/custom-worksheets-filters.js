//  Custom Worksheet Grid Model

(function (angular) {
    "use strict";

    function factory(
        rpCgFilters,
        bmGridFilters) {

        var model = {};

        rpCgFilters.register('roundDecimalsToTenths', function (column, dataType) {
            return (parseFloat(column.row.data[column.config.key]) || 0).toFixed(2);
        });
        
        return model;
    }

    angular
        .module("budgeting")
        .factory("customWorkSheetsGridFiltersModel", [
            "rpCgFilters",
            "bmGridFilters",
             factory]);
})(angular);
