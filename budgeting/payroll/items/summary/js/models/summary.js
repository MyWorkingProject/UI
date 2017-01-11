//  summary model
(function (angular) {
    "use strict";

    function factory(
        bmGrid,
        summaryMapper) {
        return function (gridConfig) {
            var model = {},
                grid;

            model.init = function () {
                grid = model.grid = bmGrid();
                grid.setConfig(gridConfig);

                return model;
            };

            model.setGridData = function (data) {
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = summaryMapper.buildGridData(defaultRow, data.records);

                grid
                    .setData(dataRows)
                    .refresh();

                return model;
            };

            model.destroy = function () {
                grid.destroy();
                model = undefined;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("summaryModel", [
            'bmGridModel',
            'summaryMapperModel',
            factory]);
})(angular);
