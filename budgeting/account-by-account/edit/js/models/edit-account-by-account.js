// Account By Account edit model

(function (angular) {
    "use strict";

    function accountByAccountEditModel(
        bmGrid,
        glEditConstant,
        glEditMapper,
        glGridCalculations,
        glGridValidations) {

        return function (gridConfig, isEditable) {
            var model = {
                    hasRuleVoilationComments: false
                },
                rowConfig = glEditConstant.getRowConfigs(),
                grid,
                itemizationRowCount = -1,
                defaultItemizationRow,
                glAccountDetail,
                defaultAdjustment = {},
                glItemizedBudgetDelete,
                hasDataChanged,
                selectedRow,
                sourceData,
                commentRule;

            model.init = function () {
                grid = model.grid = bmGrid();
                grid
                    .edit(isEditable)
                    .setConfig(gridConfig);

                return model;
            };

            model.getDefaultAdjustment = function () {
                return defaultAdjustment;
            };

            model.applyDefaultAdjustment = function (adjustments) {
                hasDataChanged = true;
                var rows = grid.getRowsByGroupID(rowConfig.defaultAdjustment.groupID);
                grid
                    .updateDataColumnRows(rows, function (column) {
                        return adjustments[column.getConfig().period - 1].amount;
                    })
                    .reCalculate()
                    .reValidate()
                    .refresh();
                adjustments.forEach(function (item, index) {
                    defaultAdjustment.adjustments[index].percentage = item.percentage;
                });

                return model;
            };

            model.setGLSearch = function (budgetModel, glAccountDetail) {
                model.glSearch = {
                    budgetModelID: budgetModel.budgetModelID,
                    siteID: budgetModel.propertyID,
                    glAccountNumber: glAccountDetail.glAccountNumber,
                    glAccountDescription: glAccountDetail.description,
                    source: "accountbyaccount"
                };
                return model;
            };

            model.getColumns = function () {
                return gridConfig.getColumns().getData();
            };

            model.updateColumnVisibility = function (options) {
                gridConfig.forEachColumn(function (column, index) {
                    column.state.active = options[index].value;
                });
                return model;
            };

            model.setDefaultAdjustment = function (defaultAdjustments, referenceData, isFinal) {
                var firstReferenceData = referenceData.first();
                defaultAdjustment = {
                    year: 0,
                    type: "",
                    adjustments: []
                };
                if (firstReferenceData && defaultAdjustments.length > 0) {
                    gridConfig.getColumns().getData().forEach(function (column) {
                        if (column.isDataColumn) {
                            var origVal = firstReferenceData[column.key];
                            var defaultAdjustmentItem = defaultAdjustments.first();
                            var percentage = 0;
                            if (!isFinal) {
                                percentage = defaultAdjustmentItem[column.key];
                                defaultAdjustmentItem[column.key] = origVal + (origVal * parseInt(percentage) / 100);
                            }
                            else {
                                percentage = glGridCalculations
                                    .round(100 * (defaultAdjustmentItem[column.key] - origVal) / origVal, 2);
                            }
                            defaultAdjustment.adjustments.push({
                                "amount": origVal,
                                "percentage": percentage
                            });
                        }
                    });
                    defaultAdjustment.year = firstReferenceData.dataRefYear;
                    defaultAdjustment.type = firstReferenceData.dataRefType;
                }
                return model;
            };

            model.setGridData = function (budgetType, details, referenceData) {
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = []
                    .concat(glEditMapper.buildGridData(defaultRow, details))
                    .concat(glEditMapper.buildGridReferenceRows(defaultRow, budgetType, referenceData));

                sourceData = referenceData;

                model.glAccountDetail = glAccountDetail = details.glAccountDetails;
                model.commentRule = commentRule = details.commentRule;
                //itemizationRowCount = details.itemizations.length;
                glItemizedBudgetDelete = [];
                hasDataChanged = false;
                model.hasRuleVoilationComments = false;
                selectedRow = undefined;
                grid
                    .setData(dataRows)
                    .reCalculate()
                    .reValidate()
                    .refresh();

                return model;
            };

            model.getGAccountNumber = function () {
                return model.glAccountDetail.glAccountNumber;
            };

            model.getGLDescription = function () {
                return model.glAccountDetail.description;
            };

            model.getCommentModel = function () {
                return {
                    glAccountNumber: glAccountDetail.glAccountNumber+' '+glAccountDetail.description,
                    glGeneralCommentsCount: glAccountDetail.generalCommentCount,
                    glReviewerCommentsCount: glAccountDetail.reviewCommentCount,
                };
            };

            model.addItemizationRow = function (column, row) {
                hasDataChanged = true;
                var lastRow = grid.getLastRowInGroup(row.getGroupID()),
                    index = grid.findIndex(row.getGroupID(), lastRow.getData().rowID) + 1,
                    dataRow = gridConfig.getDefaultRow(glEditConstant.rowConfig.itemization, 0);
                dataRow.itemDescription = "";
                dataRow.glItemizedBudgetID = 0;
                dataRow.rowID = lastRow.getData().rowID + 1;
                dataRow.isDefault = false;
                grid
                    .addRow(dataRow, index)
                    .reCalculate()
                    .reValidate()
                    .refresh();
                return model;
            };

            model.removeItemizationRow = function (column, row) {
                hasDataChanged = true;
                if (row.getData().glItemizedBudgetID !== 0) {
                    glItemizedBudgetDelete.push(row.getData().glItemizedBudgetID);
                }
                var index = grid.findIndex(row.getGroupID(), row.getData().rowID);
                grid
                    .removeRow(index)
                    .reCalculate()
                    .reValidate()
                    .refresh();
            };

            model.getSourceData = function () {
                return sourceData;
            };

            model.getSelectedRow = function () {
                return selectedRow && selectedRow.getData();
            };

            model.selectRow = function (column, row) {
                selectedRow = row;
                return model;
            };

            model.updateItemization = function (column, row) {
                hasDataChanged = true;
                row.data[column.config.key] = parseFloat(row.data[column.config.key]) || 0;
                grid
                    .reCalculate()
                    .reValidate()
                    .refresh();
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

            model.getReferenceDiffPerType = function (column, row, rows, noOfUnits) {
                return glGridCalculations.getReferenceDiffPerType(column, row, rows, noOfUnits);
            };

            model.getTotalReferenceDiffPerType = function (column, row, rows) {
                return glGridCalculations.getRowTotal(column, row, rows);
            };

            model.getRowTotal = function (column, row, rows) {
                return glGridCalculations.getRowTotal(column, row, rows);
            };

            model.getGLTotal = function (column, row, rows) {
                return glGridCalculations.getGLTotal(column, row, rows);
            };

            model.applyRuleBasedValidation = function (column, row, rows) {
                if (!commentRule) {
                    return true;
                }
                var total = glGridCalculations
                    .getCalculatedTotalByType(column, row, rows, commentRule.type);
                return glGridValidations
                    .ruleOperatorBasedValidation(total, commentRule.operator, commentRule.amount);
            };

            model.isValid = function () {
                return grid.isValid() || model.hasRuleVoilationComments;
            };

            model.updateCommentCount = function (commentInfoModel) {
                model.hasRuleVoilationComments = commentInfoModel.hasGeneralCommentsAdded;
                glAccountDetail.generalCommentCount = commentInfoModel.glGeneralCommentsCount;
                glAccountDetail.reviewCommentCount = commentInfoModel.glReviewerCommentsCount;
            };

            model.applyCalculatorChanges = function (calculatedData) {
                if (!calculatedData) {
                    return;
                }
                hasDataChanged = true;
                grid
                    .updateDataColumnRows([selectedRow], calculatedData.resultsGrid)
                    .reCalculate()
                    .reValidate()
                    .refresh();
            };

            model.getcommentRuleMessage = function (commentRuleVolationMessageFormat, dollorOperatorText, percentageOperatorText, greaterThanText, lessThanText) {
                var total = grid
                    .getRowsBy({
                        groupID: rowConfig.referenceDataDetail.groupID,
                        level: rowConfig.referenceDataDetail.level,
                        calculationType: angular.lowercase(commentRule.type),
                        referenceTypeId: 0
                    }, true)
                    .first()
                    .getData()
                    .total;

                return glGridValidations
                    .ruleOperatorBasedValidationComment(total,
                        commentRule,
                        commentRuleVolationMessageFormat,
                        dollorOperatorText,
                        percentageOperatorText,
                        greaterThanText,
                        lessThanText);
            };

            model.getPostData = function (distributedID,
                budgetModelID,
                propertyID,
                budgetType,
                assettype) {
                var payload = glEditMapper.toJsonFromGrid(defaultAdjustment, gridConfig.getColumns().getData(),
                    grid);
                return {
                    distributedID: distributedID,
                    budgetModelID: budgetModelID,
                    propertyID: propertyID,
                    glAccountNumber: glAccountDetail.glAccountNumber,
                    budgetType: budgetType,
                    isDataChanged: hasDataChanged,
                    assetType: assettype,
                    glItemizedBudgetDelete: glItemizedBudgetDelete,
                    glItemizedBudgetModelList: payload.glItemizedBudgetModelList,
                    glAccountAdjPercentList: payload.glAccountAdjPercentList,
                    monthlyGLAccountAdjAmountList: payload.monthlyGLAccountAdjAmountList,
                    monthlyGLWorksheetBudgetList: payload.monthlyGLWorksheetBudgetList,
                    monthlyGLAccountBudgetList: payload.monthlyGLAccountBudgetList
                };
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
        .factory('accountByAccountEditModel', [
            'bmGridModel',
            'glEditConstantModel',
            'glEditMapperModel',
            'glGridCalculations',
            'glGridValidations',
            accountByAccountEditModel
        ]);
})(angular);
