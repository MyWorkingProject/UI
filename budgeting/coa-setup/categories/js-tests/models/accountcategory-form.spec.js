describe("account category form model", function () {

    var appLangTranslate, model, catRowModel, catWizModel, catComModel, catFormModel, $filter;

    beforeEach(module("budgeting.coaSetup.categories"));


    beforeEach(function () {
        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);


        var spy1 = RealPage.spy();
        spy1._createMethods(['isDataValid', 'getNewRow', 'isRefCategory', 'isCategory', 'isSection', 'isSubSection', 'updateGLCatOption',
        'updateCoaRow', 'isTextOnly', 'getDependetRowType', 'isHeader', 'isSubTotal']);

        var spy3 = RealPage.spy();
        spy3._createMethods(['getHeaderFooterList', 'getAddSubtractList', 'getGlVisbilityList']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['getInitalAccountTypeData', 'getInitalAccountCategoryData', 'getAccountCategoryRows']);


        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        module(function ($provide) {
            $provide.value('appLangTranslate', spy2);
            $provide.value('accountCategoryRow', spy1);
            $provide.value('accountCategoryWiz', spy3);
            $provide.value('accountCategoryCommon', spy4);
        });

        function injector(a, b, c, d, e, f) {
            appLangTranslate = a;
            $filter = b;
            catRowModel = c;
            catWizModel = d;
            catComModel = e;
            model = f;
        }

        inject(['appLangTranslate', '$filter', 'accountCategoryRow', 'accountCategoryWiz', 'accountCategoryCommon', 'accountCategoryForm', injector]);
    });


    it("should return model header footer list", function () {
        var hfList = { options: { name: "Test", value: "1" } };
        model.headerFooterList = hfList;
        var outPut = model.getHeaderFooterList();
        expect(outPut).toEqual(hfList);
    });

    it("should return model add subtract list", function () {
        var hfList = { options: { name: "Test", value: "1" } };
        model.addSubtractList = hfList;
        var outPut = model.getAddSubtractList();
        expect(outPut).toEqual(hfList);
    });

    it("should return model gl visibility list", function () {
        var gvList = { options: { name: "Test", value: "1" } };
        model.glVisbilityList = gvList;
        var outPut = model.getGlVisbilityList();
        expect(outPut).toEqual(gvList);
    });

    it("should assign category data from paramters when row type is Header", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 5, glDisplayOnReport: true
        };
        var hfList = { options: [{ name: "Test", value: "1" }] };
        model.headerFooterList = hfList;

        model.bindCategoryData(category, data);
        expect(model.form.categoryOrheaderDesc).toEqual(category.displayText);
        expect(model.form.glVisibility).toEqual("1");
        expect(model.form.chkrevSignGLAccnt).toEqual(category.glReverseSign);
        expect(model.form.chkexcludeFromTotal).toEqual(category.excludeFromTotal);
        expect(model.form.glchkexcludeFromTotal).toEqual(category.glExcludeFromTotal);
    });

    it("should assign category data from paramters when row type is SUB-TOTAL", function () {
        var data = { records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } }, { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false } }] };
        var category = {
            rowType: "SUB-TOTAL", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 5, glDisplayOnReport: false
        };
        var hfList = { options: [{ name: "Test", value: "1" }] };
        model.headerFooterList = hfList;

        model.bindCategoryData(category, data);
        expect(model.form.subtotalOrFooterDesc).toEqual(category.displayText);
        expect(model.form.glVisibility).toEqual("0");
        expect(model.form.chkrevSignGLAccnt).toEqual(category.glReverseSign);
        expect(model.form.chkexcludeFromTotal).toEqual(category.excludeFromTotal);
        expect(model.form.glchkexcludeFromTotal).toEqual(category.glExcludeFromTotal);
    });

    it("should assign category data from paramters when row type is TEXT ONLY", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var category = {
            rowType: "TEXT ONLY", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 5, glDisplayOnReport: false
        };

        var hfList = { options: [{ name: "Test", value: "1" }] };
        model.headerFooterList = hfList;

        model.bindCategoryData(category, data);
        expect(model.form.categoryOrheaderDesc).toEqual(category.displayText);
        expect(model.form.glVisibility).toEqual("0");
        expect(model.form.chkrevSignGLAccnt).toEqual(category.glReverseSign);
        expect(model.form.chkexcludeFromTotal).toEqual(category.excludeFromTotal);
        expect(model.form.glchkexcludeFromTotal).toEqual(category.glExcludeFromTotal);
    });

    it("should assign header data and footer data when footer row is found ", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false
        };

        model.assignHeaderRowData(category, data);
        expect(model.form.categoryOrheaderDesc).toEqual(category.displayText);
        expect(model.form.subtotalOrFooterDesc).toEqual(data.records[3].displayText);
        expect(model.form.chkrevSignAccntCategory).toEqual(data.records[3].reverseSign);
    });

    it("should assign header data  when footer row is not found ", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false } }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 11, glDisplayOnReport: false
        };

        model.assignHeaderRowData(category, data);
        expect(model.form.categoryOrheaderDesc).toEqual(category.displayText);
    });

    it("should assign sub total row data  when Header row is  found ", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, displayText: "Test Header" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var category = {
            rowType: "SUB-TOTAL", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false
        };

        model.assignSubTotalRowData(category, data);
        expect(model.form.subtotalOrFooterDesc).toEqual(category.displayText);
        expect(model.form.categoryOrheaderDesc).toEqual(data.records[0].displayText);
    });

    it("should assign sub total row data  when Header row is not found ", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, displayText: "Test Header" }, { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var category = {
            rowType: "SUB-TOTAL", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 11, glDisplayOnReport: false
        };

        model.assignSubTotalRowData(category, data);
        expect(model.form.subtotalOrFooterDesc).toEqual(category.displayText);
    });

    it("should assign Category data  when row type is category ", function () {
        var category = {
            rowType: "CATEGORY", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12
        };

        model.assignCategoryData(category);
        expect(model.form.categoryOrheaderDesc).toEqual(category.displayText);
        expect(model.form.accountType).toEqual(category.accountTypeID);
    });

    it("should assign Category data  when row type is Ref category ", function () {
        var category = {
            rowType: "REF-CATEGORY", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15
        };

        model.assignCategoryData(category);
        expect(model.form.subtotalOrFooterDesc).toEqual(category.displayText);
        expect(model.form.accountType).toEqual(category.accountTypeID);
        expect(model.form.accountCategory).toEqual(category.accountCategoryID);
    });

    it("should not assign Category data  when row type is not a category ", function () {
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15
        };

        model.assignCategoryData(category);
        expect(model.form.subtotalOrFooterDesc).toEqual("");
        expect(model.form.categoryOrheaderDesc).toEqual("");
    });

    it("should assign operation data when operator is +", function () {
        var category = {
            rowType: "REF-CATEGORY", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15, operator: "+", glOperator: "+", reverseSign: true
        };
        var addSubList = { options: [{ value: 0 }, { value: 1 }] };
        model.addSubtractList = addSubList;
        model.assignOperatorData(category);
        expect(model.form.addSubtractCategory).toEqual(addSubList.options[0].value);
        expect(model.form.chkrevSignAccntCategory).toEqual(category.reverseSign);
    });

    it("should assign operation data when operator is -", function () {
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15, operator: "-", glOperator: "+", reverseSign: true
        };
        var addSubList = { options: [{ value: 0 }, { value: 1 }] };

        model.addSubtractList = addSubList;
        model.assignOperatorData(category);
        expect(model.form.addSubtractCategory).toEqual(addSubList.options[1].value);
        expect(model.form.chkrevSignAccntCategory).toEqual("");
    });

    it("should assign GL operation data when operator is +", function () {
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15, operator: "-", glOperator: "+", reverseSign: true
        };
        var addSubList = { options: [{ value: 0 }, { value: 1 }] };

        model.addSubtractList = addSubList;
        model.assignGLOperatorData(category);
        expect(model.form.addSubtractglAccount).toEqual(addSubList.options[0].value);
    });

    it("should assign GL operation data when operator is -", function () {
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15, operator: "-", glOperator: "-", reverseSign: true
        };
        var addSubList = { options: [{ value: 0 }, { value: 1 }] };

        model.addSubtractList = addSubList;
        model.assignGLOperatorData(category);
        expect(model.form.addSubtractglAccount).toEqual(addSubList.options[1].value);
    });

    it("should assign GL operation data when operator is empty ", function () {
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15, operator: "-", glOperator: "", reverseSign: true
        };
        var addSubList = { options: [{ value: 0 }, { value: 1 }] };

        model.addSubtractList = addSubList;
        model.assignGLOperatorData(category);
        expect(model.form.addSubtractglAccount).toEqual("Add");
    });

    it("should assign HeaderData when display and footer display is false", function () {
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15, operator: "-", glOperator: "", reverseSign: true,
            displayOnReport: false, footerDisplayOnReport: false
        };
        var hfList = {
            options: [{ name: "Test", value: "1" }, { name: "Test", value: "2" }, { name: "Test", value: "3" },
            { name: "Test", value: "4" }]
        };
        model.headerFooterList = hfList;

        model.assignHeaderData(category);
        expect(model.form.headerFooter).toEqual(hfList.options[0].value);
    });

    it("should assign HeaderData when display and footer display is true", function () {
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15, operator: "-", glOperator: "", reverseSign: true,
            displayOnReport: true, footerDisplayOnReport: true
        };
        var hfList = {
            options: [{ name: "Test", value: "1" }, { name: "Test", value: "2" }, { name: "Test", value: "3" },
            { name: "Test", value: "4" }]
        };
        model.headerFooterList = hfList;

        model.assignHeaderData(category);
        expect(model.form.headerFooter).toEqual(hfList.options[3].value);
    });

    it("should assign HeaderData when display  is true", function () {
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15, operator: "-", glOperator: "", reverseSign: true,
            displayOnReport: true, footerDisplayOnReport: false
        };
        var hfList = {
            options: [{ name: "Test", value: "1" }, { name: "Test", value: "2" }, { name: "Test", value: "3" },
            { name: "Test", value: "4" }]
        };
        model.headerFooterList = hfList;

        model.assignHeaderData(category);
        expect(model.form.headerFooter).toEqual(hfList.options[1].value);
    });

    it("should assign HeaderData when display  is true", function () {
        var category = {
            rowType: "HEADER", displayText: "Display Text", glReverseSign: true, excludeFromTotal: false, glExcludeFromTotal: true,
            groupNumber: 1, glDisplayOnReport: false, accountTypeID: 12, accountCategoryID: 15, operator: "-", glOperator: "", reverseSign: true,
            displayOnReport: false, footerDisplayOnReport: true
        };
        var hfList = {
            options: [{ name: "Test", value: "1" }, { name: "Test", value: "2" }, { name: "Test", value: "3" },
            { name: "Test", value: "4" }]
        };
        model.headerFooterList = hfList;

        model.assignHeaderData(category);
        expect(model.form.headerFooter).toEqual(hfList.options[2].value);
    });

    it("should reset data resetFormData", function () {

        var hfList = {
            options: [{ name: "Test", value: "1" }, { name: "Test", value: "2" }, { name: "Test", value: "3" },
            { name: "Test", value: "4" }]
        };
        model.headerFooterList = hfList;
        var addSubList = { options: [{ value: 0 }, { value: 1 }] };
        model.addSubtractList = addSubList;
        var catRows = {};
        model.resetFormData(true, catRows);
        expect(catComModel._called.getAccountCategoryRows).toBe(true);
        expect(model.form.categoryOrheaderDesc).toEqual("");
        expect(model.form.subtotalOrFooterDesc).toEqual("");
        expect(model.form.glVisibility).toEqual("1");
    });

    it("should reset CheckBoxes", function () {
        model.resetCheckBoxes();
        expect(model.form.chkrevSignAccntCategory).toEqual(false);
        expect(model.form.chkrevSignGLAccnt).toEqual(false);
        expect(model.form.chkexcludeFromTotal).toEqual(false);
        expect(model.form.glchkexcludeFromTotal).toEqual(false);
    });

    it("should set Footer Required", function () {
        model.setFooterReq(true);
        expect(model.form.isFooterReq).toEqual(true);
    });

    it("should set Display Option when HeaderFooter is selected", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false };
        model.form.headerFooter = "HeaderFooter";
        model.updateDisplayOption(data);
        expect(data.displayOnReport).toEqual(true);
        expect(data.footerDisplayOnReport).toEqual(true);
    });

    it("should set Display Option when Header is selected", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false };
        model.form.headerFooter = "Header";
        model.updateDisplayOption(data);
        expect(data.displayOnReport).toEqual(true);
        expect(data.footerDisplayOnReport).toEqual(false);
    });

    it("should set Display Option when Header is selected", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false };
        model.form.headerFooter = "Footer";
        model.updateDisplayOption(data);
        expect(data.displayOnReport).toEqual(false);
        expect(data.footerDisplayOnReport).toEqual(true);
    });

    it("should set Display Option when Header is selected", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: true };
        model.form.headerFooter = "";
        model.updateDisplayOption(data);
        expect(data.displayOnReport).toEqual(false);
        expect(data.footerDisplayOnReport).toEqual(false);
    });

    it("should set Display Options", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false };
        model.form.headerFooter = "";
        model.updateDisplay(data, true, true);
        expect(data.displayOnReport).toEqual(true);
        expect(data.footerDisplayOnReport).toEqual(true);
    });

    it("should update Category Data", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false, operator: "+", glOperator: "-" };
        model.form.headerFooter = "";
        model.form.glVisibility = "1";
        model.updateCatData(data);
        expect(data.excludeFromTotal).toEqual(model.form.chkexcludeFromTotal);
        expect(data.glDisplayOnReport).toEqual(true);
    });

    it("should update Category Data where gl visibility is 0 ", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false, operator: "+", glOperator: "-" };
        model.form.headerFooter = "";
        model.form.glVisibility = "0";
        model.updateCatData(data);
        expect(data.excludeFromTotal).toEqual(model.form.chkexcludeFromTotal);
        expect(data.glDisplayOnReport).toEqual(false);
    });

    it("should update Operator when fprm category is add", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false, operator: "-", glOperator: "-" };
        model.form.headerFooter = "";
        model.form.glVisibility = "0";
        model.form.addSubtractCategory = "Add";
        model.updateOperator(data);
        expect(data.operator).toEqual("+");
    });

    it("should update Operator when fprm category is subtract", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false, operator: "+", glOperator: "-" };
        model.form.headerFooter = "";
        model.form.glVisibility = "0";
        model.form.addSubtractCategory = "Subtract";
        model.updateOperator(data);
        expect(data.operator).toEqual("-");
    });

    it("should update Operator when fprm category is InValid", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false, operator: "+", glOperator: "-" };
        model.form.headerFooter = "";
        model.form.glVisibility = "0";
        model.form.addSubtractCategory = "InValid";
        model.updateOperator(data);
        expect(data.operator).toEqual("+");
    });

    it("should update GL Operator when fprm category is Add", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false, operator: "-", glOperator: "-" };
        model.form.headerFooter = "";
        model.form.glVisibility = "0";
        model.form.addSubtractglAccount = "Add";
        model.updateGLOperator(data);
        expect(data.glOperator).toEqual("+");
    });

    it("should update GL Operator when fprm category is Subtract", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false, operator: "+", glOperator: "+" };
        model.form.headerFooter = "";
        model.form.glVisibility = "0";
        model.form.addSubtractglAccount = "Subtract";
        model.updateGLOperator(data);
        expect(data.glOperator).toEqual("-");
    });

    it("should update GL Operator when fprm category is Invalid", function () {
        var data = { displayOnReport: false, footerDisplayOnReport: false, operator: "+", glOperator: "-" };
        model.form.headerFooter = "";
        model.form.glVisibility = "0";
        model.form.addSubtractglAccount = "Inavlid";
        model.updateGLOperator(data);
        expect(data.glOperator).toEqual("-");
    });

    it("should update IntialForm Data when row type is HEADER", function () {

        model.updateIntialFormData("HEADER");
        expect(model.form.showOptions).toBe(true);
    });


    it("should update IntialForm Data when row type is section", function () {
        model.updateIntialFormData("section");
        expect(model.form.showOptions).toBe(true);
    });

    it("should update IntialForm Data when row type is subSection", function () {
        model.updateIntialFormData("subSection");
        expect(model.form.showOptions).toBe(true);
    });

    it("should update IntialForm Data when row type is CATEGORY", function () {
        model.updateIntialFormData("CATEGORY");
        expect(model.form.accountType).toEqual("");
    });

    it("should update IntialForm Data when row type is category", function () {
        model.updateIntialFormData("category");
        expect(model.form.accountType).toEqual("");
    });


    it("should update IntialForm Data when row type is SUB-TOTAL", function () {
        model.updateIntialFormData("SUB-TOTAL");
        expect(model.form.showOptions).toBe(true);
    });

    it("should update IntialForm Data when row type is REF-CATEGORY", function () {
        model.updateIntialFormData("REF-CATEGORY");
        expect(model.form.showOptionalText).toBe(false);
    });

    it("should update IntialForm Data when row type is refCategory", function () {
        model.updateIntialFormData("refCategory");
        expect(model.form.showOptionalText).toBe(false);
    });

    it("should update IntialForm Data when row type is TEXT ONLY", function () {
        model.updateIntialFormData("TEXT ONLY");
        expect(model.form.showOptions).toBe(false);
    });

    it("should update IntialForm Data when row type is text", function () {
        model.updateIntialFormData("text");
        expect(model.form.showOptions).toBe(false);
    });

    it("should update IntialForm Data when row type is Invalid", function () {
        model.updateIntialFormData("Invalid");
    });

    it("calling show section method", function () {
        model.showSection();
        expect(model.form.showOptions).toBe(true);
        expect(model.form.showOptionalText).toBe(true);
    });


    it("calling show showCategory method", function () {
        model.showCategory();
        expect(model.form.accountType).toEqual("");
        expect(model.form.showOptions).toBe(true);
        expect(model.form.showOptionalText).toBe(true);
    });

    it("calling show showRefCategory method", function () {
        model.showRefCategory();
        expect(model.form.accountType).toEqual("");
        expect(model.form.showOptions).toBe(true);
        expect(model.form.showOptionalText).toBe(false);
    });

    it("calling show showTextOnly method", function () {
        model.showTextOnly();
        expect(model.form.showOptions).toBe(false);
        expect(model.form.showOptionalText).toBe(false);
    });

    it("calling get CategoryOrheader Desc", function () {
        var outPut = model.getCategoryOrheaderDesc();
        expect(outPut).toEqual(model.form.categoryOrheaderDesc);
    });

    it("calling get SubtotalOrFooterDesc Desc", function () {
        var outPut = model.getSubtotalOrFooterDesc();
        expect(outPut).toEqual(model.form.subtotalOrFooterDesc);
    });

    it("calling get AccountCategory ", function () {
        var outPut = model.getAccountCategory();
        expect(outPut).toEqual(model.form.accountCategory);
    });

    it("calling set AccountCategory ", function () {
        model.setAccountCategory(1);
        expect(model.form.accountCategory).toEqual(1);
    });

    it("calling get AccountType ", function () {
        var outPut = model.getAccountType();
        expect(outPut).toEqual(model.form.accountType);
    });

    it("calling get check rev sign accnt category ", function () {
        var outPut = model.getChkrevSignAccntCategory();
        expect(outPut).toEqual(model.form.chkrevSignAccntCategory);
    });

    it("calling update header row ", function () {
        var newdata = { id: 0, displayText: "", rowType: "", reverseSign: "", masterChartID: 0 };
        var outPut = model.updateHeaderRow(newdata, 1, 1);
        expect(newdata.id).toEqual(1);
        expect(newdata.masterChartID).toEqual(1);
        expect(newdata.rowType).toEqual("SUB-TOTAL");
    });

    it("calling updateAccountTypeData ", function () {
        var data = { records: { Name: "2" } };
        catComModel._returnData.getInitalAccountTypeData = { options: [{ name: "Test", value: "1" }] };
        model.updateAccountTypeData(data);
        expect(catComModel._called.getInitalAccountTypeData).toBe(true);
    });

    it("calling update AccountCategoryData  ", function () {
        var data = { records: "1" };
        model.updateAccountCategoryData(data);
        expect(catComModel._called.getAccountCategoryRows).toBe(true);
    });

    it("calling get AccounTypeData  ", function () {
        var outPut = model.getAccounTypeData();
        expect(outPut).toEqual(model.accountTypeData);
    });

    it("calling get isDataValid  ", function () {
        var outPut = model.isDataValid("Header");
        expect(catRowModel._called.isDataValid).toBe(true);
    });

    it("calling update CoaRow Data whene row is refered category  ", function () {
        var groupState = { open: true };
        var catData = [{ accountCategoryID: 1, rowType: "CATEGORY" }];
        catRowModel._returnData.isRefCategory = true;
        catRowModel._returnData.isCategory = false;
        catRowModel._returnData.isSection = false;
        catRowModel._returnData.isSubSection = false;
        var outPut = model.updateCoaRowData(1, 1, 1, "refCategory", groupState, catData);
        expect(catRowModel._called.isRefCategory).toBe(true);
        //expect(catRowModel._called.isCategory).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update CoaRow Data whene row is  category  ", function () {
        var groupState = { open: true };
        var catData = [{ accountCategoryID: 1, rowType: "CATEGORY" }];
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = true;
        catRowModel._returnData.isSection = false;
        catRowModel._returnData.isSubSection = false;
        var outPut = model.updateCoaRowData(1, 1, 1, "refCategory", groupState, catData);
        expect(catRowModel._called.isRefCategory).toBe(true);
        expect(catRowModel._called.isCategory).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update CoaRow Data whene row is Section  ", function () {
        var groupState = { open: true };
        var catData = [{ accountCategoryID: 1, rowType: "CATEGORY" }];
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = false;
        catRowModel._returnData.isSection = true;
        catRowModel._returnData.isSubSection = false;
        var outPut = model.updateCoaRowData(1, 1, 1, "refCategory", groupState, catData);
        expect(catRowModel._called.isRefCategory).toBe(true);
        expect(catRowModel._called.isCategory).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
        expect(catRowModel._called.isSection).toBe(true);
        //expect(catRowModel._called.isSubSection).toBe(true);
    });

    it("calling update CoaRow Data whene row is Sub Section  ", function () {
        var groupState = { open: true };
        var catData = [{ accountCategoryID: 1, rowType: "CATEGORY" }];
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = false;
        catRowModel._returnData.isSection = false;
        catRowModel._returnData.isSubSection = true;
        var outPut = model.updateCoaRowData(1, 1, 1, "refCategory", groupState, catData);
        expect(catRowModel._called.isRefCategory).toBe(true);
        expect(catRowModel._called.isCategory).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
        expect(catRowModel._called.isSection).toBe(true);
        expect(catRowModel._called.isSubSection).toBe(true);
    });

    it("calling update CoaRow Data whene row is Invalid  ", function () {
        var groupState = { open: true };
        var catData = [{ accountCategoryID: 1, rowType: "CATEGORY" }];
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = false;
        catRowModel._returnData.isSection = false;
        catRowModel._returnData.isSubSection = false;
        var outPut = model.updateCoaRowData(1, 1, 1, "Category", groupState, catData);
        expect(catRowModel._called.isRefCategory).toBe(true);
        expect(catRowModel._called.isCategory).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
        expect(catRowModel._called.isSection).toBe(true);
        expect(catRowModel._called.isSubSection).toBe(true);
    });

    it("calling update CoaRow Data whene row is Text  ", function () {
        var groupState = { open: true };
        var catData = [{ accountCategoryID: 1, rowType: "Text" }];
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = false;
        catRowModel._returnData.isSection = false;
        catRowModel._returnData.isSubSection = false;
        var outPut = model.updateCoaRowData(1, 1, 1, "Text", groupState, catData);
        expect(catRowModel._called.isRefCategory).toBe(true);
        expect(catRowModel._called.isCategory).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
        expect(catRowModel._called.isSection).toBe(true);
        expect(catRowModel._called.isSubSection).toBe(true);
    });

    it("calling Get Accnt Ref type ", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "CATEGORY", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        model.form.accountCategory = 1;
        var newObj = { accountType: "", accountTypeID: 0 };
        model.getRefAccntType(data.records, newObj);
        expect(newObj.accountType).toEqual(data.records[0].accountType);
        expect(newObj.accountTypeID).toEqual(data.records[0].accountTypeID);
    });

    it("calling update Coa Existing Data When Referd Row is Category", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "CATEGORY", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var coaRow = [{ id: 1, groupNumber: 1, sequence: 1, rowType: "CATEGORY", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 }];
        model.form.accountCategory = 1;
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = true;

        var newObj = { accountType: "", accountTypeID: 0 };
        model.updateCoaExistingData(coaRow, data.records);
        expect(catRowModel._called.updateCoaRow).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update Coa Existing Data When Referd Row is Ref Category", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "REF-CATEGORY", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var coaRow = [{ id: 1, groupNumber: 1, sequence: 1, rowType: "REF-CATEGORY", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 }];
        model.form.accountCategory = 1;
        catRowModel._returnData.isRefCategory = true;
        catRowModel._returnData.isCategory = false;

        var newObj = { accountType: "", accountTypeID: 0 };
        model.updateCoaExistingData(coaRow, data.records);
        expect(catRowModel._called.updateCoaRow).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update Coa Existing Data When Referd Row is HEADER", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var coaRow = [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 }];
        model.form.accountCategory = 1;
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = false;
        catRowModel._returnData.isHeader = true;
        catRowModel._returnData.isSubTotal = false;

        var newObj = { accountType: "", accountTypeID: 0 };
        model.updateCoaExistingData(coaRow, data.records);
        //expect(catRowModel._called.updateCoaRow).toBe(true); 
        expect(catRowModel._called.getDependetRowType).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update Coa Existing Data When Referd Row is SubTotal", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "SUB-TOTAL", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var coaRow = [{ id: 1, groupNumber: 1, sequence: 1, rowType: "SUB-TOTAL", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 }];
        model.form.accountCategory = 1;
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = false;
        catRowModel._returnData.isHeader = false;
        catRowModel._returnData.isSubTotal = true;

        var newObj = { accountType: "", accountTypeID: 0 };
        model.updateCoaExistingData(coaRow, data.records);
        //expect(catRowModel._called.updateCoaRow).toBe(true);
        expect(catRowModel._called.getDependetRowType).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update Coa Existing Data When Referd Row is Text", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "TEXT ONLY", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var coaRow = [{ id: 1, groupNumber: 1, sequence: 1, rowType: "TEXT ONLY", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 }];
        model.form.accountCategory = 1;
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = false;
        catRowModel._returnData.isHeader = false;
        catRowModel._returnData.isSubTotal = false;
        catRowModel._returnData.isTextOnly = true;

        var newObj = { accountType: "", accountTypeID: 0 };
        model.updateCoaExistingData(coaRow, data.records);
        expect(catRowModel._called.updateCoaRow).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update Coa Existing Data When Referd Row is Invalid", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "TEXT ONLY", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var coaRow = [{ id: 1, groupNumber: 1, sequence: 1, rowType: "TEXT ONLY", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 }];
        model.form.accountCategory = 1;
        catRowModel._returnData.isRefCategory = false;
        catRowModel._returnData.isCategory = false;
        catRowModel._returnData.isHeader = false;
        catRowModel._returnData.isSubTotal = false;
        catRowModel._returnData.isTextOnly = false;

        var newObj = { accountType: "", accountTypeID: 0 };
        model.updateCoaExistingData(coaRow, data.records);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update dependent rows method when dependent row is found", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var coaRow = [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 }];
        model.form.accountCategory = 1;
        catRowModel._returnData.getDependetRowType = "HEADER";

        var newObj = { accountType: "", accountTypeID: 0 };
        model.updateDependentRows(coaRow, data.records);
        expect(catRowModel._called.updateCoaRow).toBe(true);
        expect(catRowModel._called.getDependetRowType).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(true);
    });

    it("calling update dependent rows method when dependent row is not found", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        var coaRow = [{ id: 1, groupNumber: 11, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 }];
        model.form.accountCategory = 1;
        catRowModel._returnData.getDependetRowType = "HEADER";

        var newObj = { accountType: "", accountTypeID: 0 };
        model.updateDependentRows(coaRow, data.records);
        expect(catRowModel._called.updateCoaRow).toBe(true);
        expect(catRowModel._called.getDependetRowType).toBe(true);
        expect(catRowModel._called.updateGLCatOption).toBe(undefined);
    });

    it("calling fill Form Objects when parameter is Ref Category", function () {

        catRowModel._returnData.isRefCategory = true;

        model.fillFormObjects("REF-CATEGORY");
        expect(model.form.isFooterReq).toBe(true);
    });

    it("calling fill Form Objects when parameter is Not a Ref Category", function () {

        catRowModel._returnData.isRefCategory = false;

        model.fillFormObjects("CATEGORY");
        expect(model.form.isFooterReq).toBe(false);
    });

    it("calling update Edit Data when parameter is Ref Category", function () {
        var category = { rowType: "REF-CATEGORY" };
        catRowModel._returnData.isRefCategory = true;

        model.updateEditData(category);
        expect(model.form.isFooterReq).toBe(true);
    });

    it("calling update Edit Data when parameter is Not a Ref Category", function () {

        var category = { rowType: "CATEGORY" };
        catRowModel._returnData.isRefCategory = false;

        model.updateEditData(category);
        expect(model.form.isFooterReq).toBe(false);
    });

    it("calling load account category when cat id is defined", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        model.form.accountCategory = 5;

        model.loadAccountCategory(data);
        expect(model.form.accountCategory).toEqual(5);
    });

    it("calling load account category when cat id is not defined", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };
        model.form.accountCategory = undefined;

        model.loadAccountCategory(data);
        expect(model.form.accountCategory).toEqual(undefined);
    });

    it("calling save Row when row is new row", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };

        var obj = {
            isNewRow: true,
            uniqID: 1,
            chartID: 1,
            groupNumber: 1,
            reportRowType: "Category",
            groupState: { open: true },
            categoryRecords: data.records,
            lastClickedID: 1,
            newdata: { groupNumber: 2 }
        };
        catRowModel._returnData.isSection = false; 
        catRowModel._returnData.isSubSection = false;
        var outPut = model.saveRow(obj);
        expect(obj.uniqID).toEqual(2);
        expect(obj.groupNumber).toEqual(1);
        expect(outPut.uniqID).toEqual(2);
        expect(outPut.groupNumber).toEqual(1);
    });

    it("calling save Row when row is not new row", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };

        var obj = {
            isNewRow: false,
            uniqID: 1,
            chartID: 1,
            groupNumber: 1,
            reportRowType: "Category",
            groupState: { open: true },
            categoryRecords: data.records,
            lastClickedID: 1,
            newdata: { groupNumber: 2 }
        };
        catRowModel._returnData.isSection = false;
        var outPut = model.saveRow(obj);
        expect(obj.uniqID).toEqual(1);
        expect(obj.groupNumber).toEqual(1);

    });

    it("calling get New Return Data verifying the returnd data", function () {
        var data = {
            id: 2
        };

        var outPut = model.getNewReturnData(1, 1, data);
        expect(outPut.uniqID).toEqual(1);
        expect(outPut.groupNumber).toEqual(1);
        expect(outPut.newRow).toEqual(data);

    });

    it("calling update Coa Exist Row data when row is found", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };

        model.updateCoaExistRow(data.records, 1);
        expect(catRowModel._called.updateGLCatOption).toBe(true);

    });

    it("calling update Coa Exist Row data when row is not found", function () {
        var data = {
            records: [{ id: 1, groupNumber: 1, sequence: 1, rowType: "HEADER", groupState: { open: false }, accountCategoryID: 1, accountType: "Income", accountTypeID: 2 },
                { id: 2, groupNumber: "", rowType: "HEADER", groupState: { open: false }, sequence: 2 }, { id: 3, groupNumber: 2, rowType: "Header", sequence: 3, groupState: { open: false } },
                { id: 4, groupNumber: 1, sequence: 4, rowType: "SUB-TOTAL", groupState: { open: false }, displayText: "Footer Desc", reverseSign: true }]
        };

        model.updateCoaExistRow(data.records, 30);
        expect(catRowModel._called.updateGLCatOption).toBe(undefined);

    });

    it("verifying the retun of new group number when row type is section", function () {
       
        catRowModel._returnData.isSection = true;
        var newData = { groupNumber: 1 };
        var outPut = model.getNewGroupNumber("HEADER", newData, 1);
        expect(outPut).toEqual(1);

    });


    it("verifying the retun of new group number when row type is isSubSection", function () {

        catRowModel._returnData.isSubSection = true;
        var newData = { groupNumber: 1 };
        var outPut = model.getNewGroupNumber("HEADER", newData, 1);
        expect(outPut).toEqual(1);

    });

    it("verifying the retun of new group number when row type is Category", function () {

        catRowModel._returnData.isSubSection = false;
        catRowModel._returnData.isSection = false;
        var newData = { groupNumber: 1 };
        var outPut = model.getNewGroupNumber("Category", newData, 2);
        expect(outPut).toEqual(2);

    });




});