//  Custom worksheets json data

(function (angular) {
    "use strict";

    function factory(wsConstant) {
        var model = {},
            rowConfig = wsConstant.getRowConfigs();
            model.buildGridData = function (defaultRow, data) {
            var dataRows = [];
            data.forEach(function (item, index) {
                var dataRow = angular.extend({}, defaultRow, rowConfig.customWorksheet, item);
                dataRow.rowID = index + 1;
                dataRows.push(dataRow);
            });
            var dataRow = angular.extend({}, defaultRow, rowConfig.total);
            dataRows.push(dataRow);

            return dataRows;
        };
        return model;
    }
    angular
        .module("budgeting")
        .factory('payrollCustomWorksheetMapperModel', [
            'payrollCustomWorksheetsConstantModel',
            factory]);
})(angular);
