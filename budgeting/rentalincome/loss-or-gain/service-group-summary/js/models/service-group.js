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
        worksheetContentModel, budgetDetails, calcuStateModel) {
        return function(gridConfig, isEditable) {
            var model = {},
                grid,
                responseData,
                rowConfig = worksheetConstant.getRowConfigs(),
                sourceData, selectedRow, budgetModel;

            model.basicInfo = {
                occupancyType: "InputOccupancy",
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
            budgetModel = budgetDetails.getModelDetails();
            model.init = function() {
                angular.copy(model.basicInfo, model.form);
                grid = model.grid = bmGrid();
                grid.edit(isEditable)
                    .setConfig(gridConfig);
                grid.events.subscribe('toggleRow', model.toggleRows);
                grid.isEditable = isEditable;
                return model;
            };

            model.toggleRows = function(row) {
                grid.toggleRows(grid.getRowsBy({
                    groupID: row.getGroupID() + 1,
                    level: row.getLevel()
                }), row.isOpen());
            };

            model.setData = function(data) {
                worksheetData.setWorksheetData(data);
                model.setGridData(worksheetData.getOccupancyWorksheetDetails());
                model.setFormData(worksheetData.getOccupancyWorksheetSettings());
                return model;
            };



            model.getOccupancyLeaseSettings = function() {
                return model.form.occupancyLeaseSettings;
            };

            model.getOccupancyVacancyReference = function() {
                return model.form.monthlyOccupancyVacancyReference;
            };
            model.setFormData = function(data) {
                model.form.occupancyType = data.occupancyInputType;
                model.form.commentCount = data.commentCount;
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
                    .reCalculate()
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
            model.selectRow = function(column, row) {
                selectedRow = row.data;
            };
            model.relaodGrid = function(dataRows) {

                grid
                    .edit(isEditable)
                    .setData(dataRows).reCalculate()
                    .refresh();
            };

            model.setFormInput = function() {
                var dataRows = grid.gridData;
                settings.updateConfigByCondition(grid, model.form.occupancyType);
                model.relaodGrid(dataRows);
            };

            model.reCalculate = function(column, row) {
                row.getData()[column.getKey()] = (parseFloat(row.getData()[column.getKey()])) || 0;
                row.getData()[column.getKey()] = row.getData()[column.getKey()] > 0 ? row.getData()[column.getKey()] : 0;

                var dataRow = grid.gridData;
                if (model.validateForm()) {
                    model.relaodGrid(dataRow);
                }
                return false;
            };

            model.validateForm = function() {
                /*
                 ** validate Form
                 */
                return true;
            };

            model.onOccupancyGoalChage = function(moveInUpdate, goalUpdate) {
                var dataRow = grid.gridData;
                var occupnacyGoalItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.occupancyGoal });
                var moveinsItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.moveins });
                var totalMoveoutsItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.totalMoveouts });
                var netOccupancyChangeItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.netOccupancyChange });
                var endingOccupiedUnitsItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.endingOccupiedUnits });
                var occupancyItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.occupancy });
                var occupancyTurnOverPercentItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.occupancyTurnOverPercent });
                var previousTurnOverPercentItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.previousTurnOverPercent });
                var vacantUnitsItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.vacantUnits });
                var vacanyItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.vacany });
                var beginingOccupiedUnitsItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.beginingOccupiedUnits });
                var occupancyNumberOfUnitsItem = $filter('filter')(dataRow, { itemDescription: worksheetContentModel.occupancyNumberOfUnits });
                angular.forEach(grid.columns.getData(), function(inneritem) {
                    if (inneritem.key.lastIndexOf("period", 0) === 0) {
                        var key = inneritem.key;
                        if (goalUpdate === undefined || goalUpdate) {
                            occupnacyGoalItem[0][key] = calculations.RoundNumber(occupnacyGoalItem[0].goalPercentage, 1);
                        }
                        if (model.form.occupancyType === 'moveIns') {
                            endingOccupiedUnitsItem[0][key] = calculations.RoundNumber(parseInt(beginingOccupiedUnitsItem[0][key]) + netOccupancyChangeItem[0][key], 1);
                        } else {
                            endingOccupiedUnitsItem[0][key] = calculations.RoundNumber((occupancyNumberOfUnitsItem[0][key] * occupnacyGoalItem[0][key]) / 100, 1);
                        }
                        if (moveInUpdate === undefined || moveInUpdate) {
                            moveinsItem[0][key] = calculations.RoundNumber((endingOccupiedUnitsItem[0][key] - parseInt(beginingOccupiedUnitsItem[0][key]) + parseInt(totalMoveoutsItem[0][key])), 1);
                        }
                        netOccupancyChangeItem[0][key] = calculations.RoundNumber(parseInt(moveinsItem[0][key]) - parseInt(totalMoveoutsItem[0][key]), 1);
                        occupancyItem[0][key] = calculations.RoundNumber((endingOccupiedUnitsItem[0][key] / occupancyNumberOfUnitsItem[0][key]) * 100, 1);
                        occupancyTurnOverPercentItem[0][key] = calculations.RoundNumber((parseInt(totalMoveoutsItem[0][key]) / occupancyNumberOfUnitsItem[0][key]) * 100, 1);
                        vacantUnitsItem[0][key] = calculations.RoundNumber((occupancyNumberOfUnitsItem[0][key] - endingOccupiedUnitsItem[0][key]), 1);
                        vacanyItem[0][key] = calculations.RoundNumber((vacantUnitsItem[0][key] / occupancyNumberOfUnitsItem[0][key]) * 100, 1);
                    }
                });


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

            model.getOptionsForSettings = function() {
                model.form.rowOptions = {
                    small: true,
                    large: true,
                    rowHeightClass: model.form.rowHeightClass,
                    hasShowRefFiled: false,
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

            model.reset = function() {
                angular.copy(model.basicInfo, model.form);
            };
            model.storeServiceGroupId = function(selectedserviceGroupId) {
                var indexServiceGroupID;
                angular.forEach(model.serviceGroupData, function(item, index) {
                    if (item.serviceGroupID === parseInt(selectedserviceGroupId)) {
                        model.selectedServiceGroup = {
                            serviceGroupID: item.serviceGroupID,
                            serviceGroupName: item.serviceGroupName
                        };
                        indexServiceGroupID = index;
                    }
                });
                if (model.serviceGroupData[indexServiceGroupID - 1] !== undefined) {
                    model.prevServiceGroup = {
                        serviceGroupID: model.serviceGroupData[indexServiceGroupID - 1].serviceGroupID,
                        serviceGroupName: model.serviceGroupData[indexServiceGroupID - 1].serviceGroupName
                    };
                    model.prevServiceflag = true;
                } else {
                    model.prevServiceflag = false;
                }
                if (model.serviceGroupData[indexServiceGroupID + 1] !== undefined) {
                    model.nextServiceGroup = {
                        serviceGroupID: model.serviceGroupData[indexServiceGroupID + 1].serviceGroupID,
                        serviceGroupName: model.serviceGroupData[indexServiceGroupID + 1].serviceGroupName
                    };
                    model.nextServiceflag = true;
                } else {
                    model.nextServiceflag = false;
                }
            };
            model.currentServiceGroup = function(id) {
                model.currentServiceGroupId = id;
            };
            model.getCommentParams = function() {
                return {
                    distributedID: budgetModel.distributedID,
                    commentSource: 'OccupancyVacancyByServiceGroup',
                    commentSourceID: model.currentServiceGroupId,
                    accessPrivilages: budgetDetails.getAccessPrivileges().allowComments,
                    subTitle: model.selectedServiceGroup.serviceGroupName,
                    serviceGroupID: model.currentServiceGroupId,
                };
            };
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
                        selectedRow[key] = calculations.RoundNumber(dataRow[key], 1);
                    }
                }

                grid
                    .reCalculate()
                    .refresh();
                selectedRow = {};
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
                    if (datatype !== undefined && datatype.length > 0) {
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
                                    "propertyID": budgetModel.propertyID,
                                    "distributedID": budgetModel.distributedID,
                                    "unitTypeID": 0,
                                    "startDate": getStartDate(inneritem.year, inneritem.month),
                                    "dataType": datatype[0].value,
                                    "dataValue": item.data[inneritem.key],
                                    "dataChange": dataChange,
                                    "serviceGroupID": model.selectedServiceGroup.serviceGroupID
                                });
                            }
                        });
                    }
                });

                return {
                    occupancyLeaseRenewals: occupancyLeaseRenewals
                };
            };
            model.inputOccupancy = function() {
                return {
                    occupancyInputType: {
                        occupancyInputType: model.form.occupancyType,
                        "serviceGroupID": model.selectedServiceGroup.serviceGroupID,
                        "distributedID": budgetModel.distributedID,
                    }
                };
            };
            model.storeServiceGroups = function(data) {
                model.serviceGroupData = data.records;

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
            return model.init();

        };
    }

    angular
        .module("budgeting")
        .factory("sgworksheetModel", [
            'sgworksheetConstantModel',
            'bmGridModel',
            'sgworksheetMapperModel',
            '$filter',
            'rpCgEventName',
            'sgworksheetCalculations',
            'sgworksheetSettings',
            'sgworksheetData',
            'sgworksheetContentModel', 'budgetDetails', 'calculatorStateModel',
            factory
        ]);
})(angular);