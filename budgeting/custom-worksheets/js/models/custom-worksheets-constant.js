//  Custom Worksheet Grid Constants Model

(function(angular) {
    "use strict";

    function factory(bmGridConstant, customWorksheetsContent) {
        var model = angular.merge({}, bmGridConstant);
        
        model.columns.title.width = 220;
        model.columns.title.text = customWorksheetsContent.customWorksheetNameText;
        model.columns.title1 = {
            key: "glAccountName",
            text: customWorksheetsContent.glAccountText,
            width: 200,
            state: {
                active: true,
                locked: true
            },
            isDataColumn: false,
        };

        model.groupColumns.title1 = {
            key: "glAccountName",
            text: "",
            state: {
                active: true,
                locked: true
            }
        };
        model.rowTypeConfig.groupHeader = 'groupHeader';
        model.filterConfig.roundDecimalsToTenths = 'roundDecimalsToTenths';

        model.templateConfig.itemDescriptionColumnUrl = "custom-worksheets/templates/custom-worksheet-name.html";
        model.methodConfig.onClick = "navigateTo";

        model.rowConfig = {
            accountType: {
                itemDescription: '',
                glAccountName: '',
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 1,
                level: 1
            },
            customWorksheet: {
                itemDescription: '',
                glAccountName: '',
                rowType: model.rowTypeConfig.readonly,
                groupID: 1,
                level: 1
            }
        };

        model.getColumns = function() {
            return model.columns;
        };
        model.getGroupColumns = function() {
            return model.groupColumns;
        };

        model.getMethodConfigs = function() {
            return model.methodConfig;
        };

        model.getRowConfigs = function() {
            return model.rowConfig;
        };

        model.getRowTypeConfigs = function () {
            return model.rowTypeConfig;
        };

        model.getTemplateConfigs = function() {
            return model.templateConfig;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("customWorksheetsConstantModel", [
            'bmGridConstantModel',
            'customWorksheetsContentModel',
            factory
        ]);
})(angular);
