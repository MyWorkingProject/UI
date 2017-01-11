//  pay grid Model

(function (angular) {
    "use strict";

    function factory($timeout, $filter, gridModel, rowModel, event) {
        return function () {
            var model = gridModel();

            model.configureRow = function (rowData) {
                var rowType = rowData.rowType,
                    row = rowModel().setGrid(model),
                    columns = model.gridConfig.getColumns();

                row
                    .setData(rowData)
                    .setEvents(model.events)
                    .setColumns(columns);

                if (rowType) {
                    var config = model.gridConfig.getRowConfig(rowType);
                    row.extendColumns(config);
                }
                return row;
            };

            model.addRow = function (rowData, index) {
                var row = model.configureRow(rowData);

                if (index === undefined) {
                    model.gridData.push(rowData);
                    model.rows.push(row);
                }
                else {
                    model.gridData.splice(index, 0, rowData);
                    model.rows.splice(index, 0, row.setGrid(model));
                }
                return model;
            };

            model.addRows = function (dataRows, atIndex) {
                dataRows.forEach(function (dataRow, index) {
                    model.addRow(dataRow, atIndex ? atIndex + index : undefined);
                });
                return model;
            };

            model.removeRow = function (index) {
                model.rows.splice(index, 1);
                model.gridData.splice(index, 1);
                return model;
            };

            model.findIndex = function (groupID, rowID) {
                var rowIndex = -1;
                model.forEachRow(function (row, index) {
                    if (row.getGroupID() === groupID && row.getID() == rowID) {
                        rowIndex = index;
                    }
                });
                return rowIndex;
            };

            model.getFirstRowInGroup = function (groupID) {
                return model.getRowsByGroupID(groupID).first();
            };

            model.getLastRowInGroup = function (groupID) {
                return model.getRowsByGroupID(groupID).last();
            };

            model.isFirstRowInGroup = function (column, row) {
                return model.getFirstRowInGroup(row.getGroupID()) === row;
            };

            model.isLastRowInGroup = function (column, row) {
                return model.getLastRowInGroup(row.getGroupID()) === row;
            };

            model.hasRowsInGroup = function (groupID) {
                return model.getRowsByGroupID(groupID).length > 0;
            };

            model.getRowsByGroupID = function (groupID) {
                return $filter('filter')(model.rows, {
                    data: {
                        groupID: groupID
                    }
                }, true);
            };

            model.getRowsBy = function (filterByData) {
                return $filter('filter')(model.rows, {
                    data: filterByData
                }, true);
            };

            /**
             * @return {rows} get all grid data
             */
            model.getDataRows = function () {
                return model.gridData;
            };

            /**
             * @return {rows} get all grid rows 
             */
            model.getRows = function () {
                return model.rows;
            };

            /**
             * @param  {number} group ID
             * @param  {number} level
             * @return {rowModel} All matched rows by group Id & level
             */
            model.getRowsByGroupIDAndLevel = function (groupID, level) {
                return $filter('filter')(model.rows, {
                    data: {
                        groupID: groupID,
                        level: level
                    }
                }, true);
            };

            model.getColumnConfigByKey = function (key) {
                return model.columns.config[key];
            };

            model.refresh = function () {
                $timeout(function () {
                    model.events.publish(event.dataReady);
                });
                return model;
            };

            model.reCalculate = function () {
                model.rows.forEach(function (row) {
                    row.columns.forEach(function (column) {
                        if (column.config.calculationMethod) {
                            var calculate = model.gridConfig.getMethod(column.config.calculationMethod);
                            column.row.data[column.config.key] = calculate(column.config, row, model.gridData);
                        }
                    });
                });
                return model;
            };

            model.reValidate = function () {
                model.rows.forEach(function (row) {
                    row.validation = {};
                    if (row.data.applyValidation) {
                        row.columns.forEach(function (column) {
                            if (column.config.validationMethod) {
                                var isValid = true;
                                var validate = model.gridConfig.getMethod(column.config.validationMethod);
                                isValid = validate(column.config, row, model.gridData);
                                column.row.validation[column.config.key] = isValid;
                            }
                        });
                    }
                });
                return model;
            };

            model.isValid = function () {
                var isValid = true;
                for (var i = 0; i < model.rows.length; i++) {
                    var row = model.rows[i];
                    for (var key in row.validation) {
                        if (!row.validation.hasOwnProperty(key)) {
                            continue;
                        }
                        if (!row.validation[key]) {
                            return false;
                        }

                    }
                }
                return isValid;
            };
            /**
             * @param  {rowModel} grid rows
             * @param  {object} can be an object or value to set in columns that are in editable state
             *                   if data is function invokes function to get value
             *                   if data is object then value will be updated using colum key
             *                   if value then same value will be updated on columns
             * @return {gridModel}
             */
            model.updateDataColumnRows = function (rows, data) {
                rows.forEach(function (row) {
                    row.columns.forEach(function (column) {
                        if (column.isDataColumn() && column.getConfig().isEditable) {
                            var value = data;
                            if (angular.isFunction(data)) {
                                value = data.call(this, column, row);
                            }
                            else if (angular.isObject(data)) {
                                value = data[column.getKey()];
                            }
                            row.getData()[column.getKey()] = parseFloat(value) || 0;
                        }
                    });
                });

                return model;
            };

            /**
            * Toogle row state hidden(flase) or visible(true)
            * @param  {rowModel} grid rows
            * @param  {bool} value to set row state hidden or visible
            *                   if data is function invokes function to get bool value
            *                   if value then same value will used as state
            * @return {gridModel}
            */
            model.toggleRows = function (rows, flgOrHandler) {
                var state = flgOrHandler && true;
                rows.forEach(function (row) {
                    if (angular.isFunction(flgOrHandler)) {
                        state = flgOrHandler.call(this, row);
                    }
                    row.show(state);
                });
                model.publish(event.updateScroll);
                return model;
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("bmGridModel", ["$timeout", "$filter", "rpCgModel", "rpCgRowModel", 'rpCgEventName', factory]);
})(angular);
