//  hourly Model

(function(angular) {
    "use strict";
    angular
        .module("budgeting")
        .factory("summaryModel", ['bmGridModel', 'summayMapperModel',
            function factory(bmGrid, mapper) {
                return function(gridConfig) {
                    var model = {},
                        grid;

                    model.init = function() {
                        grid = model.grid = bmGrid()
                            .setConfig(gridConfig);
                        return model;
                    };

                    model.setData = function(data) {
                        model.setGridData(data);
                        return model;
                    };
                    /**
                     * Set data to grid by mapping data from json
                     * @param {object}
                     */
                    model.setGridData = function(data) {
                        var defaultRow = gridConfig.getDefaultRow({}, 0);
                        var dataRows = mapper.buildGridData(defaultRow, data);
                        // model.occupancySettings = data.occupancyLeaseSettings;

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


                    return model.init();
                };
            }
        ]);
})(angular);