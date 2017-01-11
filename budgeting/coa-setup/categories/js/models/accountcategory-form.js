(function (angular, und) {
    "use strict";

    function factory(langTranslate, $filter, accountCategoryRowModel, accountCategoryWizModel, commonModel) {
        var model, translate, options = {},
            form, headerFooterList, addSubtractList, glVisbilityList;

        translate = langTranslate('categories').translate;
        form = {
            accountType: "",
            categoryOrheaderDesc: "",
            subtotalOrFooterDesc: "",
            headerFooter: "HeaderFooter",
            glVisibility: "1",
            addSubtractCategory: "Add",
            addSubtractglAccount: "Add",
            chkrevSignAccntCategory: "",
            chkrevSignGLAccnt: "",
            chkexcludeFromTotal: "",
            glchkexcludeFromTotal: "",
            accountCategory: "",
            showOptions: true,
            showOptionalText: true,
            isFooterReq: false,
            showPageHeader: false
        };

        model = {
            form: form,
            headerFooterList: accountCategoryWizModel.getHeaderFooterList(),
            addSubtractList: accountCategoryWizModel.getAddSubtractList(),
            glVisbilityList: accountCategoryWizModel.getGlVisbilityList(),
            accountTypeData: commonModel.getInitalAccountTypeData(),
            accountCategoryData: commonModel.getInitalAccountCategoryData()
        };

        model.getHeaderFooterList = function () {
            return model.headerFooterList;
        };

        model.getAddSubtractList = function () {
            return model.addSubtractList;
        };

        model.getGlVisbilityList = function () {
            return model.glVisbilityList;
        };

        model.bindCategoryData = function (category, accountCategoryList) {
            if (category.rowType === "HEADER") {
                model.assignHeaderRowData(category, accountCategoryList);
            }
            else if (category.rowType === "SUB-TOTAL") {
                model.assignSubTotalRowData(category, accountCategoryList);
            }
            model.assignHeaderData(category);
            model.form.glVisibility = category.glDisplayOnReport ? "1" : "0";
            model.assignOperatorData(category);
            model.form.chkrevSignGLAccnt = category.glReverseSign;
            model.form.chkexcludeFromTotal = category.excludeFromTotal;
            model.form.glchkexcludeFromTotal = category.glExcludeFromTotal;
            model.assignCategoryData(category);
            if (category.rowType === "TEXT ONLY") {
                model.form.categoryOrheaderDesc = category.displayText;
            }
        };

        model.assignHeaderRowData = function (category, accountCategoryList) {
            model.form.categoryOrheaderDesc = category.displayText;
            var subTotal = $filter('filter')(accountCategoryList.records, function (d) {
                return d.groupNumber === category.groupNumber && d.rowType === "SUB-TOTAL";
            });
            if (subTotal.length > 0) {
                model.form.subtotalOrFooterDesc = subTotal[0].displayText;
                model.form.chkrevSignAccntCategory = subTotal[0].reverseSign;
            }
        };

        model.assignSubTotalRowData = function (category, accountCategoryList) {
            model.form.subtotalOrFooterDesc = category.displayText;
            var header = $filter('filter')(accountCategoryList.records, function (d) {
                return d.groupNumber === category.groupNumber && d.rowType === "HEADER";
            });
            if (header.length > 0) {
                model.form.categoryOrheaderDesc = header[0].displayText;
            }
        };

        model.assignCategoryData = function (category) {
            if (category.rowType === "CATEGORY") {
                model.form.categoryOrheaderDesc = category.displayText;
                model.form.accountType = category.accountTypeID;
            }
            else if (category.rowType === "REF-CATEGORY") {
                model.form.subtotalOrFooterDesc = category.displayText;
                model.form.accountType = category.accountTypeID;
                model.form.accountCategory = category.accountCategoryID;
            }
        };

        model.assignOperatorData = function (category) {
            if (category.operator === "+") {
                model.form.addSubtractCategory = model.addSubtractList.options[0].value;
            }
            else if (category.operator === "-") {
                model.form.addSubtractCategory = model.addSubtractList.options[1].value;
            }
            model.assignGLOperatorData(category);
            if (category.rowType !== "HEADER") {
                model.form.chkrevSignAccntCategory = category.reverseSign;
            }
        };

        model.assignGLOperatorData = function (category) {
            if (category.glOperator === "+") {
                model.form.addSubtractglAccount = model.addSubtractList.options[0].value;
            }
            else if (category.glOperator === "-") {
                model.form.addSubtractglAccount = model.addSubtractList.options[1].value;
            }
        };

        model.assignHeaderData = function (category) {
            if (!category.displayOnReport && !category.footerDisplayOnReport) {
                model.form.headerFooter = model.headerFooterList.options[0].value;
            }
            else if (category.displayOnReport && category.footerDisplayOnReport) {
                model.form.headerFooter = model.headerFooterList.options[3].value;
            }
            else if (category.displayOnReport) {
                model.form.headerFooter = model.headerFooterList.options[1].value;
            }
            else {
                //if (category.footerDisplayOnReport) {
                model.form.headerFooter = model.headerFooterList.options[2].value;
            }
        };

        model.resetFormData = function (resetType, catRows) {
            model.form.categoryOrheaderDesc = "";
            model.form.subtotalOrFooterDesc = "";
            model.form.headerFooter = model.headerFooterList.options[0].value;
            model.form.glVisibility = "1";
            model.form.addSubtractCategory = model.addSubtractList.options[0].value;
            model.form.addSubtractglAccount = model.addSubtractList.options[0].value;
            model.resetCheckBoxes();
            model.form.accountType = "";
            model.form.accountCategory = "";
            model.form.isFooterReq = false;
            model.accountCategoryData = commonModel.getAccountCategoryRows(catRows);
        };

        model.resetCheckBoxes = function () {
            model.form.chkrevSignAccntCategory = false;
            model.form.chkrevSignGLAccnt = false;
            model.form.chkexcludeFromTotal = false;
            model.form.glchkexcludeFromTotal = false;
        };

        model.setFooterReq = function (val) {
            model.form.isFooterReq = val;
        };

        model.updateDisplayOption = function (data) {
            if (model.form.headerFooter === "HeaderFooter") {
                model.updateDisplay(data, true, true);
            }
            else if (model.form.headerFooter === "Header") {
                model.updateDisplay(data, true, false);
            }
            else if (model.form.headerFooter === "Footer") {
                model.updateDisplay(data, false, true);
            }
            else {
                model.updateDisplay(data, false, false);
            }
        };

        model.updateDisplay = function (data, headerVal, footerVal) {
            data.displayOnReport = headerVal;
            data.footerDisplayOnReport = footerVal;
        };

        model.updateCatData = function (data) {
            data.excludeFromTotal = model.form.chkexcludeFromTotal;
            data.glExcludeFromTotal = model.form.glchkexcludeFromTotal;
            model.updateOperator(data);
            model.updateGLOperator(data);
            data.reverseSign = model.form.chkrevSignAccntCategory;
            data.glReverseSign = model.form.chkrevSignGLAccnt;
            data.glDisplayOnReport = model.form.glVisibility === "1" ? true : false;
        };

        model.updateOperator = function (data) {
            if (model.form.addSubtractCategory === "Add") {
                data.operator = "+";
            }
            else if (model.form.addSubtractCategory === "Subtract") {
                data.operator = "-";
            }
        };

        model.updateGLOperator = function (data) {
            if (model.form.addSubtractglAccount === "Add") {
                data.glOperator = "+";
            }
            else if (model.form.addSubtractglAccount === "Subtract") {
                data.glOperator = "-";
            }
        };

        model.updateIntialFormData = function (rowType) {
            if (rowType === "HEADER" || rowType === "section" || rowType === "subSection") {
                model.showSection();
            }
            else if (rowType === "CATEGORY" || rowType === "category") {
                model.showCategory();
            }
            else if (rowType === "SUB-TOTAL") {
                model.showSection();
            }
            else if (rowType === "REF-CATEGORY" || rowType === "refCategory") {
                model.showRefCategory();
            }
            else if (rowType === "TEXT ONLY" || rowType === "text") {
                model.showTextOnly();
            }
        };

        model.showSection = function () {
            model.form.showOptions = true;
            model.form.showOptionalText = true;
        };
        model.showCategory = function () {
            model.form.accountType = "";
            model.form.showOptions = true;
            model.form.showOptionalText = true;
        };
        model.showRefCategory = function () {
            model.form.accountType = "";
            model.form.showOptions = true;
            model.form.showOptionalText = false;
        };
        model.showTextOnly = function () {
            model.form.showOptions = false;
            model.form.showOptionalText = false;
        };

        model.getCategoryOrheaderDesc = function () {
            return model.form.categoryOrheaderDesc;
        };

        model.getSubtotalOrFooterDesc = function () {
            return model.form.subtotalOrFooterDesc;
        };

        model.getAccountCategory = function () {
            return model.form.accountCategory;
        };

        model.setAccountCategory = function (accountCategoryID) {
            model.form.accountCategory = accountCategoryID;
        };

        model.getAccountType = function () {
            return model.form.accountType;
        };

        model.getChkrevSignAccntCategory = function () {
            return model.form.chkrevSignAccntCategory;
        };

        model.updateHeaderRow = function (newdata, uniqID, chartID) {
            newdata.id = uniqID;
            newdata.displayText = model.getSubtotalOrFooterDesc();
            newdata.rowType = "SUB-TOTAL";
            newdata.reverseSign = model.getChkrevSignAccntCategory();
            newdata.masterChartID = chartID;
        };

        model.updateAccountTypeData = function (data) {
            model.accountTypeData = commonModel.getInitalAccountTypeData();
            model.accountTypeData.options = model.accountTypeData.options.concat(data.records);
        };

        model.updateAccountCategoryData = function (accountCategoryList) {
            model.accountCategoryData = commonModel.getAccountCategoryRows(accountCategoryList);
            //model.accountCategoryData.options = model.accountCategoryData.options.concat(data);
        };

        model.getAccounTypeData = function () {
            return model.accountTypeData;
        };

        model.isDataValid = function (reportRowType) {
            return accountCategoryRowModel.isDataValid(reportRowType, model.getCategoryOrheaderDesc(), model.getSubtotalOrFooterDesc(), model.getAccountType(), model.getAccountCategory());
        };

        model.updateCoaRowData = function (uniqID, chartID, groupNumber, reportRowType, groupState, catData) {
            var newObj = {
                uniqID: uniqID,
                chartID: chartID,
                groupNumber: groupNumber,
                reportRowType: reportRowType,
                accountTypeData: model.getAccounTypeData(),
                groupState: groupState,
                accountType: model.getAccountType(),
                accountCategory: model.getAccountCategory(),
                categoryOrheaderDesc: model.getCategoryOrheaderDesc(),
                subtotalOrFooterDesc: model.getSubtotalOrFooterDesc()
            };
            if (reportRowType === 'refCategory') {
                model.getRefAccntType(catData, newObj);
            }
            var data = accountCategoryRowModel.getNewRow(newObj);

            if (accountCategoryRowModel.isRefCategory(reportRowType) || accountCategoryRowModel.isCategory(reportRowType)) {
                model.updateCatData(data);
            }
            else if (accountCategoryRowModel.isSection(reportRowType) || accountCategoryRowModel.isSubSection(reportRowType)) {
                groupNumber = data.groupNumber;
            }
            model.updateDisplayOption(data);
            accountCategoryRowModel.updateGLCatOption(data);
            return data;
        };

        model.getRefAccntType = function (data, newObj) {
            var accntCatID = model.getAccountCategory();
            var coaRow = $filter('filter')(data, function (d) {
                return d.accountCategoryID === accntCatID && d.rowType === "CATEGORY";
            });
            if (coaRow !== und && coaRow.length > 0) {
                newObj.accountType = coaRow[0].accountType;
                newObj.accountTypeID = coaRow[0].accountTypeID;
            }
        };

        model.updateCoaExistingData = function (coaRow, data) {
            if (accountCategoryRowModel.isCategory(coaRow[0].rowType) || accountCategoryRowModel.isRefCategory(coaRow[0].rowType)) {
                var ref = accountCategoryRowModel.isRefCategory(coaRow[0].rowType) ? model.getRefAccntType(data, coaRow[0]) : "";
                accountCategoryRowModel.updateCoaRow(coaRow[0], model.getAccounTypeData(), model.getCategoryOrheaderDesc(), model.getSubtotalOrFooterDesc(), model.getAccountType(), model.getAccountCategory(), model.getChkrevSignAccntCategory());
                model.updateCatData(coaRow[0]);
            }
            else if (accountCategoryRowModel.isHeader(coaRow[0].rowType) || accountCategoryRowModel.isSubTotal(coaRow[0].rowType)) {
                model.updateDependentRows(coaRow, data);
            }
            else if (accountCategoryRowModel.isTextOnly(coaRow[0].rowType)) {
                accountCategoryRowModel.updateCoaRow(coaRow[0], model.getAccounTypeData(), model.getCategoryOrheaderDesc(), model.getSubtotalOrFooterDesc(), model.getAccountType(), model.getAccountCategory(), model.getChkrevSignAccntCategory());
            }
            model.updateDisplayOption(coaRow[0]);
            accountCategoryRowModel.updateGLCatOption(coaRow[0]);
        };

        model.updateDependentRows = function (coaRow, data) {
            var rowType = accountCategoryRowModel.getDependetRowType(coaRow);
            accountCategoryRowModel.updateCoaRow(coaRow[0], model.getAccounTypeData(), model.getCategoryOrheaderDesc(), model.getSubtotalOrFooterDesc(), model.getAccountType(), model.getAccountCategory(), model.getChkrevSignAccntCategory());
            var subTotal = $filter('filter')(data, function (d) {
                return d.groupNumber === coaRow[0].groupNumber && d.rowType === rowType;
            });
            if (subTotal.length > 0) {
                accountCategoryRowModel.updateCoaRow(subTotal[0], model.getAccounTypeData(), model.getCategoryOrheaderDesc(), model.getSubtotalOrFooterDesc(), model.getAccountType(), model.getAccountCategory(), model.getChkrevSignAccntCategory());
                model.updateDisplayOption(subTotal[0]);
                accountCategoryRowModel.updateGLCatOption(subTotal[0]);
            }
        };

        model.fillFormObjects = function (selType) {
            if (accountCategoryRowModel.isRefCategory(selType)) {
                model.setFooterReq(true);
            }
            else {
                model.setFooterReq(false);
            }
        };

        model.updateEditData = function (category) {
            model.updateIntialFormData(category.rowType);
            if (accountCategoryRowModel.isRefCategory(category.rowType)) {
                model.setFooterReq(true);
            }
            else {
                model.setFooterReq(false);
            }
        };

        model.loadAccountCategory = function (accountCategoryList) {
            var accountCategoryID = model.getAccountCategory();
            model.updateAccountCategoryData(accountCategoryList);
            if (accountCategoryID !== undefined && accountCategoryID !== 0) {
                model.setAccountCategory(accountCategoryID);
            }
        };

        model.saveRow = function (obj) {
            if (obj.isNewRow) {
                obj.uniqID++;
                obj.newdata = model.updateCoaRowData(obj.uniqID, obj.chartID, obj.groupNumber, obj.reportRowType, obj.groupState, obj.categoryRecords);
                obj.groupNumber = model.getNewGroupNumber(obj.reportRowType, obj.newdata, obj.groupNumber);
            }
            else {
                model.updateCoaExistRow(obj.categoryRecords, obj.lastClickedID);
            }
            return model.getNewReturnData(obj.uniqID, obj.groupNumber, obj.newdata);
        };

        model.getNewReturnData = function (uniqID, groupNumber, newdata) {
            var returnData = {};
            returnData.uniqID = uniqID;
            returnData.groupNumber = groupNumber;
            returnData.newRow = newdata;
            return returnData;
        };

        model.updateCoaExistRow = function (data, lastClickedID) {
            var coaRow = $filter('filter')(data, function (d) {
                return d.id === lastClickedID;
            });
            if (coaRow !== undefined && coaRow.length > 0) {
                model.updateCoaExistingData(coaRow, data);
            }
        };

        model.getNewGroupNumber = function (reportRowType, newdata, groupNumber) {
            if (accountCategoryRowModel.isSection(reportRowType) || accountCategoryRowModel.isSubSection(reportRowType)) {
                groupNumber = newdata.groupNumber;
            }
            return groupNumber;
        };

        return model;

    }

    angular
        .module("budgeting")
        .factory('accountCategoryForm', [
            'appLangTranslate', '$filter', 'accountCategoryRow', 'accountCategoryWiz', 'accountCategoryCommon',
            factory
        ]);
})(angular);
