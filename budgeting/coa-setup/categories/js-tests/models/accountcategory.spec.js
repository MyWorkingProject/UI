describe("account category model", function () {

    var appLangTranslate, model, wizModel, notification, dialogModel, $location, $filter;

    beforeEach(module("budgeting.coaSetup.categories"));

    beforeEach(function () {
        var mocks = {
            'rp.common.dialog': ['rpDialogModel']
        };

        var mocksNot = {
            'rp.common.notification': ['rpNotificationModel']
        };

        RealPage.ngMocks.install(mocksNot);

        RealPage.ngMocks.install(mocks);

    });

    beforeEach(function () {
        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);


        var spy1 = RealPage.spy();
        spy1._createMethods(['absUrl', 'path']);

        var wizMethods = [
           'wrapShowMsg',
           'getCoaErrorObj',
           'getAcctTypeErrorObj',
           'getCatErrorObj'
        ];

        var wizSpy = RealPage.spy();
        wizSpy._createMethods(wizMethods);


        var spy2 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        module(function ($provide) {
            $provide.value('appLangTranslate', spy2);
            $provide.value('accountCategoryWiz', wizSpy);
            $provide.value('$location', spy1);
            // $provide.value('rpDialogModel', dialogModel);
        });

        function injector(a, b, c, d, e, f, g) {
            appLangTranslate = a;
            dialogModel = b();
            $location = c;
            notification = d();
            wizModel = e;
            $filter = f;
            model = g;
        }

        inject(['appLangTranslate', 'rpDialogModel', '$location', 'rpNotificationModel', 'accountCategoryWiz', '$filter', 'accountCategoryModel', injector]);

    });

    afterEach(function () {
        dialogModel._reset();
        notification._reset();
    });

    it("should return model groupState object", function () {
        var outPut = model.getGroupState();
        expect(outPut).toEqual(model.groupState);
    });

    it("should toggle the menu is on", function () {
        model.state.menuIsOn = false;
        model.toggleMenuIsOn();
        expect(model.state.menuIsOn).toBe(true);
    });

    it("should set the  menu is on", function () {
        model.state.menuIsOn = false;
        model.setMenuIsOn(true);
        expect(model.state.menuIsOn).toBe(true);
    });

    it("should return isMenuIsOn", function () {
        model.state.menuIsOn = false;
        var outPut = model.isMenuIsOn();
        expect(outPut).toEqual(model.state.menuIsOn);
    });

    it("calling the button text updation when save is true", function () {
        model.updateButtonText(true);
    });

    it("calling the button text updation when save is false", function () {
        model.updateButtonText(false);
    });

    it("calling the show section method", function () {
        model.showSection();
        expect(model.selOptions.category).toBe(false);
        expect(model.selOptions.section).toBe(true);
        expect(model.selOptions.divGlAccount).toBe(false);
        expect(model.selOptions.categoryOrheaderDesc).toBe(true);
        expect(model.selOptions.refCategory).toBe(false);
        expect(model.selOptions.divAddorSub).toBe(false);
        expect(model.selOptions.divExTotal).toBe(false);
        expect(model.selOptions.subtotalFooter).toBe(true);
        expect(model.selOptions.type).toBe(true);
    });

    it("calling the show Category method", function () {
        model.showCategory();
        expect(model.selOptions.category).toBe(true);
        expect(model.selOptions.section).toBe(false);
        expect(model.selOptions.divGlAccount).toBe(true);
        expect(model.selOptions.categoryOrheaderDesc).toBe(true);
        expect(model.selOptions.refCategory).toBe(false);
        expect(model.selOptions.divAddorSub).toBe(true);
        expect(model.selOptions.divExTotal).toBe(true);
        expect(model.selOptions.subtotalFooter).toBe(false);
        expect(model.selOptions.type).toBe(true);
    });

    it("calling the show RefCategory method", function () {
        model.showRefCategory();
        expect(model.selOptions.category).toBe(false);
        expect(model.selOptions.section).toBe(false);
        expect(model.selOptions.divGlAccount).toBe(true);
        expect(model.selOptions.categoryOrheaderDesc).toBe(false);
        expect(model.selOptions.refCategory).toBe(true);
        expect(model.selOptions.divAddorSub).toBe(true);
        expect(model.selOptions.divExTotal).toBe(true);
        expect(model.selOptions.subtotalFooter).toBe(true);
        expect(model.selOptions.type).toBe(false);
    });

    it("calling the show Text only method", function () {
        model.showTextOnly();
        expect(model.selOptions.category).toBe(false);
        expect(model.selOptions.section).toBe(true);
        expect(model.selOptions.divGlAccount).toBe(false);
        expect(model.selOptions.categoryOrheaderDesc).toBe(true);
        expect(model.selOptions.refCategory).toBe(false);
        expect(model.selOptions.divAddorSub).toBe(false);
        expect(model.selOptions.divExTotal).toBe(false);
        expect(model.selOptions.subtotalFooter).toBe(false);
        expect(model.selOptions.type).toBe(true);
    });

    it("calling the show Text only method", function () {
        model.updateSelOptions(true, true, true, true, true, true, true, true, false);
        expect(model.selOptions.category).toBe(true);
        expect(model.selOptions.section).toBe(true);
        expect(model.selOptions.divGlAccount).toBe(true);
        expect(model.selOptions.categoryOrheaderDesc).toBe(true);
        expect(model.selOptions.refCategory).toBe(true);
        expect(model.selOptions.divAddorSub).toBe(true);
        expect(model.selOptions.divExTotal).toBe(true);
        expect(model.selOptions.subtotalFooter).toBe(true);
        expect(model.selOptions.type).toBe(false);
    });

    it("calling the show Slide row type is Header", function () {
        model.showSlide("HEADER");
    });

    it("calling the show Slide row type is CATEGORY", function () {
        model.showSlide("CATEGORY");
    });

    it("calling the show Slide row type is SUB-TOTAL", function () {
        model.showSlide("SUB-TOTAL");
    });

    it("calling the show Slide row type is REF-CATEGORY", function () {
        model.showSlide("REF-CATEGORY");
    });

    it("calling the show Slide row type is TEXT ONLY", function () {
        model.showSlide("TEXT ONLY");
    });

    it("calling the show Slide row type is INVALID", function () {
        model.showSlide("INVALID");
    });

    it("calling the Update Title", function () {
        model.updateTitle("INVALID");
        expect(model.text.categoryFormTitle).toEqual("INVALID");
    });

    it("calling the toggle Imp Category", function () {
        model.text.toggleImpCategory.state.open = true;
        model.toggleImpCategory();
        expect(model.text.toggleImpCategory.state.open).toBe(false);
    });

    it("calling the update slide state", function () {
        model.updateSlideState(false);
        expect(model.slideCategoryForm.state.open).toBe(false);
        expect(model.slideCategoryForm.showCatForm).toBe(false);
    });

    it("calling the view Category Options when type is section", function () {
        model.viewCategoryOptions("section");
    });

    it("calling the view Category Options when type is subSection", function () {
        model.viewCategoryOptions("subSection");
    });

    it("calling the view Category Options when type is category", function () {
        model.viewCategoryOptions("category");
    });

    it("calling the view Category Options when type is refCategory", function () {
        model.viewCategoryOptions("refCategory");
    });

    it("calling the view Category Options when type is text", function () {
        model.viewCategoryOptions("text");
    });

    it("calling the view Category Options when type is INVALID", function () {
        model.viewCategoryOptions("INVALID");
    });

    it("calling the update Lable when type is section", function () {
        model.updateLable("section");
    });

    it("calling the update Lable when type is subSection", function () {
        model.updateLable("subSection");
    });

    it("calling the update Lable when type is category", function () {
        model.updateLable("category");
    });

    it("calling the update Lable when type is refCategory", function () {
        model.updateLable("refCategory");
    });

    it("calling the update Lable when type is text", function () {
        model.updateLable("text");
    });

    it("calling the update Lable when type is INVALID", function () {
        model.updateLable("INVALID");
    });

    it("calling the update Sec Title when type is section", function () {
        model.updateSecTitle("section");
    });

    it("calling the update Sec Title when type is Other than section", function () {
        model.updateSecTitle("Subsection");
    });

    it("calling the assign cat ref lbl when parameter is category", function () {
        model.assignCatRefLabl("category");
    });

    it("calling the assign cat ref lbl when parameter is refCategory", function () {
        model.assignCatRefLabl("refCategory");
    });

    it("Verification of section lable", function () {
        model.updateSectionLable("optional", "section labl");
        expect(model.fieldLabel.sectionOptionsLable).toEqual("optional");
        expect(model.fieldLabel.secCatVisblLable).toEqual("section labl");
    });

    it("Verification of get COARows Failure method when status is 400", function () {
        var response = { status: 400, data: { message: "success" } };
        model.getCOARowsFailure(response);
        expect(wizModel._called.wrapShowMsg).toBe(true);
        expect(wizModel._called.getCoaErrorObj).toBe(true);
        expect(wizModel._callData.wrapShowMsg[0]).toEqual(response.data.message);
    });

    it("Verification of get COARows Failure method when status is 200", function () {
        var response = { status: 200, data: { message: "success" } };
        model.getCOARowsFailure(response);
        expect(wizModel._called.wrapShowMsg).toBe(undefined);
    });

    it("Verification of get AccntType Failure  method when status is 400", function () {
        var response = { status: 400, data: { message: "success" } };
        model.getAccntTypeFailure(response);
        expect(wizModel._called.wrapShowMsg).toBe(true);
        expect(wizModel._called.getAcctTypeErrorObj).toBe(true);
        expect(wizModel._callData.wrapShowMsg[0]).toEqual(response.data.message);
    });

    it("Verification of get AccntType Failure method when status is 200", function () {
        var response = { status: 200, data: { message: "success" } };
        model.getAccntTypeFailure(response);
        expect(wizModel._called.wrapShowMsg).toBe(undefined);
    });

    it("Verification of get AccntCategory Failure   method when status is 400", function () {
        var response = { status: 400, data: { message: "success" } };
        model.getAccntCategoryFailure(response);
        expect(wizModel._called.wrapShowMsg).toBe(true);
        expect(wizModel._called.getCatErrorObj).toBe(true);
        expect(wizModel._callData.wrapShowMsg[0]).toEqual(response.data.message);
    });

    it("Verification of get AccntCategory Failure   method when status is 200", function () {
        var response = { status: 200, data: { message: "success" } };
        model.getAccntCategoryFailure(response);
        expect(wizModel._called.wrapShowMsg).toBe(undefined);
    });

    it("Verification of  show Notification method", function () {
        var data = { status: 200, data: { message: "success" } };
        model.showNotification(data);
        expect(notification._called.flushAll).toBe(true);
        expect(notification._called.extend).toBe(true);
        expect(notification._called.show).toBe(true);
        expect(notification._callData.extend[0]).toEqual(data);
    });

    it("Verification of  show Error Notification method", function () {
        var msg = { title: "Test Title", desc: "Desc" };
        model.showErrorNotification(msg);
        expect(notification._called.flushAll).toBe(true);
        expect(notification._called.extend).toBe(true);
        expect(notification._callData.extend[0].title).toEqual(msg.title);
        expect(notification._callData.extend[0].descr).toEqual(msg.desc);
    });

    it("Verification of toggle ImportCategory  method when in edit chart", function () {
        $location._returnData.absUrl = "editmasterchart/1";
        model.toggleImportCategory(1);
        expect($location._called.path).toBe(true);
        expect($location._callData.path[0]).toEqual('/admin/coa/importcategory/1');
    });

    it("Verification of toggle ImportCategory  method when not in edit chart", function () {
        $location._returnData.absUrl = "newchart/1";
        model.toggleImportCategory(1);
        expect(model.categorySrc).toEqual("coa-setup/import-category/index.html");
    });

    it("Verification of update Show PageHeader when in edit chart", function () {
        $location._returnData.path = "editmasterchart/1";
        model.updateShowPageHeader();
        expect(model.showPageHeader).toBe(false);
    });

    it("Verification of update Show PageHeader when not in edit chart", function () {
        $location._returnData.path = "newchart/1";
        model.updateShowPageHeader();
        expect(model.showPageHeader).toBe(true);
    });

    it("Verification of update Text", function () {
        model.updateText(true, true);
        expect(model.slideCategoryForm.state.open).toBe(true);
    });

    it("Verification of update Edit Data", function () {
        var category = { rowType: "Section" };
        model.updateEditData(category, "Section");
        expect(model.slideCategoryForm.state.open).toBe(true);
    });

    it("Verification return of get Show Page Header", function () {
        model.showPageHeader = true;
        var outPut = model.getShowPageHeader();
        expect(outPut).toBe(true);
    });



});