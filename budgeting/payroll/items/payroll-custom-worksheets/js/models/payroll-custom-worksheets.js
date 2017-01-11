//  Custom worksheets model
(function (angular) {
    "use strict";

    function factory(
        payrollItem,
        bmGrid,
        bmCalculator,
        customWorksheetConstant,
        cwMapper) {
        return function (gridConfig) {
            var model = payrollItem(),
                grid;

            model.init = function () {
                grid = model.grid = bmGrid();
                grid.setConfig(gridConfig);

                return model;
            };

            model.getRowTotal = function (column, row, rows) {
                return bmCalculator.getRowTotal(column, row, rows);
            };

            model.getTotal = function (column, row, rows) {
                return bmCalculator.getTotalByGroup(column, row, rows, customWorksheetConstant.rowConfig.customWorksheet.groupID);
            };


            model.setGridData = function (data) {
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = cwMapper.buildGridData(defaultRow, data);

                grid
                    .setData(dataRows)
                    .reCalculate()
                    .refresh();

                return model;
            };

            model.destroy = function () {
                grid.destroy();
                model = undefined;
            };

            model.setCommentCount = function (count) {
                model.commentCount = count;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("payrollCustomWorksheetsModel", [
            'payrollItemModel',
            'bmGridModel',
            'bmGridCalculationModel',
            'payrollCustomWorksheetsConstantModel',
            'payrollCustomWorksheetMapperModel',
            factory]);
})(angular);
