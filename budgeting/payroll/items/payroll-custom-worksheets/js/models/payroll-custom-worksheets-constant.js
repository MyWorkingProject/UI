//  Custom worksheets constant
(function (angular) {
    'use strict';

    function factory(
        bmGridConstant,
        cwContent) {
     
        var model = angular.merge({}, bmGridConstant);

        model.templateConfig.itemDescriptionUrl = 'payroll/items/templates/custom-worksheet-column.html';

        model.methodConfig.getTotalWorkSheet = 'getTotal';
        model.methodConfig.navigateTo = 'navigateTo';

        model.rowConfig = {
            customWorksheet: {
                rowType: model.rowTypeConfig.readonly,
                groupID: 1,
                level: 1
            },
            total: {
                worksheetName: cwContent.lblTotal,
                rowType: model.rowTypeConfig.total,
                groupID: 2,
                level: 1
            }
        };
        model.columns.title.key = 'worksheetName';

        model.getTemplateConfigs = function () {
            return model.templateConfig;
        };

        model.getColumns = function () {
            return model.columns;
        };

        model.getRowConfigs = function () {
            return model.rowConfig;
        };

        model.getMethodConfigs = function () {
            return model.methodConfig;
        };

        return model;
    }

    angular
        .module('budgeting')
        .factory('payrollCustomWorksheetsConstantModel', [
            'bmGridConstantModel',
            'payrollCustomWorksheetsContentModel',
             factory]);
})(angular);
