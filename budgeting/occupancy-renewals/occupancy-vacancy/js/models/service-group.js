//  hourly Model

(function(angular) {
    "use strict";

    function factory(
        serviceGroupConstant,
        bmGrid,
        serviceGroupMapper, $filter) {
        return function(gridConfig) {
            var model = {},
                grid,
                responseData,
                rowConfig = serviceGroupConstant.getRowConfigs();

            model.init = function() {
                grid = model.grid = bmGrid()
                    .setConfig(gridConfig);
                return model;
            };

            model.setData = function(data, budgetModel) {
                model.setGridData(data, budgetModel);
                return model;
            };
            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function(data, budgetModel) {
                model.occupancySettings = data.occupancyLeaseSettings;
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = serviceGroupMapper.buildGridData(defaultRow, data, model.occupancySettings, budgetModel);

                grid
                    .setData(dataRows)
                    .reCalculate()
                    .refresh();

                return model;
            };

            model.destroy = function() {
                grid.destroy();
                model = undefined;
            };

            /**
             * get all the column Info
             */
            model.getColumnInfo = function() {
                return grid;
            };

            /**
             * get all the Row Options Info
             */
            model.getRowOptions = function() {
                return grid;
            };


            model.handleReferenceRow = function(options) {
                model.form.refValue = options.refValue;
                grid.toggleRows(grid.getRowsBy({
                    level: 5
                }), model.form.refValue);
            };

            model.getRowAvg = function(column, row, rows) {
                var total = 0;
                var dataRow = row.getData();
                var flag = 0;
                for (var key in dataRow) {
                    if (!dataRow.hasOwnProperty(key)) {
                        continue;
                    }

                    if (key.lastIndexOf("period", 0) === 0) {
                        flag += 1;
                        total += parseFloat(dataRow[key], 10) || 0;
                    }
                }

                return parseInt(total / flag);
            };
            model.getColumns = function() {
                return gridConfig.getColumns().getData();
            };

            model.updateColumnVisibility = function(options) {
                gridConfig.forEachColumn(function(column, index) {
                    column.state.active = options[index].value;
                });
                return model;
            };
            model.setGridSize = function(size) {
                grid.rowHeightClass = size;
                return model;
            };

            model.toggleReferenceData = function(level) {
                var rows = grid.getRowsByGroupID(rowConfig.referenceData.groupID);
                grid
                    .toggleRows(rows, function(row) {
                        return row.getLevel() <= level;
                    });
                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("serviceGroupModel", [
            'serviceGroupConstantModel',
            'bmGridModel',
            'serviceGroupMapperModel', '$filter',
            factory
        ]);
})(angular);