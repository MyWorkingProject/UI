//  gl edit mapper Model

(function (angular) {
    "use strict";

    function factory(
        $filter,
        glEditConstant) {
        var model = {},
            columns = glEditConstant.getColumns(),
            rowConfig = glEditConstant.getRowConfigs(),
            referenceCalculationRowConfig = glEditConstant.getReferenceCalculationRowConfigs();

        /**
         * Create's payload data by modify the response data, that can post back to server
         * @param  {Array} payload Data
         * @param  {Array} grid Data
         * @return {Array} modified Array
         */
        model.toJsonFromGrid = function (defaultAdjustment, gridColumns, grid) {
            var glItemizedBudgetModelList = [],
                glAccountAdjPercentList = [],
                monthlyGLAccountAdjAmountList = [],
                monthlyGLWorksheetBudgetList = [],
                monthlyGLAccountBudgetList = [],
                itemizations = grid.getRowsByGroupID(rowConfig.itemization.groupID),
                defaultAdjustments = grid.getRowsByGroupID(rowConfig.defaultAdjustment.groupID).first(),
                customWorksheetItemizations = grid.getRowsByGroupID(rowConfig.customWorksheetItemized.groupID),
                glAccounts = grid.getRowsByGroupID(rowConfig.glAccount.groupID);

            itemizations.forEach(function (row) {
                var itemization = row.getData();
                var glItemizedBudgetDetail = [];
                gridColumns.forEach(function (column) {
                    if (column.isDataColumn && column.isEditable) {
                        glItemizedBudgetDetail.push({
                            glItemizedBudgetID: itemization.glItemizedBudgetID,
                            startDate: column.dateStr,
                            netAmt: itemization[column.key]
                        });
                    }
                });
                glItemizedBudgetModelList.push({
                    glItemizedBudget: {
                        glItemizedBudgetID: itemization.glItemizedBudgetID,
                        itemDescription: itemization.itemDescription,
                        isDefaultRow: itemization.isDefault
                    },
                    glItemizedBudgetDetail: glItemizedBudgetDetail
                });
            });

            if (defaultAdjustments) {
                gridColumns.forEach(function (column) {
                    if (column.isDataColumn && column.isEditable) {
                        glAccountAdjPercentList.push({
                            startDate: column.dateStr,
                            adjPercent: defaultAdjustment.adjustments[column.period - 1].percentage
                        });
                        monthlyGLAccountAdjAmountList.push({
                            startDate: column.dateStr,
                            netAmt: defaultAdjustments[column.key]
                        });
                    }
                });
            }

            customWorksheetItemizations.forEach(function (row) {
                var customWorksheetItemization = row.getData();
                gridColumns.forEach(function (column) {
                    if (column.isDataColumn && column.isEditable) {
                        monthlyGLWorksheetBudgetList.push({
                            startDate: column.dateStr,
                            netAmt: customWorksheetItemization[column.key]
                        });
                    }
                });
            });

            glAccounts.forEach(function (row) {
                var glAccount = row.getData();
                gridColumns.forEach(function (column) {
                    if (column.isDataColumn && column.isEditable) {
                        monthlyGLAccountBudgetList.push({
                            startDate: column.dateStr,
                            netAmt: glAccount[column.key]
                        });
                    }
                });
            });

            return {
                glItemizedBudgetModelList: glItemizedBudgetModelList,
                glAccountAdjPercentList: glAccountAdjPercentList,
                monthlyGLAccountAdjAmountList: monthlyGLAccountAdjAmountList,
                monthlyGLWorksheetBudgetList: monthlyGLWorksheetBudgetList,
                monthlyGLAccountBudgetList: monthlyGLAccountBudgetList
            };
        };

        /**
         * Create's Complex grid rows for the response data & apply row Config
         * @param  {object} default row that will extended
         * @param  {array} response data from service
         * @return {object} this
         */
        model.buildGridData = function (defaultRow, data) {
            var dataRows = [],
                glAccountDetail = data.glAccountDetails,
                totalMappers = [{
                    name: "GLAccount",
                    token: {
                        name: glAccountDetail.glAccountNumber + ' ' + glAccountDetail.description
                    },
                    key: "glAccount"
                }, {
                    name: "AccountCategory",
                    token: {
                        name: glAccountDetail.accountTypeCode
                    },
                    key: "glAccountGroup",
                }, {
                    name: "AccountType",
                    token: {
                        name: glAccountDetail.accountCategoryName
                    },
                    key: "glAccountType"
                }],
                mappers = [{
                    key: "itemization",
                    items: data.itemizations || []
                }, {
                    key: "customWorksheetItemized",
                    items: data.customWorksheetItemized || []
                }, {
                    key: "defaultAdjustment",
                    items: data.adjustments || []
                }];

            if (data.itemizations.length === 0) {
                var itemization = angular.extend({}, defaultRow, rowConfig.itemization);
                itemization.itemDescription = glAccountDetail.description;
                itemization.isDefault = true;
                itemization.glItemizedBudgetID = 0;
                data.itemizations.push(itemization);
            }

            data.itemizations = $filter('orderBy')(data.itemizations, 'isDefault', true);
            mappers.forEach(function (mapper) {
                mapper.items.forEach(function (item, index) {
                    var dataRow = angular.extend({}, defaultRow, item, rowConfig[mapper.key]);
                    dataRow.rowID = index + 1;
                    dataRows.push(dataRow);
                });
            });

            data.drivers.forEach(function (item, index) {
                var dataRow = angular.extend({}, defaultRow, item, rowConfig.workSheet);
                dataRow.workSheetType = item.rowType;
                dataRow.rowID = index + 1;
                dataRows.push(dataRow);
            });

            //rowType

            totalMappers.forEach(function (mapper) {
                var budgetDetail = $filter('filter')(data.glBudgetDetails, {
                        rowType: mapper.name
                    }, true).first(),
                    dataRow = angular.extend({}, defaultRow, budgetDetail, rowConfig[mapper.key]);
                dataRow.itemDescription = dataRow.itemDescription.tokenReplace(mapper.token);
                dataRows.push(dataRow);
            });
            return dataRows;
        };

        model.buildGridReferenceRows = function (defaultRow, budgetType, data) {
            var dataRows = [];

            dataRows.push(angular.extend({}, defaultRow, rowConfig.referenceDataHeader));

            if (data.length === 0) {
                dataRows.push(angular.extend({}, defaultRow, rowConfig.referenceDataEmptyHeader));
            }
            else {
                data.forEach(function (item, index) {
                    var rowClass = index % 2 === 0 ? "reference-data-even" : "reference-data-odd";
                    var dataRow = angular.extend({}, defaultRow, item, rowConfig.referenceData),
                        iCalculatedRow = 0;
                    dataRow.itemDescription = dataRow.rowTitle;
                    dataRow.rowID = index;
                    dataRow.rowClass = rowClass;
                    dataRows.push(dataRow);

                    for (var key in referenceCalculationRowConfig) {
                        dataRow = angular.extend({}, defaultRow, rowConfig.referenceDataDetail, referenceCalculationRowConfig[key]);
                        dataRow.itemDescription = dataRow.itemDescription.tokenReplace({
                            name: budgetType
                        });
                        dataRow.applyValidation = index === 0;
                        dataRow.rowID = iCalculatedRow;
                        dataRow.rowClass = rowClass;
                        dataRow.referenceTypeId = index;
                        dataRows.push(dataRow);
                    }
                });
            }

            return dataRows;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("glEditMapperModel", [
            '$filter',
            'glEditConstantModel',
            factory
        ]);
})(angular);
