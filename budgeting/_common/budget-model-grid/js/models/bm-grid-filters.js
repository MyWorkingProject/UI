//  GL Grid Filters Model

(function (angular) {
    "use strict";

    function factory(rpCgFilters) {
        var model = {};

        rpCgFilters.register('noFormat', function (column, dataType) {
            return column.row.data[column.config.key];
        });

        rpCgFilters.register('roundNumber', function (column, dataType) {
            var data = column.row.data[column.config.key];
            data = Math.round(data).toLocaleString();
            return data;
        });

        rpCgFilters.register('roundNumberWithDecimals', function (column, dataType) {
            var value = column.row.data[column.config.key],
                decimals = column.config.decimals || 0,
                roundTo = Math.pow(10, (column.config.decimals || 1));
            return parseFloat(Math.round(parseFloat(value) * roundTo) / roundTo).toFixed(decimals).toLocaleString();
        });

        return model;
    }

    angular
        .module("budgeting")
        .factory('bmGridFilters', ['rpCgFilters', factory]);
})(angular);
