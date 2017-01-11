(function (angular, und) {
    "use strict";

    function factory(langTranslate) {
        var model, translate;
        translate = langTranslate('categories').translate;
        model = {};
        model.updateGLCatOption = function (item) {
            var catoption, gloption, catERO;
            catoption = "";
            gloption = "";
            catERO = "";
            catoption = model.getCatOption(item);
            catERO = model.getCatERO(item);
            catoption = model.addOptnERO(catoption, catERO);
            gloption = model.getGlOption(item);
            item.CatOptn = model.getCatFinalOptn(catoption);
            item.GLOptn = model.getGLFinalOptn(gloption);
            item.accountType = item.accountType.toUpperCase();
        };

        model.addOptnERO = function (catoption, catERO) {
            if (catoption !== "" && catERO !== "") {
                catoption = catoption + "-" + catERO;
            }
            else if (catERO !== "") {
                catoption = catERO;
            }
            return catoption;
        };

        model.isEditable = function (rowType) {
            if (rowType === "BLANK ROW" || rowType === "PAGE BREAK" || rowType === "") {
                return false;
            }
            else {
                return true;
            }
        };

        model.getCatFinalOptn = function (catoption) {
            if (catoption === "") {
                catoption = "-";
            }
            return catoption;
        };

        model.getGLFinalOptn = function (gloption) {
            if (gloption === "") {
                gloption = "-";
            }
            return gloption;
        };

        model.getCatOption = function (item) {
            var catoption = "";
            if (!item.displayOnReport && !item.footerDisplayOnReport) {
                catoption = "HFD";
            }
            if (item.displayOnReport && item.footerDisplayOnReport) {
                catoption = "SHF";
            }
            else if (item.displayOnReport) {
                catoption = "SH";
            }
            else if (item.footerDisplayOnReport) {
                catoption = "SF";
            }
            return catoption;
        };

        model.getCatERO = function (item) {
            var catERO = "";
            if (item.excludeFromTotal) {
                catERO = "E";
            }
            if (item.reverseSign) {
                catERO = model.addERO(catERO, "R");
            }
            if (item.operator === "+") {
                catERO = model.addERO(catERO, "A");
            }
            if (item.operator === "-") {
                catERO = model.addERO(catERO, "S");
            }
            return catERO;
        };

        model.getGlOption = function (item) {
            var gloption = "";
            if (!item.glDisplayOnReport && item.rowType !== "HEADER" && item.rowType !== "SUB-TOTAL") {
                gloption = "D";
            }
            if (item.glExcludeFromTotal) {
                gloption = gloption + "E";
            }
            if (item.glReverseSign) {
                gloption = gloption + "R";
            }
            if (item.glOperator === "+") {
                gloption = gloption + "A";
            }
            else if (item.glOperator === "-") {
                gloption = gloption + "S";
            }
            return gloption;
        };

        model.addERO = function (catERO, optn) {
            if (catERO !== "") {
                catERO = catERO + optn;
            }
            else {
                catERO = optn;
            }
            return catERO;
        };

        model.getReportRow = function (data, groupNumber, groupState) {
            groupNumber++;
            data.rowType = "HEADER";
            data.accountType = "REPORT";
            data.groupNumber = groupNumber;
            data.groupState = angular.copy(groupState);
            return data;
        };

        model.getCatRefRow = function (data, reportRowType, accountTypeData, accountCategory, accountType) {
            if (reportRowType === "category") {
                data.rowType = "CATEGORY";
                data.accountTypeID = accountType;
                model.assignType(accountTypeData, data);
            }
            else {
                data.rowType = "REF-CATEGORY";
                data.accountCategoryID = accountCategory;
            }
            data.groupNumber = 0;
            return data;
        };

        model.assignType = function (accountTypeData, data) {
            accountTypeData.options.forEach(function (item) {
                if (item.value === data.accountTypeID) {
                    data.accountType = item.name.toUpperCase();
                }
            });
        };

        model.getTextRow = function (data) {
            data.rowType = "TEXT ONLY";
            data.accountType = "REPORT";
            data.groupNumber = 0;
            return data;
        };

        model.getNewRow = function (obj) {
            var data = {
                "id": obj.uniqID,
                "masterChartID": obj.chartID
            };
            data.displayOnReport = true;
            data.excludeFromTotal = false;
            data.reverseSign = false;
            data.operator = "";
            model.assignRowData(data, obj);
            data.displayText = obj.categoryOrheaderDesc;
            model.assignRefRowData(data, obj);
            return data;
        };

        model.assignRefRowData = function (data, obj) {
            if (obj.reportRowType === "refCategory") {
                data.displayText = obj.subtotalOrFooterDesc;
                data.accountType = obj.accountType;
                data.accountTypeID = obj.accountTypeID;
                data.rowType = "REF-CATEGORY";
                data.accountCategoryID = obj.accountCategory;
            }
        };

        model.assignRowData = function (data, obj) {
            if (obj.reportRowType === "section" || obj.reportRowType === "subSection") {
                data = model.getReportRow(data, obj.groupNumber, obj.groupState);
            }
            if (obj.reportRowType === "category") {
                data = model.getCatRefRow(data, obj.reportRowType, obj.accountTypeData, obj.accountCategory, obj.accountType);
            }
            if (obj.reportRowType === "text") {
                data = model.getTextRow(data);
            }
        };

        model.updateCoaRow = function (coaRow, accountTypeData, categoryOrheaderDesc, subtotalOrFooterDesc, accountType, accountCategory, chkrevSignAccntCategory) {
            if (coaRow.rowType === "CATEGORY") {
                coaRow.displayText = categoryOrheaderDesc;
                coaRow.accountTypeID = accountType;
                model.assignType(accountTypeData, coaRow);
            }
            else if (coaRow.rowType === "REF-CATEGORY") {
                coaRow.displayText = subtotalOrFooterDesc;
                //coaRow.accountType = "";
                coaRow.accountCategoryID = accountCategory;
            }
            else {
                model.assignOtherRows(coaRow, categoryOrheaderDesc, subtotalOrFooterDesc, chkrevSignAccntCategory);
            }
        };

        model.assignOtherRows = function (coaRow, categoryOrheaderDesc, subtotalOrFooterDesc, chkrevSignAccntCategory) {
            if (coaRow.rowType === "HEADER") {
                coaRow.displayText = categoryOrheaderDesc;
            }
            else if (coaRow.rowType === "SUB-TOTAL") {
                coaRow.displayText = subtotalOrFooterDesc;
                coaRow.reverseSign = chkrevSignAccntCategory;
            }
            else if (coaRow.rowType === "TEXT ONLY") {
                coaRow.displayText = categoryOrheaderDesc;
            }
        };

        model.getBlankRow = function (uniqID, chartID) {
            return model.assignData(uniqID, chartID, "BLANK ROW", "REPORT", "BLANK ROW", false, true, true, false);
        };

        model.getPageBreak = function (uniqID, chartID) {
            return model.assignData(uniqID, chartID, "PAGE BREAK", "REPORT", "PAGE BREAK", false, true, true, false);
        };

        model.assignData = function (uniqID, chartID, rowType, accountType, displayText, excludeFromTotal, displayOnReport, footerDisplayOnReport, reverseSign) {
            var data = {
                "id": uniqID,
                "masterChartID": chartID
            };
            data.rowType = rowType;
            data.accountType = accountType.toUpperCase();
            data.displayText = displayText;
            data.excludeFromTotal = excludeFromTotal;
            data.displayOnReport = displayOnReport;
            data.footerDisplayOnReport = footerDisplayOnReport;
            data.reverseSign = reverseSign;
            data.operator = "";
            return data;
        };

        model.getMaxSequence = function (footerRow) {
            var maxSequence = 0;
            if (footerRow !== null && footerRow.length > 0) {
                maxSequence = footerRow[0].sequence;
            }
            return maxSequence;
        };

        model.isRefCategory = function (reportRowType) {
            if (reportRowType === "refCategory" || reportRowType === "REF-CATEGORY") {
                return true;
            }
            return false;
        };

        model.isSection = function (reportRowType) {
            if (reportRowType === "section") {
                return true;
            }
            return false;
        };

        model.isSubSection = function (reportRowType) {
            if (reportRowType === "subSection") {
                return true;
            }
            return false;
        };

        model.isCategory = function (reportRowType) {
            if (reportRowType === "category" || reportRowType === "CATEGORY") {
                return true;
            }
            return false;
        };

        model.isHeader = function (reportRowType) {
            if (reportRowType === "HEADER") {
                return true;
            }
            return false;

        };

        model.isSubTotal = function (reportRowType) {
            if (reportRowType === "SUB-TOTAL") {
                return true;
            }
            return false;
        };

        model.isTextOnly = function (reportRowType) {
            if (reportRowType === "TEXT ONLY") {
                return true;
            }
            return false;
        };

        model.getReportRowType = function (category) {
            var returnRowType = "";
            if (category.rowType === "HEADER") {
                returnRowType = "section";
            }
            else if (category.rowType === "SUB-TOTAL") {
                returnRowType = "subSection";
            }
            else if (category.rowType === "CATEGORY") {
                returnRowType = "category";
            }
            else if (category.rowType === "REF-CATEGORY") {
                returnRowType = "refCategory";
            }
            else if (category.rowType === "TEXT ONLY") {
                returnRowType = "text";
            }
            return returnRowType;
        };

        model.isDataValid = function (reportRowType, CategoryOrheaderDesc, SubtotalOrFooterDesc, AccountType, AccountCategory) {
            var isDataValid = true;
            if ((reportRowType === "section" || reportRowType === "subSection" || reportRowType === "category" || reportRowType === "text") && (CategoryOrheaderDesc === "" || CategoryOrheaderDesc === und)) {
                isDataValid = false;
            }
            else if (reportRowType === "refCategory" && (SubtotalOrFooterDesc === "" || SubtotalOrFooterDesc === und)) {
                isDataValid = false;
            }
            else if (reportRowType === "category" && AccountType === "" || AccountType === und) {
                isDataValid = false;
            }
            else if (reportRowType === "refCategory" && (AccountCategory === "" || AccountCategory === und)) {
                isDataValid = false;
            }
            return isDataValid;
        };

        model.getDependetRowType = function (coaRow) {
            var rowType = "";
            if (model.isHeader(coaRow[0].rowType)) {
                rowType = "SUB-TOTAL";
            }
            else {
                rowType = "HEADER";
            }
            return rowType;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('accountCategoryRow', [
            'appLangTranslate',
            factory
        ]);
})(angular);
