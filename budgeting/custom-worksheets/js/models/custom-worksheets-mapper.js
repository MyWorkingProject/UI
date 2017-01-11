//  custom Worksheets mapper Model

(function(angular) {
    "use strict";

    function factory(customWorksheetsConstant) {
        var model = {},
            rowConfig = customWorksheetsConstant.getRowConfigs();

        model.buildGridData = function(defaultRow, accountTypes, customWorksheetList) {
            var dataRows = [];
            accountTypes.forEach(function(accountType, index) {
                if (accountType.value > 0) {
                    var parentGroup = index;
                    var dataRow = angular.extend({}, defaultRow, rowConfig.accountType);
                    dataRow.accountTypeID = accountType.value;
                    dataRow.groupID = parentGroup;
                    dataRow.itemDescription = accountType.name;
                    dataRow.rowID = 0;
                    dataRows.push(dataRow);
                    customWorksheetList.forEach(function(customWorksheet, index) {
                        if (customWorksheet.accountTypeID === accountType.value) {
                            var dataRow = angular.extend({}, defaultRow, rowConfig.customWorksheet, customWorksheet);
                            dataRow.groupID = parentGroup;
                            dataRow.rowID = index + 1;
                            dataRows.push(dataRow);
                        }
                    });
                }
            });
            return dataRows;
        };

        return model;

    }

    angular
        .module("budgeting")
        .factory('customWorksheetMapperModel', [
            'customWorksheetsConstantModel',
            factory
        ]);
})(angular);
