describe("account category row operation model", function () {
    beforeEach(module("budgeting.coaSetup.categories"));
    var appLangTranslate, model;


    beforeEach(function () {
        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        module(function ($provide) {
            $provide.value('appLangTranslate', spy2);
        });

        function injector(a, b) {
            appLangTranslate = a;
            model = b;
        }

        inject(['appLangTranslate', 'accountCategoryRow', injector]);

    });


    it("calling update GL Category Option method", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: true, excludeFromTotal: true, reverseSign: false, operator: "+",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: true, glReverseSign: false, glOperator: true,
            accountType: "Test"
        };
        model.updateGLCatOption(itemRow);
    });

    it("calling category option append method when category and exclude options are not empty", function () {
        var catOpt = "HR", catERO = "E";
        var expecReslt = catOpt + "-" + catERO;
        var ouptPut = model.addOptnERO(catOpt, catERO);
        expect(ouptPut).toEqual(expecReslt);
    });

    it("calling category option append method when category optn is empty and exclude options are not empty", function () {
        var catOpt = "", catERO = "ER";
        var expecReslt = catERO;
        var ouptPut = model.addOptnERO(catOpt, catERO);
        expect(ouptPut).toEqual(expecReslt);
    });

    it("calling category option append method when category optn  and exclude options are empty", function () {
        var catOpt = "", catERO = "";
        var ouptPut = model.addOptnERO(catOpt, catERO);
        var expecReslt = "";
        expect(ouptPut).toEqual(expecReslt);
    });

    it("verifying row type when it is Blank row", function () {
        var rowType = "BLANK ROW";
        var ouptPut = model.isEditable(rowType);
        expect(ouptPut).toBe(false);
    });

    it("verifying row type when it is Page brk", function () {
        var rowType = "PAGE BREAK";
        var ouptPut = model.isEditable(rowType);
        expect(ouptPut).toBe(false);
    });

    it("verifying row type when it is empty", function () {
        var rowType = "";
        var ouptPut = model.isEditable(rowType);
        expect(ouptPut).toBe(false);
    });

    it("verifying row type when it is category row", function () {
        var rowType = "Category";
        var ouptPut = model.isEditable(rowType);
        expect(ouptPut).toBe(true);
    });

    it("verifying category final option ,when cat option is empty", function () {
        var catoption = "";
        var ouptPut = model.getCatFinalOptn(catoption);
        expect(ouptPut).toBe("-");
    });

    it("verifying category final option ,when cat option is not empty", function () {
        var catoption = "HR";
        var ouptPut = model.getCatFinalOptn(catoption);
        expect(ouptPut).toBe(catoption);
    });

    it("verifying gl final option ,when cat option is empty", function () {
        var catoption = "";
        var ouptPut = model.getGLFinalOptn(catoption);
        expect(ouptPut).toBe("-");
    });

    it("verifying gl final option ,when cat option is not empty", function () {
        var catoption = "HR";
        var ouptPut = model.getGLFinalOptn(catoption);
        expect(ouptPut).toBe(catoption);
    });

    it("verifying get CatOption method, when cat display and fot display are false", function () {
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: false, operator: "+",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: true, glReverseSign: false, glOperator: true,
            accountType: "Test"
        };
        var ouptPut = model.getCatOption(itemRow);
        expect(ouptPut).toEqual("HFD");
    });

    it("verifying get CatOption method, when cat display is true and fot display are true", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: true, excludeFromTotal: true, reverseSign: false, operator: "+",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: true, glReverseSign: false, glOperator: true,
            accountType: "Test"
        };
        var ouptPut = model.getCatOption(itemRow);
        expect(ouptPut).toEqual("SHF");
    });

    it("verifying get CatOption method, when cat display is true and fot display are false", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: false, operator: "+",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: true, glReverseSign: false, glOperator: true,
            accountType: "Test"
        };
        var ouptPut = model.getCatOption(itemRow);
        expect(ouptPut).toEqual("SH");
    });

    it("verifying get CatOption method, when cat display is false and fot display are true", function () {
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: true, excludeFromTotal: true, reverseSign: false, operator: "+",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: true, glReverseSign: false, glOperator: true,
            accountType: "Test"
        };
        var ouptPut = model.getCatOption(itemRow);
        expect(ouptPut).toEqual("SF");
    });

    it("verifying get getCatERO method, when excludeFromTotal,reverseSign are true", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: true, glReverseSign: false, glOperator: true,
            accountType: "Test"
        };
        var ouptPut = model.getCatERO(itemRow);
        expect(ouptPut).toEqual("ER");
    });

    it("verifying get getCatERO method, when excludeFromTotal,reverseSign are false", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: false, reverseSign: false, operator: "",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: true, glReverseSign: false, glOperator: true,
            accountType: "Test"
        };
        var ouptPut = model.getCatERO(itemRow);
        expect(ouptPut).toEqual("");
    });

    it("verifying get getCatERO method, when opertaor is +", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "+",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: true, glReverseSign: false, glOperator: true,
            accountType: "Test"
        };
        var ouptPut = model.getCatERO(itemRow);
        expect(ouptPut).toEqual("ERA");
    });

    it("verifying get getCatERO method, when opertaor is -", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: true, glReverseSign: false, glOperator: true,
            accountType: "Test"
        };
        var ouptPut = model.getCatERO(itemRow);
        expect(ouptPut).toEqual("ERS");
    });

    it("verifying get getGlOption method, when gl options are true", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "+",
            glDisplayOnReport: false, rowType: "Category", glExcludeFromTotal: true, glReverseSign: true, glOperator: "+",
            accountType: "Test"
        };
        var ouptPut = model.getGlOption(itemRow);
        expect(ouptPut).toEqual("DERA");
    });

    it("verifying get getGlOption method, when gl options are false", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test"
        };
        var ouptPut = model.getGlOption(itemRow);
        expect(ouptPut).toEqual("S");
    });

    it("verifying get addERO method, when catERO is not empty", function () {
        var catERO = "HR", optn = "A";
        var ouptPut = model.addERO(catERO, optn);
        expect(ouptPut).toEqual("HRA");
    });

    it("verifying get addERO method, when catERO are empty", function () {
        var catERO = "", optn = "A";
        var ouptPut = model.addERO(catERO, optn);
        expect(ouptPut).toEqual("A");
    });

    it("verifying get report row, should retunr Report type row", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test"
        };
        var state = { id: 1 };
        var ouptPut = model.getReportRow(itemRow, 1, state);
        expect(ouptPut.rowType).toEqual("HEADER");
        expect(ouptPut.accountType).toEqual("REPORT");
        expect(ouptPut.groupNumber).toEqual(2);
        expect(ouptPut.groupState).toEqual(state);
    });

    it("verifying get category and reference row, should retunr category row", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test"
        };

        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var ouptPut = model.getCatRefRow(itemRow, "category", accTypeData, "Prefix", "Prefix");
        expect(ouptPut.rowType).toEqual("CATEGORY");
        expect(ouptPut.accountTypeID).toEqual("Prefix");
        expect(ouptPut.groupNumber).toEqual(0);
    });

    it("verifying get category and reference row, should retunr Ref-category row", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test"
        };

        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var ouptPut = model.getCatRefRow(itemRow, "REFcategory", accTypeData, "Prefix", "Prefix");
        expect(ouptPut.rowType).toEqual("REF-CATEGORY");
        expect(ouptPut.accountCategoryID).toEqual("Prefix");
        expect(ouptPut.groupNumber).toEqual(0);
    });

    it("verifying should assign account type", function () {
        var itemRow = {
            displayOnReport: true, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix"
        };
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var ouptPut = model.assignType(accTypeData, itemRow);
        expect(itemRow.accountType).toEqual("PREFIX");
    });

    it("verifying return of Text Row", function () {
        var itemRow = {};

        var ouptPut = model.getTextRow(itemRow);
        expect(ouptPut.rowType).toEqual("TEXT ONLY");
        expect(ouptPut.accountType).toEqual("REPORT");
        expect(ouptPut.groupNumber).toEqual(0);
    });

    it("verifying return of New Row", function () {
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub"
        };
        var ouptPut = model.getNewRow(itemRow);
        expect(ouptPut.displayOnReport).toBe(true);
        expect(ouptPut.excludeFromTotal).toBe(false);
        expect(ouptPut.reverseSign).toBe(false);
        expect(ouptPut.operator).toEqual("");
        expect(ouptPut.displayText).toEqual("Test");
    });

    it("verifying return of Assign Reference Row", function () {
        var ouptPut = {};
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "refCategory", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub"
        };
        model.assignRefRowData(ouptPut, itemRow);
        expect(ouptPut.displayText).toEqual(itemRow.subtotalOrFooterDesc);
        expect(ouptPut.accountType).toEqual(itemRow.accountType);
        expect(ouptPut.accountTypeID).toEqual(itemRow.accountTypeID);
        expect(ouptPut.rowType).toEqual("REF-CATEGORY");
        expect(ouptPut.accountCategoryID).toEqual(itemRow.accountCategory);
    });

    it("verifying return of Assign Reference Row when row is not refernce row", function () {
        var ouptPut = {};
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "fCategory", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub"
        };
        model.assignRefRowData(ouptPut, itemRow);
    });

    it("verifying assigning of row data when row type is section", function () {
        var ouptPut = {};
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "section", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.assignRowData(ouptPut, itemRow);

        expect(ouptPut.rowType).toEqual("HEADER");
        expect(ouptPut.accountType).toEqual("REPORT");
        expect(ouptPut.groupNumber).toEqual(1);
    });

    it("verifying assigning of row data when row type is sub section", function () {
        var ouptPut = {};
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "subSection", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.assignRowData(ouptPut, itemRow);

        expect(ouptPut.rowType).toEqual("HEADER");
        expect(ouptPut.accountType).toEqual("REPORT");
        expect(ouptPut.groupNumber).toEqual(1);
    });

    it("verifying assigning of row data when row type is category", function () {
        var ouptPut = {};
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "category", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.assignRowData(ouptPut, itemRow);

        expect(ouptPut.rowType).toEqual("CATEGORY");
        expect(ouptPut.accountTypeID).toEqual("Test");
        expect(ouptPut.groupNumber).toEqual(0);
    });

    it("verifying assigning of row data when row type is text row", function () {
        var ouptPut = {};
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "text", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.assignRowData(ouptPut, itemRow);

        expect(ouptPut.rowType).toEqual("TEXT ONLY");
        expect(ouptPut.accountType).toEqual("REPORT");
        expect(ouptPut.groupNumber).toEqual(0);
    });


    it("verifying update of COA row when row type is CATEGORY", function () {
        var ouptPut = { rowType: "CATEGORY" };
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "text", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.updateCoaRow(ouptPut, itemRow.accountTypeData, itemRow.categoryOrheaderDesc, itemRow.subtotalOrFooterDesc, itemRow.accountType, itemRow.accountCategory, itemRow.reverseSign);

        expect(ouptPut.displayText).toEqual(itemRow.categoryOrheaderDesc);
        expect(ouptPut.accountTypeID).toEqual(itemRow.accountType);
    });

    it("verifying update of COA row when row type is REF CATEGORY", function () {
        var ouptPut = { rowType: "REF-CATEGORY" };
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "text", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.updateCoaRow(ouptPut, itemRow.accountTypeData, itemRow.categoryOrheaderDesc, itemRow.subtotalOrFooterDesc, itemRow.accountType, itemRow.accountCategory, itemRow.reverseSign);

        expect(ouptPut.displayText).toEqual(itemRow.subtotalOrFooterDesc);
        expect(ouptPut.accountCategoryID).toEqual(itemRow.accountCategory);
    });

    it("verifying update of COA row when row type is not a CATEGORY", function () {
        var ouptPut = { rowType: "HEADER" };
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "text", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.updateCoaRow(ouptPut, itemRow.accountTypeData, itemRow.categoryOrheaderDesc, itemRow.subtotalOrFooterDesc, itemRow.accountType, itemRow.accountCategory, itemRow.reverseSign);
        expect(ouptPut.displayText).toEqual(itemRow.categoryOrheaderDesc);
    });

    it("verifying assigning of other COA rows when row type is HEADER", function () {
        var ouptPut = { rowType: "HEADER" };
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "text", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.assignOtherRows(ouptPut, itemRow.categoryOrheaderDesc, itemRow.subtotalOrFooterDesc, itemRow.reverseSign);
        expect(ouptPut.displayText).toEqual(itemRow.categoryOrheaderDesc);
    });

    it("verifying assigning of other COA rows when row type is SUB-TOTAL", function () {
        var ouptPut = { rowType: "SUB-TOTAL" };
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "text", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.assignOtherRows(ouptPut, itemRow.categoryOrheaderDesc, itemRow.subtotalOrFooterDesc, itemRow.reverseSign);
        expect(ouptPut.displayText).toEqual(itemRow.subtotalOrFooterDesc);
        expect(ouptPut.reverseSign).toEqual(itemRow.reverseSign);
    });

    it("verifying assigning of other COA rows when row type is TEXT ONLY", function () {
        var ouptPut = { rowType: "TEXT ONLY" };
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "text", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.assignOtherRows(ouptPut, itemRow.categoryOrheaderDesc, itemRow.subtotalOrFooterDesc, itemRow.reverseSign);
        expect(ouptPut.displayText).toEqual(itemRow.categoryOrheaderDesc);
    });

    it("verifying assigning of other COA rows when row type is Invalid", function () {
        var ouptPut = { rowType: "Invalid" };
        var accTypeData = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };
        var itemRow = {
            displayOnReport: false, footerDisplayOnReport: false, excludeFromTotal: true, reverseSign: true, operator: "-",
            glDisplayOnReport: true, rowType: "Header", glExcludeFromTotal: false, glReverseSign: false, glOperator: "-",
            accountType: "Test", accountTypeID: "Prefix", uniqID: 1, chartID: 1, reportRowType: "text", accountTypeData: accTypeData,
            categoryOrheaderDesc: "Test", accountCategory: "Test Cat", subtotalOrFooterDesc: "Test Sub", groupState: true, groupNumber: 0
        };
        model.assignOtherRows(ouptPut, itemRow.categoryOrheaderDesc, itemRow.subtotalOrFooterDesc, itemRow.reverseSign);
        expect(ouptPut.displayText).toBe(undefined);
    });

    it("verifying get balnk row method", function () {
        var ouptPut;
        ouptPut = model.getBlankRow(1, 1);
        expect(ouptPut.rowType).toEqual("BLANK ROW");
        expect(ouptPut.accountType).toEqual("REPORT");
        expect(ouptPut.displayText).toEqual("BLANK ROW");
        expect(ouptPut.excludeFromTotal).toBe(false);
        expect(ouptPut.displayOnReport).toBe(true);
        expect(ouptPut.footerDisplayOnReport).toBe(true);
        expect(ouptPut.reverseSign).toBe(false);
        expect(ouptPut.operator).toBe("");
    });

    it("verifying get page break row method", function () {
        var ouptPut;
        ouptPut = model.getPageBreak(1, 1);
        expect(ouptPut.rowType).toEqual("PAGE BREAK");
        expect(ouptPut.accountType).toEqual("REPORT");
        expect(ouptPut.displayText).toEqual("PAGE BREAK");
        expect(ouptPut.excludeFromTotal).toBe(false);
        expect(ouptPut.displayOnReport).toBe(true);
        expect(ouptPut.footerDisplayOnReport).toBe(true);
        expect(ouptPut.reverseSign).toBe(false);
        expect(ouptPut.operator).toBe("");
    });

    it("verifying assign Data method", function () {
        var ouptPut;
        ouptPut = model.assignData(1, 1, "Test", "Type", "Display", true, false, false, true);
        expect(ouptPut.rowType).toEqual("Test");
        expect(ouptPut.accountType).toEqual("TYPE");
        expect(ouptPut.displayText).toEqual("Display");
        expect(ouptPut.excludeFromTotal).toBe(true);
        expect(ouptPut.displayOnReport).toBe(false);
        expect(ouptPut.footerDisplayOnReport).toBe(false);
        expect(ouptPut.reverseSign).toBe(true);
        expect(ouptPut.operator).toBe("");
    });

    it("should return max sequence of the data", function () {
        var ouptPut;
        var footerRow = [{ sequence: 1 }];
        ouptPut = model.getMaxSequence(footerRow);
        expect(ouptPut).toEqual(1);
    });

    it("should not return max sequence of the data when data is null", function () {
        var ouptPut;
        var footerRow = null;
        ouptPut = model.getMaxSequence(footerRow);
        expect(ouptPut).toEqual(0);
    });

    it("verifying isRefCategory, when row type is ref category", function () {
        var ouptPut;
        ouptPut = model.isRefCategory("refCategory");
        expect(ouptPut).toBe(true);
    });

    it("verifying isRefCategory, when row type is REF-CATEGORY", function () {
        var ouptPut;
        ouptPut = model.isRefCategory("REF-CATEGORY");
        expect(ouptPut).toBe(true);
    });

    it("verifying isRefCategory, when row type is other than category", function () {
        var ouptPut;
        ouptPut = model.isRefCategory("TEST");
        expect(ouptPut).toBe(false);
    });

    it("verifying isSection, when row type is section", function () {
        var ouptPut;
        ouptPut = model.isSection("section");
        expect(ouptPut).toBe(true);
    });

    it("verifying isSection, when row type is not a section", function () {
        var ouptPut;
        ouptPut = model.isSection("InValid");
        expect(ouptPut).toBe(false);
    });

    it("verifying isSubSection, when row type is subSection", function () {
        var ouptPut;
        ouptPut = model.isSubSection("subSection");
        expect(ouptPut).toBe(true);
    });

    it("verifying isSubSection, when row type is not a subSection", function () {
        var ouptPut;
        ouptPut = model.isSubSection("InValid");
        expect(ouptPut).toBe(false);
    });

    it("verifying isCategory, when row type is category", function () {
        var ouptPut;
        ouptPut = model.isCategory("category");
        expect(ouptPut).toBe(true);
    });

    it("verifying isCategory, when row type is category", function () {
        var ouptPut;
        ouptPut = model.isCategory("CATEGORY");
        expect(ouptPut).toBe(true);
    });

    it("verifying isCategory, when row type is not a CATEGORY", function () {
        var ouptPut;
        ouptPut = model.isCategory("InValid");
        expect(ouptPut).toBe(false);
    });

    it("verifying isHeader, when row type is HEADER", function () {
        var ouptPut;
        ouptPut = model.isHeader("HEADER");
        expect(ouptPut).toBe(true);
    });

    it("verifying isHeader, when row type is not a HEADER", function () {
        var ouptPut;
        ouptPut = model.isHeader("InValid");
        expect(ouptPut).toBe(false);
    });


    it("verifying isHeader, when row type is SUB-TOTAL", function () {
        var ouptPut;
        ouptPut = model.isSubTotal("SUB-TOTAL");
        expect(ouptPut).toBe(true);
    });

    it("verifying isHeader, when row type is not a SUB-TOTAL", function () {
        var ouptPut;
        ouptPut = model.isSubTotal("InValid");
        expect(ouptPut).toBe(false);
    });

    it("verifying isTextOnly, when row type is TEXT ONLY", function () {
        var ouptPut;
        ouptPut = model.isTextOnly("TEXT ONLY");
        expect(ouptPut).toBe(true);
    });

    it("verifying isTextOnly, when row type is not a TEXT ONLY", function () {
        var ouptPut;
        ouptPut = model.isTextOnly("InValid");
        expect(ouptPut).toBe(false);
    });

    it("verifying getReportRowType, when row type is HEADER", function () {
        var ouptPut;
        var row = { rowType: "HEADER" };
        ouptPut = model.getReportRowType(row);
        expect(ouptPut).toEqual("section");
    });

    it("verifying getReportRowType, when row type is SUB-TOTAL", function () {
        var ouptPut;
        var row = { rowType: "SUB-TOTAL" };
        ouptPut = model.getReportRowType(row);
        expect(ouptPut).toEqual("subSection");
    });

    it("verifying getReportRowType, when row type is CATEGORY", function () {
        var ouptPut;
        var row = { rowType: "CATEGORY" };
        ouptPut = model.getReportRowType(row);
        expect(ouptPut).toEqual("category");
    });

    it("verifying getReportRowType, when row type is REF-CATEGORY", function () {
        var ouptPut;
        var row = { rowType: "REF-CATEGORY" };
        ouptPut = model.getReportRowType(row);
        expect(ouptPut).toEqual("refCategory");
    });

    it("verifying getReportRowType, when row type is TEXT ONLY", function () {
        var ouptPut;
        var row = { rowType: "TEXT ONLY" };
        ouptPut = model.getReportRowType(row);
        expect(ouptPut).toEqual("text");
    });

    it("verifying getReportRowType, when row type is InValid", function () {
        var ouptPut;
        var row = { rowType: "InValid" };
        ouptPut = model.getReportRowType(row);
        expect(ouptPut).toEqual("");
    });

    it("verifying isDataValid, when row type is section", function () {
        var ouptPut;
        var row = { rowType: "InValid" };
        ouptPut = model.isDataValid("section", "Hader", "Footer", "Test", "Test");
        expect(ouptPut).toBe(true);
    });

    it("verifying isDataValid, when row type is section and desc is empty", function () {
        var ouptPut;
        ouptPut = model.isDataValid("section", "", "Footer", "Test", "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is section and desc is undefined", function () {
        var ouptPut;
        ouptPut = model.isDataValid("section", undefined, "Footer", "Test", "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is subSection", function () {
        var ouptPut;
        var row = { rowType: "InValid" };
        ouptPut = model.isDataValid("subSection", "Hader", "Footer", "Test", "Test");
        expect(ouptPut).toBe(true);
    });

    it("verifying isDataValid, when row type is subSection and desc is empty", function () {
        var ouptPut;
        ouptPut = model.isDataValid("subSection", "", "Footer", "Test", "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is subSection and desc is undefined", function () {
        var ouptPut;
        ouptPut = model.isDataValid("subSection", undefined, "Footer", "Test", "Test");
        expect(ouptPut).toBe(false);
    });


    it("verifying isDataValid, when row type is category", function () {
        var ouptPut;
        var row = { rowType: "InValid" };
        ouptPut = model.isDataValid("category", "Hader", "Footer", "Test", "Test");
        expect(ouptPut).toBe(true);
    });

    it("verifying isDataValid, when row type is category and desc is empty", function () {
        var ouptPut;
        ouptPut = model.isDataValid("category", "", "Footer", "Test", "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is category and desc is undefined", function () {
        var ouptPut;
        ouptPut = model.isDataValid("category", undefined, "Footer", "Test", "Test");
        expect(ouptPut).toBe(false);
    });




    it("verifying isDataValid, when row type is text", function () {
        var ouptPut;
        var row = { rowType: "InValid" };
        ouptPut = model.isDataValid("text", "Hader", "Footer", "Test", "Test");
        expect(ouptPut).toBe(true);
    });

    it("verifying isDataValid, when row type is category and desc is empty", function () {
        var ouptPut;
        ouptPut = model.isDataValid("text", "", "Footer", "Test", "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is category and desc is undefined", function () {
        var ouptPut;
        ouptPut = model.isDataValid("text", undefined, "Footer", "Test", "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is refCategory", function () {
        var ouptPut;
        var row = { rowType: "InValid" };
        ouptPut = model.isDataValid("refCategory", "Hader", "Footer", "Test", "Test");
        expect(ouptPut).toBe(true);
    });

    it("verifying isDataValid, when row type is refCategory and desc is empty", function () {
        var ouptPut;
        ouptPut = model.isDataValid("refCategory", "hdr", "", "Test", "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is refCategory and desc is undefined", function () {
        var ouptPut;
        ouptPut = model.isDataValid("refCategory", "Hdr", undefined, "Test", "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is category", function () {
        var ouptPut;
        var row = { rowType: "InValid" };
        ouptPut = model.isDataValid("category", "Hader", "Footer", "Test", "Test");
        expect(ouptPut).toBe(true);
    });

    it("verifying isDataValid, when row type is category and AccntType is empty", function () {
        var ouptPut;
        ouptPut = model.isDataValid("category", "hdr", "Ftr", "", "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is category and AccntType is undefined", function () {
        var ouptPut;
        ouptPut = model.isDataValid("refCategory", "Hdr", "Ftr", undefined, "Test");
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is refCategory", function () {
        var ouptPut;
        ouptPut = model.isDataValid("refCategory", "Hader", "Footer", "Test", "Test");
        expect(ouptPut).toBe(true);
    });

    it("verifying isDataValid, when row type is refCategory and AccntType is empty", function () {
        var ouptPut;
        ouptPut = model.isDataValid("refCategory", "hdr", "Ftr", "Tes", undefined);
        expect(ouptPut).toBe(false);
    });

    it("verifying isDataValid, when row type is refCategory and AccntType is undefined", function () {
        var ouptPut;
        ouptPut = model.isDataValid("category", "Hdr", "Ftr", undefined, "Test");
        expect(ouptPut).toBe(false);
    });

    it("should return sub-totla when header is passed", function () {
        var ouptPut;
        var footerRow = [{ rowType: "HEADER" }];
        ouptPut = model.getDependetRowType(footerRow);
        expect(ouptPut).toEqual("SUB-TOTAL");
    });


    it("should return header when header is passed", function () {
        var ouptPut;
        var footerRow = [{ rowType: "SUB-TOTAL" }];
        ouptPut = model.getDependetRowType(footerRow);
        expect(ouptPut).toEqual("HEADER");
    });

});