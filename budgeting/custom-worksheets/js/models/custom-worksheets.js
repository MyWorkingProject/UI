//ModelSettingsNav

(function(angular) {
    "use strict";

    function factory(
        bmGrid,
        customWorksheetMapper) {
        return function(gridConfig) {
            var model = {},
                grid,
                gridDataRows;

            model.init = function() {
                grid = model.grid = bmGrid()
                    .setConfig(gridConfig);
                model.accountType = 0;
                model.accountCategory = 0;
                model.search = "";
                return model;
            };

            model.setData = function(accountTypes, customWorksheetList) {
                var defaultRow = gridConfig.getDefaultRow({}, 0);
                gridDataRows = customWorksheetMapper.buildGridData(defaultRow, accountTypes, customWorksheetList);
                grid
                    .setData(model.getMatchedRows(model.accountType, model.accountCategory, model.search));
            };

            model.getMatchedRows = function(accountTypeID, accountCategoryID, searchText) {
                var dataRows = [],
                    accountTypeDataRow,
                    accountTypeRowIndex = 0,
                    hasItemsInAccountType = false;

                gridDataRows.forEach(function(dataRow) {
                    if (dataRow.rowID === 0) {
                        if (hasItemsInAccountType) {
                            dataRows.insertAt(accountTypeRowIndex, accountTypeDataRow);
                        }
                        accountTypeDataRow = dataRow;
                        accountTypeRowIndex = dataRows.length;
                        hasItemsInAccountType = false;
                    } else {
                        var exists = true;
                        if (searchText !== "") {
                            exists = dataRow.itemDescription.indexOf(searchText) !== -1 || dataRow.glAccountName.indexOf(searchText) !== -1;
                        }
                        if (accountCategoryID !== 0) {
                            exists = exists && dataRow.accountCategoryID === accountCategoryID;
                        }
                        if (accountTypeID !== 0) {
                            exists = exists && dataRow.accountTypeID === accountTypeID;
                        }
                        if (exists) {
                            hasItemsInAccountType = true;
                            dataRows.push(dataRow);
                        }
                    }
                });

                return dataRows;
            };

            model.showSelectedAccounType = function(value) {
                grid
                    .setData(model.getMatchedRows(value, model.accountCategory, model.search));
            };

            model.showSelectedCategories = function(value) {
                grid
                    .setData(model.getMatchedRows(model.accountType, value, model.search));
            };

            model.showMatchedWorksheets = function(value) {
                grid
                    .setData(model.getMatchedRows(model.accountType, model.accountCategory, value));
            };

            model.destory = function() {
                model = undefined;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory('customWorksheetsModel', [
            'bmGridModel',
            'customWorksheetMapperModel',
            factory
        ]);
})(angular);
