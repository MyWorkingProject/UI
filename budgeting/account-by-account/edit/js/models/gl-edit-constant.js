//  GL Edit Grid Constants Model

(function(angular) {
    "use strict";

    function factory(
        bmGridConstant,
        glEditContent) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.getRowTotal = "getRowTotal";
        model.methodConfig.getGLTotal = "getGLTotal";
        model.methodConfig.getReferenceDiffPerType = "getReferenceDiffPerType";
        model.methodConfig.navigateTo = "navigateTo";
        model.methodConfig.showHistoryByPeriod = "showHistoryByPeriod";
        model.methodConfig.showAdjustment = "showAdjustment";
        model.methodConfig.addItemizationRow = "addItemizationRow";
        model.methodConfig.removeItemizationRow = "removeItemizationRow";
        model.methodConfig.updateItemization = "updateItemization";
        model.methodConfig.selectRow = "selectRow";
        model.methodConfig.applyRuleBasedValidation = "applyRuleBasedValidation";

        model.templateConfig.adjustmentTitleColumnUrl = "app/templates/gl-account-adjustment-column.html";
        model.templateConfig.itemizationTitleColumnUrl = "app/templates/gl-account-itemization-title-column.html";
        model.templateConfig.workSheetTitleUrl = "app/templates/gl-account-worksheet-column.html";
        model.templateConfig.referenceCalculatedColumnUrl = "app/templates/gl-reference-calculated-column.html";
        model.templateConfig.referenceTypeColumnUrl = "app/templates/gl-reference-type-column.html";

        model.filterConfig.formatCalculatedReferenceData = 'formatCalculatedReferenceData';

        model.rowTypeConfig.itemization = "itemization";
        model.rowTypeConfig.customWorksheetItemized = "customWorksheetItemized";
        model.rowTypeConfig.adjustment = "adjustment";
        model.rowTypeConfig.workSheet = "workSheet";
        model.rowTypeConfig.glAccount = "glAccount";
        model.rowTypeConfig.glAccountGroup = "glAccountGroup";
        model.rowTypeConfig.glAccountType = "glAccountType";
        //model.rowTypeConfig.groupHeader = "groupHeader";
        model.rowTypeConfig.referenceDataSection = "referenceDataSection";
        model.rowTypeConfig.referenceDataDetail = "referenceDataDetail";


        model.rowConfig = {
            itemization: {
                groupID: 1,
                level: 1,
                rowType: "itemization"
            },
            customWorksheetItemized: {
                groupID: 2,
                level: 1,
                rowType: "customWorksheetItemized"
            },
            defaultAdjustment: {
                itemDescription: glEditContent.glDefaultAdjustmentText,
                groupID: 3,
                level: 1,
                rowType: "adjustment"
            },
            workSheet: {
                groupID: 4,
                level: 1,
                rowType: "workSheet"
            },
            glAccount: {
                itemDescription: "[name]",
                groupID: 5,
                level: 1,
                rowType: "glAccount"
            },
            glAccountGroup: {
                itemDescription: glEditContent.glGridTotalText,
                groupID: 6,
                level: 1,
                rowType: "glAccountGroup"
            },
            glAccountType: {
                itemDescription: glEditContent.glGridTotalText,
                groupID: 7,
                level: 1,
                rowType: "glAccountType"
            },
            referenceDataHeader: {
                itemDescription: glEditContent.glReferenceDataText,
                groupID: 1000,
                rowClass: "reference-data-header",
                level: 1,
                rowType: model.rowTypeConfig.groupHeader
            },
            referenceDataEmptyHeader: {
                itemDescription: glEditContent.glNoReferenceDataText,
                groupID: 1000,
                rowClass: "reference-data-empty-header",
                level: 1,
                rowType: model.rowTypeConfig.groupHeader
            },
            referenceData: {
                itemDescription:'',
                groupID: 1000,
                level: 2,
                rowType: "referenceDataSection"
            },
            referenceDataDetail: {
                itemDescription:'',
                groupID: 1000,
                level: 3,
                rowType: "referenceDataDetail"
            }

        };

        model.referenceCalculationRowConfig = {
            dollor: {
                itemDescription: glEditContent.glReferenceDataDollorText,
                calculationType: "dollor",
                applyValidation: true
            },
            percentage: {
                itemDescription: glEditContent.glReferenceDataPercentageText,
                calculationType: "percent",
                applyValidation: true
            },
            unit: {
                itemDescription: glEditContent.glReferenceDataPerUnitText,
                calculationType: "unit",
                applyValidation: false
            }
        };

        model.getRowConfigs = function() {
            return model.rowConfig;
        };

        model.getRowTypeConfigs = function() {
            return model.rowTypeConfig;
        };

        model.getMethodConfigs = function() {
            return model.methodConfig;
        };

        model.getTemplateConfigs = function() {
            return model.templateConfig;
        };

        model.getFilterConfigs = function() {
            return model.filterConfig;
        };

        model.getReferenceCalculationRowConfigs = function() {
            return model.referenceCalculationRowConfig;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("glEditConstantModel", [
            'bmGridConstantModel',
            'glEditContentModel',
            factory
        ]);
})(angular);
