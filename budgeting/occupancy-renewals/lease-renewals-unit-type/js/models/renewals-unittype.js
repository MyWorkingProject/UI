//  hourly Model

(function (angular) {
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
        $stateParams,
        $location,
        calculatorStateModel) {
        return function (gridConfig) {
            var model = {},
                grid,
                responseData,
                rowConfig = worksheetConstant.getRowConfigs(), sourceData, selectedRow;

            model.basicInfo = {
                renewalsType: "percentage",
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

            model.init = function () {
                angular.copy(model.basicInfo, model.form);
                grid = model.grid = bmGrid()
                    .setConfig(gridConfig);
                grid.events.subscribe('toggleRow', model.toggleRows);
                return model;
            };

            model.toggleRows = function (row) {
                grid.toggleRows(grid.getRowsBy({
                    groupID: row.getGroupID() + 1,
                    level: row.getLevel()
                }), row.isOpen());
            };

            model.setData = function (data, budgetModelSettings) {
                worksheetData.setWorksheetData(data, budgetModelSettings);
                model.setGridData(worksheetData.getOccupancyWorksheetDetails());
                return model;
            };

            model.getCalculatorData = function () {
                var calculatorState = {};
                calculatorState.sourceDropdownData = worksheetData.getOccupancyWorksheetDetails();
                calculatorState.activePeriod = selectedRow;
                calculatorState.startMonth = worksheetData.renewalsData.budgetModelSettings.startMonth;
                calculatorState.startYear = worksheetData.renewalsData.budgetModelSettings.budgetYear;
                calculatorState.noOfPeriods = worksheetData.renewalsData.budgetModelSettings.noOfPeriods;
                return new calculatorStateModel(calculatorState);
            };

            model.selectRow = function (column, row) {
                selectedRow = row.data;
            };

            model.applyCalculatorChanges = function (calculatedData) {
                if (!calculatedData) {
                    return;
                }
                var dataRow = calculatedData.resultsGrid;
                if (selectedRow.rowType === "leaseExpPreMonth") {
                    selectedRow["period1"] = calculations.RoundNumber(dataRow["period1"], 1);
                }
                else {
                    for (var key in dataRow) {
                        if (!dataRow.hasOwnProperty(key)) {
                            continue;
                        }
                        if (key.lastIndexOf("period", 0) === 0) {
                            selectedRow[key] = calculations.RoundNumber(dataRow[key], 1);
                        }
                    }
                }

                grid
                    .reCalculate()
                    .refresh();
                selectedRow = {};

                model.reCalculate();
            };

            //TODO: comment source as API's not ready for occupancy renewals
            model.getCommentParams = function (accessWrite) {
                return {
                    distributedID: worksheetData.renewalsData.budgetModelSettings.distributedID,
                    commentSource: 'MarketRentUnit',
                    commentSourceID: 1,
                    accessPrivilages: accessWrite
                };
            };

            model.getOccupancyLeaseSettings = function () {
                return model.form.occupancyLeaseSettings;
            };

            model.getOccupancyVacancyReference = function () {
                return model.form.monthlyOccupancyVacancyReference;
            };


            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function (data) {
                var dataRows = worksheetMapper.prepareOccupancyData(gridConfig, model.form, grid);

                grid
                     .edit(true)
                    .setData(dataRows)
                    .refresh();

                model.copyColumnOptions(grid);
                return model;
            };

            model.copyColumnOptions = function (options) {
                model.form.columnOptions = angular.copy(options);
            };

            model.destroy = function () {
                grid.destroy();
                model = undefined;
            };

            model.relaodGrid = function (dataRows) {

                grid
                   .edit(true)
                  .setData(dataRows)
                  .refresh();
            };

            model.setFormInput = function () {
                var dataRows = grid.gridData;
                settings.updateConfigByCondition(grid, model.form.renewalsType);
                dataRows = calculations.updateValues(dataRows, model.form);
                model.relaodGrid(dataRows);
            };

            model.reCalculate = function () {
                var dataRow = grid.gridData;
                if (model.validateForm()) {
                    dataRow = calculations.updateValues(dataRow, model.form);
                    model.relaodGrid(dataRow);
                    return true;
                }
                return false;
            };

            model.validateForm = function () {
                /*
                 ** validate Form
                 */
                return true;
            };

            model.updateOccupiedUnits = function () {
                var dataRow = grid.gridData;
                calculations.updateOccupancyDataObject(model.form.updateBeginingUnits.beginingOccupiedUnits, dataRow, worksheetConstant.rowConfig.beginingOccupiedUnits.itemDescription, 1);
                dataRow = calculations.updateValues(dataRow, model.form, false);
                model.relaodGrid(dataRow);
            };

            model.setBOUToolTipflag = function (flag) {
                model.form.toolTip = flag;
            };
            model.getBOUToolTipflag = function () {
                return model.form.toolTip;
            };


            model.updateHelpText = function (column, row, flag) {
                model.setBOUToolTipflag(flag);
                column.row.data.updateBOUToolTip = flag;
                column.row.data.helpText = worksheetContentModel.bou_helptext;
            };

            model.updateBOUHelpText = function (flag) {
                var dataRow = grid.gridData;
                calculations.getDataObject(dataRow, worksheetConstant.rowConfig.beginingOccupiedUnits.itemDescription).updateBOUToolTip = flag;
            };

            model.onOccupancyGoalChage = function () {

                var dataRow = grid.gridData;
                dataRow = calculations.doChangeAnnualGoal(dataRow);
                dataRow = calculations.updateValues(dataRow, model.form, true);
                model.relaodGrid(dataRow);
            };


            model.getColumnOptions = function () {
                var foundItem = $filter('filter')(model.form.columnOptions.columns.data, { key: 'total' }, true)[0];
                var index = model.form.columnOptions.columns.data.indexOf(foundItem);

                if (foundItem !== undefined) {
                    model.form.columnOptions.columns.data.remove(index);
                }
                return model.form.columnOptions;
            };

            model.setUpdatedBeginingUnits = function (data) {
                model.form.updateBeginingUnits = data;
            };

            model.getOptionsForSettings = function () {
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

            model.revertChangesOnCancel = function () {
                model.form.rowOptions = angular.extend(model.form.initialRowOptions);
                model.form.columnOptions = angular.copy(grid);
            };

            model.applyPeriodChanges = function (columnOptions) {
                angular.forEach(grid.columns.config, function (confData) {
                    var objConfig = $filter('filter')(columnOptions.columns.data, { key: confData.key }, true)[0];
                    var objData = $filter('filter')(grid.columns.data, { key: confData.key }, true)[0];

                    if (objConfig !== undefined && objData !== undefined) {
                        confData.state.active = objConfig.state.active;
                        objData.state.active = objConfig.state.active;
                    }
                });
            };

            model.handleReferenceRow = function (options) {
                model.form.refValue = options.refValue;
                grid.toggleRows(grid.getRowsBy({
                    level: 5
                }), model.form.refValue);
            };

            model.getRowHeightClass = function (options) {
                model.form.rowHeightClass = options.rowHeightClass;
                grid.rowHeightClass = options.rowHeightClass;
                grid.publish(rpGridEvent.dataReady);
            };

            model.reset = function () {
                angular.copy(model.basicInfo, model.form);
            };

            model.navigateToOccupancyWorksheet = function (col, row) {
                $location.path("/occupancy-renewals/" + $stateParams.distID + "/occupancy-vacancy/worksheet");
            };

            model.getColumns = function () {
                return gridConfig.getColumns().getData();
            };

            model.setGridSize = function (size) {
                grid.rowHeightClass = size;
                return model;
            };

            model.toggleReferenceData = function (level) {
                var rows = grid.getRowsByGroupID(rowConfig.referenceData.groupID);
                grid
                    .toggleRows(rows, function (row) {
                        return row.getLevel() <= level;
                    });
                return model;
            };

            model.updateColumnVisibility = function (options) {
                gridConfig.forEachColumn(function (column, index) {
                    column.state.active = options[index].value;
                });
                return model;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("renewalsUnitTypeModel", [
            'renewalsUnitTypeConstantModel',
            'bmGridModel',
            'renewalsUnitTypeMapperModel',
            '$filter',
            'rpCgEventName',
            'renewalsUnitTypeCalculations',
            'renewalsUnitTypeSettings',
            'renewalsUnitTypeData',
            'renewalsUnitTypeContentModel',
            '$stateParams',
            '$location',
            'calculatorStateModel',
            factory]);
})(angular);
