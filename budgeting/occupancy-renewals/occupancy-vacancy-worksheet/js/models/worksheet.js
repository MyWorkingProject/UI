//  hourly Model

(function(angular) {
    "use strict";

    function factory(
        worksheetConstant,
        bmGrid,
        worksheetMapper,
        $filter,
        rpGridEvent,
        calculations,
        settings,
        worksheetData,
        worksheetContentModel,
        calcuStateModel, budgetDetails) {
        return function(gridConfig, isEditable) {
            var model = {},
                grid,
                responseData,
                rowConfig = worksheetConstant.getRowConfigs(),
                sourceData,
                selectedRow,
                budgetModel = budgetDetails.getModelDetails();
            model.basicInfo = {
                occupancyType: "goal",
                occData: {},
                columnOptions: "",
                initialRowOptions: "",
                rowHeightClass: "large",
                refValue: true,
                rowOptions: "",
                disableGoal: false,
                disableMoveIn: false,
                monthlyOccupancyVacancy: {},
                occupancyLeaseSettings: {},
                monthlyOccupancyVacancyReference: {},
                updateBeginingUnits: {},
                toolTip: false

            };
            model.form = {};

            model.init = function() {
                angular.copy(model.basicInfo, model.form);
                grid = model.grid = bmGrid();
                grid.edit(isEditable)
                    .setConfig(gridConfig);
                grid.events.subscribe('toggleRow', model.toggleRows);
                model.assBugetDetails();
                grid.isEditable = isEditable;
                return model;
            };

            model.toggleRows = function(row) {
                grid.toggleRows(grid.getRowsBy({
                    groupID: row.getGroupID() + 1,
                    level: row.getLevel()
                }), row.isOpen());
            };

            model.setData = function(data, budgetModel) {
                worksheetData.setWorksheetData(data, budgetModel);
                model.setGridData(worksheetData.getOccupancyWorksheetDetails());
                return model;
            };

            model.getCommentParams = function() {
                return {
                    distributedID: budgetModel.distributedID,
                    commentSource: 'OccupancyVacancy',
                    commentSourceID: 0,
                    accessPrivilages: budgetDetails.getAccessPrivileges().allowComments
                };
            };

            model.getOccupancyLeaseSettings = function() {
                return model.form.occupancyLeaseSettings;
            };

            model.getOccupancyVacancyReference = function() {
                return model.form.monthlyOccupancyVacancyReference;
            };
            model.updateCommentCount = function(updateCommentCount) {
                model.form.commentCount = updateCommentCount;
            };

            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function(data) {

                var dataRows = worksheetMapper.prepareOccupancyData(gridConfig, model.form, grid);
                sourceData = dataRows;
                grid
                    .edit(isEditable)
                    .setData(dataRows)
                    .refresh();

                model.copyColumnOptions(grid);
                return model;
            };

            model.copyColumnOptions = function(options) {
                model.form.columnOptions = angular.copy(options);
            };

            model.destroy = function() {
                grid.destroy();
                model = undefined;
            };

            model.relaodGrid = function(dataRows) {

                grid
                    .edit(true)
                    .setData(dataRows)
                    .refresh();
            };

            model.setFormInput = function() {
                var dataRows = grid.gridData;
                //grid.gridConfig.updateMoveInColumns(model.form.occupancyType === "moveIns");
                //grid.gridConfig.updateoccupancyGoalColumns(model.form.occupancyType !== "moveIns");              
                settings.updateConfigByCondition(grid, model.form.occupancyType);
                dataRows = calculations.updateValues(dataRows, model.form, false);
                model.relaodGrid(dataRows);
                // model.setGridData(model.form.occData);
            };

            model.reCalculate = function(column, row) {
                row.getData()[column.getKey()] = parseFloat(row.getData()[column.getKey()]) || 0;
                var dataRow = grid.gridData;
                if (model.validateForm()) {
                    dataRow = calculations.updateValues(dataRow, model.form, false);
                    model.relaodGrid(dataRow);
                    return true;
                }
                return false;
            };

            model.validateForm = function() {
                /*
                 ** validate Form
                 */
                return true;
            };

            model.updateOccupiedUnits = function() {
                var dataRow = grid.gridData;
                calculations.updateOccupancyDataObject(model.form.updateBeginingUnits.beginingOccupiedUnits, dataRow, worksheetConstant.rowConfig.beginingOccupiedUnits.itemDescription, 1);
                dataRow = calculations.updateValues(dataRow, model.form, false);
                model.relaodGrid(dataRow);
            };

            model.setBOUToolTipflag = function(flag) {
                model.form.toolTip = flag;
            };
            model.getBOUToolTipflag = function() {
                return model.form.toolTip;
            };


            model.updateHelpText = function(column, row, flag) {
                model.setBOUToolTipflag(flag);
                column.row.data.updateBOUToolTip = flag;
                column.row.data.helpText = worksheetContentModel.bou_helptext;

                //    "The 'Beginning occupied units' for the first period is considered to be the " +
                //"'Ending' occupied number of units for the year before this budget year. " +
                //" This gives us a starting point to calculate the 'Ending occupied units' after adjusting for move-ins and move-outs.";

                // model.getOVObject(data, constantModel.rowConfig.occupancyGoal.itemDescription).goalPercentage = calculations.RoundNumber(occupancyGoalTotal / noOfPeriods, 2);
            };

            model.updateBOUHelpText = function(flag) {
                var dataRow = grid.gridData;
                calculations.getDataObject(dataRow, worksheetConstant.rowConfig.beginingOccupiedUnits.itemDescription).updateBOUToolTip = flag;
            };

            model.onOccupancyGoalChage = function() {

                var dataRow = grid.gridData;
                dataRow = calculations.doChangeAnnualGoal(dataRow);
                dataRow = calculations.updateValues(dataRow, model.form, true);
                model.relaodGrid(dataRow);
            };


            model.getColumnOptions = function() {
                var foundItem = $filter('filter')(model.form.columnOptions.columns.data, { key: 'total' }, true)[0];
                var index = model.form.columnOptions.columns.data.indexOf(foundItem);

                if (foundItem !== undefined) {
                    model.form.columnOptions.columns.data.remove(index);
                }
                return model.form.columnOptions;
            };

            model.setUpdatedBeginingUnits = function(data) {
                model.form.updateBeginingUnits = data;
            };

            model.getOptionsForSettings = function() {
                model.form.rowOptions = {
                    small: true,
                    large: true,
                    rowHeightClass: model.form.rowHeightClass,
                    hasShowRefFiled: true,
                    refValue: model.form.refValue
                };
                model.form.initialRowOptions = angular.extend(model.form.rowOptions);
                return model.form.rowOptions;
            };

            model.revertChangesOnCancel = function() {
                model.form.rowOptions = angular.extend(model.form.initialRowOptions);
                model.form.columnOptions = angular.copy(grid);
            };

            model.applyPeriodChanges = function(columnOptions) {
                angular.forEach(grid.columns.config, function(confData) {
                    var objConfig = $filter('filter')(columnOptions.columns.data, { key: confData.key }, true)[0];
                    var objData = $filter('filter')(grid.columns.data, { key: confData.key }, true)[0];

                    if (objConfig !== undefined && objData !== undefined) {
                        confData.state.active = objConfig.state.active;
                        objData.state.active = objConfig.state.active;
                    }
                });
            };

            model.handleReferenceRow = function(options) {
                model.form.refValue = options.refValue;
                grid.toggleRows(grid.getRowsBy({
                    level: 5
                }), model.form.refValue);
            };

            model.getRowHeightClass = function(options) {
                model.form.rowHeightClass = options.rowHeightClass;
                grid.rowHeightClass = options.rowHeightClass;
                grid.publish(rpGridEvent.dataReady);
            };


            /*calcaulation integration*/
            model.getCalculatorData = function() {
                var calculatorState = {};
                calculatorState.sourceDropdownData = sourceData;
                calculatorState.activePeriod = selectedRow;

                calculatorState.startMonth = budgetModel.startMonth;
                calculatorState.startYear = budgetModel.budgetYear;
                calculatorState.noOfPeriods = budgetModel.noOfPeriods;

                return new calcuStateModel(calculatorState);
            };
            model.applyCalculatorChanges = function(calculatedData) {
                if (!calculatedData) {
                    return;
                }
                var dataRow = calculatedData.resultsGrid;
                for (var key in dataRow) {
                    if (!dataRow.hasOwnProperty(key)) {
                        continue;
                    }
                    if (key.lastIndexOf("period", 0) === 0) {
                        selectedRow[key] = dataRow[key];
                    }
                }

                grid
                    .reCalculate()
                    .refresh();
                selectedRow = {};
            };
            model.selectRow = function(column, row) {
                selectedRow = row.data;
            };

            /*calcaulation integration End*/

            model.reset = function() {
                angular.copy(model.basicInfo, model.form);
            };

            function getStartDate(year, month) {
                month += 1;
                month = (month < 9 ? "0" + month : month);
                return year + "-" + month + "-01";
            }

            function getDataTypeValue(names) {
                return $filter('filter')(worksheetConstant.Postformat, {
                    name: names
                }, true);
            }
            model.save = function(grid, data) {
                var pageLoadData = worksheetData.getOccupancyWorksheetDetails();
                var occupancyLeaseRenewals = [];
                var dataChange = false;
                angular.forEach(data, function(item) {
                    var datatype = getDataTypeValue(item.data.itemDescription);
                    if (datatype !== undefined && datatype.length > 0 && item.data.rowType !== "referenceData") {
                        angular.forEach(grid.columns.getData(), function(inneritem) {
                            if (inneritem.key.lastIndexOf("period", 0) === 0) {
                                if (datatype[0].value !== 'Vacany') {
                                    if ($filter('filter')(pageLoadData, { periodNumber: inneritem.key.slice(6) })[0][datatype[0].value.charAt(0).toLowerCase() + datatype[0].value.slice(1)] !== item.data[inneritem.key]) {
                                        dataChange = true;
                                    } else {
                                        dataChange = false;
                                    }
                                } else {
                                    if ($filter('filter')(pageLoadData, { periodNumber: inneritem.key.slice(6) })[0].vacancy !== item.data[inneritem.key]) {
                                        dataChange = true;
                                    } else {
                                        dataChange = false;
                                    }
                                }
                                occupancyLeaseRenewals.push({
                                    "occupancyLeaseRenewalID": 0,
                                    "propertyID": model.budgetDetails.propertyID,
                                    "distributedID": model.budgetDetails.distributedID,
                                    "unitTypeID": 0,
                                    "startDate": getStartDate(inneritem.year, inneritem.month),
                                    "dataType": datatype[0].value,
                                    "dataValue": item.data[inneritem.key],
                                    "dataChange": dataChange,
                                    "serviceGroupID": 0
                                });
                            }
                        });
                    }
                });

                return {
                    occupancyLeaseRenewals: occupancyLeaseRenewals
                };
            };
            model.assBugetDetails = function() {
                model.budgetDetails = budgetDetails.getModelDetails();

            };
            model.inputOccupancy = function() {
                return { occupancyInputType: { occupancyInputType: model.form.occupancyType === 'moveIns' ? 'InputMoveIns' : 'InputOccupancy', budgetModelID: model.budgetDetails.budgetModelID, propertyID: model.budgetDetails.propertyID } };
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
        .factory("worksheetModel", [
            'worksheetConstantModel',
            'bmGridModel',
            'worksheetMapperModel',
            '$filter',
            'rpCgEventName',
            'worksheetCalculations',
            'worksheetSettings',
            'worksheetData',
            'worksheetContentModel',
            'calculatorStateModel',
            'budgetDetails',
            factory
        ]);
})(angular);